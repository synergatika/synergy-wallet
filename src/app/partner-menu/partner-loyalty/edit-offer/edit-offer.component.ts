import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize, tap } from 'rxjs/operators';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

/**
 * Services
 */
import { StaticDataService } from '../../../core/helpers/static-data.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ItemsService } from '../../../core/services/items.service';

import { LoyaltyOffer } from 'sng-core';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss']
})
export class EditOfferComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') imageInput: ElementRef;
  @ViewChild('remove_item') remove_item: NgbModalRef;

  /**
   * Parameters
   */
  private offer_id: string;

  /**
   * Content Variables
   */
  public offer: LoyaltyOffer;
  public hasExpired: boolean = false;
  public title: string = '';
  public minDate: Date;
  public seconds: number;

  /**
   * File Variables
   */
  public initialImage: string = '';

  /**
   * Forms
   */
  submitForm: FormGroup;
  submitted: boolean = false;
  validator: any;
  isQuantitative: boolean = false;

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
    * @param staticDataService: StaticDataService
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
    private authenticationService: AuthenticationService,
    private itemsService: ItemsService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.offer_id = params['_id'];
    });
    this.validator = this.staticDataService.getValidators.offer;
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit() {
    //Init Time
    this.minDate = new Date();
    const now = new Date();
    this.seconds = parseInt(now.getTime().toString());
    //Get Offer
    this.fetchOfferData();
    //Create edit form
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

  /**
   * Initialize
   */
  initForm() {
    this.submitForm = this.fb.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(this.validator.title.minLength),
        Validators.maxLength(this.validator.title.maxLength)
      ])
      ],
      subtitle: [''],
      description: ['', Validators.compose([
        Validators.required,
        Validators.minLength(this.validator.description.minLength),
        Validators.maxLength(this.validator.description.maxLength)
      ])
      ],
      instructions: ['', Validators.compose([
        Validators.minLength(this.validator.description.minLength),
        Validators.maxLength(this.validator.description.maxLength)
      ])
      ],
      quantitative: [false, Validators.compose([
        Validators.required
      ])
      ],
      cost: ['', Validators.compose([
        Validators.required,
        Validators.min(this.validator.cost.minValue),
        Validators.max(this.validator.cost.maxValue)
      ])
      ],
      expiration: ['', Validators.compose([
        Validators.required
      ])
      ],
      image_url: ['', Validators.compose([
        Validators.required
      ])
      ],
    });
  }

  /**
   * Fetch Offer Data
   */
  fetchOfferData() {
    this.itemsService.readOffer(this.authenticationService.currentUserValue.user["_id"], this.offer_id)
      .pipe(
        tap(
          data => {
            this.offer = { ...data };
            console.log(this.offer);

            this.hasExpired = this.offer.expiresAt < this.seconds;
            this.title = data.title;
            this.initialImage = data.imageURL;
            this.isQuantitative = (this.offer.cost == 0) ? false : true;
            this.submitForm.patchValue(
              {
                ...data, quantitative: (this.offer.cost == 0) ? false : true,
                expiration: ((this.minDate).getDate() > data.expiresAt) ? this.minDate : (new Date(data.expiresAt))
              });
          },
          error => {
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
   * On Submit Form
   */
  onSubmit() {
    if (this.loading) return;

    const controls = this.submitForm.controls;
    /** check form */
    if (this.submitForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.loading = true;

    const formData = new FormData();
    formData.append('imageURL', controls.image_url.value);
    formData.append('title', controls.title.value);
    formData.append('subtitle', controls.subtitle.value);
    formData.append('cost', (controls.quantitative.value) ? controls.cost.value : '0');
    formData.append('description', controls.description.value);
    formData.append('instructions', controls.instructions.value);
    formData.append('expiresAt', controls.expiration.value.getTime().toString());

    this.itemsService.editOffer(this.authenticationService.currentUserValue.user["_id"], this.offer_id, formData)
      .pipe(
        tap(
          data => {
            Swal.fire({
              title: this.translate.instant('MESSAGE.SUCCESS.TITLE'),
              text: this.translate.instant('MESSAGE.SUCCESS.OFFER_UPDATED'),
              icon: 'success',
              timer: 2500
            }).then((result) => {
              this.router.navigate(['/m-offers']);
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
   * On Delete
   */

  //Confirm Deletion
  deleteItemModal() {
    this.modalService.open(this.remove_item).result.then((result) => {
    }, (reason) => {
    });
  }

  //Execute Deletion
  deleteItem() {
    this.itemsService.deleteOffer(this.authenticationService.currentUserValue.user["_id"], this.offer_id)
      .pipe(
        tap(
          data => {
            Swal.fire({
              title: this.translate.instant('MESSAGE.SUCCESS.TITLE'),
              text: this.translate.instant('MESSAGE.SUCCESS.OFFER_DELETED'),
              icon: 'success',
              timer: 2500
            }).then((result) => {
              this.router.navigate(['/m-offers']);
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

  /* Check Quantitative */
  onIsQuantitativeCheckboxChange() {
    this.isQuantitative = !this.isQuantitative;
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
