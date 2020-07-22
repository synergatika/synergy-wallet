import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, HostListener } from '@angular/core';
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
import { ItemsService } from '../../../../core/services/items.service';

/**
 * Models & Interfaces
 */
import { Partner } from '../../../../core/models/partner.model';
import { PostEvent } from 'src/app/core/models/post_event.model';

@Component({
  selector: 'app-posts_events-list-carousel',
  templateUrl: './posts_events-list-carousel.component.html',
  styleUrls: ['./posts_events-list-carousel.component.scss']
})
export class PostsEventsListCarouselComponent implements OnInit, OnDestroy {

  /**
   * Imported Variables
   */
  @Input() partner: Partner;
  @Input() type: string; // 'single' Or 'all'

	/**
	 * Children Modals
	 */
  @ViewChild('postEventModal') postEventModal: NgbModal;

	/**
	 * Configuration and Static Data
	 */
  public configAccess: Boolean[] = environment.access;

	/**
	 * Content Variables
	 */
  public posts_events: PostEvent[];
  public post_event: PostEvent;

	/**
	 * Carousel Variables
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
	 * @param translate: TranslateService
	 * @param staticDataService: StaticDataService
	 * @param itemsService: ItemsService
	 */
  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
    public translate: TranslateService,
    private staticDataService: StaticDataService,
    private itemsService: ItemsService
  ) {
    this.customOptions = (this.type === 'single') ? this.staticDataService.getOwlOptionsTwo : this.staticDataService.getOwlOptionsThree;
    this.unsubscribe = new Subject();
  }

	/**
	 * On Init
	 */
  ngOnInit() {
    if (this.type == 'single') {
      this.fetchStorePostsEventsData(this.partner._id);
      console.log('a');
    } else if (this.type == 'all') {
      this.fetchPostsEventsData();
      console.log('b');
    }
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
	 * Fetch Posts & Events List
	 */
  fetchPostsEventsData() {
    this.itemsService.readAllPrivatePostsEvents('0-0-0')
      .pipe(
        tap(
          data => {
            this.posts_events = data;
            //Temp for DEMO
            if (this.posts_events.length < 3) {
              this.posts_events.push(this.posts_events[0]);
              this.posts_events.push(this.posts_events[0]);
            }
            console.log(this.posts_events)
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
	 * Fetch Posts & Events List (for One Partner)
	 */
  fetchStorePostsEventsData(partner_id: string) {
    this.itemsService.readPrivatePostsEventsByStore(partner_id, '0-0-0')
      .pipe(
        tap(
          data => {
            this.posts_events = data;
            //TEMP FOR DEMO
            if (this.posts_events.length && this.posts_events.length < 3) {
              this.posts_events.push(this.posts_events[0]);
              this.posts_events.push(this.posts_events[0]);
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
	 * Open Partner Modal
	 */
  openPostEvent(post_event: PostEvent) {
    this.post_event = post_event;
    this.controlModalState(true);
    this.modalService.open(
      this.postEventModal,
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
  mouseup(data: PostEvent) {
    if (!this.moved) {
      this.openPostEvent(data);
    }
    this.moved = false;
  }
}