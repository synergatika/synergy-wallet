import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

/**
 * Services
 */
import { MenuService } from '../../../../core/helpers/menu.service';
import { AuthenticationService } from '../../../../core/services/authentication.service';

/**
 * Models & Interfaces
 */
import { Menu } from '../../../../core/interfaces/menu.interface';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	currentRouteUrl: string = '';
	public menu: Menu[];

	constructor(
		private cdr: ChangeDetectorRef,
		private router: Router,
		private translate: TranslateService,
		private menuService: MenuService,
		private authenticationService: AuthenticationService
	) {
		const currentUser = this.authenticationService.currentUserValue;
		this.menu = (currentUser.user["access"] === 'partner') ?
			this.menuService.getPartnerMenu : this.menuService.getAdminMenu;
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

	openNav() {
		this.menuService.openNav();
		/*document.getElementById("mySidenav").style.width = "250px";
		document.getElementById("main").style.marginLeft = "250px";
		//document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
		document.body.classList.add("menu-overlay");*/
	}

	/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
	closeNav() {
		this.menuService.closeNav();
		/*
		document.getElementById("mySidenav").style.width = "0";
		document.getElementById("main").style.marginLeft = "0";
		//document.body.classList.replace("menu-overlay", "");
		document.body.classList.remove("menu-overlay");
		*/
	}

	toggleNav() {
		this.menuService.toggleNav();
		/*
		document.getElementById("mySidenav").style.width = "0";
		document.getElementById("main").style.marginLeft = "0";
		//document.body.classList.replace("menu-overlay", "");
		document.body.classList.remove("menu-overlay");
		*/
	}

	getItemCssClasses(item) {
		let classes = '';
		if (this.currentRouteUrl.indexOf(item) !== -1) {
			classes = 'side-menu-item-active';
		}
		return classes;
	}

}
