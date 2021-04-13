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

  showIdentifierForm = false;

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
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit() {
    this.offer = this.data.offer;
    this.stepperService.changeLoyaltyOffer(this.offer);

    this.transaction.offer_id = this.offer.offer_id;
    this.transaction.offer_title = this.offer.title;
    this.transaction.cost = this.offer.cost;
    this.stepperService.changeTransaction(this.transaction);
  }

  /**
   * On destroy
   */
  ngOnDestroy() {
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
   * Step A1: Callback from Identifier Scanning
   * 
   * @param event 
   */
  onSuccessScanIdentifier(event: string) {
    this.user.identifier_scan = event;
    this.stepperService.changeUser(this.user);

    this.fetchBalanceData();
  }

  /**
   * Step A2: Callback from Identifier Form
   * 
   * @param event 
   */
  onSubmitIdentifierForm(event: string) {
    this.user.identifier_form = event;
    this.stepperService.changeUser(this.user);

    this.fetchBalanceData();
  }

  fetchBalanceData() {
    const identifier = this.user.identifier_scan || this.user.identifier_form;
    this.loyaltyService.readBalanceByPartner((identifier).toLowerCase())
      .pipe(
        tap(
          data => {
            this.stepperNoticeService.setNotice(null);
            this.transaction.final_points = parseInt(data.points, 16);
            console.log(data.points)
            this.onNextStep();
          },
          error => {
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

  onShowIdentifierFormChange() {
    this.showIdentifierForm = !this.showIdentifierForm;
  }

  onNextStep() {
    this.wizard.goToNextStep();
  }

  onExternalPreviousStep(event: boolean) {
    console.log('Back')
    this.stepperNoticeService.setNotice(null);
    this.wizard.goToPreviousStep();
  }

  onPreviousStep(event: boolean) {
    console.log('Back')
    this.stepperNoticeService.setNotice(null);
    this.wizard.goToPreviousStep();
  }

  onFinalStep(event = null) {
    this.dialogRef.close();
    // this.controlModalState(false);
  }
}
