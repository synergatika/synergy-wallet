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
import { Offer } from 'src/app/core/models/offer.model';

@Component({
  selector: 'app-offers-list-carousel',
  templateUrl: './offers-list-carousel.component.html',
  styleUrls: ['./offers-list-carousel.component.scss']
})
export class OffersListCarouselComponent implements OnInit, OnDestroy {

	/**
	 * Imported Variables
	 */
  @Input() partner: Partner;
  @Input() type: string; // 'single' Or 'all'

	/**
	 * Content Variables
	 */
  public offers: Offer[];

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
	 * @param staticDataService: StaticDataService
	 * @param itemsService: ItemsService
	 */
  constructor(
    private cdRef: ChangeDetectorRef,
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
    this.fetchStoreLoyaltyOffersData(this.partner._id);
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
	 * Fetch Loyalty Offers List (for One Partner)
	 */
  fetchStoreLoyaltyOffersData(partner_id: string) {
    this.itemsService.readOffersByStore(partner_id, '0-0-1')
      .pipe(
        tap(
          data => {
            this.offers = this.shuffle(data);

            //TEMP FOR DEMO
            if (this.offers.length && this.offers.length < 3) {
              this.offers.push(this.offers[0]);
              this.offers.push(this.offers[0]);
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
  shuffle(array: Offer[]) {
    return array.sort(() => Math.random() - 0.5);
  }
}
