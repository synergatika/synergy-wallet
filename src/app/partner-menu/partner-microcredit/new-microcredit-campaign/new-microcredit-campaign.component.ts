import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { first, takeUntil, finalize, tap } from 'rxjs/operators';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

/**
 * Services
 */
import { StaticDataService } from 'src/app/core/helpers/static-data.service';
import { ContentService } from '../../../core/services/content.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ItemsService } from '../../../core/services/items.service';

/**
 * Models & Interfaces
 */
import { RichEditorCreateComponent, GeneralList } from 'sng-core';

/**
 * Validators
 */
import { DatesValidator } from '../dates.validator';
import { AmountValidator } from '../amount.validator';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-new-microcredit-campaign',
  templateUrl: './new-microcredit-campaign.component.html',
  styleUrls: ['./new-microcredit-campaign.component.scss']
})

export class NewMicrocreditCampaignComponent implements OnInit, OnDestroy {
  /**
  * Imported Component
  */
  @ViewChild(RichEditorCreateComponent, { static: true })
  public editorTextarea: RichEditorCreateComponent;

  @ViewChild('publish_item') publish_item;

  /**
   * Configuration and Static Data
   */
  public accessList: GeneralList[];
  public microcreditTypeList: GeneralList[];

  /**
   * Content Variables
   */
  public title: string = '';
  private campaignAction: string = '';
  public minDate: Date;
  public microcreditType: string = '';

  // isQuantitative: boolean = true;
  // isRedeemable: boolean = true;

  /**
   * Form
   */
  submitForm: FormGroup;
  submitted: boolean = false;
  validator: any;

  loading: boolean = false;
  private unsubscribe: Subject<any>;

  /**
    * Component Constructor
    *
    * @param cdRef: ChangeDetectorRef
    * @param router: Router
    * @param fb: FormBuilder
    * @param modalService: NgbModal
    * @param translate: TranslateService
    * @param staticDataService: StaticDataService
    * @param contentService: ContentService
    * @param authenticationService: AuthenticationService
    * @param itemsService: ItemsService
    */
  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private translate: TranslateService,
    private staticDataService: StaticDataService,
    private contentService: ContentService,
    private authenticationService: AuthenticationService,
    private itemsService: ItemsService
  ) {
    this.accessList = this.staticDataService.getAccessList;
    this.microcreditTypeList = this.staticDataService.getMicrocreditTypeList;
    this.validator = this.staticDataService.getValidators.microcredit;
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit() {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.microcreditType = this.microcreditTypeList[0].value;

    this.initForm();
  }

  /**
   * On destroy
   */
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  initForm() {
    this.submitForm = this.fb.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(this.validator.title.minLength),
        Validators.maxLength(this.validator.title.maxLength)
      ])
      ],
      subtitle: [''],
      terms: ['', Validators.compose([
        Validators.required,
        Validators.minLength(this.validator.terms.minLength),
        Validators.maxLength(this.validator.terms.maxLength)
      ])
      ],
      description: ['', Validators.compose([
        Validators.required,
      ])
      ],
      category: ['', Validators.compose([
        Validators.required
      ])
      ],
      access: [this.accessList[0].value, Validators.compose([
        Validators.required
      ])
      ],

      type: [this.microcreditTypeList[0].value, Validators.compose([
        Validators.required
      ])
      ],
      // redeemable: [this.isQuantitative, Validators.compose([
      //   Validators.required
      // ])
      // ],
      // quantitative: [this.isRedeemable, Validators.compose([
      //   Validators.required
      // ])
      // ],

      minAllowed: [0, Validators.compose([
        Validators.required,
      ])
      ],
      maxAllowed: [0, Validators.compose([
        Validators.required
      ])
      ],
      stepAmount: [''],
      maxAmount: [0, Validators.compose([
        Validators.required,
      ])
      ],
      supportStarts: ['', Validators.compose([
        Validators.required
      ])
      ],
      supportEnds: ['', Validators.compose([
        Validators.required
      ])
      ],
      redeemStarts: ['', Validators.compose([
        Validators.required
      ])
      ],
      redeemEnds: ['', Validators.compose([
        Validators.required
      ])
      ],
      image_url: ['', Validators.compose([
        Validators.required
      ])
      ],
      contentFiles: [null]
    },
      {
        validator: [DatesValidator.DatesValidator, AmountValidator.AmountValidator]
      });

    this.checkAmountValidators();
  }

  // checkAmountValidators() {
  //   const controls = this.submitForm.controls;

  //   if (!this.isRedeemable) {
  //     this.isQuantitative = false;
  //     controls["minAllowed"].setValidators(null);
  //     controls["maxAllowed"].setValidators(null);
  //     controls["stepAmount"].setValidators(null);
  //     controls["maxAmount"].setValidators(null);
  //     controls["redeemStarts"].setValidators(null);
  //     controls["redeemEnds"].setValidators(null);
  //   } else if (this.isRedeemable && !this.isQuantitative) {
  //     controls["minAllowed"].setValidators([Validators.required,
  //     Validators.min(this.validator.minAllowed.minValue), Validators.max(this.validator.minAllowed.maxValue)]);
  //     controls["maxAllowed"].setValidators(null);
  //     controls["stepAmount"].setValidators(null);
  //     controls["maxAmount"].setValidators([Validators.required,
  //     Validators.min(this.validator.maxAmount.minValue), Validators.max(this.validator.maxAmount.maxValue)]);
  //     controls["redeemStarts"].setValidators([Validators.required]);
  //     controls["redeemEnds"].setValidators([Validators.required]);
  //   } else {
  //     controls["minAllowed"].setValidators([Validators.required,
  //     Validators.min(this.validator.minAllowed.minValue), Validators.max(this.validator.minAllowed.maxValue)]);
  //     controls["maxAllowed"].setValidators([Validators.required,
  //     Validators.min(this.validator.maxAllowed.minValue), Validators.max(this.validator.maxAllowed.maxValue)]);
  //     controls["stepAmount"].setValidators([Validators.required,
  //     Validators.min(this.validator.stepAmount.minValue), Validators.max(this.validator.stepAmount.maxValue)]);
  //     controls["maxAmount"].setValidators([Validators.required,
  //     Validators.min(this.validator.maxAmount.minValue), Validators.max(this.validator.maxAmount.maxValue)]);
  //     controls["redeemStarts"].setValidators([Validators.required]);
  //     controls["redeemEnds"].setValidators([Validators.required]);
  //   }
  //   controls["minAllowed"].updateValueAndValidity();
  //   controls["maxAllowed"].updateValueAndValidity();
  //   controls["stepAmount"].updateValueAndValidity();
  //   controls["maxAmount"].updateValueAndValidity();
  //   controls["redeemStarts"].updateValueAndValidity();
  //   controls["redeemEnds"].updateValueAndValidity();
  // }
  // onIsQuantitativeCheckboxChange() {
  //   this.isQuantitative = !this.isQuantitative;
  //   this.checkAmountValidators();
  // }

  // onIsRedeemableCheckboxChange() {
  //   this.isRedeemable = !this.isRedeemable;
  //   this.checkAmountValidators();
  // }
  checkAmountValidators() {
    const controls = this.submitForm.controls;

    switch (controls.type.value) {
      case "00":
        console.log("I am in 00");
        controls["minAllowed"].setValidators(null);
        controls["maxAllowed"].setValidators(null);
        controls["stepAmount"].setValidators(null);
        controls["redeemStarts"].setValidators(null);
        controls["redeemEnds"].setValidators(null);
        break;
      case "10":
        console.log("I am in 10");
        controls["minAllowed"].setValidators([Validators.required,
        Validators.min(this.validator.minAllowed.minValue), Validators.max(this.validator.minAllowed.maxValue)]);
        controls["maxAllowed"].setValidators(null);
        controls["stepAmount"].setValidators(null);
        controls["maxAmount"].setValidators([Validators.required,
        Validators.min(this.validator.maxAmount.minValue), Validators.max(this.validator.maxAmount.maxValue)]);
        controls["redeemStarts"].setValidators([Validators.required]);
        controls["redeemEnds"].setValidators([Validators.required]);
        break;
      case "11":
        console.log("I am in 11");
        controls["minAllowed"].setValidators([Validators.required,
        Validators.min(this.validator.minAllowed.minValue), Validators.max(this.validator.minAllowed.maxValue)]);
        controls["maxAllowed"].setValidators([Validators.required,
          //  Validators.min(this.validator.maxAllowed.minValue), Validators.max(this.validator.maxAllowed.maxValue)
        ]);
        // controls["stepAmount"].setValidators(
        //   [Validators.required, Validators.min(this.validator.stepAmount.minValue), Validators.max(this.validator.stepAmount.maxValue)]);
        controls["maxAmount"].setValidators([Validators.required,
        Validators.min(this.validator.maxAmount.minValue), Validators.max(this.validator.maxAmount.maxValue)]);
        controls["redeemStarts"].setValidators([Validators.required]);
        controls["redeemEnds"].setValidators([Validators.required]);
        break;
    }

    controls["minAllowed"].updateValueAndValidity();
    controls["maxAllowed"].updateValueAndValidity();
    controls["stepAmount"].updateValueAndValidity();
    controls["maxAmount"].updateValueAndValidity();
    controls["redeemStarts"].updateValueAndValidity();
    controls["redeemEnds"].updateValueAndValidity();
  }

  onTypeRadioButtonChange(event) {
    this.microcreditType = event.value;
    this.checkAmountValidators();
  }

  formatDate(date: any, days: number, hours: number) {
    let _date = new Date(date);
    _date.setDate(_date.getDate() + days);
    _date.setHours(hours, 0, 0, 0);

    return _date.getTime().toString();
  }

  isMicrocreditRedeemable(type: string) {
    return type.charAt(0) == '1';
  }

  isMicrocreditQuantitative(type: string) {
    return type.charAt(1) == '1';
  }

  formatCampaignData(): FormData {
    const controls = this.submitForm.controls;

    const formData = new FormData();
    formData.append('imageURL', controls.image_url.value);

    formData.append('title', controls.title.value);
    formData.append('subtitle', controls.subtitle.value);
    formData.append('terms', controls.terms.value);
    formData.append('description', controls.description.value);
    formData.append('category', controls.category.value);
    formData.append('access', controls.access.value);

    formData.append('redeemable', (this.isMicrocreditRedeemable(controls.type.value)) ? "true" : "false");
    formData.append('quantitative', (this.isMicrocreditQuantitative(controls.type.value)) ? "true" : "false");

    formData.append('minAllowed', (this.isMicrocreditRedeemable(controls.type.value)) ? controls.minAllowed.value : '0');
    formData.append('maxAllowed', (this.isMicrocreditQuantitative(controls.type.value)) ? controls.maxAllowed.value : controls.minAllowed.value);
    formData.append('stepAmount', (this.isMicrocreditQuantitative(controls.type.value) && controls.stepAmount.value) ? controls.stepAmount.value : '0');
    formData.append('maxAmount', controls.maxAmount.value);

    formData.append('startsAt', this.formatDate(controls.supportStarts.value, 0, 12));
    formData.append('expiresAt', this.formatDate(controls.supportEnds.value, 0, 12));
    formData.append('redeemStarts', (this.isMicrocreditRedeemable(controls.type.value)) ? this.formatDate(controls.redeemStarts.value, 0, 12) : this.formatDate(new Date(), 730, 12));
    formData.append('redeemEnds', (this.isMicrocreditRedeemable(controls.type.value)) ? this.formatDate(controls.redeemEnds.value, 0, 12) : this.formatDate(new Date(), 730, 12));

    return formData;
  }

  createCampaign(campaignStatus: string) {

    const formData = this.formatCampaignData();

    this.itemsService.createMicrocreditCampaign(formData)
      .pipe(
        tap(
          data => {
            if (campaignStatus == 'publish') {
              this.publishCampaign(formData, data._id);
            } else {
              Swal.fire({
                title: this.translate.instant('MESSAGE.SUCCESS.TITLE'),
                text: this.translate.instant('MESSAGE.SUCCESS.CAMPAIGN_CREATED'),
                icon: 'success',
                timer: 2500
              }).then((result) => {
                this.router.navigate(['/m-campaigns']);
              });
            }
          },
          error => {
            console.log(error);
            Swal.fire(
              this.translate.instant('MESSAGE.ERROR.TITLE'),
              this.translate.instant(error),
              'error'
            );
          }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe();
  }

  publishCampaign(formData: FormData, campaign_id: string) {
    this.itemsService.publishCampaign(this.authenticationService.currentUserValue.user["_id"], campaign_id, formData)
      .pipe(
        tap(
          data => {
            Swal.fire({
              title: this.translate.instant('MESSAGE.SUCCESS.TITLE'),
              text: this.translate.instant('MESSAGE.SUCCESS.CAMPAIGN_PUBLISHED'),
              icon: 'success',
              timer: 2500
            }).then((result) => {
              this.router.navigate(['/m-campaigns']);
            });
          },
          error => {
            console.log(error);
            Swal.fire(
              this.translate.instant('MESSAGE.ERROR.TITLE'),
              this.translate.instant(error),
              'error'
            );
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
   * On Submit Form
   */
  async onSubmit(campaignStatus: string) {
    if (this.loading) return;

    const controls = this.submitForm.controls;
    console.log(controls);
    /** check form */
    if (this.submitForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.loading = true;

    this.title = controls.title.value;
    this.campaignAction = campaignStatus;
    await this.editorTextarea.uploadContentFiles();

    // if (campaignStatus === 'draft') this.createCampaign('draft');
    // else if (campaignStatus === 'publish') this.publishItemModal();
  }

  onFinalStep(editorFiles: string[]) {
    if (this.campaignAction === 'draft') this.createCampaign('draft');
    else if (this.campaignAction === 'publish') this.publishItemModal();
  }

  publishItemModal() {
    this.modalService.open(this.publish_item).result.then((result) => {
      console.log('closed');
      this.loading = false;
    }, (reason) => {
      console.log('dismissed');
      this.loading = false;
    });
  }

  publishItem() {
    this.createCampaign('publish')
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
