//Import Basic Services
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { first, tap, finalize, takeUntil } from 'rxjs/operators';
import { Subject, Subscriber } from 'rxjs';
import { AuthNotice } from 'src/app/core/helpers/auth-notice/auth-notice.interface';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//Import System Services
import { AuthenticationService } from '../../../core/services/authentication.service';
import { StaticContentService } from '../../../core/services/staticcontent.service';
import { ItemsService } from '../../../core/services/items.service';
import { LoyaltyService } from '../../../core/services/loyalty.service';
import { MicrocreditService } from 'src/app/core/services/microcredit.service';


@Component({
	selector: 'app-customer-dashboard',
	templateUrl: './customer-dashboard.component.html',
	styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit, OnDestroy {

	//Set Basic Variables
	loading: boolean = false;
	private unsubscribe: Subject<any>;

	//Set Content Variables
	balance: number = 0; //The points balance of customer
	balanceText: any; //Static Text for Balance Modal
	qrcodeText: any; //Static Text for QR Code Modal
	badge: any; //The loyalty badge of customer
	supportsList: any; //The microcredits the customer supports
	supportItem: any; //Currently Selected microcredit Support
	offers: any; //Available Offers

	//Set Badges Icons
	badgesImages = {
		supporter: '../../../assets/media/images/ranking-1.png',
		helper: '../../../assets/media/images/ranking-2.png',
		one_of_us: '../../../assets/media/images/ranking-3.png',
	};

	//Set Child Modals
	@ViewChild('qrcodeModal', { static: false }) qrcodeModal;
	@ViewChild('walletModal', { static: false }) walletModal;
	@ViewChild('supportsModal', { static: false }) supportsModal;

	/**
   * Component constructor
   *
   * @param cdRef: ChangeDetectorRef
   * @param authenticationService: AuthenticationService
   * @param loyaltyService: LoyaltyService
   */
	constructor(
		private cdRef: ChangeDetectorRef,
		private authenticationService: AuthenticationService,
		private modalService: NgbModal,
		private loyaltyService: LoyaltyService,
		private staticContentService: StaticContentService,
		private itemsService: ItemsService,
		private microcreditService: MicrocreditService,
	) {
		this.unsubscribe = new Subject();
	}

	/**
	* On init
	*/
	ngOnInit() {
		//Get Badge
		this.fetchBadgeData();
		//Get Wallet Data
		this.fetchBalanceData();
		this.fetchSupportsData();
		//Get Offers Data
		this.fetchOffersData();
	}


	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	* Assets Function On init
	*/

	//Get the Badge of the Customer
	fetchBadgeData() {
		this.loyaltyService.readBadge()
			.pipe(
				tap(
					data => {
						this.badge = data;
						//Set Data for Badge based On Level
						switch (this.badge.slug) {
							case 1:
								this.badge.image = this.badgesImages.supporter;
								this.badge.text_id = 5;
								break;
							case 2:
								this.badge.image = this.badgesImages.helper;
								this.badge.text_id = 7;
								break;
							case 3:
								this.badge.image = this.badgesImages.one_of_us;
								this.badge.text_id = 9;
								break;
						}
						//Get static content of Badge
						this.staticContentService.readText(this.badge.text_id)
							.pipe(
								tap(
									data => {
										this.badge.text = data;
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

	//Get the Balance of the Customer
	fetchBalanceData() {
		this.loyaltyService.readBalance()
			.pipe(
				tap(
					data => {
						this.balance = parseInt(data.points, 16);
						//Get static content of Balance Points
						this.staticContentService.readText('18')
							.pipe(
								tap(
									data => {
										this.balanceText = data;
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

	//Get the Offers
	fetchOffersData() {
		this.itemsService.readAllOffers()
			.pipe(
				tap(
					data => {
						this.offers = data;
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

	//Get the Mircoredit the Customer supports
	fetchSupportsData() {
		this.microcreditService.readAllBackerSupports()
			.pipe(
				tap(
					data => {
						this.supportsList = data;
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
	* Modal Functions
	*/
	openQrcode() {
		//Open the QR code Modal
		this.modalService.open(this.qrcodeModal).result.then((result) => {
			console.log('closed');
		}, (reason) => {
			console.log('dismissed');
		});
		//Get static content of Balance Points
		this.staticContentService.readText('23')
			.pipe(
				tap(
					data => {
						this.qrcodeText = data;
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
	openWallet() {
		this.modalService.open(this.walletModal).result.then((result) => {
			console.log('closed');
		}, (reason) => {
			console.log('dismissed');
		});
	}
	openSupportItem(supportItemTemp) {
		this.supportItem = supportItemTemp;
		this.modalService.open(this.supportsModal).result.then((result) => {
			console.log('closed');
		}, (reason) => {
			console.log('dismissed');
		});
	}
}