import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';

/**
 * Environment
 */
import { environment } from '../../../../../environments/environment';
/**
 * Services
 */
import { StaticDataService } from 'src/app/core/helpers/static-data.service';
import { PartnersService } from 'src/app/core/services/partners.service';

/**
 * Models & Interfaces
 */
import { Partner } from '../../../../core/models/partner.model';
import { Marker } from '../../../../core/interfaces/marker.interface';
// export interface Marker {
// 	lat: number;
// 	lng: number;
// 	img: string;
// 	name: string;
// 	address: string;
// 	label?: string;
// 	draggable: boolean;
// }

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	@Input() partner_id: string;

	/**
	 * Configuration and Static Data
	 */
	public openUrl: string = environment.openUrl;

	//singlePartner: boolean = false;
	//list: any;

	latitude: number = environment.mapOptions.latitude;
	longitude: number = environment.mapOptions.longitude;
	zoom: number = environment.mapOptions.zoom;

	markers: Marker[] = new Array;

	public partner: Partner;
	// public partners: Partner[];

	loading: boolean = false;
	private unsubscribe: Subject<any>;

	/**
	 * Map Variables
	 */
	mapStyle = [];
	pin = {};

	constructor(
		private cdRef: ChangeDetectorRef,
		private staticDataService: StaticDataService,
		private partnersService: PartnersService
	) {
		this.mapStyle = this.staticDataService.getMapPinStyle.mapStyle;
		this.pin = this.staticDataService.getMapPinStyle.pin;
		this.unsubscribe = new Subject();
	}

	/**
	 * On Init
	 */
	ngOnInit() {
		this.fetchPartnerData(this.partner_id);
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	addressToMap(partner: Partner) {
		return {
			lat: parseFloat(partner.address.coordinates[0]),
			lng: parseFloat(partner.address.coordinates[1]),
			img: partner.imageURL,
			name: partner.name,
			slug: partner.slug,
			address: partner.address.street + ", " + partner.address.city,
			//label: '0',
			draggable: false
		}
	}

	/**
	 * Fetch Partner Data
	 */
	fetchPartnerData(partner_id: string) {
		this.partnersService.readPartnerInfo(partner_id)
			.pipe(
				tap(
					data => {
						this.partner = data;
						console.log("Partner in Map Widget", this.partner);

						if (this.partner.address) {
							this.markers = [this.addressToMap(this.partner)];
							this.latitude = this.markers[0]['lat'];
							this.longitude = this.markers[0]['lng'];
							this.zoom = 15;
						}
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
}
