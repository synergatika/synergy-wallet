import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators'; import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

/**
 * Services
 */
import { ItemsService } from '../../../../core/services/items.service';

/**
 * Models & Interfaces
 */
import { MicrocreditCampaign } from '../../../../core/models/microcredit_campaign.model';

@Component({
  selector: 'app-microcredit_campaigns-list-scroll',
  templateUrl: './microcredit_campaigns-list-scroll.component.html',
  styleUrls: ['./microcredit_campaigns-list-scroll.component.scss']
})
export class MicrocreditCampaignsListScrollComponent implements OnInit, OnDestroy {

	/**
	 * Children Modals
	 */
  @ViewChild('campaignModal', { static: false }) campaignModal: NgbModalRef;

  /**
   * Content Variables
   */
  public campaigns: MicrocreditCampaign[] = [];
  public campaign: MicrocreditCampaign;

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
	 * @param matDialog: MatDialog
	 * @param itemsService: ItemsService
	 */
  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
    public matDialog: MatDialog,
    private itemsService: ItemsService,
  ) {
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit() {
    this.fetchMicrocreditCampaignsData(this.counter);
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
   * Fetch Microcredit Campaigns List
   */
  fetchMicrocreditCampaignsData(counter: number) {
    this.itemsService.readAllPrivateMicrocreditCampaigns(`${this.scroll.toString()}-${counter.toString()}-1`)
      .pipe(
        tap(
          data => {
            this.campaigns = this.campaigns.concat(data);
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
    this.fetchMicrocreditCampaignsData(this.counter);
    console.log('scrolled!!');
    this.cdRef.markForCheck();
  }

	/**
	 * Open Microcredit Campaign Modal
	 */
  openMicrocredit(campaign: MicrocreditCampaign) {
    console.log("Microcredit Campaign on Open Modal in Scroll", campaign);
    this.campaign = campaign;
    this.controlModalState(true);
    this.modalService.open(
      this.campaignModal,
      {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        backdropClass: 'fullscrenn-backdrop',
        backdrop: 'static',
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
