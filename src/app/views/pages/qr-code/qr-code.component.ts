import { Component, OnInit } from '@angular/core';

/**
 * Services
 */
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {

  public myAngularxQrCode: string = null;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  /**
   * On Init
   */
  ngOnInit() {
    this.myAngularxQrCode = this.authenticationService.currentUserValue.user['email'];
  }
}
