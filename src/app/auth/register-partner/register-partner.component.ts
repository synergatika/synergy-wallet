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
import { ItemsService } from '../../core/services/items.service';
// Others
import { ConfirmPasswordValidator } from '../confirm-password.validator';
import { TermsComponent } from '../terms/synergy_terms.component';
import { StaticDataService } from '../../core/helpers/static-data.service';
import { environment } from '../../../environments/environment';
import { PartnerPayment } from '../../core/models/partner_payment.model';

import { PaymentList } from '../../core/interfaces/payment-list.interface';
import { GeneralList } from 'src/app/core/interfaces/general-list.interface';

@Component({
	selector: 'app-register-partner',
	templateUrl: './register-partner.component.html',
	styleUrls: ['./register-partner.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class RegisterPartnerComponent implements OnInit, OnDestroy {

	/**
	 * Configuration and Static Data
	 */
	public paymentsList: PaymentList[];
	public sectorList: GeneralList[];

	public subAccessConfig: Boolean[] = environment.subAccess;

	step = false;
	/**
	 * Form
	 */
	authForm: FormGroup;
	validator: any;

	fileData: File = null;
	previewUrl: any = null;
	showImageError: boolean = false;
	showPaymentError: boolean = false;

	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
	loading: boolean = false;

	/**
	 * Component Constructor
	 *
	 * @param cdr: ChangeDetectorRef
	 * @param router: Router
	 * @param fb: FormBuilder,
	 * @param dialog: MatDialog
	 * @param translate: TranslateService
	 * @param staticDataService: StaticDataService
	 * @param authNoticeService: MessageNoticeService
	 * @param authenticationService: AuthenticationService,
	 * @param itemsService: ItemsService,
	 */
	constructor(
		private cdr: ChangeDetectorRef,
		private router: Router,
		private fb: FormBuilder,
		public dialog: MatDialog,
		private translate: TranslateService,
		private staticDataService: StaticDataService,
		private authNoticeService: MessageNoticeService,
		private authenticationService: AuthenticationService,
		private itemsService: ItemsService
	) {
		this.paymentsList = this.staticDataService.getPaymentsList;
		this.sectorList = this.staticDataService.getSectorList;
		this.validator = this.staticDataService.getValidators.user;
		this.unsubscribe = new Subject();
	}

	/*
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
    */

	/**
	 * On Init
	 */
	ngOnInit() {
		this.initializeForm();
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
	 * Form Initialization
	 */
	initializeForm() {
		this.authForm = this.fb.group({
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
				// Validators.required,
				// Validators.minLength(this.validator.description.minLength),
				// Validators.maxLength(this.validator.description.maxLength)
			])
			],
			sector: ['', Validators.compose([
				// Validators.required,
			])
			],
			payments: new FormArray([]),
			agree: [false, Validators.compose([
				//	Validators.requiredTrue
			]
			)]
		}, {
			validator: ConfirmPasswordValidator.MatchPassword
		});

		//	(this.subAccessConfig[0]) ? this.clearPartnerAddressValidators(this.authForm) : '';
		//	(this.subAccessConfig[1]) ? this.clearPartnerContactValidators(this.authForm) : '';

		this.paymentsList.forEach(element => {
			const payment = new FormControl('');
			this.payments.push(payment);
		});
	}

	get payments() {
		return this.authForm.get('payments') as FormArray;
	}

	changeStep(step: boolean) {
		if (this.step) {
			this.authForm.get('sector').clearValidators();
			this.authForm.get('sector').updateValueAndValidity();
			this.authForm.get('description').clearValidators();
			this.authForm.get('description').updateValueAndValidity();
			this.authForm.get('agree').clearValidators();
			this.authForm.get('agree').updateValueAndValidity();
		} else {
			const controls = this.authForm.controls;
			/** check form */
			if (this.authForm.invalid) {
				Object.keys(controls).forEach(controlName =>
					controls[controlName].markAsTouched()
				);
				return;
			}

			this.authForm.get('sector').setValidators([
				Validators.required
			]);
			this.authForm.get('description').setValidators([
				Validators.required,
				Validators.minLength(this.validator.description.minLength),
				Validators.maxLength(this.validator.description.maxLength)
			]);
			this.authForm.get('agree').setValidators([
				Validators.requiredTrue
			]);
			this.authForm.get('sector').updateValueAndValidity();
			this.authForm.get('description').updateValueAndValidity();
			this.authForm.get('agree').updateValueAndValidity();
		}
		this.step = step;
	}

	/**
	 * Set/Clear Validators 
	 */
	clearPartnerAddressValidators(form: FormGroup) {
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

		form.get('timetable').clearValidators();
		form.get('timetable').updateValueAndValidity();
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
	}

	/**
	 * On Submit Form
	 */
	submitForm() {

		if (this.loading) return;

		const controls = this.authForm.controls;
		const partner_payments: PartnerPayment[] = this.setPaymentsValues(controls);
		/** check form */
		if (this.authForm.invalid || !this.fileData || !partner_payments.length) {

			(partner_payments.length) ? this.clearPartnerPaymentsValidators() : this.setPartnerPaymentsValidators();
			this.showPaymentError = (partner_payments.length === 0)
			this.showImageError = (!this.fileData);

			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.loading = true;

		const formData = new FormData();
		formData.append('name', controls.fullname.value);
		formData.append('email', (controls.email.value).toLowerCase());
		formData.append('password', controls.password.value);
		formData.append('imageURL', this.fileData);
		formData.append('description', controls.description.value);
		formData.append('sector', controls.sector.value);
		formData.append('payments', JSON.stringify(partner_payments));

		this.authenticationService.register_as_partner(formData)
			.pipe(
				tap(
					data => {
						console.log(data);
						if (this.subAccessConfig[4]) this.autoCreateCampaign(data.oneClickToken)
						else {
							this.authNoticeService.setNotice(this.translate.instant('AUTH.REGISTER.SUCCESS'), 'success');
							setTimeout(() => { this.router.navigateByUrl('/auth/login'); }, 2500);
						}
					}, error => {
						this.authNoticeService.setNotice(this.translate.instant(error), 'danger');
						this.loading = false;
					}),
				takeUntil(this.unsubscribe),
				finalize(() => {
					this.cdr.markForCheck();
				})
			).subscribe();
	}

	autoCreateCampaign(token: string) {

		const campaign = environment.fixedMicrocreditCampaign;

		var _date_1 = new Date();
		var _newDate1 = _date_1.setDate(_date_1.getDate() + campaign.whenSupportStarts);
		var _date_2 = new Date();
		var _newDate2 = _date_2.setDate(_date_2.getDate() + campaign.whenSupportEnds);
		var _date_3 = new Date();
		var _newDate3 = _date_3.setDate(_date_3.getDate() + campaign.whenRedeemStarts);
		var _date_4 = new Date();
		var _newDate4 = _date_4.setDate(_date_4.getDate() + campaign.whenRedeemEnds);

		const formData = new FormData();
		formData.append("imageURL", this.fileData);

		formData.append('title', campaign.title);
		formData.append('subtitle', campaign.subtitle);
		formData.append('terms', campaign.terms);
		formData.append('description', campaign.description);
		formData.append('category', campaign.category);
		formData.append('access', campaign.access);

		formData.append('quantitative', campaign.quantitative);
		formData.append('stepAmount', (campaign.quantitative) ? campaign.stepAmount : '0');
		formData.append('minAllowed', campaign.minAllowed);
		formData.append('maxAllowed', (campaign.quantitative) ? campaign.maxAllowed : campaign.minAllowed);
		formData.append('maxAmount', campaign.maxAmount);

		formData.append('redeemStarts', _newDate3.toString());
		formData.append('redeemEnds', _newDate4.toString());
		formData.append('startsAt', _newDate1.toString());
		formData.append('expiresAt', _newDate2.toString());


		this.itemsService.oneClickCreateMicrocreditCampaign(formData, token)
			.pipe(
				tap(
					data => {
						console.log(data);
						this.authNoticeService.setNotice(this.translate.instant('AUTH.REGISTER.SUCCESS'), 'success');
						setTimeout(() => {
							this.loading = false;
							this.router.navigateByUrl('/auth/login');
						}, 2500);
					}, error => {
						this.authNoticeService.setNotice(this.translate.instant(error), 'danger');
					}),
				takeUntil(this.unsubscribe),
				finalize(() => {
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
		const control = this.authForm.controls[controlName];

		console.log("Control", this.authForm.controls[controlName])
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
