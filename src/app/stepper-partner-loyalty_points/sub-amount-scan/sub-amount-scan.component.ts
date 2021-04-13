import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

/**
 * Local Services & Interfaces
 */
import { LocalLoyaltyService } from '../_loyalty.service';
import { LocalLoyaltyInterface } from '../_loyalty.interface';

@Component({
  selector: 'app-sub-amount-scan',
  templateUrl: './sub-amount-scan.component.html',
  styleUrls: ['./sub-amount-scan.component.scss']
})
export class SubAmountScanComponent implements OnInit {

  /**
   * Event Emitter
   */
  @Output()
  scan_amount: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Flag Variables
   */
  scanned: boolean = false;

  constructor() { }

  /**
   * On Init
   */
  ngOnInit() {
  }

  /**
   * On Destroy
   */
  ngOnDestroy() {
  }

  scanSuccessHandler(result: string): void {
    //   if (this.scanned) return;
    this.scanned = true;

    const amount: number = parseInt(result.split('SIG=')[1].substring(59));
    this.scan_amount.emit(amount);
  }

  scanErrorHandler(error: any): void {
    console.log("Error");
  }
}
