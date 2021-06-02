import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize, tap } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

/**
 * Services
 */
import { StaticDataService } from '../../../core/helpers/static-data.service';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit, OnDestroy {
  /**
   * Children Modals
   */
  @ViewChild('deactivate_user') deactivate_user: NgbModalRef;
  @ViewChild('delete_user') delete_user: NgbModalRef;

  /**
   * Content Variables
   */
  public email: string = '';
  public activated: boolean = false;
  /**
   * Forms
   */
  submitForm: FormGroup;
  submitted: boolean = false;

  validator: any;

  loading: boolean = false;
  private unsubscribe: Subject<any>;

  /**
    * @param cdRef: ChangeDetectorRef
    * @param fb: FormBuilder
    * @param modalService: NgbModal
    * @param translate: TranslateService
    * @param staticDataService: StaticDataService
    * @param authenticationService: AuthenticationService
    */
  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private translate: TranslateService,
    private staticDataService: StaticDataService,
    private authenticationService: AuthenticationService
  ) {
    this.validator = this.staticDataService.getValidators.user;
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit() {
    const currentUser = this.authenticationService.currentUserValue;
    this.email = currentUser["user"].email;
    this.activated = currentUser["user"].activated;
    this.initializeForm();
  }

  /**
   * On Destroy
   */
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  /**
   * Initialize Form
   */
  initializeForm() {
    this.submitForm = this.fb.group({
      email: [{ value: this.email, disabled: true }, Validators.compose([])
      ],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(this.validator.password.minLength),
        Validators.maxLength(this.validator.password.maxLength)
      ])
      ],
    });
  }
  deleteUserModal() {
    this.modalService.open(this.delete_user).result.then((result) => {
      console.log('closed');
      this.loading = false;
    }, (reason) => {
      console.log('dismissed');
      this.loading = false;
    });
  }

  deactivateUserModal() {
    this.modalService.open(this.deactivate_user).result.then((result) => {
      console.log('closed');
    }, (reason) => {
      console.log('dismissed');
    });
  }

  deactivateUser() {
    console.log('delete');
    this.authenticationService.deactivate('Other')
      .pipe(
        tap(
          data => {
            Swal.fire({
              title: this.translate.instant('MESSAGE.SUCCESS.TITLE'),
              text: this.translate.instant('MESSAGE.SUCCESS.ACCOUNT_DELETED'),
              icon: 'success',
              timer: 2500
            }).then((result) => {
              this.authenticationService.logout()
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

  deleteUser() {

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

    this.modalService.dismissAll();

    this.authenticationService.delete(controls.password.value)
      .pipe(
        tap(
          data => {
            Swal.fire({
              title: this.translate.instant('MESSAGE.SUCCESS.TITLE'),
              text: this.translate.instant('MESSAGE.SUCCESS.ACCOUNT_DELETED'),
              icon: 'success',
              timer: 2500
            }).then((result) => {
              this.authenticationService.logout();
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
}