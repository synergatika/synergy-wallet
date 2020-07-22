import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Services
 */
import { AuthenticationService } from '../../../../core/services/authentication.service';

/**
 * Models & Interfaces
 */
import { MicrocreditCampaign } from '../../../../core/models/microcredit_campaign.model';

@Component({
	selector: 'app-microcredit_campaign-card',
	templateUrl: './microcredit_campaign-card.component.html',
	styleUrls: ['./microcredit_campaign-card.component.scss']
})
export class MicrocreditCampaignCardComponent implements OnInit {
	/**
	 * Imported Variables
	 */
	@Input() campaign: MicrocreditCampaign;
	@Input() type: any;

	seconds: number = 0;
	public flag: string = '';
	public canSupport: boolean = false;
	public canRedeem: boolean = false;

	constructor(
		private translate: TranslateService,
		private authenticationService: AuthenticationService
	) { }

	ngOnInit() {
		console.log('Campaign in Card', this.campaign)
		console.log('Single or All', this.type);

		const now = new Date();
		this.seconds = parseInt(now.getTime().toString());
		//	console.log('Campaign')
		//	console.log(this.microcredit);
		const currentUser = this.authenticationService.currentUserValue;
		const access = currentUser.user["access"];

		if (this.campaign['status'] === 'draft') {
			this.canSupport = false;
			this.flag = this.translate.instant('CAMPAIGN.STATUS.DRAFT');
		} else if (this.campaign.startsAt > this.seconds) {
			this.canSupport = false;
			this.canRedeem = false;
			this.flag = this.translate.instant('CAMPAIGN.STATUS.EXPECTED');
		} else if ((this.campaign.expiresAt > this.seconds) && (this.seconds > this.campaign.startsAt)) {
			this.canSupport = true;
			this.flag = this.translate.instant('GENERAL.TO');
		} else if (this.seconds > this.campaign.expiresAt) {
			this.canSupport = false;
			this.flag = this.translate.instant('CAMPAIGN.STATUS.REDEEM_TO');
			this.canRedeem = (access == 'partner') ? true : false;
		}
	}
}
