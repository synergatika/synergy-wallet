import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { WizardComponent } from 'angular-archwizard';

/**
 * Services
 */
import { MessageNoticeService } from 'src/app/core/helpers/message-notice/message-notice.service';
import { AuthenticationService } from '../core/services/authentication.service';
import { MicrocreditService } from '../core/services/microcredit.service';

/**
 * Local Services & Interfaces
 */
import { LocalMicrocreditService } from './_microcredit.service';
import { LocalMicrocreditInterface } from './_microcredit.interface';

@Component({
  selector: 'app-stepper-partner-microcredit_support',
  templateUrl: './stepper-partner-microcredit_support.component.html',
  styleUrls: ['./stepper-partner-microcredit_support.component.scss']
})
export class StepperPartnerMicrocreditSupportComponent implements OnInit, OnDestroy {

  /**
   * Wizard Component
   */
  @ViewChild(WizardComponent, { static: true })
  public wizard: WizardComponent;

  /**
   * Content Variables
   */
  public user: LocalMicrocreditInterface["User"];
  public actions: LocalMicrocreditInterface["Actions"];
  public campaign: LocalMicrocreditInterface["MicrocreditCampaign"];
  public transaction: LocalMicrocreditInterface["Transaction"];
  public checks: LocalMicrocreditInterface["Checks"];

  showIdentifierForm: boolean = false;
  showEmailForm: boolean = false;

  private steps: number[] = [0];

  loading: boolean = false;
  private unsubscribe: Subject<any>;
  private subscription: Subscription = new Subscription;

  constructor(
    private cdRef: ChangeDetectorRef,
    private translate: TranslateService,
    private stepperNoticeService: MessageNoticeService,
    private microcreditService: MicrocreditService,
    private authenticationService: AuthenticationService,
    private stepperService: LocalMicrocreditService,
    public dialogRef: MatDialogRef<StepperPartnerMicrocreditSupportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.subscription.add(this.stepperService.user.subscribe(user => this.user = user));
    this.subscription.add(this.stepperService.actions.subscribe(actions => this.actions = actions));
    this.subscription.add(this.stepperService.microcreditCampaign.subscribe(campaign => this.campaign = campaign));
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
    this.campaign = this.data.campaign;
    this.stepperService.changeMicrocreditCampaign(this.campaign);

    this.transaction.partner_id = this.campaign.partner._id;
    this.transaction.campaign_id = this.campaign._id;
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

  /**
   * Step A1: Callback from Identifier Scanning
   * 
   * @param event 
   */
  onDefineIdentifier(identifier: string) {

    if (this.checks.identifier_scanned) return;

    this.checks.identifier_scanned = true;
    this.stepperService.changeChecks(this.checks);

    this.user.identifier = identifier;
    this.stepperService.changeUser(this.user);

    this.authenticationService.checkIdentifier((identifier).toLowerCase())
      .pipe(
        tap(
          (data) => {
            this.actions.identifier = this.defineAction(data.status);
            this.stepperService.changeActions(this.actions);

            this.after_StepA_actions(this.defineAction(data.status));
          },
          (error) => {
            this.checks.identifier_scanned = false;
            this.stepperService.changeChecks(this.checks);
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
   * Step B: Callback from Email Form
   * 
   * @param event 
   */
  onSubmitEmailForm(email: string) {
    this.user.email = email;
    this.stepperService.changeUser(this.user);

    console.log("Email");
    console.log(email)
    if (email) {
      this.authenticationService.checkIdentifier((email).toLowerCase())
        .pipe(
          tap(
            (data) => {
              this.actions.email = this.defineAction(data.status);
              this.stepperService.changeActions(this.actions);

              this.actionsHandler();
            },
            (error) => {
              this.loading = false;
              console.log(error);
            }),
          takeUntil(this.unsubscribe),
          finalize(() => {
            this.cdRef.markForCheck();
          })
        )
        .subscribe();
    } else {
      this.actionsHandler();
      this.loading = false;
    }
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

  after_StepA_actions(status: string) {
    if (['011', '010', '111'].includes(status)) {
      this.actionsHandler();
    } else if (status == '000') {
      this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.NEW_EMAIL'), 'success');
      this.actionsHandler();
    } else {
      if (status == '101') {
        this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.EXISTING_CARD'), 'success');
      } else if (status == '100') {
        this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.NEW_CARD'), 'success');
      }
      this.onNextStep();
    }
  }

  /**
   * Deside the registration action (Registration, Link Email, Link Card)
   */
  actionsHandler() {
    const user = {
      identifier: this.user.identifier,
      email: this.user.email
    };

    console.log("Actions Handler");
    console.log(`${this.actions.email}${this.actions.identifier}`);
    const action = `${this.actions.email}${this.actions.identifier}`;
    switch (action) {
      case 'xxx000': { // only email
        this.actionRegistration(action, user.identifier, null)
        break;
      }
      case 'xxx100': { // only card
        this.actionRegistration(action, null, user.identifier);
        break;
      }
      case '000100': { // email_card
        this.actionRegistration(action, user.email, user.identifier);
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
      case '011101': { // Nothing to Do (Card and Email has different Accounts)
        this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.TWO_ACCOUNTS'), 'danger');
        this.actions.email = 'xxx';
        this.stepperService.changeActions(this.actions);
        break;
      }
      default:
        this.stepperNoticeService.setNotice(null);
        this.onSpecificStep(2);
    }
  }

  actionRegistration(action:string, email: string, card: string) {
    this.loading = true;
    console.log("actionRegistration", this.loading)

    this.authenticationService.register_member(email, card)
      .pipe(
        tap(
          (data) => {
            this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.USER_CREATED'), 'success');
           (action == 'xxx000')  ? this.onSpecificStep(2) : this.onNextStep();
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
    console.log("actionLinkCard", this.loading)

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
    console.log("actionLinkCard", this.loading)

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

  /**
   * Step C: Callback from Amount Form
   * 
   * @param event 
   */
  onSubmitAmountForm(event: number) {
    this.earnTokens();
    // if ((this.actions.registration).length < 5) {
    //   this.actions.registration = 'xx' + this.actions.registration;
    //   this.stepperService.changeActions(this.actions);
    // }
    // console.log("Registration: " + this.actions.registration)

    // this.actionsHandler();
  }


  earnTokens() {
    this.loading = true;
    this.stepperNoticeService.setNotice(null);

    const identifier = this.user.identifier;
    const earnTokens = {
      _to: (identifier).toLowerCase(),
      _amount: this.transaction.amount,
    };

    this.microcreditService.earnTokensByPartner(this.authenticationService.currentUserValue.user["_id"], this.campaign._id, earnTokens._to, earnTokens._amount,
      // (this.support.paid) ? 'store' : 'none', this.support.paid)
      'store', this.transaction.paid)
      .pipe(
        tap(
          data => {
            this.transaction.support_id = data.support_id;
            this.transaction.payment_id = data.payment_id;
            this.stepperService.changeTransaction(this.transaction);

            // let message = (notice.message) ?
            //   notice.message + '<br>' + this.translate.instant('WIZARD_MESSAGES.SUCCESS_TRANSACTION') :
            //   this.translate.instant('WIZARD_MESSAGES.SUCCESS_TRANSACTION');

            // this.stepperNoticeService.setNotice(message, 'success');
            this.onNextStep();
          },
          error => {
            // let message = (notice.message) ?
            //   notice.message + '<br> but ' + this.translate.instant('WIZARD_MESSAGES.SUCCESS_TRANSACTION') :
            //   this.translate.instant('WIZARD_MESSAGES.ERROR_TRANSACTION') + '<br>' +
            //   this.translate.instant(error);

            // this.stepperNoticeService.setNotice(message, 'danger');
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
    this.user.email = (this.steps[this.steps.length - 1] == 1) ? '' : this.user.email;
    this.stepperService.changeUser(this.user);
  }
}


// /**

  //  * Step A1: Callback from Identifier Scanning
  //  * 
  //  * @param event 
  //  */
  // onSuccessScanIdentifier(event: string) {

  //   if (this.checks.identifier_scanned) return;

  //   this.checks.identifier_scanned = true;
  //   this.stepperService.changeChecks(this.checks);

  //   this.user.identifier_scan = event;
  //   this.stepperService.changeUser(this.user);

  //   this.authenticationService.checkIdentifier((this.user.identifier_scan).toLowerCase())
  //     .pipe(
  //       tap(
  //         data => {
  //           this.actions.registration = (this.actions.registration).slice(0, -4)
  //             + '0'
  //             + this.checkRegistrationOnIdentifier(data.status);
  //           this.stepperService.changeActions(this.actions);
  //         },
  //         error => {
  //           console.log(error);
  //           this.stepperNoticeService.setNotice(this.translate.instant(error), 'danger');
  //         }),
  //       takeUntil(this.unsubscribe),
  //       finalize(() => {
  //         this.loading = false;
  //         this.cdRef.markForCheck();
  //       })
  //     )
  //     .subscribe();
  // }

  // /**
  //  * Step A2: Callback from Identifier Form
  //  * 
  //  * @param event 
  //  */
  // onSubmitIdentifierForm(event: string) {
  //   if (this.checks.identifier_scanned) return;

  //   this.checks.identifier_scanned = true;
  //   this.stepperService.changeChecks(this.checks);

  //   this.user.identifier_form = event;
  //   this.stepperService.changeUser(this.user);

  //   this.authenticationService.checkIdentifier((this.user.identifier_form).toLowerCase())
  //     .pipe(
  //       tap(
  //         data => {
  //           this.actions.registration = (this.actions.registration).slice(0, -4)
  //             + '1'
  //             + this.checkRegistrationOnIdentifier(data.status);
  //           this.stepperService.changeActions(this.actions);
  //         },
  //         error => {
  //           console.log(error);
  //           this.stepperNoticeService.setNotice(this.translate.instant(error), 'danger');
  //         }),
  //       takeUntil(this.unsubscribe),
  //       finalize(() => {
  //         this.loading = false;
  //         this.cdRef.markForCheck();
  //       })
  //     )
  //     .subscribe();
  // }

  // /**
  //  * Step B: Callback from Email Form
  //  * 
  //  * @param event 
  //  */
  // onSubmitEmailForm(event: string) {
  //   if (event) {

  //     this.user.email = event;
  //     this.stepperService.changeUser(this.user);

  //     this.authenticationService.checkIdentifier((this.user.email).toLowerCase())
  //       .pipe(
  //         tap(
  //           data => {
  //             console.log(data);
  //             this.actions.registration = (this.actions.registration).slice(0, -6)
  //               + this.checkRegistrationOnEmail(data.status)
  //               + this.actions.registration.substr(this.actions.registration.length - 4);
  //             this.stepperService.changeActions(this.actions);
  //           },
  //           error => {
  //             console.log(error);
  //             this.stepperNoticeService.setNotice(this.translate.instant(error), 'danger');
  //           }),
  //         takeUntil(this.unsubscribe),
  //         finalize(() => {
  //           this.loading = false;
  //           this.cdRef.markForCheck();
  //         })
  //       )
  //       .subscribe();
  //   } else {
  //     this.actions.registration = (this.actions.registration).slice(0, -6)
  //       + '00'
  //       + this.actions.registration.substr(this.actions.registration.length - 4);
  //     this.stepperService.changeActions(this.actions);
  //     this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.NO_EMAIL_WILL_LINK'), 'warning');
  //     this.onNextStep();
  //   }
  // }

  // /**
  //  * Check if Card Number or Email from Step A1,A2 Exists
  //  * 
  //  * @param status; 'email_both', 'email_none', 'email_no_card', 'card_both', 'card_none', 'card_no_email',
  //  */
  // checkRegistrationOnIdentifier(status: string) {
  //   let action: string = 'xxx';
  //   let type: string = '', message: string = '';
  //   this.showEmailForm = false;

  //   switch (status) {
  //     case 'email_both': action = '011'; this.onSpecificStep(2); break; // No action
  //     case 'email_none': {
  //       action = '000';
  //       type = 'success';
  //       message = this.translate.instant('WIZARD_MESSAGES.NEW_EMAIL');
  //       this.onSpecificStep(2);
  //       break;
  //     }
  //     case 'email_no_card': action = '010'; this.onSpecificStep(2); break;// No action
  //     case 'card_both': action = '111'; this.onSpecificStep(2); break;// No action
  //     case 'card_none': {
  //       action = '100';
  //       type = 'success';
  //       message = this.translate.instant('WIZARD_MESSAGES.NEW_CARD');
  //       this.showEmailForm = true;
  //       this.onNextStep();
  //       break;
  //     } // OR action = '0100' // Full Registration OR Link Card
  //     case 'card_no_email': {
  //       action = '101' // OR action = '0000' // Link Email OR No Action
  //       type = 'success';
  //       message = this.translate.instant('WIZARD_MESSAGES.EXISTING_CARD');
  //       this.showEmailForm = true;
  //       this.onNextStep();
  //       break;
  //     }
  //     default: type = 'danger'; message = this.translate.instant('WIZARD_MESSAGES.ERROR'); break;
  //   }
  //   this.stepperNoticeService.setNotice(message, type);
  //   return action;
  // }


  // /**
  //  * Check if Email from Step B Exists
  //  * 
  //  * @param status; 'email_both', 'email_none', 'email_no_card'
  //  */
  // checkRegistrationOnEmail(status: string) {
  //   let action: string = 'xx';
  //   let type: string = '', message: string = '';

  //   switch (status) {
  //     case 'email_both': {
  //       action = '11';
  //       type = 'danger';
  //       message = this.translate.instant('WIZARD_MESSAGES.EMAIL_HAS_CARD');
  //       break;
  //     }
  //     case 'email_none': {
  //       action = '10'
  //       type = 'success';
  //       message = this.translate.instant('WIZARD_MESSAGES.EMAIL_WILL_LINK');
  //       this.onNextStep();
  //       break;
  //     }
  //     case 'email_no_card': {
  //       action = '11';
  //       type = 'success';
  //       message = this.translate.instant('WIZARD_MESSAGES.CARD_WILL_LINK');
  //       this.onNextStep();
  //       break;
  //     }
  //     default: type = 'danger'; message = this.translate.instant('WIZARD_MESSAGES.ERROR'); break;
  //   }
  //   this.stepperNoticeService.setNotice(message, type);
  //   return action;
  // }

  // /**
  //  * Deside the registration action (Registration, Link Email, Link Card)
  //  */
  // actionsHandler() {
  //   this.loading = true;

  //   const user = {
  //     identifier: this.user.identifier_scan || this.user.identifier_form,
  //     email: this.user.email
  //   };

  //   switch (this.actions.registration) {
  //     case 'xx1000': { // only email
  //       this.actionRegistration(
  //         { type: 'success', message: this.translate.instant('WIZARD_MESSAGES.USER_CREATED_EMAIL') }, user.identifier, null)
  //       break;
  //     }
  //     case 'xx0000': { // only email
  //       this.actionRegistration(
  //         { type: 'success', message: this.translate.instant('WIZARD_MESSAGES.USER_CREATED_EMAIL') }, user.identifier, null)
  //       break;
  //     }
  //     case '000100': { // only card
  //       this.actionRegistration(
  //         { type: 'success', message: this.translate.instant('WIZARD_MESSAGES.USER_CREATED_CARD') }, null, user.identifier);
  //       break;
  //     }
  //     case '001100': { // only card
  //       this.actionRegistration(
  //         { type: 'success', message: this.translate.instant('WIZARD_MESSAGES.USER_CREATED_CARD') }, null, user.identifier);
  //       break;
  //     }
  //     case '100100': { // email_card
  //       this.actionRegistration(
  //         { type: 'success', message: this.translate.instant('WIZARD_MESSAGES.USER_CREATED') }, user.email, user.identifier);
  //       break;
  //     }
  //     case '101100': { // email_card
  //       this.actionRegistration(
  //         { type: 'success', message: this.translate.instant('WIZARD_MESSAGES.USER_CREATED') }, user.email, user.identifier);
  //       break;
  //     }
  //     case '100101': { //link_email
  //       this.actionLinkEmail(
  //         { type: 'success', message: this.translate.instant('WIZARD_MESSAGES.LINK_EMAIL') }, user.email, user.identifier);

  //       break;
  //     }
  //     case '101101': { //link_email
  //       this.actionLinkEmail(
  //         { type: 'success', message: this.translate.instant('WIZARD_MESSAGES.LINK_EMAIL') }, user.email, user.identifier);
  //       break;
  //     }
  //     case '110100': { //link_card
  //       this.actionLinkCard(
  //         { type: 'success', message: this.translate.instant('WIZARD_MESSAGES.LINK_CARD') }, user.email, user.identifier);
  //       break;
  //     }
  //     case '111100': { //link_card
  //       this.actionLinkCard(
  //         { type: 'success', message: this.translate.instant('WIZARD_MESSAGES.LINK_CARD') }, user.email, user.identifier);
  //       break;
  //     }
  //     default: {
  //       this.stepperNoticeService.setNotice('', 'success');
  //       this.earnTokens({ type: '', message: '' });
  //       break;
  //     }
  //   }
  // }

  // actionRegistration(notice: { type: string, message: string }, email: string, card: string) {
  //   console.log('Reg', email + card)
  //   this.authenticationService.register_member(email, card)
  //     .pipe(
  //       tap(
  //         data => {
  //           console.log(data);
  //           this.earnTokens(notice);
  //         },
  //         error => {
  //           this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.ERROR_REGISTRATION') + '<br>' +
  //             this.translate.instant(error), 'danger');
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

  // actionLinkCard(notice: { type: string, message: string }, email: string, card: string) {
  //   console.log('Card', email + card)
  //   this.authenticationService.linkCard(email, card)
  //     .pipe(
  //       tap(
  //         data => {
  //           console.log(data);
  //           this.earnTokens(notice);
  //         },
  //         error => {
  //           this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.ERROR_LINK_CARD') + '<br>' +
  //             this.translate.instant(error), 'danger');
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

  // actionLinkEmail(notice: { type: string, message: string }, email: string, card: string) {
  //   console.log('Email', email + card);
  //   this.authenticationService.linkEmail(email, card)
  //     .pipe(
  //       tap(
  //         data => {
  //           console.log(data);
  //           this.earnTokens(notice);
  //         },
  //         error => {
  //           this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.ERROR_LINK_EMAIL') + '<br>' +
  //             this.translate.instant(error), 'danger');
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
