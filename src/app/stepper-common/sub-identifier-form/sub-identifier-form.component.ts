import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sub-identifier-form',
  templateUrl: './sub-identifier-form.component.html',
  styleUrls: ['./sub-identifier-form.component.scss']
})
export class SubIdentifierFormComponent implements OnInit {

  /**
   * Event Emitter
   */
  @Output()
  add_identifier: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Form
   */
  stepperForm: FormGroup;
  submitted: boolean = false;

  /**
   * Flag Variables
   */
  scanned: boolean = false;

  constructor(
    private fb: FormBuilder
  ) { }

  /**
   * On Init
   */
  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.stepperForm = this.fb.group({
      identifier: ['', Validators.compose([
        Validators.required,
      ])
      ]
    });
  }

  scanSuccessHandler(result: string): void {
    //  if (this.scanned) return;
    this.scanned = true;
  }

  scanErrorHandler(error: any): void {
    console.log("Error");
  }

  onNextStep() {
    const controls = this.stepperForm.controls;
    if (this.stepperForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    };

    let identifier = controls.identifier.value;
    const emailPatern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(identifier);

    if (!emailPatern) { identifier = identifier.padStart(16, "0000000000000000"); }

    this.add_identifier.emit(identifier);
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
