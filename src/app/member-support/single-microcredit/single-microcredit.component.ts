import { Input, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SupportMicrocreditComponent } from '../support-microcredit/support-microcredit.component'

@Component({
	selector: 'app-single-microcredit',
	templateUrl: './single-microcredit.component.html',
	styleUrls: ['./single-microcredit.component.scss']
})
export class SingleMicrocreditComponent implements OnInit {

	//Set Variables Imported
	@Input() singleMicrocredit: any;

	public hasExpired: boolean = false;
	constructor(
		public matDialog: MatDialog,
	) {

	}

	ngOnInit() {
		console.log(this.singleMicrocredit);

		const now = new Date();
		const seconds = parseInt(now.getTime().toString());

		if (seconds > this.singleMicrocredit.expiresAt) this.hasExpired = true;
	}

	pledgeModal(partner_id: string, campaign_id: string) {
		const dialogConfig = new MatDialogConfig();
		// The user can't close the dialog by clicking outside its body
		dialogConfig.disableClose = true;
		dialogConfig.id = "modal-component";
		dialogConfig.height = "auto";
		dialogConfig.width = "600px";
		dialogConfig.data = {
			partner_id: partner_id,
			campaign_id: campaign_id
		};
		const modalDialog = this.matDialog.open(SupportMicrocreditComponent, dialogConfig);
	}

}
