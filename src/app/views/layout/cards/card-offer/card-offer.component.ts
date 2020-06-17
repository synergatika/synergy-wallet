import { Component, OnInit, Input } from '@angular/core';
import { Offer } from '../../../../core/models/offer.model';

@Component({
	selector: 'app-card-offer',
	templateUrl: './card-offer.component.html',
	styleUrls: ['./card-offer.component.scss']
})
export class CardOfferComponent implements OnInit {
	@Input() offer: Offer;
	@Input() type: string;

	seconds: number = 0;

	constructor() { }

	ngOnInit() {
		const now = new Date();
		this.seconds = parseInt(now.getTime().toString());
	}

}