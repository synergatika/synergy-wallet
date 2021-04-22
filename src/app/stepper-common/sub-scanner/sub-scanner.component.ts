import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
// import { LocalLoyaltyService } from 'src/app/stepper-partner-loyalty_points/_loyalty.service';

@Component({
  selector: 'app-sub-scanner',
  templateUrl: './sub-scanner.component.html',
  styleUrls: ['./sub-scanner.component.scss']
})
export class SubScannerComponent implements OnInit {

  /**
   * Event Emitter
   */
  @Output()
  scan_identifier: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  /**
   * On Init
   */
  ngOnInit() {
  }

  scanSuccessHandler(result: string): void {
    if (this.checkResult(result)) return;

    const identifier = result;
    this.scan_identifier.emit(identifier);
  }

  scanErrorHandler(error: any): void {
    console.log("Error");
  }

  checkResult(result: string) {
    const emailPatern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(result);
    const cardPatern = /^\d{16}$/.test(result);

    if (emailPatern || cardPatern) return false;
    return true;
  }

}
