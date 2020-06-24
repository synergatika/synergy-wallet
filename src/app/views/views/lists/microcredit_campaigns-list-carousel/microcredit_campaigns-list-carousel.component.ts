import { Input, Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';

/**
 * Services
 */
import { StaticDataService } from 'src/app/core/helpers/static-data.service';
import { ItemsService } from '../../../../core/services/items.service';

/**
 * Models & Interfaces
 */
import { Partner } from 'src/app/core/models/partner.model';
import { MicrocreditCampaign } from 'src/app/core/models/microcredit_campaign.model';

@Component({
  selector: 'app-microcredit_campaigns-list-carousel',
  templateUrl: './microcredit_campaigns-list-carousel.component.html',
  styleUrls: ['./microcredit_campaigns-list-carousel.component.scss']
})
export class MicrocreditCampaignsListCarouselComponent implements OnInit, OnDestroy {

	/**
	 * Imported Variables
	 */
  @Input() partner: Partner;
  @Input() type: string; // 'single' Or 'all'

  /**
	 * Children Modals
	 */
  @ViewChild('campaignModal', { static: false }) campaignModal: NgbModal;

	/**
	 * Content Variables
	 */
  public campaigns: MicrocreditCampaign[]; //Used to store microcredits
  public campaign: MicrocreditCampaign; //Used for the Microcreit to open in modal

	/**
	 * Carousel & Modal Variables
	 */
  customOptions: OwlOptions;
  moved: boolean;

  private unsubscribe: Subject<any>;
  loading: boolean = false;

	/**
	 * Component Constructor
	 *
	 * @param cdRef: ChangeDetectorRef
	 * @param modalService: NgbModal
	 * @param staticDataService: StaticDataService
	 * @param itemsService: ItemsService
	 */
  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
    private staticDataService: StaticDataService,
    private itemsService: ItemsService,
  ) {
    this.customOptions = this.staticDataService.getOwlOptionsTwo;
    this.unsubscribe = new Subject();
  }

	/**
	 * On Init
	 */
  ngOnInit() {
    this.fetchStoreMicrocreditCampaignsData(this.partner._id);
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
	 * Fetch Microcredit Campaigns List (for One Partner)
	 */
  fetchStoreMicrocreditCampaignsData(partner_id: string) {
    this.campaign = null;
    this.itemsService.readPrivateMicrocreditCampaignsByStore(partner_id, '0-0-1')
      .pipe(
        tap(
          data => {
            this.campaigns = this.shuffle(data);

            //TEMP FOR DEMO
            if (this.campaigns.length && this.campaigns.length < 3) {
              this.campaigns.push(this.campaigns[0]);
              this.campaigns.push(this.campaigns[0]);
            }
          },
          error => {
            console.log(error);
          }),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe();
  }

  /**
   * Randomize Data
   */
  shuffle(array: MicrocreditCampaign[]) {
    return array.sort(() => Math.random() - 0.5);
  }


	/**
	 * Open Microcredit Campaign Modal
	 */
  openMicrocredit(campaign: MicrocreditCampaign) {
    console.log("Microcredit Campaign on Open Modal in Carousel", campaign);
    this.campaign = campaign;
    this.controlModalState(true);
    this.modalService.open(
      this.campaignModal,
      {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        backdropClass: 'fullscrenn-backdrop',
        //backdrop: 'static',
        windowClass: 'fullscreen-modal',
      }
    ).result.then(
      (result) => { console.log('closed'); },
      (reason) => { console.log('dismissed'); });
  }


	/**
	 * Actions to Open Modals from Carousel
	 */
  mousedown() { this.moved = false; }
  mousemove() { this.moved = true; }
  mouseup(data: MicrocreditCampaign) {
    if (!this.moved) {
      this.openMicrocredit(data);
    }
    this.moved = false;
  }
}
