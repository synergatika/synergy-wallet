import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ScannerService } from "../_scanner.service";
import { ScannerInterface } from "../_scanner.interface";

@Component({
  selector: 'app-sub-email-form',
  templateUrl: './sub-email-form.component.html',
  styleUrls: ['./sub-email-form.component.sass']
})
export class SubEmailFormComponent implements OnInit {

  @Output()
  add_email: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  previous_step: EventEmitter<boolean> = new EventEmitter<boolean>();

  submitForm: FormGroup;
  submitted: boolean = false;

  public user: ScannerInterface["User"];

  constructor(
    private fb: FormBuilder,
    private scannerService: ScannerService
  ) {
    this.scannerService.user.subscribe(user => this.user = user);
  }

	/**
	 * On Init
	 */
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.submitForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.email,
      ])
      ]
    });
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

    this.user.email = controls.email.value;
    this.scannerService.changeUser(this.user);
    this.add_email.emit(this.user.email);
  }

  onPreviousStep() {
    this.previous_step.emit(true);
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
