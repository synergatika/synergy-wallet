// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
// RxJS
import { Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Services
import { MessageNoticeService } from '../../core/helpers/message-notice/message-notice.service';
import { AuthenticationService } from '../../core/services/authentication.service';
// Others
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { TermsComponent } from '../terms/synergy_terms.component';
import { StaticDataService } from '../../core/services/static-data.service';
import { environment } from '../../../environments/environment';
import { PartnerPayment } from '../../core/models/partner_payment.model';

import { PaymentList } from '../../core/interfaces/payment-list.interface';

@Component({
	selector: 'kt-register-partner',
	templateUrl: './register-partner.component.html',
	styleUrls: ['./register-partner.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class RegisterPartnerComponent implements OnInit, OnDestroy {

	public paymentsList: PaymentList[];

	public subAccessConfig: Boolean[] = environment.subAccess;

	validator: any;
	registerForm: FormGroup;

	fileData: File = null;
	previewUrl: any = null;
	showImageError: boolean = false;
	showPaymentError: boolean = false;

	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
	loading: boolean = false;

	/**
	 * Component constructor
	 *
	 * @param router: Router
	 * @param fb: FormBuilder,
	 * @param cdr: ChangeDetectorRef
	 * @param activatedRoute: ActivatedRoute
	 * @param dialog: MatDialog
	 * @param translate: TranslateService
	 * @param authNoticeService: MessageNoticeService
	 * @param authenticationService: AuthenticationService,
	 * @param staticDataService: StaticDataService
	 */
	constructor(
		private router: Router,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private activatedRoute: ActivatedRoute,
		public dialog: MatDialog,
		private translate: TranslateService,
		private authNoticeService: MessageNoticeService,
		private authenticationService: AuthenticationService,
		private staticDataService: StaticDataService,
	) {
		this.paymentsList = this.staticDataService.getPaymentsList;
		this.validator = this.staticDataService.getUserValidator;
		this.unsubscribe = new Subject();
	}

	/*
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
    */

	/**
	 * On Init
	 */
	ngOnInit() {
		this.initRegisterForm();
	}

	/*
    * On destroy
    */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initRegisterForm() {
		this.registerForm = this.fb.group({
			fullname: ['', Validators.compose([
				Validators.required,
				Validators.minLength(this.validator.name.minLength),
				Validators.maxLength(this.validator.name.maxLength)
			])
			],
			email: ['', Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(this.validator.email.minLength),
				Validators.maxLength(this.validator.email.maxLength)
			]),
			],
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(this.validator.password.minLength),
				Validators.maxLength(this.validator.password.maxLength)
			])
			],
			confirmPassword: ['', Validators.compose([
				Validators.required,
				Validators.minLength(this.validator.password.minLength),
				Validators.maxLength(this.validator.password.maxLength)
			])
			],
			description: ['', Validators.compose([
				Validators.required,
			])
			],
			payments: new FormArray([]),
			agree: [false, Validators.compose([Validators.requiredTrue])]
		}, {
			validator: ConfirmPasswordValidator.MatchPassword
		});

		//	(this.subAccessConfig[0]) ? this.clearPartnerAddressValidators(this.registerForm) : '';
		//	(this.subAccessConfig[1]) ? this.clearPartnerContactValidators(this.registerForm) : '';

		this.paymentsList.forEach(element => {
			const payment = new FormControl('');
			this.payments.push(payment);
		});
	}

	get payments() {
		return this.registerForm.get('payments') as FormArray;
	}

	/**
	 * Set / Clear Validators 
	 */
	clearPartnerAddressValidators(form: FormGroup) {
		form.get('timetable').clearValidators();
		form.get('timetable').updateValueAndValidity();

		form.get('street').clearValidators();
		form.get('street').updateValueAndValidity();
		form.get('postCode').clearValidators();
		form.get('postCode').updateValueAndValidity();
		form.get('city').clearValidators();
		form.get('city').updateValueAndValidity();

		form.get('lat').clearValidators();
		form.get('lat').updateValueAndValidity();
		form.get('long').clearValidators();
		form.get('long').updateValueAndValidity();
	}

	clearPartnerContactValidators(form: FormGroup) {
		form.get('phone').clearValidators();
		form.get('phone').updateValueAndValidity();
		form.get('websiteURL').clearValidators();
		form.get('websiteURL').updateValueAndValidity();
	}

	setPartnerPaymentsValidators() {
		this.paymentsList.forEach((value, i) => {
			this.payments.at(i).setValidators(Validators.required);
			this.payments.at(i).updateValueAndValidity();
		});
	}

	clearPartnerPaymentsValidators() {
		this.paymentsList.forEach((value, i) => {
			this.payments.at(i).clearValidators();
			this.payments.at(i).updateValueAndValidity();
		});
	}

	/**
	 * Terms Aggrement
	 */
	openTermsDialog() {
		const dialogRef = this.dialog.open(TermsComponent, {
			height: '450px'
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});
	}

	/**
	 * Image Upload
	 */
	fileProgress(fileInput: any) {
		this.fileData = <File>fileInput.target.files[0];
		this.preview();
	}

	preview() {
		if (this.fileData == null) {
			this.onImageCancel();
			return;
		}
		this.showImageError = false;

		var mimeType = this.fileData.type;
		if (mimeType.match(/image\/*/) == null) {
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(this.fileData);
		reader.onload = (_event) => {
			if (this.previewUrl !== reader.result) {
				this.cdr.markForCheck();
			}
			this.previewUrl = reader.result;
		}
	}

	onImageCancel() {
		this.previewUrl = null;
		this.fileData = null;
		this.showImageError = true;
		this.cdr.markForCheck();
	}


	/*
	this.registerForm.get('nationalBank').setValidators(Validators.required)
	this.registerForm.get('nationalBank').updateValueAndValidity();
	this.registerForm.get('pireausBank').setValidators(Validators.required)
	this.registerForm.get('pireausBank').updateValueAndValidity();
	this.registerForm.get('eurobank').setValidators(Validators.required)
	this.registerForm.get('eurobank').updateValueAndValidity();
	this.registerForm.get('alphaBank').setValidators(Validators.required)
	this.registerForm.get('alphaBank').updateValueAndValidity();
	this.registerForm.get('paypal').setValidators(Validators.required)
	this.registerForm.get('paypal').updateValueAndValidity();
*/


	setPaymentsValues(controls: { [key: string]: AbstractControl }) {
		var payments: PartnerPayment[] = [];
		this.paymentsList.forEach((value, i) => {
			console.log(controls.payments.value[i])
			if (controls.payments.value[i]) {
				payments.push({
					bic: this.paymentsList[i].bic,
					name: this.paymentsList[i].name,
					value: controls.payments.value[i]
				})
			}
		});

		return payments;
		// if (!controls.nationalBank.value &&
		// 	!controls.pireausBank.value &&
		// 	!controls.eurobank.value &&
		// 	!controls.alphaBank.value &&
		// 	!controls.paypal.value) {

		// 	console.log("Not Have")
		// 	return false;
		// }
		// console.log("Have")
		// return true;
	}

	/**
	 * Form Submit
	 */
	submit() {

		if (this.loading) return;
		this.loading = true;

		const controls = this.registerForm.controls;
		const partner_payments: PartnerPayment[] = this.setPaymentsValues(controls);

		//if (partner_payments.length) this.updatePaymentsValidators(controls);

		/** check form */
		if (this.registerForm.invalid || !this.fileData || !partner_payments.length) {

			(partner_payments.length) ? this.clearPartnerPaymentsValidators() : this.setPartnerPaymentsValidators();
			this.showPaymentError = (partner_payments.length === 0)
			this.showImageError = (!this.fileData);

			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.loading = false;
			return;
		}

		const formData = new FormData();
		formData.append('name', controls.fullname.value);
		formData.append('email', (controls.email.value).toLowerCase());
		formData.append('password', controls.password.value);
		formData.append('imageURL', this.fileData);
		formData.append('description', controls.description.value);
		formData.append('payments', JSON.stringify(partner_payments));

		this.authenticationService.register_as_partner(formData)
			.pipe(
				tap(
					user => {
						this.authNoticeService.setNotice(this.translate.instant('AUTH.REGISTER.SUCCESS'), 'success');
						setTimeout(() => {
							this.router.navigateByUrl('/auth/login');
						}, 2500);
					}, error => {
						this.authNoticeService.setNotice(this.translate.instant('AUTH.REGISTER.ERROR'), 'danger');
					}),
				takeUntil(this.unsubscribe),
				finalize(() => {
					this.loading = false;
					this.cdr.markForCheck();
				})
			).subscribe();
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.registerForm.controls[controlName];

		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	// 	/**
	//  * Checking control validation
	//  *
	//  * @param controlName: string => Equals to formControlName
	//  * @param validationType: string => Equals to valitors name
	//  */
	// 	isControlArrayHasError(controlName: string, index: number, validationType: string): boolean {
	// 		const control = this.payments.at(index);

	// 		if (!control) {
	// 			return false;
	// 		}

	// 		const result = control.hasError(validationType) && (control.dirty || control.touched);
	// 		console.log('name', controlName)
	// 		console.log('e', control.hasError(validationType))
	// 		console.log('d', control.dirty);
	// 		console.log('t', control.touched)
	// 		console.log(result);
	// 		return result;
	// 	}
}
