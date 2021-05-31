import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { first, takeUntil, finalize, tap } from 'rxjs/operators';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

/**
 * Services
 */
import { StaticDataService } from '../../../core/helpers/static-data.service';
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

@Component({
  selector: 'app-edit-microcredit-campaign',
  templateUrl: './edit-microcredit-campaign.component.html',
  styleUrls: ['./edit-microcredit-campaign.component.scss']
})

export class EditMicrocreditCampaignComponent implements OnInit, OnDestroy {
  /**
 * Imported Component
 */
  @ViewChild(RichEditorCreateComponent, { static: true })
  public editorTextarea: RichEditorCreateComponent;

  @ViewChild('fileInput') imageInput: ElementRef;
  @ViewChild('publish_item') publish_item: any;
  @ViewChild('remove_item') remove_item: any;

  /**
   * Configuration and Static Data
   */
  public accessList: GeneralList[];

  /**
   * Parameters
   */
  private campaign_id: string;

  /**
   * Content Variables
   */
  public title: string = '';
  private campaignAction: string = '';
  public minDate: Date;
  isQuantitative: boolean = false;
  isRedeemable: boolean = true;
  public intro: any;

  /**
   * File Variables
   */
  public initialImage: string = '';

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
    * @param activatedRoute: ActivatedRoute
    * @param fb: FormBuilder
    * @param modalService: NgbModal
    * @param translate: TranslateService
    * @param staticDataService: StaticDataServic
    * @param contentService: ContentService
    * @param authenticationService: AuthenticationService
    * @param itemsService: ItemsService
    */
  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private translate: TranslateService,
    private staticDataService: StaticDataService,
    private contentService: ContentService,
    private authenticationService: AuthenticationService,
    private itemsService: ItemsService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.campaign_id = params['_id'];
    });
    this.accessList = this.staticDataService.getAccessList;
    this.validator = this.staticDataService.getValidators.microcredit;
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit() {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    //Get Campaign
    this.fetchCampaignData();
    //Initiate Form
    this.initForm();
    //Get Intro
    this.fetchCampaignIntro();
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
        //  Validators.minLength(this.validator.description.minLength),
        //  Validators.maxLength(this.validator.description.maxLength)
      ])
      ],
      category: ['', Validators.compose([
        Validators.required
      ])
      ],
      access: ['', Validators.compose([
        Validators.required
      ])
      ],

      quantitative: ['', Validators.compose([
        Validators.required
      ])
      ],


      redeemable: [true, Validators.compose([
        Validators.required
      ])
      ],

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

      supportStarts: [new Date(), Validators.compose([
        Validators.required
      ])
      ],
      supportEnds: [new Date(), Validators.compose([
        Validators.required
      ])
      ],
      redeemStarts: [new Date(), Validators.compose([
        Validators.required
      ])
      ],
      redeemEnds: [new Date(), Validators.compose([
        Validators.required
      ])
      ],
      image_url: [new Date(), Validators.compose([
        Validators.required
      ])
      ],
      contentFiles: [null]
    },
      {
        validator: [DatesValidator.DatesValidator, AmountValidator.AmountValidator]
      }
    );

  }

  checkAmountValidators() {
    const controls = this.submitForm.controls;

    if (!this.isRedeemable) {
      this.isQuantitative = false;
      controls["minAllowed"].setValidators(null);
      controls["maxAllowed"].setValidators(null);
      controls["stepAmount"].setValidators(null);
      controls["maxAmount"].setValidators(null);
      controls["redeemStarts"].setValidators(null);
      controls["redeemEnds"].setValidators(null);
    } else if (this.isRedeemable && !this.isQuantitative) {
      controls["minAllowed"].setValidators([Validators.required,
      Validators.min(this.validator.minAllowed.minValue), Validators.max(this.validator.minAllowed.maxValue)]);
      controls["maxAllowed"].setValidators(null);
      controls["stepAmount"].setValidators(null);
      controls["maxAmount"].setValidators([Validators.required,
      Validators.min(this.validator.maxAmount.minValue), Validators.max(this.validator.maxAmount.maxValue)]);
      controls["redeemStarts"].setValidators([Validators.required]);
      controls["redeemEnds"].setValidators([Validators.required]);
    } else {
      controls["minAllowed"].setValidators([Validators.required,
      Validators.min(this.validator.minAllowed.minValue), Validators.max(this.validator.minAllowed.maxValue)]);
      controls["maxAllowed"].setValidators([Validators.required,
      Validators.min(this.validator.maxAllowed.minValue), Validators.max(this.validator.maxAllowed.maxValue)]);
      controls["stepAmount"].setValidators([Validators.required,
      Validators.min(this.validator.stepAmount.minValue), Validators.max(this.validator.stepAmount.maxValue)]);
      controls["maxAmount"].setValidators([Validators.required,
      Validators.min(this.validator.maxAmount.minValue), Validators.max(this.validator.maxAmount.maxValue)]);
      controls["redeemStarts"].setValidators([Validators.required]);
      controls["redeemEnds"].setValidators([Validators.required]);
    }
    controls["minAllowed"].updateValueAndValidity();
    controls["maxAllowed"].updateValueAndValidity();
    controls["stepAmount"].updateValueAndValidity();
    controls["maxAmount"].updateValueAndValidity();
    controls["redeemStarts"].updateValueAndValidity();
    controls["redeemEnds"].updateValueAndValidity();
  }

  fetchCampaignData() {
    this.itemsService.readCampaign(this.authenticationService.currentUserValue.user["_id"], this.campaign_id)
      .pipe(
        tap(
          data => {
            this.title = data.title;
            this.initialImage = data.imageURL;
            // this.previewUrl = this.initialImage;

            this.isQuantitative = data.quantitative;
            this.isRedeemable = data.redeemable;
            this.checkAmountValidators();
            this.submitForm.patchValue({
              ...data,
              supportStarts: ((this.minDate).getDate() > data.startsAt) ? this.minDate : (new Date(data.startsAt)),
              supportEnds: ((this.minDate).getDate() > data.expiresAt) ? this.minDate : (new Date(data.expiresAt)),
              redeemStarts: ((this.minDate).getDate() > data.redeemStarts) ? this.minDate : (new Date(data.redeemStarts)),
              redeemEnds: ((this.minDate).getDate() > data.redeemEnds) ? this.minDate : (new Date(data.redeemEnds)),
            });
          },
          error => {
          }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe();
  }

  onIsQuantitativeCheckboxChange() {
    this.isQuantitative = !this.isQuantitative;
    this.checkAmountValidators();
  }

  onIsRedeemableCheckboxChange() {
    this.isRedeemable = !this.isRedeemable;
    this.checkAmountValidators();
  }

  formatDate(date: any, days: number, hours: number) {
    let _date = new Date(date);
    _date.setDate(_date.getDate() + days);
    _date.setHours(hours, 0, 0, 0);

    return _date.getTime().toString();
  }

  editCampaign(campaignStatus: string) {
    const controls = this.submitForm.controls;

    const formData = new FormData();
    formData.append('imageURL', controls.image_url.value);
    // formData.append('imageURL', this.fileData);
    formData.append('title', controls.title.value);
    formData.append('subtitle', controls.subtitle.value);
    formData.append('terms', controls.terms.value);
    formData.append('description', controls.description.value);
    formData.append('category', controls.category.value);
    formData.append('access', controls.access.value);

    formData.append('quantitative', controls.quantitative.value);
    formData.append('redeemable', controls.redeemable.value);

    formData.append('stepAmount', (controls.quantitative.value) ? controls.stepAmount.value : '0');
    formData.append('minAllowed', (controls.redeemable.value) ? controls.minAllowed.value : '0');
    formData.append('maxAllowed', (controls.quantitative.value) ? controls.maxAllowed.value : controls.minAllowed.value);
    formData.append('maxAmount', (controls.redeemable.value) ? controls.maxAmount.value : '100000');

    formData.append('startsAt', this.formatDate(controls.supportStarts.value, 0, 12));
    formData.append('expiresAt', this.formatDate(controls.supportEnds.value, 0, 12));
    formData.append('redeemStarts', (controls.redeemable.value) ? this.formatDate(controls.redeemStarts.value, 0, 12) : this.formatDate(new Date(), 730, 12));
    formData.append('redeemEnds', (controls.redeemable.value) ? this.formatDate(controls.redeemEnds.value, 0, 12) : this.formatDate(new Date(), 730, 12));

    this.itemsService.editCampaign(this.authenticationService.currentUserValue.user["_id"], this.campaign_id, formData)
      .pipe(
        tap(
          data => {
            if (campaignStatus == 'publish') {
              this.publishCampaign(formData)
            } else {
              Swal.fire({
                title: this.translate.instant('MESSAGE.SUCCESS.TITLE'),
                text: this.translate.instant('MESSAGE.SUCCESS.CAMPAIGN_UPDATED'),
                icon: 'success',
                timer: 2500
              }).then((result) => {
                this.router.navigate(['/m-campaigns']);
              });
            }
          },
          error => {
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

  publishCampaign(formData: FormData) {
    console.log(formData)
    this.itemsService.publishCampaign(this.authenticationService.currentUserValue.user["_id"], this.campaign_id, formData)
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
    console.log("On Submit", campaignStatus)
    if (this.loading) return;

    const controls = this.submitForm.controls;
    console.log(controls)
    /** check form */
    if (this.submitForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.loading = true;
    console.log("Campaign Status", campaignStatus)
    this.title = controls.title.value;
    this.campaignAction = campaignStatus;

    await this.editorTextarea.uploadContentFiles();

    // if (campaignStatus === 'draft') this.createCampaign('draft');
    // else if (campaignStatus === 'publish') this.publishItemModal();
  }

  onFinalStep(editorFiles: string[]) {
    if (this.campaignAction === 'draft') this.editCampaign('draft');
    else if (this.campaignAction === 'publish') this.publishItemModal();
  }

  publishItemModal() {
    this.modalService.open(this.publish_item).result.then((result) => {
      console.log('closed');
    }, (reason) => {
      this.loading = false;
      console.log('dismissed');
    });
  }

  publishItem() {
    this.editCampaign('publish')
  }

  deleteItemModal() {
    this.modalService.open(this.remove_item).result.then((result) => {
      console.log('closed');
    }, (reason) => {
      this.loading = false;
      console.log('dismissed');
    });
  }

  deleteItem() {
    this.itemsService.deleteCampaign(this.authenticationService.currentUserValue.user["_id"], this.campaign_id)
      .pipe(
        tap(
          data => {
            Swal.fire({
              title: this.translate.instant('MESSAGE.SUCCESS.TITLE'),
              text: this.translate.instant('MESSAGE.SUCCESS.CAMPAIGN_DELETED'),
              icon: 'success',
              timer: 2500
            }).then((result) => {
              this.router.navigate(['/m-campaigns']);
            });
          },
          error => {
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

  fetchCampaignIntro() {
    this.contentService.readContentById('newcampaign')
      .pipe(
        tap(
          data => {
            this.intro = data;
          },
          error => {
            console.log(error);
          }
        ),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      ).subscribe();
  }

}
