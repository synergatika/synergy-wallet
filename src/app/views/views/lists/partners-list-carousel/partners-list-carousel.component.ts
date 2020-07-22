import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

/**
 * Environment
 */
import { environment } from '../../../../../environments/environment';

/**
 * Services
 */
import { StaticDataService } from '../../../../core/helpers/static-data.service';
import { PartnersService } from '../../../../core/services/partners.service';

/**
 * Models & Interfaces
 */
import { Partner } from '../../../../core/models/partner.model';

@Component({
  selector: 'app-partners-list-carousel',
  templateUrl: './partners-list-carousel.component.html',
  styleUrls: ['./partners-list-carousel.component.scss']
})
export class PartnersListCarouselComponent implements OnInit, OnDestroy {

	/**
	 * Children Modals
	 */
  @ViewChild('partnerModal') partnerModal: NgbModal;

	/**
	 * Configuration and Static Data
	 */
  public configAccess: Boolean[] = environment.access;

	/**
	 * Carousel Variables
	 */
  customOptions: OwlOptions;
  moved: boolean;

	/**
	 * Content Variables
	 */
  public partners: Partner[];
  public partner: Partner;
  //offers: Offer[];
  //events: Event[];
  //currentOpenModal: NgbModalRef;

  //singleOffers: Offer;
  //singleMicrocredit: MicrocreditCampaign;

  private unsubscribe: Subject<any>;
  loading: boolean = false;

	/**
	 * Component Constructor
	 *
	 * @param cdRef: ChangeDetectorRef
	 * @param modalService: NgbModal
	 * @param translate: TranslateService
	 * @param staticDataService: StaticDataService
	 * @param loyaltyService: LoyaltyService
	 * @param microcreditService: MicrocreditService
	 * @param contentService: ContentService
	 */
  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
    public translate: TranslateService,
    private staticDataService: StaticDataService,
    private partnersService: PartnersService,
  ) {
    this.customOptions = this.staticDataService.getOwlOptionsThree;
    this.unsubscribe = new Subject();
  }

	/**
	 * On Init
	 */
  ngOnInit() {
    this.fetchPartnersData();
  }

	/**
	 * On Destory
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
        desc: 'MemberExploreModals'
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
	 * Fetch Partners List
	 */
  fetchPartnersData() {
    this.partnersService.readPartners('0-0-0')
      .pipe(
        tap(
          data => {
            this.partners = this.shuffle(data);
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
	 * Randomize Data
	 */
  shuffle(array: Partner[]) {
    return array.sort(() => Math.random() - 0.5);
  }

	/**
	 * Open Partner Modal
	 */
  openPartner(partner: Partner) {
    this.partner = partner;
    this.controlModalState(true);
    this.modalService.open(
      this.partnerModal,
      {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        backdropClass: 'fullscrenn-backdrop',
        backdrop: 'static',
        windowClass: 'fullscreen-modal',
      }
    )
      .result.then(
        (result) => { this.controlModalState(false); console.log('closed'); },
        (reason) => { this.controlModalState(false); console.log('dismissed'); });
  }

	/**
	 * Actions to Open Modals from Carousel
	 */
  mousedown() { this.moved = false; }
  mousemove() { this.moved = true; }
  mouseup(data: Partner) {
    if (!this.moved) {
      this.openPartner(data);
    }
    this.moved = false;
  }
}