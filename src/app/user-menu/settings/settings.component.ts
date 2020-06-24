import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * Services
 */
import { MenuService } from '../../core/helpers/menu.service';

/**
 * Models & Interfaces
 */
import { Menu } from '../../core/interfaces/menu.interface';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
	currentRouteUrl: string = '';
	public menu: Menu[];

	constructor(
		private router: Router,
		private cdr: ChangeDetectorRef,
		private menuService: MenuService
	) {
		this.menu = this.menuService.getSettingsSubMenu;
	}

	ngOnInit() {
		this.currentRouteUrl = this.router.url.split(/[?#]/)[0];
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => {
				this.currentRouteUrl = this.router.url.split(/[?#]/)[0];
				this.cdr.markForCheck();
			});
	}

	getItemCssClasses(item) {
		let classes = 'menu-item';
		if (this.currentRouteUrl.indexOf(item) !== -1) {
			classes += ' menu-item-active';
		}
		return classes;
	}

}
