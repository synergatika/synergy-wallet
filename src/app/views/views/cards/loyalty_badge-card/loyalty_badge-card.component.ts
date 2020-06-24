//Import Basic Services
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';
import { tap, finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

/**
 * Services
 */
import { StaticDataService } from '../../../../core/helpers/static-data.service';
import { ContentService } from '../../../../core/services/content.service';
import { LoyaltyService } from '../../../../core/services/loyalty.service';

/**
 * Models & Interfaces
 */
import { Activity } from '../../../../core/models/activity.model';


@Component({
	selector: 'app-loyalty_badge-card',
	templateUrl: './loyalty_badge-card.component.html',
	styleUrls: ['./loyalty_badge-card.component.scss']
})
export class LoyaltyBadgeCardComponent implements OnInit, OnDestroy {

	/**
	 * Content Variables
	 */
	public loyalty_badge: Activity; //The loyalty badge of member
	badgesImages: any;

	loading: boolean = false;
	private unsubscribe: Subject<any>;

	/**
	 * Component Constructor
	 *
	 * @param cdRef: ChangeDetectorRef
	 * @param translate: TranslateService
	 * @param contentService: ContentService
	 * @param loyaltyService: LoyaltyService
	 */
	constructor(
		private cdRef: ChangeDetectorRef,
		public translate: TranslateService,
		private staticDataService: StaticDataService,
		private contentService: ContentService,
		private loyaltyService: LoyaltyService,
	) {
		this.badgesImages = this.staticDataService.getBadgesImages;
		this.unsubscribe = new Subject();
	}

	/**
	 * On Init
	 */
	ngOnInit() {
		this.fetchLoyaltyBadgeData();
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}


	/**
	 * Fetch Loyalty Badge
	 */
	fetchLoyaltyBadgeData() {
		this.loyaltyService.readBadge()
			.pipe(
				tap(
					data => {
						this.loyalty_badge = data;
						console.log("On Fetch Loyalty Badge", data);
						this.fetchBadgeContent();
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


	fetchBadgeContent() {
		//Set Data for Badge based On Level
		switch (this.loyalty_badge.slug) {
			case 1:
				this.loyalty_badge.image = this.badgesImages.supporter;
				//this.badge.text_id = 5;
				this.loyalty_badge.text_id = 'Supporter';
				break;
			case 2:
				this.loyalty_badge.image = this.badgesImages.helper;
				//this.badge.text_id = 7;
				this.loyalty_badge.text_id = 'Helper';
				break;
			case 3:
				this.loyalty_badge.image = this.badgesImages.one_of_us;
				//this.badge.text_id = 9;
				this.loyalty_badge.text_id = 'One of Us';
				break;
		}
		//Get static content of Badge
		this.contentService.readContentById(this.loyalty_badge.text_id)
			//this.staticContentService.readText(this.badge.text_id)
			.pipe(
				tap(
					data => {
						this.loyalty_badge.text = data;
						console.log(this.translate.currentLang)
					},
					error => {
						console.log(error);
					}
				),
				takeUntil(this.unsubscribe),
				finalize(() => {
					this.loading = false;
					this.cdRef.markForCheck();
				})
			).subscribe();
	}


}