import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

/**
 * Services
 */
import { ContentService } from 'src/app/core/services/content.service';

import { Sector } from 'sng-core';

@Component({
  selector: 'app-edit-sectors',
  templateUrl: './edit-sectors.component.html',
  styleUrls: ['./edit-sectors.component.scss']
})
export class EditSectorsComponent implements OnInit {

  /**
   * Form
   */
  sectorsForm: FormGroup;
  submitted: boolean = false;

  loading: boolean = false;
  private unsubscribe: Subject<any>;

  /**
   * Component Constructor
   *
   * @param cdRef: ChangeDetectorRef
   * @param fb: FormBuilder
   * @param router: Router
   * @param activatedRoute: ActivatedRoute
   * @param translate: TranslateService
   * @param contentService: ContentService
   */
  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private contentService: ContentService,
  ) {
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit() {
    this.initForm();
    this.fetchSectorsData();
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
    this.sectorsForm = this.fb.group({
      categories: this.fb.array(
        [],
        Validators.compose([
          this.atLeastOneInputValidator(),
          this.uniqueValuesValidator(),
        ])
      ),
    });
  }

  get categories() {
    return this.sectorsForm.get('categories') as FormArray;
  }

  createCategoryItem(cat: Sector): FormGroup {
    return this.fb.group({
      _id: [cat._id],
      slug: [cat.slug],
      el_title: [cat.el_title],
      en_title: [cat.en_title],
    });
  }

  insertItem() {
    this.categories.push(this.createCategoryItem({ _id: '0', slug: '', el_title: '', en_title: '' }));
  }

  removeItem(item: number) {
    this.categories.removeAt(item);
  }

  /**
   * Fetch Content Datas
   */
  fetchSectorsData() {
    this.contentService.readSectors()
      .pipe(
        tap(
          data => {
            data.forEach((el) => {
              this.categories.push(this.createCategoryItem(el));
            });
            this.cdRef.detectChanges();
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

  private formatDataOnPost(controls: { [key: string]: AbstractControl }) {
    const categories = this.sectorsForm.get('categories').value.map((o) => { return { ...o, slug: o.en_title } })


    return {
      categories: categories,
    };
  }

  /**
   * On Submit Form
   */
  onSubmit() {
    if (this.loading) return;

    const controls = this.sectorsForm.controls;
    /** check form */
    if (this.sectorsForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.loading = true;
    console.log(controls)
    this.contentService.updateSectors(this.sectorsForm.get('categories').value)
      .pipe(
        tap(
          data => {
            Swal.fire({
              title: this.translate.instant('MESSAGE.SUCCESS.TITLE'),
              text: this.translate.instant('MESSAGE.SUCCESS.CONTENT_UPDATED'),
              icon: 'success',
              timer: 2500,
            }).then((result) => {
              this.router.navigate(['/a-sectors']);
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
    const control = this.sectorsForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  atLeastOneInputValidator(): ValidatorFn {
    return function validate(formGroup: FormGroup) {
      let filled = 0;

      Object.keys(formGroup.controls).forEach((key) => {
        const control = formGroup.controls[key];

        if (control.value) {
          filled++;
        }
      });

      if (filled < 1) {
        return {
          requireInputToBeFilled: true,
        };
      }
      return null;
    };
  }

  uniqueValuesValidator(): ValidatorFn {
    return function validate(formGroup: FormGroup) {
      let uniqueValues = [];
      let hasDuplicate: boolean = false;

      Object.keys(formGroup.controls).forEach((key) => {
        const control = formGroup.controls[key];

        if (uniqueValues.indexOf(control.value.el_title) != -1) {
          hasDuplicate = true;
        } else {
          uniqueValues.push(control.value.el_title);
        }
      });

      if (hasDuplicate) {
        return {
          requireValuesToBeUnique: true,
        };
      }
      return null;
    };
  }
}
