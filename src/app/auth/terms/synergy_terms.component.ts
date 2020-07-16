import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'kt-modal3',
    templateUrl: './synergy_terms.component.html',
})
export class TermsComponent implements OnInit, OnDestroy {

	/**
	 * Component Constructor
	 *
	 * @param dialog: MatDialog
	 */
    constructor(
        public dialog: MatDialog,
    ) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {

    }

}