import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { tap, takeUntil, finalize, switchMap } from 'rxjs/operators';
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
  selector: 'app-stepper-partner-loyalty_offer',
  templateUrl: './stepper-partner-loyalty_offer.component.html',
  styleUrls: ['./stepper-partner-loyalty_offer.component.scss'],
})
export class StepperPartnerLoyaltyOfferComponent implements OnInit, OnDestroy {

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
  loading: boolean = false;
  private unsubscribe: Subject<any>;
  private subscription: Subscription = new Subscription;

  private steps: number[] = [0];

  constructor(
    private cdRef: ChangeDetectorRef,
    private translate: TranslateService,
    private stepperNoticeService: MessageNoticeService,
    private authenticationService: AuthenticationService,
    private loyaltyService: LoyaltyService,
    private stepperService: LocalLoyaltyService,
    public dialogRef: MatDialogRef<StepperPartnerLoyaltyOfferComponent>, @Inject(MAT_DIALOG_DATA) public data: any
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

    this.transaction.offer_id = this.offer.offer_id;
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


  fetchBalanceData(final: boolean) {
    const identifier = this.user.identifier;
    this.loyaltyService.readBalanceByPartner((identifier).toLowerCase())
      .pipe(
        tap(
          data => {
            console.log(data);

            if (final) {
              this.transaction.final_points = parseInt(data.points, 16);
              this.stepperService.changeTransaction(this.transaction);

              this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.SUCCESS_TRANSACTION'), 'success');
              this.onNextStep();
            } else {
              console.log(parseInt(data.points, 16));
              this.transaction.points = parseInt(data.points, 16);
              this.transaction.possible_quantity = Math.floor(this.transaction.points / this.transaction.cost);
              this.stepperService.changeTransaction(this.transaction);
              this.onNextStep();

              if (!this.transaction.possible_quantity) {
                this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.NOT_ENOUGH_POINTS'), 'danger');
              }
            }
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

  /**
   * Step A: Callback from Identifier Scanner Or Identifier Form
   * 
   * @param event 
   */
  onDefineIdentifier(event: string) {

    if (this.checks.identifier_scanned) return;

    const identifier = event;

    this.checks.identifier_scanned = true;
    this.stepperService.changeChecks(this.checks);

    this.user.identifier = identifier;
    this.stepperService.changeUser(this.user);

    this.fetchBalanceData(false);

  }

  /**
   * Step B: Callback from Offer Form
   * 
   * @param event 
   */
  onSubmitOfferForm(event: number) {
    this.loading = true;

    const redeemOffer = this.formatRedeemDto();

    this.loyaltyService.redeemOffer(this.authenticationService.currentUserValue.user["_id"], redeemOffer.offer_id, redeemOffer._to, redeemOffer.password, redeemOffer._points, redeemOffer.quanitive)
      .pipe(
        switchMap(
          (data) => {
            return this.loyaltyService.readBalanceByPartner((redeemOffer._to).toLowerCase())
              .pipe(
                tap(
                  (data) => {
                    this.transaction.final_points = parseInt(data.points, 16);
                    this.stepperService.changeTransaction(this.transaction);

                    this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.SUCCESS_TRANSACTION'), 'success');
                    this.onNextStep();
                  },
                  (error) => {

                  })
              );
          },
          (error) => {
            this.stepperNoticeService.setNotice(
              this.translate.instant('WIZARD_MESSAGES.ERROR_REDEEM_OFFER')
              // + '<br>' + this.translate.instant(error) 
              , 'danger');
          }),
        // tap(
        //   data => {
        //     this.fetchBalanceData(true);
        //   },
        //   error => {
        //     this.stepperNoticeService.setNotice(
        //       this.translate.instant('WIZARD_MESSAGES.ERROR_REDEEM_OFFER') + '<br>' +
        //       this.translate.instant(error), 'danger');
        //     this.loading = false;
        //   }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe();
  }

  private formatRedeemDto() {
    return {
      password: 'all_ok',
      _to: (this.user.identifier).toLowerCase(),
      _points: this.transaction.discount_points,
      offer_id: this.transaction.offer_id,
      quanitive: this.transaction.quantity
    };
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
