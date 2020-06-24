//Import Basic Services
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { first, tap, finalize, takeUntil } from 'rxjs/operators';
import { Subject, Subscriber } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateService } from '@ngx-translate/core';

/**
 * Services
 */
import { ItemsService } from '../../../../core/services/items.service';

/**
 * Models & Interfaces
 */
import { Offer } from '../../../../core/models/offer.model';

@Component({
  selector: 'app-offers-list-scroll',
  templateUrl: './offers-list-scroll.component.html',
  styleUrls: ['./offers-list-scroll.component.scss']
})
export class OffersListScrollComponent implements OnInit, OnDestroy {

  /**
   * Content Variables
   */
  public offers: Offer[] = [];

  /**
   * Scroll & Modal Variables
   */
  counter: number = 0;
  scroll: number = 6;

  loading: boolean = false;
  private unsubscribe: Subject<any>;

	/**
	 * Component Constructor
	 *
	 * @param cdRef: ChangeDetectorRef
	 * @param translate: TranslateService
	 * @param itemsService: ItemsService
	 */
  constructor(
    private cdRef: ChangeDetectorRef,
    public translate: TranslateService,
    private itemsService: ItemsService,
  ) {
    this.unsubscribe = new Subject();
  }

	/**
	* On Init
	*/
  ngOnInit() {
    this.fetchLoyaltyOffersData(this.counter);
  }

  /**
 * On destroy
 */
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  /**
   * Fetch Loyalty Offers List
   */
  fetchLoyaltyOffersData(counter: number) {
    this.itemsService.readAllOffers(`${this.scroll.toString()}-${counter.toString()}-1`)
      .pipe(
        tap(
          data => {
            this.offers = this.offers.concat(data);
            if (true) console.log("Offers Data on \"Offers List Scroll\"", this.offers)
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
   * On Scroll
   */
  onScroll() {
    this.counter = this.counter + 1;
    this.fetchLoyaltyOffersData(this.counter);
    console.log('scrolled!!');
    //	this.offers = this.offers.concat(this.offers);
    this.cdRef.markForCheck();
  }
}
