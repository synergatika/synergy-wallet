import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { first, takeUntil, finalize, tap } from 'rxjs/operators';

//Modal
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// Swal Alert
import Swal from 'sweetalert2';

// Translate
import { TranslateService } from '@ngx-translate/core';

// Services
import { ItemsService } from '../../core/services/items.service';
import { AuthenticationService } from '../../core/services/authentication.service';

import { Post } from '../../core/models/post.model';
import { StaticDataService } from '../../core/services/static-data.service';
import { GeneralList } from 'src/app/core/interfaces/general-list.interface';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.sass']
})

export class EditPostComponent implements OnInit, OnDestroy {
  @ViewChild('remove_item') remove_item;
  @ViewChild('fileInput') imageInput: ElementRef;

  private post_id: string;
  public initialImage: string = '';
  public title: string = '';

  accessList: GeneralList[];
  validator: any;

  fileData: File = null;
  previewUrl: any = null;
  originalImage: boolean = true;

  submitForm: FormGroup;
  submitted: boolean = false;

  loading: boolean = false;
  private unsubscribe: Subject<any>;

  /**
    * Component Constructor
    *
    * @param router: Router
    * @param fb: FormBuilder
    * @param cdRef: ChangeDetectorRef
    * @param modalService: NgbModal
    * @param activatedRoute: ActivatedRoute
    * @param translate: TranslateService
    * @param authenticationService: AuthenticationService
    * @param itemsService: ItemsService
    * @param staticDataService: StaticDataService
    */
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private authenticationService: AuthenticationService,
    private itemsService: ItemsService,
    private staticDataService: StaticDataService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.post_id = params['_id'];
    });
    this.accessList = this.staticDataService.getAccessList;
    this.validator = this.staticDataService.getPostValidator;
    this.unsubscribe = new Subject();
  }

	/**
	 * On Init
	 */
  ngOnInit() {
    this.initForm();
    this.fetchPostData();
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
      content: ['', Validators.compose([
        Validators.required,
        Validators.minLength(this.validator.content.minLength),
        Validators.maxLength(this.validator.content.maxLength)
      ])
      ],
      access: ['public', Validators.compose([
        Validators.required
      ])
      ],
    });
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    if (fileInput) {
      this.fileData = <File>fileInput.target.files[0];
      this.originalImage = false;
      this.preview();
    }
  }

  preview() {
    if (this.fileData == null) {
      this.onImageCancel();
      return;
    }
    this.originalImage = false;

    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      if (this.previewUrl !== reader.result) {
        this.cdRef.markForCheck();
      }
      this.previewUrl = reader.result;
    }
  }

  onImageCancel() {
    this.previewUrl = this.initialImage;
    this.fileData = null;
    this.originalImage = true;
    this.imageInput.nativeElement.value = null;
  }

  fetchPostData() {
    this.itemsService.readPost(this.authenticationService.currentUserValue.user["_id"], this.post_id)
      .pipe(
        tap(
          data => {
            this.title = data.title;
            this.initialImage = data.post_imageURL;
            this.previewUrl = this.initialImage;
            this.submitForm.patchValue({ ...data });
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

	/**
	 * On Form Submit
	 */
  onSubmit() {
    if (this.submitted || this.loading) return;

    const controls = this.submitForm.controls;
    /** check form */
    if (this.submitForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.submitted = true;
    this.loading = true;

    const formData = new FormData();
    formData.append('imageURL', this.fileData);
    formData.append('title', controls.title.value);
    formData.append('subtitle', controls.subtitle.value);
    formData.append('content', controls.content.value);
    formData.append('access', controls.access.value);

    this.itemsService.editPost(this.authenticationService.currentUserValue.user["_id"], this.post_id, formData)
      .pipe(
        tap(
          data => {
            Swal.fire({
              title: this.translate.instant('MESSAGE.SUCCESS.TITLE'),
              text: this.translate.instant('MESSAGE.SUCCESS.POST_UPDATED'),
              icon: 'success',
              timer: 2500
            }).then((result) => {
              this.router.navigate(['/m-posts']);
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
          this.submitted = false;
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe();
  }

  deleteItemModal() {
    this.modalService.open(this.remove_item).result.then((result) => {
      console.log('closed');
    }, (reason) => {
      console.log('dismissed');
    });
  }

  deleteItem() {
    console.log('delete');
    this.itemsService.deletePost(this.authenticationService.currentUserValue.user["_id"], this.post_id)
      .pipe(
        tap(
          data => {
            Swal.fire({
              title: this.translate.instant('MESSAGE.SUCCESS.TITLE'),
              text: this.translate.instant('MESSAGE.SUCCESS.POST_DELETED'),
              icon: 'success',
              timer: 2500
            }).then((result) => {
              this.router.navigate(['/m-posts']);
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
          this.submitted = false;
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
