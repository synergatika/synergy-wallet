import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

/**
 * Services
 */
import { StaticDataService } from 'src/app/core/helpers/static-data.service';

/**
 * Models & Interfaces
 */
import { PaymentList } from 'src/app/core/interfaces/payment-list.interface';

/**
 * Local Services & Interfaces
 */
import { LocalMicrocreditService } from '../_microcredit.service';
import { LocalMicrocreditInterface } from '../_microcredit.interface';

@Component({
  selector: 'app-sub-amount-form',
  templateUrl: './sub-amount-form.component.html',
  styleUrls: ['./sub-amount-form.component.scss']
})
export class SubAmountFormComponent implements OnInit, OnDestroy {

  /**
   * Event Emitter
   */
  @Output()
  add_amount: EventEmitter<number> = new EventEmitter<number>();

	/**
	 * Configuration and Static Data
	 */
  public paymentsList: PaymentList[];

  /**
   * Content Variables
   */
  public transaction: LocalMicrocreditInterface["Transaction"];
  public campaign: LocalMicrocreditInterface["MicrocreditCampaign"];

  tempAmount: number;
  showAddStep: boolean = true;
  showSubStep: boolean = false;

  /**
   * Forms
   */
  stepperForm: FormGroup;
  submitted: boolean = false;

  private subscription: Subscription = new Subscription;

	/**
	 * Component Constructor
	 */
  constructor(
    private fb: FormBuilder,
    private staticDataService: StaticDataService,
    private stepperService: LocalMicrocreditService
  ) {
    this.paymentsList = this.staticDataService.getPaymentsList;

    this.subscription.add(this.stepperService.microcreditCampaign.subscribe(campaign => this.campaign = campaign));
    this.subscription.add(this.stepperService.transaction.subscribe(transaction => this.transaction = transaction));
  }

  /**
   * On Init
   */
  ngOnInit() {
    this.initializePayments();
    this.initializeForm();
  }

  /**
   * On Destroy
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initializePayments() {
    const currentMethodsArray = (this.campaign.partner_payments).map(a => a.bic);
    const validatePaymentList = this.paymentsList.filter(function (el) {
      return currentMethodsArray.includes(el.bic);
    });
    this.paymentsList = validatePaymentList;
  }

  initializeForm() {
    this.stepperForm = this.fb.group({
      amount: [0, Validators.compose([
        Validators.required,
        Validators.min(1),
        (control: AbstractControl) => Validators.min(this.campaign.minAllowed)(control),
        (control: AbstractControl) => Validators.max((this.campaign.maxAllowed) > 0 ? this.campaign.maxAllowed : this.campaign.maxAmount)(control)
      ])
      ],
      method: ['', Validators.compose([
        Validators.required,
      ])
      ]
    });
    const controls = this.stepperForm.controls;
    controls['amount'].setValue(this.campaign.minAllowed);
    controls['method'].setValue(this.paymentsList[0].bic);
  }

  onChangeAmount(action: boolean) {
    const controls = this.stepperForm.controls;
    this.tempAmount = (action) ? (controls.amount.value + this.campaign.stepAmount) : (controls.amount.value - this.campaign.stepAmount);

    this.showAddStep = (this.tempAmount >= this.campaign.maxAllowed) ? false : true;
    this.showSubStep = (this.tempAmount <= this.campaign.minAllowed) ? false : true;

    controls['amount'].setValue(this.tempAmount);
  }

  // addStep() {
  //   const controls = this.submitForm.controls;
  //   this.tempAmount = controls.amount.value + this.campaign.stepAmount;
  //   if (this.tempAmount <= this.campaign.maxAllowed) {
  //     controls['amount'].setValue(this.tempAmount);
  //   }
  // }

  // removeStep() {
  //   const controls = this.submitForm.controls;
  //   this.tempAmount = controls.amount.value - this.campaign.stepAmount;
  //   if (this.tempAmount >= this.campaign.minAllowed) {
  //     controls['amount'].setValue(this.tempAmount);
  //   }
  // }

  onNextStep() {

    const controls = this.stepperForm.controls;
    if (this.stepperForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    };

    this.transaction.amount = controls.amount.value;
    this.transaction.method = controls.method.value;
    this.stepperService.changeTransaction(this.transaction);
    this.add_amount.emit(this.transaction.amount);
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.stepperForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
}
