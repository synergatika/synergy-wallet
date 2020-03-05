import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SupportService } from '../_support.service';
import { SupportInterface } from '../_support.interface';

// Translate
import { TranslateService } from '@ngx-translate/core';
import { MicrocreditSupport } from 'src/app/core/models/microcredit-support.model';
import { MicrocreditCampaign } from 'src/app/core/models/microcredit-campaign.model';

@Component({
  selector: 'app-sub-amount-form',
  templateUrl: './sub-amount-form.component.html',
  styleUrls: ['./sub-amount-form.component.scss']
})
export class SubAmountFormComponent implements OnInit {

  @Output()
  add_amount: EventEmitter<number> = new EventEmitter<number>();

  support: MicrocreditSupport;
  campaign: MicrocreditCampaign;
  campaignType: any;
  tempAmount: any;

  submitForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private supportService: SupportService,
    private translateService: TranslateService
  ) {
    this.supportService.microcreditCurrent.subscribe(campaign => this.campaign = campaign)
    this.supportService.microcreditSupport.subscribe(support => this.support = support)
  }

  ngOnInit() {
    this.initForm();
    console.log(this.campaign);
  }

  initForm() {
    //Submit Form
    this.submitForm = this.fb.group({
      amount: [0, Validators.compose([
        Validators.required,
        Validators.min(1),
        (control: AbstractControl) => Validators.min(this.campaign.minAllowed)(control),
        (control: AbstractControl) => Validators.max(this.campaign.maxAllowed)(control)
      ])
      ],
      method: ['', Validators.compose([
        Validators.required,
      ])
      ]
    });
    const controls = this.submitForm.controls;
    controls['amount'].setValue(this.campaign.minAllowed);
  }


  addStep() {
    const controls = this.submitForm.controls;
    this.tempAmount = controls.amount.value + this.campaign.stepAmount;
    if (this.tempAmount <= this.campaign.maxAllowed) {
      controls['amount'].setValue(this.tempAmount);
    }
  }

  removeStep() {
    const controls = this.submitForm.controls;
    this.tempAmount = controls.amount.value - this.campaign.stepAmount;
    if (this.tempAmount >= this.campaign.minAllowed) {
      controls['amount'].setValue(this.tempAmount);
    }
  }

  onNextStep() {
    // if (this.submitted) return;
    // this.submitted = true;

    const controls = this.submitForm.controls;
    if (this.submitForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    };

    this.support.amount = controls.amount.value;
    this.support.method = controls.method.value;
    this.supportService.changeMicrocreditSupport(this.support);
    this.add_amount.emit(this.support.amount);
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.submitForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
}
