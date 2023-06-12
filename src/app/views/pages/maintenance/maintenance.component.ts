import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
	selector: 'app-maintenance',
	templateUrl: './maintenance.component.html',
	styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

	constructor(private prevLocation: Location) { }

	ngOnInit() {
	}
}
