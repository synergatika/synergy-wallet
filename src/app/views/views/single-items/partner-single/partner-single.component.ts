import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Models & Interfaces
 */
import { Partner } from 'src/app/core/models/partner.model';

@Component({
	selector: 'app-partner-single',
	templateUrl: './partner-single.component.html',
	styleUrls: ['./partner-single.component.scss']
})
export class PartnerSingleComponent implements OnInit, OnDestroy {

	/**
	 * Imported Variables
	 */
	@Input() partner: Partner;

	private unsubscribe: Subject<any>;
	loading: boolean = false;

	/**
	 * Component Constructor
	 */
	constructor() {
		this.unsubscribe = new Subject();
	}

	/**
	 * On Init
	 */
	ngOnInit() {
		console.log("Partner in SinglePartner", this.partner)
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
	 * Children Modals
	 */
	// @ViewChild('campaignModal', { static: false }) campaignModal: NgbModal;
	// @ViewChild('postModal', { static: false }) postModal: NgbModal;

	/**
 * Content Variables
 */
	// public singleOffers: Offer[];
	// public singlePosts: PostEvent[]; //Used to store posts
	// public singlePost: PostEvent; //Used for the post to open in modal
	// public singleMicrocredits: MicrocreditCampaign[]; //Used to store microcredits
	// public singleMicrocredit: MicrocreditCampaign; //Used for the Microcreit to open in modal

	/**
	 * Carousel Variables
	 */
	// customOptions: OwlOptions;
	// moved: boolean;

	/**
	  * Close Modal on Browser Back Button 
	  */
	// controlModalState(state: boolean) {
	// 	if (state) {
	// 		const modalState = {
	// 			extra_modal: true,
	// 			desc: 'SinglePartnerModals'
	// 		};
	// 		history.pushState(modalState, null);
	// 	} else {
	// 		if (window.history.state.extra_modal) {
	// 			history.back();
	// 		}
	// 	}
	// }

	/**
	 * Fetch Microcredit Campaigns List (for One Partner)
	 */
	// fetchSingleMicrocreditsData(partner_id: string) {
	// 	this.singleMicrocredits = null;
	// 	this.itemsService.readPrivateMicrocreditCampaignsByStore(partner_id, '0-0-1')
	// 		.pipe(
	// 			tap(
	// 				data => {
	// 					this.singleMicrocredits = data;
	// 					//TEMP FOR DEMO
	// 					if (this.singleMicrocredits.length && this.singleMicrocredits.length < 3) {
	// 						this.singleMicrocredits.push(this.singleMicrocredits[0]);
	// 						this.singleMicrocredits.push(this.singleMicrocredits[0]);
	// 					}
	// 				},
	// 				error => {
	// 					console.log(error);
	// 				}),
	// 			finalize(() => {
	// 				this.loading = false;
	// 				this.cdRef.markForCheck();
	// 			})
	// 		)
	// 		.subscribe();
	// }

	/**
	 * Fetch Offers List (for One Partner)
	 */
	// fetchSingleOffersData(partner_id: string) {
	// 	this.singleOffers = null;
	// 	this.itemsService.readOffersByStore(partner_id, '0-0-1')
	// 		.pipe(
	// 			tap(
	// 				data => {
	// 					this.singleOffers = data;
	// 					//TEMP FOR DEMO
	// 					if (this.singleOffers.length && this.singleOffers.length < 3) {
	// 						this.singleOffers.push(this.singleOffers[0]);
	// 						this.singleOffers.push(this.singleOffers[0]);
	// 					}
	// 				},
	// 				error => {
	// 					console.log(error);
	// 				}),
	// 			finalize(() => {
	// 				this.loading = false;
	// 				this.cdRef.markForCheck();
	// 			})
	// 		)
	// 		.subscribe();
	// }

	// /**
	//  * Fetch Post & Events List (for One Partner)
	//  */
	// fetchSinglePostEventsData(partner_id: string) {
	// 	this.singlePosts = null;
	// 	this.itemsService.readPrivatePostsEventsByStore(partner_id, '0-0-0')
	// 		.pipe(
	// 			tap(
	// 				data => {
	// 					this.singlePosts = data;
	// 					//TEMP FOR DEMO
	// 					if (this.singlePosts.length && this.singlePosts.length < 3) {
	// 						this.singlePosts.push(this.singlePosts[0]);
	// 						this.singlePosts.push(this.singlePosts[0]);
	// 					}
	// 				},
	// 				error => {
	// 					console.log(error);
	// 				}),
	// 			finalize(() => {
	// 				this.loading = false;
	// 				this.cdRef.markForCheck();
	// 			})
	// 		)
	// 		.subscribe();
	// }


	/**
	 * Open Microcredit Campaign Modal
	 */
	// openMicrocredit(campaign: MicrocreditCampaign) {
	// 	this.singleMicrocredit = campaign;
	// 	this.modalService.open(
	// 		this.campaignModal,
	// 		{
	// 			ariaLabelledBy: 'modal-basic-title',
	// 			size: 'lg',
	// 			backdropClass: 'fullscrenn-backdrop',
	// 			//backdrop: 'static',
	// 			windowClass: 'fullscreen-modal',
	// 		}
	// 	).result.then(
	// 		(result) => { console.log('closed'); },
	// 		(reason) => { console.log('dismissed'); });
	// }


	/**
	 * Open PostEvent Modal
	 */
	// openPost(post: PostEvent) {
	// 	this.singlePost = post;
	// 	this.modalService.open(
	// 		this.postModal,
	// 		{
	// 			ariaLabelledBy: 'modal-basic-title',
	// 			size: 'lg',
	// 			backdropClass: 'fullscrenn-backdrop',
	// 			//backdrop: 'static',
	// 			windowClass: 'fullscreen-modal',
	// 		}
	// 	).result.then(
	// 		(result) => { console.log('closed'); },
	// 		(reason) => { console.log('dismissed'); });
	// }


	/**
	 * Actions to Open Modals from Carousel
	 */
	// mousedown() { this.moved = false; }
	// mousemove() { this.moved = true; }
	// mouseup(data: any, type: string) {
	// 	if (this.moved) { }
	// 	else {
	// 		if (type == 'microcredit') {
	// 			// this.openMicrocredit(data);
	// 		} else if (type == 'post') {
	// 			this.openPost(data);
	// 		} else { }
	// 	}
	// 	this.moved = false;
	// }
}
