import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';

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
export class SubAmountScanComponent implements OnInit, OnDestroy {
  /**
   * Event Emitter
   */
  @Output()
  scan_amount: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Flag Variables
   */
  scanned: boolean = false;

  checks;
  private unsubscribe: Subject<any>;
  private subscription: Subscription = new Subscription;

  constructor(
    private stepperService: LocalLoyaltyService,
  ) {
    this.subscription.add(this.stepperService.checks.subscribe(checks => this.checks = checks));
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit() {
  }

  /**
* On destroy
*/
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }


  scanSuccessHandler(result: string): void {
    if (this.checkResult(result)) return;

    const amount: number = parseFloat((result.split('SIG=')[1]).substring(59));
    this.scan_amount.emit(amount);
  }

  scanErrorHandler(error: any): void {
    console.log("Error");
  }

  checkResult(result: string) {
    const emailPatern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(result);
    const cardPatern = /^\d{16}$/.test(result);

    if (emailPatern || cardPatern) return true;
    return false;
  }
}
