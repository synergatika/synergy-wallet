import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

/**
 * Models & Interfaces
 */
import { Partner } from 'sng-core';

@Component({
	selector: 'app-archive-partners',
	templateUrl: './archive-partners.component.html',
	styleUrls: ['./archive-partners.component.scss']
})
export class ArchivePartnersComponent implements OnInit {

	/**
	 * Content Variables
	 */
	loading = false;
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
	 * On Init
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
