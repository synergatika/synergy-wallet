import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { WizardComponent } from 'angular-archwizard';

/**
 * Services
 */
import { MessageNoticeService } from '../core/helpers/message-notice/message-notice.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoyaltyService } from '../core/services/loyalty.service';

/**
 * Local Services & Interfaces
 */
import { LocalLoyaltyService } from './_loyalty.service';
import { LocalLoyaltyInterface } from './_loyalty.interface';

@Component({
  selector: 'app-stepper-partner-loyalty_pointless_offer',
  templateUrl: './stepper-partner-loyalty_pointless_offer.component.html',
  styleUrls: ['./stepper-partner-loyalty_pointless_offer.component.scss'],
})
export class StepperPartnerLoyaltyPointlessOfferComponent implements OnInit, OnDestroy {

  /**
   * Wizard Component
   */
  @ViewChild(WizardComponent, { static: true })
  public wizard: WizardComponent;

  /**
   * Content Variables
   */
  public user: LocalLoyaltyInterface["User"];
  public offer: LocalLoyaltyInterface["Offer"];
  public transaction: LocalLoyaltyInterface["Transaction"];
  public checks: LocalLoyaltyInterface["Checks"];

  showIdentifierForm = false;

  private steps: number[] = [0];

  loading: boolean = false;
  private unsubscribe: Subject<any>;
  private subscription: Subscription = new Subscription;

  constructor(
    private cdRef: ChangeDetectorRef,
    private translate: TranslateService,
    private stepperNoticeService: MessageNoticeService,
    private authenticationService: AuthenticationService,
    private loyaltyService: LoyaltyService,
    private stepperService: LocalLoyaltyService,
    public dialogRef: MatDialogRef<StepperPartnerLoyaltyPointlessOfferComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.subscription.add(this.stepperService.user.subscribe(user => this.user = user));
    this.subscription.add(this.stepperService.loyaltyOffer.subscribe(offer => this.offer = offer));
    this.subscription.add(this.stepperService.transaction.subscribe(transaction => this.transaction = transaction));
    this.subscription.add(this.stepperService.checks.subscribe(checks => this.checks = checks));
    this.unsubscribe = new Subject();

    const scanOptions = localStorage.getItem('scanOptions');
    if (scanOptions) {
      this.showIdentifierForm = (scanOptions.split(',')[0] == 'true');
    }
  }

  /**
   * On Init
   */
  ngOnInit() {
    this.offer = this.data.offer;
    this.stepperService.changeLoyaltyOffer(this.offer);

    this.transaction.offer_id = this.offer._id;
    this.transaction.offer_title = this.offer.title;
    this.transaction.cost = this.offer.cost;
    this.stepperService.changeTransaction(this.transaction);
  }

  /**
   * On destroy
   */
  ngOnDestroy() {
    this.checks.identifier_scanned = false;
    this.stepperService.changeChecks(this.checks);

    this.stepperNoticeService.setNotice(null);
    this.subscription.unsubscribe();
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  // controlModalState(state: boolean) {
  //   if (state) {
  //     const modalState = {
  //       modal: true,
  //       desc: 'fake state for our modal'
  //     };
  //     history.pushState(modalState, null);
  //   } else if (window.history.state.modal) {
  //     history.back();
  //   }
  // }

  // @HostListener('window:popstate', ['$event'])
  // dismissModal() {
  //   this.dialogRef.close();
  // }


  /**
   * Step A: Callback from Identifier Scanning OR Identifier Submit
   * 
   * @param event 
   */
  onDefineIdentifier(identifier: string) {
    console.log("Identifier")
    console.log(identifier)

    console.log("identifier_scanned")
    console.log(this.checks.identifier_scanned)


    if (this.checks.identifier_scanned) return;

    this.checks.identifier_scanned = true;
    this.stepperService.changeChecks(this.checks);

    console.log("I am on onDefineIdentifier");

    this.user.identifier = identifier;
    this.stepperService.changeUser(this.user);

    this.fetchBalanceData();
  }

  fetchBalanceData() {
    const identifier = this.user.identifier;
    this.loyaltyService.readBalanceByPartner((identifier).toLowerCase())
      .pipe(
        tap(
          (data) => {
            this.stepperNoticeService.setNotice(null);
            this.transaction.final_points = data.currentPoints;
            this.onNextStep();
          },
          (error) => {
            this.checks.identifier_scanned = false;
            this.stepperService.changeChecks(this.checks);

            this.stepperNoticeService.setNotice(this.translate.instant(error), 'danger');
            console.log(error);
          }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe();
  }

  /**
   * Scanner Options
   */
  onShowIdentifierFormChange() {
    this.showIdentifierForm = !this.showIdentifierForm;

    this.changeScannerOptions()
  }

  private changeScannerOptions() {
    const options = localStorage.getItem('scanOptions');
    if (options) {
      localStorage.setItem('scanOptions', `${this.showIdentifierForm},${options.split(',')[1]}`);
    } else {
      localStorage.setItem('scanOptions', `${this.showIdentifierForm},false`);
    }
  }

  /**
  * Handle Steps (Back, Next)
  */
  onNextStep() {
    this.steps.push(this.steps[this.steps.length - 1] + 1);
    this.wizard.goToNextStep();
  }

  onSpecificStep(step: number) {
    this.steps.push(step);
    this.wizard.goToStep(step);
  }

  onPreviousStep(event: boolean) {
    this.stepperNoticeService.setNotice(null);

    this.steps.pop();

    this.changeScannerStatus();

    this.wizard.goToStep(this.steps[this.steps.length - 1])
  }

  onFinalStep(event: boolean) {
    this.dialogRef.close();
    // this.controlModalState(false);
  }

  private changeScannerStatus() {
    if ((this.steps[this.steps.length - 1] == 0)) this.checks.identifier_scanned = false;
    this.stepperService.changeChecks(this.checks);

    this.user.identifier = (this.steps[this.steps.length - 1] == 0) ? '' : this.user.identifier;
    this.stepperService.changeUser(this.user);
  }
}
