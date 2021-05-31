import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { WizardComponent } from 'angular-archwizard';

/**
 * Components
 */
import { SubMicrocreditFormComponent } from "./sub-microcredit-form/sub-microcredit-form.component";

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
  selector: 'app-stepper-partner-microcredit_campaign',
  templateUrl: './stepper-partner-microcredit_campaign.component.html',
  styleUrls: ['./stepper-partner-microcredit_campaign.component.scss']
})
export class StepperPartnerMicrocreditCampaignComponent implements OnInit, OnDestroy {
  /**
   * Imported Component
   */
  @ViewChild(SubMicrocreditFormComponent, { static: true })
  public microcreditForm: SubMicrocreditFormComponent;

  /**
   * Wizard Component
   */
  @ViewChild(WizardComponent, { static: true })
  public wizard: WizardComponent;

  /**
   * Content Variables
   */
  public user: LocalMicrocreditInterface["User"];
  public campaign: LocalMicrocreditInterface["MicrocreditCampaign"];
  public supports: LocalMicrocreditInterface["MicrocreditSupport"][];
  public transaction: LocalMicrocreditInterface["Transaction"];
  public checks: LocalMicrocreditInterface["Checks"];

  /**
   * Flag Variables
   */
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
    private microcreditService: MicrocreditService,
    private stepperService: LocalMicrocreditService,
    public dialogRef: MatDialogRef<StepperPartnerMicrocreditCampaignComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    console.log("Constructor")
    console.log(this.user)

    this.subscription.add(this.stepperService.user.subscribe(user => this.user = user));
    this.subscription.add(this.stepperService.microcreditCampaign.subscribe(campaign => this.campaign = campaign));
    this.subscription.add(this.stepperService.microcreditSupports.subscribe(supports => this.supports = supports));
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
    console.log("Init")
    console.log(this.user)


    this.campaign = this.data.campaign;
    this.stepperService.changeMicrocreditCampaign(this.campaign);

    this.transaction.campaign_id = this.campaign._id;
    this.transaction.campaign_title = this.campaign.title;
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
   * Step A2: Callback from Identifier Form
   * 
   * @param event 
   */
  onDefineIdentifier(event: string) {
    console.log("On identifier");
    console.log("this.checks");
    console.log(this.checks);
    if (this.checks.identifier_scanned) return;

    this.checks.identifier_scanned = true;
    this.stepperService.changeChecks(this.checks);

    console.log("I am on onDefineIdentifier");
    const identifier: string = event;

    this.user.identifier = identifier;
    this.stepperService.changeUser(this.user);

    this.fetchBackerData();
  }

  /**
   * Step B: Callback from Microcredit Form
   * 
   * @param event 
   */
  onSubmitMicrocreditForm(event: number) {
    const identifier = this.user.identifier;
    const redeemTokens = {
      _to: (identifier).toLowerCase(),
      _tokens: this.transaction.discount_tokens,
      password: 'all_ok',
      support_id: this.transaction.support_id
    };

    this.loading = true;

    this.microcreditService.redeemTokens(this.authenticationService.currentUserValue.user["_id"], this.campaign._id, redeemTokens._to, redeemTokens._tokens, redeemTokens.password, redeemTokens.support_id)
      .pipe(
        tap(
          data => {
            this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.SUCCESS_TRANSACTION'), 'success');
            this.onNextStep();
          },
          error => {
            this.stepperNoticeService.setNotice(
              this.translate.instant('WIZARD_MESSAGES.ERROR_REDEEM_TOKENS') + '<br>' +
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

  fetchBackerData() {
    const identifier = this.user.identifier;
    this.microcreditService.readBackerSupportsByMicrocreditCampaign(this.authenticationService.currentUserValue.user["_id"], this.campaign._id, (identifier).toLowerCase())
      .pipe(
        tap(
          data => {
            console.log(data);

            this.supports = data as any;
            this.stepperService.changeMicrocreditSupports(this.supports);

            const canRedeem = (this.supports.filter(support =>
              (support.currentTokens > 0) && ((support.type === 'ReceiveFund') || (support.type === 'SpendFund'))).length > 0);
            if (!canRedeem) {
              this.stepperNoticeService.setNotice(this.translate.instant('WIZARD_MESSAGES.NOT_ENOUGH_TOKENS'), 'danger');

              this.transaction.support_id = '';
              this.transaction.initial_tokens = 0;
              this.transaction.redeemed_tokens = 0;
              this.transaction.possible_tokens = (this.transaction.initial_tokens - this.transaction.redeemed_tokens);
              this.stepperService.changeTransaction(this.transaction);
            }
            this.microcreditForm.initializeSelectedSupport();
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
