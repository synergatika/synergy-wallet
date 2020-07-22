import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

/**
 * Components
 */
import { StepperMemberMicrocreditSupportComponent } from '../../../../stepper-member-microcredit_support/stepper-member-microcredit_support.component';

/**
 * Models & Interfaces
 */
import { MicrocreditCampaign } from 'src/app/core/models/microcredit_campaign.model';

@Component({
	selector: 'app-microcredit_campaign-single',
	templateUrl: './microcredit_campaign-single.component.html',
	styleUrls: ['./microcredit_campaign-single.component.scss']
})
export class MicrocreditCampaignSingleComponent implements OnInit, OnDestroy {

	/**
	 * Imported Variables
	 */
	@Input() campaign: MicrocreditCampaign;

	seconds: number = 0;
	public canSupportCampaign: boolean = false;

	private unsubscribe: Subject<any>;
	loading: boolean = false;

	/**
	 * Component Constructor
	 */
	constructor(
		public matDialog: MatDialog
	) {
		this.unsubscribe = new Subject();
	}

	/**
	 * On Init
	 */
	ngOnInit() {
		console.log("Campaign in SingleMicrocredit", this.campaign)

		const now = new Date();
		this.seconds = parseInt(now.getTime().toString());

		this.canSupportCampaign = ((this.campaign.startsAt < this.seconds) && (this.campaign.expiresAt > this.seconds)) ? true : false;
	}

	/**
	 * On destroy
	 */
	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	pledgeModal(campaign: MicrocreditCampaign) {
		const dialogConfig = new MatDialogConfig();
		// The user can't close the dialog by clicking outside its body
		dialogConfig.disableClose = true;
		dialogConfig.id = "modal-component";
		dialogConfig.height = "auto";
		dialogConfig.width = "600px";
		dialogConfig.data = {
			campaign: campaign
		};
		const modalDialog = this.matDialog.open(StepperMemberMicrocreditSupportComponent, dialogConfig);
	}
}
