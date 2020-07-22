import { Component, OnInit, Input } from '@angular/core';
import { Offer } from '../../../../core/models/offer.model';

@Component({
	selector: 'app-offer-card',
	templateUrl: './offer-card.component.html',
	styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent implements OnInit {
	@Input() offer: Offer;
	@Input() type: string;

	seconds: number = 0;

	constructor() { }

	ngOnInit() {
		const now = new Date();
		this.seconds = parseInt(now.getTime().toString());
	}

}
