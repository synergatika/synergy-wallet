import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-archive-posts_events',
	templateUrl: './archive-posts_events.component.html',
	styleUrls: ['./archive-posts_events.component.scss']
})
export class ArchivePostsEventsComponent implements OnInit {

	/**
	 * Content Variables
	 */
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
	) {
		this.unsubscribe = new Subject();
	}

	/**
	 * On destroy
	 */
	ngOnInit() {
	}

	/**
	 * On destroy
	 */
	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}


}
