import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

/**
 * Services
 */
import { ItemsService } from '../../../../core/services/items.service';

/**
 * Models & Interfaces
 */
import { PostEvent } from '../../../../core/models/post_event.model';

@Component({
  selector: 'app-posts_events-list-scroll',
  templateUrl: './posts_events-list-scroll.component.html',
  styleUrls: ['./posts_events-list-scroll.component.scss']
})
export class PostsEventsListScrollComponent implements OnInit, OnDestroy {

	/**
	 * Children Modals
	 */
  @ViewChild('postEventModal') postEventModal: NgbModal;

	/**
	 * Content Variables
	 */
  public posts_events: PostEvent[] = [];
  post_event: PostEvent;

  counter: number = 0;
  scroll: number = 6;
  moved: boolean;

  loading: boolean = false;
  private unsubscribe: Subject<any>;

	/**
	 * Component Constructor
	 *
	 * @param cdRef: ChangeDetectorRef
	 * @param translate: TranslateService
	 * @param partnersService: PartnersService
	 */
  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
    public translate: TranslateService,
    private itemsService: ItemsService
  ) {
    this.unsubscribe = new Subject();
  }

	/**
	 * On Init
	 */
  ngOnInit() {
    this.fetchPostsEventsData(this.counter);
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
	 * Fetch Post & Events List
	 */
  fetchPostsEventsData(counter: number) {
    this.itemsService.readAllPrivatePostsEvents(`${this.scroll.toString()}-${counter.toString()}-0`)
      .pipe(
        tap(
          data => {
            this.posts_events = this.posts_events.concat(data);
            console.log("all posts");
            console.log(this.posts_events)
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
    this.fetchPostsEventsData(this.counter);
    console.log('scrolled!!');
    this.cdRef.markForCheck();
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
