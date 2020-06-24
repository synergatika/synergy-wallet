//Import Basic Services
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { tap, finalize, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

/**
 * Services
 */
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ContentService } from 'src/app/core/services/content.service';

@Component({
	selector: 'app-qr_code-card',
	templateUrl: './qr_code-card.component.html',
	styleUrls: ['./qr_code-card.component.scss']
})
export class QRCodeCardComponent implements OnInit, OnDestroy {

	/**
	 * Children Modals
	 */
	@ViewChild('qrcodeModal', { static: false }) qrcodeModal: NgbModalRef;

	/**
	 * Content Variables
	 */
	public myAngularxQrCode: string = null;
	public qrcode: any;

	loading: boolean = false;
	private unsubscribe: Subject<any>;

	/**
	 * Component Constructor
	 *
	 * @param cdRef: ChangeDetectorRef
	 * @param modalService: NgbModal
	 * @param translate: TranslateService
	 * @param authenticationService: AuthenticationService
	 * @param contentService: ContentService
	 */
	constructor(
		private cdRef: ChangeDetectorRef,
		private modalService: NgbModal,
		public translate: TranslateService,
		private authenticationService: AuthenticationService,
		private contentService: ContentService
	) {
		this.unsubscribe = new Subject();
	}

	/**
	 * On Init
	 */
	ngOnInit() {
		this.myAngularxQrCode = this.authenticationService.currentUserValue.user['email'];
		console.log("I am on QR Card", this.myAngularxQrCode)
		this.fetchQRCodeContent();
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
 * Close Modal on Browser Back Button 
 */
	controlModalState(state: boolean) {
		if (state) {
			const modalState = {
				modal: true,
				desc: 'MemberDashboardModals'
			};
			history.pushState(modalState, null);
		} else {
			if (window.history.state.modal) {
				history.back();
			}
		}
	}

	@HostListener('window:popstate')
	dismissModal() {
		if (this.modalService.hasOpenModals()) {
			this.modalService.dismissAll();
			this.controlModalState(false);
		}
	}

	/**
	 * Fetch QR Code Contentent
	 */
	fetchQRCodeContent() {
		this.contentService.readContentById('QR Code')
			.pipe(
				tap(
					data => {
						this.qrcode = { text: data };
						console.log("QR Code Text", this.qrcode);
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

	/**
	 * Open QR Modal
	 */
	openQrcode() {
		//Open the QR code Modal
		this.controlModalState(true);
		this.modalService.open(this.qrcodeModal)
			.result.then(
				(result) => { this.controlModalState(false); console.log('closed'); },
				(reason) => { this.controlModalState(false); console.log('dismissed'); });
	}


}