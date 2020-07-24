import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

/**
 * Services
 */
import { PartnersService } from '../../../../core/services/partners.service';

/**
 * Models & Interfaces
 */
import { Partner } from '../../../../core/models/partner.model';

@Component({
  selector: 'app-partners-list-scroll',
  templateUrl: './partners-list-scroll.component.html',
  styleUrls: ['./partners-list-scroll.component.scss']
})
export class PartnersListScrollComponent implements OnInit, OnDestroy {

	/**
	 * Children Modals
	 */
  @ViewChild('partnerModal') partnerModal: NgbModal;

	/**
	 * Content Variables
	 */
  public partners: Partner[] = [];
  public partner: Partner;

  /**
   * Scroll & Modal Variables
   */
  counter: number = 0;
  scroll: number = 6;
  moved: boolean;

  loading: boolean = false;
  private unsubscribe: Subject<any>;

	/**
	 * Component Constructor
	 *
	 * @param cdRef: ChangeDetectorRef
	 * @param modalService: NgbModal
	 * @param translate: TranslateService
	 * @param partnersService: PartnersService
	 */
  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
    public translate: TranslateService,
    private partnersService: PartnersService
  ) {
    this.unsubscribe = new Subject();
  }

	/**
	 * On Init
	 */
  ngOnInit() {
    this.fetchPartnersData(this.counter);
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
  fetchPartnersData(counter: number) {
    this.partnersService.readPartners(`${this.scroll.toString()}-${counter.toString()}-0`)
      .pipe(
        tap(
          data => {
            this.partners = this.partners.concat(data);
          },
          error => {
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
	 * On Scroll
	 */
  onScroll() {
    this.counter = this.counter + 1;
    this.fetchPartnersData(this.counter);
    console.log('scrolled!!');
    this.cdRef.markForCheck();
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
