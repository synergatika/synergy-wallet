import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize, filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

/**
 * Services
 */
import { ItemsService } from '../../../core/services/items.service';

import { PostEvent } from 'sng-core';
import { ActivatedRoute, NavigationStart, Params, Router } from '@angular/router';

@Component({
	selector: 'app-archive-posts_events',
	templateUrl: './archive-posts_events.component.html',
	styleUrls: ['./archive-posts_events.component.scss']
})
export class ArchivePostsEventsComponent implements OnInit {

	/**
	 * Content Variables
	 */
	public posts: PostEvent[] = [];

	access: string = null;

	counter: number = 0;

	loading: boolean = false;
	private unsubscribe: Subject<any>;

	/**
	 * Component Constructor
	 *
	 * @param cdRef: ChangeDetectorRef
	 * @param translate: TranslateService
	 */
	constructor(
		private cdRef: ChangeDetectorRef,
		public translate: TranslateService,
		private itemsService: ItemsService,
		private route: ActivatedRoute
	) {
		this.unsubscribe = new Subject();
	}

	/**
	 * On destroy
	 */
	ngOnInit() {
		//		this.fetchPostsEventsData(this.counter);
		this.route.params.subscribe((params: Params) => {
			this.access = params['access'];
			if (!this.access) this.access = 'general';
		});
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
	 * Fetch Post & Events List
	 */
	// fetchPostsEventsData(counter: number) {
	// 	this.itemsService.readAllPrivatePostsEvents(`6-${counter.toString()}-0-${this.access === 'internal' ? '1' : '0'}`)
	// 		.pipe(
	// 			tap(
	// 				data => {
	// 					this.posts = this.posts.concat(data);
	// 					console.log("all posts");
	// 					console.log(this.posts)
	// 				},
	// 				error => {
	// 				}),
	// 			takeUntil(this.unsubscribe),
	// 			finalize(() => {
	// 				this.loading = false;
	// 				this.cdRef.markForCheck();
	// 			})
	// 		)
	// 		.subscribe();
	// }

	/**
	 * On Scroll
	 */
	onScroll() {
		// this.counter = this.counter + 1;
		// this.fetchPostsEventsData(this.counter);
		// console.log('scrolled!!');
		// this.cdRef.markForCheck();
	}
}
