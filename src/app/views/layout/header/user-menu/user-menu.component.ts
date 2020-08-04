import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

/**
 * Services
 */
import { MenuService } from '../../../../core/helpers/menu.service';
import { AuthenticationService } from '../../../../core/services/authentication.service';

/**
 * Models & Interfaces
 */
import { Menu } from 'src/app/core/interfaces/menu.interface';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  public menu: Menu[];

  icon: string = './assets/media/images/menu.svg';
  user: any;
  userAvatar: string;

  constructor(
    private cDRef: ChangeDetectorRef,
    private menuService: MenuService,
    private authenticationService: AuthenticationService
  ) {
    this.menu = this.menuService.getUserMenu;
  }

  ngOnInit(): void {
    this.user = this.authenticationService.currentUserValue.user;
    //console.log(this.user);
    this.userAvatar = this.user.imageURL || '../../../../assets/media/users/default.jpg';
    this.cDRef.markForCheck();
  }

  openNav() {
    this.menuService.openNav();
  }

  logout() {
    console.log('logout');
    this.authenticationService.logout();
  }
}
