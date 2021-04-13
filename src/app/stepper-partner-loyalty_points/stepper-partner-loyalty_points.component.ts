import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { tap, takeUntil, finalize, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { WizardComponent } from "angular-archwizard";

/**
 * Components
 */
import { SubDiscountFormComponent } from "./sub-discount-form/sub-discount-form.component";

/**
 * Services
 */
import { MessageNoticeService } from '../core/helpers/message-notice/message-notice.service';
import { AuthenticationService } from '../core/services/authentication.service';
import { LoyaltyService } from '../core/services/loyalty.service';
import { StaticDataService } from '../core/helpers/static-data.service';

/**
 * Local Services & Interfaces
 */
import { LocalLoyaltyService } from "./_loyalty.service";
import { LocalLoyaltyInterface } from "./_loyalty.interface";


@Component({
  selector: 'app-stepper-partner-loyalty_points',
  templateUrl: './stepper-partner-loyalty_points.component.html',
  styleUrls: ['./stepper-partner-loyalty_points.component.scss'],
  // providers: [LoyaltyLocalService]
})
export class StepperPartnerLoyaltyPointsComponent implements OnInit, OnDestroy {
  /**
   * Imported Component
   */
  @ViewChild(SubDiscountFormComponent, { static: true })
  public discountForm: SubDiscountFormComponent;

  /**
   * Wizard Component
   */
  @ViewChild(WizardComponent, { static: true })
  public wizard: WizardComponent;

  /**
   * Content Variables
   */
  public user: LocalLoyaltyInterface["User"];
  public actions: LocalLoyaltyInterface["Actions"];
  public transaction: LocalLoyaltyInterface["Transaction"];

  steps: number[] = [0];

  showIdentifierForm: boolean = false;
  showAmountForm: boolean = false;

  conversionRatiο: number = 0.01;
  discountRatio: number = 0.2;

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
    private staticDataService: StaticDataService,
    public dialogRef: MatDialogRef<StepperPartnerLoyaltyPointsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.conversionRatiο = this.staticDataService.getConversionRatiο;
    this.subscription.add(this.stepperService.user.subscribe(user => this.user = user));
    this.subscription.add(this.stepperService.actions.subscribe(actions => this.actions = actions));
    this.subscription.add(this.stepperService.transaction.subscribe(transaction => this.transaction = transaction));
    this.unsubscribe = new Subject();

    const scanOptions = localStorage.getItem('scanOptions');
    if (scanOptions) {
      this.showIdentifierForm = scanOptions.split(',')[0] == 'true';
      this.showAmountForm = scanOptions.split(',')[1] == 'true';
    }
  }

  /**
   * On Init
   */
  ngOnInit() {
    // this.controlModalState(true);
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

  /**
   * Step A1: Callback from Identifier Scanning
   * 
   * @param event 
   */
  onDefineIdentifier(event: string) {
    const identifier: string = event;

    this.authenticationService.checkIdentifier((identifier).toLowerCase())
      .pipe(
        tap(
          (data) => {

            this.actions.identifier = this.defineAction(data.status);
            this.stepperService.changeActions(this.actions);

            this.stepA_actions(this.defineAction(data.status));
            this.stepA_messages(this.defineAction(data.status));
          },
          (error) => {

          }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe();

    this.user.identifier = event;
    this.stepperService.changeUser(this.user);
  }

  /**
   * Step B: Callback from Email Form
   * 
   * @param event 
   */
  onSubmitEmailForm(event: string) {
    const email: string = event;

    if (event) {
      this.authenticationService.checkIdentifier((email).toLowerCase())
        .pipe(
          tap(
            (data) => {
              this.actions.email = this.defineAction(data.status);
              this.stepperService.changeActions(this.actions);

              this.stepB_actions(data.status);
            },
            (error) => {

            }),
          takeUntil(this.unsubscribe),
          finalize(() => {
            this.loading = false;
            this.cdRef.markForCheck();
          })
        )
        .subscribe();
    } else {

    }

    this.user.email = event;
    this.stepperService.changeUser(this.user);

    console.log("Before go to Handler");
    console.log(`${this.actions.email}${this.actions.identifier}`)
    this.actionsHandler();
  }

  /**
  * Step C: Callback from Amount Form
  * 
  * @param event 
  */
  onDefineAmount(event: number) {
    const amount = event;

    this.transaction.amount = amount;
    this.transaction.final_amount = amount;
    this.stepperService.changeTransaction(this.transaction);

    if (this.transaction.amount > 5) {
      this.fetchBalanceData();
    } else {
      this.initializeDiscountAmount();
    }

    this.stepC_actions();
  }

  /**
   * Step D: Callback from Discount Form
   * 
   * @param event 
   */
  onSubmitDiscountForm(event: boolean) {
    const wantRedeem: boolean = event;

    if (wantRedeem) {
      this.transaction.final_amount = this.transaction.amount - this.transaction.possible_discount_amount;
      this.stepperService.changeTransaction(this.transaction);
    }

    this.actions.redeem = wantRedeem ? '1' : '0';
    this.stepperService.changeActions(this.actions);

    this.stepD_actions();
  }

  defineAction(status: string) {
    switch (status) {
      case 'email_both': return '011';
      case 'email_none': return '000';
      case 'email_no_card': return '010';
      case 'card_both': return '111';
      case 'card_none': return '100';
      case 'card_no_email': return '101';
    }
  }

  stepA_actions(status: string) {
    if (['000', '011', '010', '111'].includes(status)) {
      this.actionsHandler();
      this.onSpecificStep(2);
    } else {
      this.onNextStep();
    }
  }

  stepA_messages(status: string) {
    if (['011', '010', '111'].includes(status)) {
      // do nothing
    } else if (status == '000') {
      this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.NEW_EMAIL'), 'success');
    } else {
      if (status == '101') {
        this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.EXISTING_CARD'), 'success');
      } else if (status == '100') {
        this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.NEW_CARD'), 'success');
      }
    }
  }

  stepB_actions(status: string) {
    this.actionsHandler();
    this.onNextStep();
  }

  async stepC_actions() {

  }

  async stepD_actions() {
    console.log("wantRedeem")
    console.log(this.actions.redeem)
    if (this.actions.redeem == '1') {
      console.log("I will redeem")
      this.transaction.discount_amount = this.transaction.possible_discount_amount;
      this.transaction.discount_points = this.transaction.possible_discount_amount * (1 / this.conversionRatiο);
      this.stepperService.changeTransaction(this.transaction);
      this.earnAndRedeemPoints();
    } else {
      this.transaction.discount_amount = 0;
      this.transaction.discount_points = 0;
      console.log("I will NOT redeem")
      this.earnPoints();
    }

    console.log(this.transaction)
  }

  async stepE_actions() {
    this.onNextStep();
  }


  async afterDefineDiscount(wantRedeem: boolean) {

  }

  /**
   * Slip Floor
   */
  slipFloor(num: number) {
    let f = Math.floor(num);
    if (num - f < 0.5) {
      return f;
    }
    return f + 0.5;
  }

  async initializeDiscountAmount() {

    const maxAllowedDiscount: number = this.transaction.amount * this.discountRatio;
    const maxPossibleDiscount: number = this.transaction.points * this.conversionRatiο;

    console.log("Init Discount");
    console.log(this.transaction);
    console.log("maxPossibleDiscount", maxPossibleDiscount);
    console.log("maxAllowedDiscount", maxAllowedDiscount);

    if ((this.transaction.amount >= 5) && (maxPossibleDiscount >= 0.5)) {
      this.transaction.possible_discount_amount = (maxPossibleDiscount > maxAllowedDiscount) ? this.slipFloor(maxAllowedDiscount) : this.slipFloor(maxPossibleDiscount);
      this.stepperService.changeTransaction(this.transaction);
      this.discountForm.initializeDiscount();
      this.onNextStep();
    } else if ((this.transaction.amount < 5) || (maxPossibleDiscount < 0.5)) {

      this.transaction.possible_discount_amount = 0;
      this.stepperService.changeTransaction(this.transaction);
      console.log("Can Not Redeem")
      console.log("Discount Amount: " + this.transaction.possible_discount_amount, "Discount Points: " + this.transaction.discount_points);
      this.earnPoints();
      this.onSpecificStep(4);
    }
  }

  /**
   * Deside the registration action (Registration, Link Email, Link Card)
   */
  actionsHandler() {
    this.loading = true;

    const user = {
      identifier: this.user.identifier,
      email: this.user.email
    };

    switch (`${this.actions.email}${this.actions.identifier}`) {
      case 'xxx000': { // only email
        this.actionRegistration(user.identifier, null)
        break;
      }
      case 'xxx100': { // only card
        this.actionRegistration(null, user.identifier);
        break;
      }
      case '000100': { // email_card
        this.actionRegistration(user.email, user.identifier);
        break;
      }
      case '010100': { // link_card
        this.actionLinkCard(user.email, user.identifier);
        break;
      }
      case '011100': { // link_card 
        this.actionLinkCard(user.email, user.identifier);
        break;
      }
      case '000101': { // link_email
        this.actionLinkEmail(user.email, user.identifier);
        break;
      }
      default:
        console.log("On Default")
        this.loading = false;
        this.stepperNoticeService.setNotice(null);
        this.onNextStep();
    }
  }

  actionRegistration(email: string, card: string) {
    this.loading = true;
    console.log("actionRegistration")

    this.authenticationService.register_member(email, card)
      .pipe(
        tap(
          (data) => {
            this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.USER_CREATED'), 'success');
            this.onNextStep();
          },
          (error) => {
            this.stepperNoticeService.setNotice(
              this.translate.instant('WIZARD_MESSAGES.ERROR_REGISTRATION') + '<br>' +
              this.translate.instant(error), 'danger');
          }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe();
  }

  actionLinkCard(email: string, card: string) {
    this.loading = true;
    console.log("actionLinkCard")

    this.authenticationService.linkCard(email, card)
      .pipe(
        tap(
          (data) => {
            this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.LINK_CARD'), 'success');
            this.onNextStep();
          },
          (error) => {
            this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.ERROR_LINK_CARD') + '<br>' +
              this.translate.instant(error), 'danger');
          }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe();
  }

  actionLinkEmail(email: string, card: string) {
    this.loading = true;
    console.log("actionLinkCard")

    this.authenticationService.linkEmail(email, card)
      .pipe(
        tap(
          (data) => {
            this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.LINK_EMAIL'), 'success');
            this.onNextStep();
          },
          (error) => {
            this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.ERROR_LINK_EMAIL') + '<br>' +
              this.translate.instant(error), 'danger');
          }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe();
  }

  fetchBalanceData() {
    this.loyaltyService.readBalanceByPartner((this.user.identifier).toLowerCase())
      .pipe(
        tap(
          (data) => {
            console.log("Balance")
            console.log(data);

            this.transaction.points = parseInt(data.points, 16);
            this.stepperService.changeTransaction(this.transaction);

            this.initializeDiscountAmount();
          },
          error => {
            this.stepperNoticeService.setNotice(this.translate.instant(error), 'danger');
            this.loading = true;
          }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe();
  }

  earnPoints() {
    this.loading = true;

    let earnPoints = {
      password: 'all_ok',
      _to: this.user.identifier,
      _amount: this.transaction.final_amount
    };

    this.loyaltyService.earnPoints(earnPoints._to, earnPoints.password, earnPoints._amount)
      .pipe(
        switchMap(
          (data) => {
            return this.loyaltyService.readBalanceByPartner((this.user.identifier).toLowerCase())
              .pipe(
                tap(
                  (data) => {
                    this.transaction.final_points = parseInt(data.points, 16);
                    this.transaction.added_points = this.transaction.final_points + (this.transaction.discount_points - this.transaction.points);
                    this.stepperService.changeTransaction(this.transaction);

                    this.stepE_actions();
                  },
                  (error) => {

                  })
              );
          },
          (error) => {
            console.log("Earn Points");
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

  earnAndRedeemPoints() {
    this.loading = true;

    let earnPoints = {
      password: 'all_ok',
      _to: this.user.identifier,
      _amount: this.transaction.final_amount
    };

    let redeemPoints = {
      password: 'all_ok',
      _to: this.user.identifier,
      _points: this.transaction.discount_points,
      _amount: this.transaction.discount_amount
    }

    this.loyaltyService.earnPoints(earnPoints._to, earnPoints.password, earnPoints._amount)
      .pipe(
        switchMap(
          (data) => {
            return this.loyaltyService.redeemPoints(redeemPoints._to, redeemPoints.password, redeemPoints._points, redeemPoints._amount)
              .pipe(
                switchMap(
                  (data) => {
                    return this.loyaltyService.readBalanceByPartner((this.user.identifier).toLowerCase())
                      .pipe(
                        tap(
                          (data) => {
                            this.transaction.final_points = parseInt(data.points, 16);
                            this.transaction.added_points = this.transaction.final_points + (this.transaction.discount_points - this.transaction.points);
                            this.stepperService.changeTransaction(this.transaction);

                            this.stepE_actions();
                          },
                          (error) => {

                          })
                      );
                  },
                  (error) => {

                  })
              );
          },
          (error) => {
            console.log("Earn & Redeem Points");
            console.log(error);
          }
        ),
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
    localStorage.setItem('scanOptions', `${this.showIdentifierForm},${this.showAmountForm}`);
  }

  onShowAmountFormChange() {
    this.showAmountForm = !this.showAmountForm;
    localStorage.setItem('scanOptions', `${this.showIdentifierForm},${this.showAmountForm}`);
  }

  onNextStep() {
    this.steps.push(this.steps[this.steps.length] + 1);
    this.wizard.goToNextStep();
  }

  onSpecificStep(step: number) {
    this.steps.push(step);
    this.wizard.goToStep(step);
  }

  onPreviousStep(event: boolean) {
    this.stepperNoticeService.setNotice(null);

    this.steps.pop();
    this.wizard.goToStep(this.steps[this.steps.length - 1])
  }

  onFinalStep(event: boolean) {
    this.dialogRef.close();
    // this.controlModalState(false);
  }
}





  // redeemPoints() {

  //   let earnPoints = {
  //     password: 'all_ok',
  //     _to: this.user.identifier,
  //     _amount: this.transaction.final_amount
  //   };

  //   this.loyaltyService.earnPoints(earnPoints._to, earnPoints.password, earnPoints._amount)
  //     .pipe(
  //       tap(
  //         (data) => {

  //           let redeemPoints = {
  //             password: 'all_ok',
  //             _to: this.user.identifier,
  //             _points: this.transaction.discount_points,
  //             _amount: this.transaction.discount_amount
  //           }

  //           this.loyaltyService.redeemPoints(redeemPoints._to, redeemPoints.password, redeemPoints._points, redeemPoints._amount)
  //             .pipe(
  //               tap(
  //                 (data) => {
  //                   console.log("Redeem")
  //                   console.log(data);

  //                   this.fetchFinalBalanceData();
  //                 },
  //                 (error) => {

  //                 }),
  //               takeUntil(this.unsubscribe),
  //               finalize(() => {
  //                 this.loading = false;
  //                 this.cdRef.markForCheck();
  //               })
  //             )
  //             .subscribe();
  //         },
  //         (error) => {

  //         }),
  //       takeUntil(this.unsubscribe),
  //       finalize(() => {
  //         this.loading = false;
  //         this.cdRef.markForCheck();
  //       })
  //     )
  //     .subscribe();

  // }

  // onSuccessScanIdentifier(event: string) {

  //   let action: string = '';

  //   // 'a': 'Identifier OR Form',
  //   // 'b': 'Was Email OR Card',
  //   // 'c': Is Email Registered,
  //   // 'd': Is Card Registered,

  //   this.loyaltyService.checkIdentifier((this.user.identifier_scan).toLowerCase())
  //     .pipe(
  //       tap(
  //         data => {
  //           if (data.status === 'email_both') {
  //             // Ok!
  //             action = 'xx0011'; // No action
  //             this.onAfterNextStep(3);
  //           } else if (data.status === 'email_none') {
  //             action = 'xx0000'; // Cannot Be Happened!
  //           } else if (data.status === 'email_no_card') {
  //             // Ok! Maybe ask card???
  //             action = 'xx0010'; // No action
  //             this.onAfterNextStep(3);
  //           } else if (data.status === 'card_both') {
  //             action = 'xx0111'; // No action
  //             this.onAfterNextStep(3);
  //           } else if (data.status === 'card_none') {
  //             action = 'xx0100'; // OR action = '0100' // Full Registration OR Link Card
  //             this.messages.stepB = 'New Card. If user is regitered enter email to link! If not ask email to register! Or procced and create a card account';
  //             this.onNextStep();
  //           } else if (data.status === 'card_no_email') {
  //             action = 'xx0101'; // OR action = '0000' // Link Email OR No Action
  //             this.messages.stepB = 'Existing Card. ! Ask email to link! Or procced!';
  //             this.onNextStep();
  //           } else {
  //             // Cannot Be Happened!
  //           }
  //           this.actions.registration = action;
  //           this.scannerService.changeActions(this.actions);
  //         },
  //         error => {
  //           console.log(error);
  //         }),
  //       takeUntil(this.unsubscribe),
  //       finalize(() => {
  //         this.loading = false;
  //         this.cdRef.markForCheck();
  //       })
  //     )
  //     .subscribe();
  // }

  // onSubmitIdentifierForm(event: string) {

  //   let action: string = '0000';

  //   // 'a': 'Identifier OR Form',
  //   // 'b': 'Was Email OR Card',
  //   // 'c': Is Email Registered,
  //   // 'd': Is Card Registered,

  //   this.loyaltyService.checkIdentifier((this.user.identifier_form).toLowerCase())
  //     .pipe(
  //       tap(
  //         data => {

  //           if (data.status === 'email_both') {
  //             action = 'xx1011'; // No action
  //             this.onAfterNextStep(2);
  //           } else if (data.status === 'email_none') {
  //             action = 'xx1000'; // Need Registration
  //             this.messages.stepC = 'User would be created';
  //             this.onAfterNextStep(2);
  //           } else if (data.status === 'email_no_card') {
  //             action = 'xx1010'; // No Action
  //             this.onAfterNextStep(2);
  //           } else if (data.status === 'card_both') {
  //             action = 'xx1111'; // No Action
  //             this.onAfterNextStep(2);
  //           } else if (data.status === 'card_none') {
  //             this.messages.stepB = '<span class="message-highlight"><span class="mdi mdi-account-card-details"></span> New Card</span><br>If user is registered enter email to link! If not, ask email to register!<br>Or procced and create a card account';
  //             action = 'xx1100'; // OR action = '0101' // Full Registration OR Link Card
  //             this.onNextStep();
  //           } else if (data.status === 'card_no_email') {
  //             // Πληκτρολόγησε την κάρτα, Ζήτα Email
  //             action = 'xx1101'; // OR action = '0000' // Link Email OR No Action
  //             this.messages.stepB = 'Existing Card. ! Ask email to link! Or procced!';
  //             this.onNextStep();
  //           } else {
  //             // Cannot Be Happened!
  //           }
  //           this.actions.registration = action;
  //           console.log("Action on Identifier")
  //           console.log(this.actions.registration);
  //           this.scannerService.changeActions(this.actions);
  //         },
  //         error => {
  //           console.log(error);
  //         }),
  //       takeUntil(this.unsubscribe),
  //       finalize(() => {
  //         this.loading = false;
  //         this.cdRef.markForCheck();
  //       })
  //     )
  //     .subscribe();
  // }

  // onSubmitEmailForm(event) {
  //   let action: string = '00';

  //   // 'a': Form has Email
  //   // 'b': Mail Exist?

  //   // έρχεται εδώ όταν
  //   // υπαρχουσα καρτα δεν έχει email
  //   // νέα καρτα
  //   if (event) {
  //     this.loyaltyService.checkIdentifier((this.user.email).toLowerCase())
  //       .pipe(
  //         tap(
  //           data => {
  //             console.log("On Email Message")
  //             console.log(data.status);
  //             if (data.status === 'email_both') {
  //               this.messages.stepC = 'Your Email Has already a card. If you continue the card will be replaced';
  //               action = '11' + this.actions.registration.substr(2, 4);

  //             } else if (data.status === 'email_none') {
  //               this.messages.stepC = 'Your Email Will Link With Card';
  //               action = '10' + this.actions.registration.substr(2, 4);
  //               console.log("2")
  //             } else if (data.status === 'email_no_card') {
  //               this.messages.stepC = 'Card Will Link With Your Email';
  //               action = '11' + this.actions.registration.substr(2, 4);
  //               console.log("3")
  //             } else {
  //               console.log("4")
  //               // Cannot Be Happened!
  //             }
  //             this.actions.registration = action;
  //             console.log("Action on Email")
  //             console.log(this.actions.registration);
  //             this.scannerService.changeActions(this.actions);
  //           },
  //           error => {
  //             console.log(error);
  //           }),
  //         takeUntil(this.unsubscribe),
  //         finalize(() => {
  //           this.loading = false;
  //           this.cdRef.markForCheck();
  //         })
  //       )
  //       .subscribe();
  //   } else {
  //     action = '00' + this.actions.registration.substr(2, 4);
  //     this.actions.registration = action;
  //     this.scannerService.changeActions(this.actions);
  //   }
  //   console.log("Action on Email")
  //   console.log(this.actions.registration);
  //   this.onNextStep();
  // }


  // actionsHandler() {
  //   const user = {
  //     identifier: this.user.identifier_scan || this.user.identifier_form,
  //     email: this.user.email
  //   };

  //   let authData = {
  //     email: '',
  //     card: ''
  //   };
  //   // 'a': Form has Email
  //   // 'b': Mail Exist?
  //   // 'a': 'Identifier OR Form',
  //   // 'b': 'Was Email OR Card',
  //   // 'c': Is Email Registered,
  //   // 'd': Is Card Registered,

  //   // All States!!!
  //   // xx0011, xx0000, xx0010, xx0111,
  //   // 100100, 110100, 000100 // New Card
  //   // 100101, 110101, 000101 // Card No Email
  //   // xx1011, xx1000, xx1010, xx1111,
  //   // 101100, 111100, 001100 // New Card
  //   // 101101, 111101, 001101 // Card No Email

  //   console.log("Code: ");
  //   console.log(this.actions.registration);


  //   const states = {
  //     do_nothing: {
  //       has_both: ['xx0011', 'xx1011', 'xx0111', 'xx1111'],
  //       do_not_want_to_link_email: ['000101', '001101'],
  //       could_link_card: ['xx0010', 'xx1010'],
  //     },
  //     registration: {
  //       only_email: ['xx0000', 'xx1000'],
  //       only_card: ['000100', '001100'],
  //       email_card: ['100100', '101100'],
  //       need_merge: ['110101', '111101'] // This is a merge situation!!!
  //     },
  //     link: {
  //       email: ['100101', '101101'],
  //       card: ['110100', '111100']
  //     }
  //   }

  //   if (Array.prototype.concat.apply([],
  //     [states.registration.only_email, states.registration.only_card, states.registration.email_card])
  //     .includes(this.actions.registration)) {
  //     console.log('Action: Registration');
  //     if ((states.registration.only_email).includes(this.actions.registration)) {
  //       console.log('A');
  //       authData.email = user.identifier;
  //     } else if ([...states.registration.only_card, ...states.registration.email_card].includes(this.actions.registration)) {
  //       console.log('B');
  //       authData.email = user.email;
  //       authData.card = user.identifier;
  //     }

  //     this.authenticationService.register_member(authData.email, authData.card)
  //       .pipe(
  //         tap(
  //           data => {
  //             this.earnPoints(authData.email || authData.card);
  //           },
  //           error => {
  //             console.log(error);
  //           }),
  //         takeUntil(this.unsubscribe),
  //         finalize(() => {
  //           this.loading = false;
  //           this.cdRef.markForCheck();
  //         })
  //       )
  //       .subscribe();

  //   } else if ((states.link.card).includes(this.actions.registration)) {

  //     authData.email = user.email;
  //     authData.card = user.identifier;
  //     console.log('Action: Link A Card');

  //     this.loyaltyService.linkCard(authData.email, authData.card)
  //       .pipe(
  //         tap(
  //           data => {
  //             this.earnPoints(authData.email);
  //           },
  //           error => {
  //             console.log(error);
  //           }),
  //         takeUntil(this.unsubscribe),
  //         finalize(() => {
  //           this.loading = false;
  //           this.cdRef.markForCheck();
  //         })
  //       )
  //       .subscribe();
  //   } else if ((states.link.email).includes(this.actions.registration)) {
  //     authData.email = user.email;
  //     authData.card = user.identifier;
  //     console.log('Action: Link An Email');

  //     this.loyaltyService.linkEmail(authData.email, authData.card)
  //       .pipe(
  //         tap(
  //           data => {
  //             this.earnPoints(authData.card);
  //           },
  //           error => {
  //             console.log(error);
  //           }),
  //         takeUntil(this.unsubscribe),
  //         finalize(() => {
  //           this.loading = false;
  //           this.cdRef.markForCheck();
  //         })
  //       )
  //       .subscribe();
  //   } else {
  //     this.earnPoints(user.identifier);
  //   }
  // }