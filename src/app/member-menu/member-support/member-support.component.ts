import { Component, OnInit, OnDestroy } from '@angular/core';
// import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
// import { Subject } from 'rxjs';
// import { tap, takeUntil, finalize } from 'rxjs/operators';
// import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

/**
 * Environment
 */
import { environment } from '../../../environments/environment';

// /**
//  * Services
//  */
// import { ItemsService } from '../../core/services/items.service';

// /**
//  * Models & Interfaces
//  */
// import { MicrocreditCampaign } from '../../core/models/microcredit_campaign.model';

@Component({
  selector: 'app-member-support',
  templateUrl: './member-support.component.html',
  styleUrls: ['./member-support.component.scss']
})
export class MemberSupportComponent implements OnInit, OnDestroy {

	/**
	 * Configuration and Static Data
	 */
  public configAccess: Boolean[] = environment.access;

	/**
	 * Component Constructor
	 */
  constructor() { }

  /**
   * On Init
   */
  ngOnInit() {
  }

  /**
   * On Destroy
   */
  ngOnDestroy() {
  }
}

	// /**
	//  * Children Modals
	//  */
  // @ViewChild('campaignModal', { static: false }) campaignModal: NgbModalRef;  
//   /**
//    * Content Variables
//    */
//   public campaigns: MicrocreditCampaign[] = [];
//   singleMicrocredit: MicrocreditCampaign;

//   counter: number = 0;

//   loading: boolean = false;
//   private unsubscribe: Subject<any>;

// 	/**
// 	 * Component Constructor
// 	 *
// 	 * @param cdRef: ChangeDetectorRef
// 	 * @param modalService: NgbModal
// 	 * @param matDialog: MatDialog
// 	 * @param itemsService: ItemsService
// 	 * @param supportService: SupportService
// 	 */
//   constructor(
//     private cdRef: ChangeDetectorRef,
//     private modalService: NgbModal,
//     public matDialog: MatDialog,
//     private itemsService: ItemsService,
//   ) {
//     this.unsubscribe = new Subject();
//   }

//   /**
//    * On Init
//    */
//   ngOnInit() {
//     this.fetchMicrocreditData(this.counter);
//   }

//   /**
//    * On Destroy
//    */
//   ngOnDestroy() {
//     this.unsubscribe.next();
//     this.unsubscribe.complete();
//     this.loading = false;
//   }

// 	/**
// 	 * Close Modal on Browser Back Button 
// 	 */
//   controlModalState(state: boolean) {
//     if (state) {
//       const modalState = {
//         modal: true,
//         desc: 'MemberDashboardModals'
//       };
//       history.pushState(modalState, null);
//     } else {
//       if (window.history.state.modal) {
//         history.back();
//       }
//     }
//   }

//   @HostListener('window:popstate')
//   dismissModal() {
//     if (this.modalService.hasOpenModals()) {
//       this.modalService.dismissAll();
//       this.controlModalState(false);
//     }
//   }

//   /**
//    * Fetch Microcredit Campaigns List
//    */
//   fetchMicrocreditData(counter: number) {
//     this.itemsService.readAllPrivateMicrocreditCampaigns(`6-${counter.toString()}-1`)
//       .pipe(
//         tap(
//           data => {
//             this.campaigns = this.campaigns.concat(data);
//           },
//           error => {
//           }),
//         takeUntil(this.unsubscribe),
//         finalize(() => {
//           this.loading = false;
//           this.cdRef.markForCheck();
//         })
//       )
//       .subscribe();
//   }

//   /**
//    * On Scroll
//    */
//   onScroll() {
//     this.counter = this.counter + 1;
//     this.fetchMicrocreditData(this.counter);
//     console.log('scrolled!!');
//     //	this.offers = this.offers.concat(this.offers);
//     this.cdRef.markForCheck();
//   }

//   /**
//    * Randomize Data
//    */
//   shuffle(array: MicrocreditCampaign[]) {
//     return array.sort(() => Math.random() - 0.5);
//   }

//   /**
//    * Open Microcredit Campaign Modal
//    */
//   openMicrocredit(campaign: MicrocreditCampaign) {
//     this.singleMicrocredit = campaign;
//     this.controlModalState(true);
//     this.modalService.open(
//       this.campaignModal, {
//       ariaLabelledBy: 'modal-basic-title',
//       size: 'lg',
//       backdropClass: 'fullscrenn-backdrop',
//       //backdrop: 'static',
//       windowClass: 'fullscreen-modal',
//     })
//       .result.then(
//         (result) => { this.controlModalState(false); console.log('closed'); },
//         (reason) => { this.controlModalState(false); console.log('dismissed'); });
//   }
// }
