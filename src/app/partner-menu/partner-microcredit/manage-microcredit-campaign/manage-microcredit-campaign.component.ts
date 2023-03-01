import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

/**
 * Components
 */
import { StepperPartnerMicrocreditSupportComponent } from '../../../stepper-partner-microcredit_support/stepper-partner-microcredit_support.component';

/**
 * Services
 */
import { StaticDataService } from '../../../core/helpers/static-data.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ItemsService } from '../../../core/services/items.service';
import { MicrocreditService } from '../../../core/services/microcredit.service';

import {
  MicrocreditSupport,
  MicrocreditCampaign,
  Statistics,
  PaymentList,
} from 'sng-core';

@Component({
  selector: 'app-manage-microcredit-campaign',
  templateUrl: './manage-microcredit-campaign.component.html',
  styleUrls: ['./manage-microcredit-campaign.component.scss']
})
export class ManageMicrocreditCampaignComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  /**
   * Configuration and Static Data
   */
  public paymentsList: PaymentList[];

  /**
   * Parameters
   */
  private campaign_id: string;

  /**
   * Content Variables
   */
  public campaign: MicrocreditCampaign;//SupportInterface["MicrocreditCampaign"];
  public supports: MicrocreditSupport[];
  public currentMethods: PaymentList[];
  public selectedMethod: PaymentList;
  public defaultMethod: PaymentList;
  public textValueFilter: string = '';
  public dateFilter: Date;
  public maxDate: Date;
  public validatedDates: string[];

  /**
   * Flags(Check) Variables
   */
  public canSupportCampaign: boolean = false;
  public canConfirmPayment: boolean = false;
  public canRevertPayment: boolean = false;

  /**
   * Data Table Variables
   */
  displayedColumns: string[] = ['payment_id', 'method', 'remainingTokens', 'initialTokens', 'createdAt', 'status'];
  dataSource: MatTableDataSource<MicrocreditSupport>;

  loading: boolean = false;
  private unsubscribe: Subject<any>;

  constructor(
    public matDialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private staticDataService: StaticDataService,
    private authenticationService: AuthenticationService,
    private itemsService: ItemsService,
    private microcreditService: MicrocreditService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.campaign_id = params['_id'];
    });
    this.paymentsList = this.staticDataService.getPaymentsList;

    this.unsubscribe = new Subject();
  }

  dateformat(d: Date): string {
    let date: any;
    let month: any;

    if (d.getDate().toString().length < 2) {
      date = '0' + d.getDate().toString()
    } else {
      date = d.getDate().toString()
    }

    if ((d.getMonth() + 1).toString().length < 2) {
      month = '0' + (d.getMonth() + 1).toString()
    } else {
      month = (d.getMonth() + 1).toString()
    }

    return d.getFullYear().toString() + "/" + month + "/" + date;
  }
  activeDates(d: Date): boolean {
    return this.validatedDates.includes(this.dateformat(d));
  }

  /**
  * On Init
  */
  ngOnInit() {
    this.maxDate = new Date();

    this.fetchCampaignData();
    this.fetchSupportsData();
  }

  /**
   * On Destroy
   */
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  /**
   * Table Filters (Payment Mehod)
   */
  applyFilterSelected(event) {
    this.dateFilter = null;
    this.textValueFilter = '';
    if ((event as HTMLInputElement).value == 'all') {
      this.dataSource.filter = '';
    } else {
      this.dataSource.filter = (event as HTMLInputElement).value;
    }
    console.log(typeof (event as HTMLInputElement).value);
  }

  applyFilterText(event: Event) {
    this.dateFilter = null;
    this.selectedMethod = { ...this.defaultMethod };
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    console.log(typeof (event.target as HTMLInputElement).value);
  }

  applyFilterDate(event) {
    this.selectedMethod = { ...this.defaultMethod };
    this.textValueFilter = '';
    this.dataSource.filter = ((event.value).getTime());
  }

  setFilters() {
    this.dataSource.filterPredicate = (data: MicrocreditSupport, filter: any) =>
      (data.payment?._id.includes(filter)) ||
      (data.payment.method.bic == filter) ||
      ((typeof filter != "string") && ((parseInt(((new Date(data.createdAt)).setHours(0, 0, 0, 0)).toString())) == parseInt(filter.toString())));

    const availableMethods = [...new Set(this.supports.map(item => item.payment.method.bic))];
    this.currentMethods = this.paymentsList.filter(obj => {
      return availableMethods.includes(obj.bic);
    })

    if (availableMethods.includes('store')) {
      this.currentMethods.push({ bic: "store", title: "FIELDS.PROFILE.PAYMENT_CHOICES._G", icon: "", name: "Store", value: "", description: "" })
    }
    if (this.currentMethods.length > 1) {
      this.currentMethods.unshift({ bic: "all", title: "FIELDS.PROFILE.PAYMENT_CHOICES._H", icon: "", name: "All", value: "", description: "" })
    }
    this.defaultMethod = { ...this.currentMethods[0] }
    this.selectedMethod = { ...this.defaultMethod };
  }

  checkAvailableActions() {
    const now = new Date();
    const seconds: number = parseInt(now.getTime().toString());

    this.canSupportCampaign = ((this.campaign.startsAt < seconds) && (this.campaign.expiresAt > seconds));
    this.canRevertPayment = (this.campaign.redeemStarts > seconds);
    this.canConfirmPayment = (this.campaign.redeemEnds > seconds);
  }

  /**
   * Fetch Microcredit Campaign Data (One Campaign)
   */
  fetchCampaignData() {
    this.itemsService.readCampaign(this.authenticationService.currentUserValue.user["_id"], this.campaign_id)
      .pipe(
        tap(
          data => {
            console.log("Campaign in ManageCampaign");
            console.log(data);
            this.campaign = data;
            // const datesRedeem = (this.campaign.statistics.redeemed) ? this.campaign.statistics.redeemed.byDate.map(obj => { return obj.date }) : [];
            // const datesPromise = (this.campaign.statistics.earned) ? this.campaign.statistics.earned.byDate.map(obj => { return obj.date }) : [];
            // this.validatedDates = datesRedeem.concat(datesPromise);
            this.campaign = data;

            this.checkAvailableActions();
          },
          error => {
          }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe();
  }

  /**
   * Fetch Microcredit Supports Data (One Campaign)
   */
  fetchSupportsData() {
    this.microcreditService.readAllSupportsByMicrocreditCampaign(this.authenticationService.currentUserValue.user["_id"], this.campaign_id)
      .pipe(
        tap(
          data => {
            this.supports = data;
            console.log("this.supports")
            console.log(this.supports)
            this.validatedDates = this.supports.map(obj => { return this.dateformat(new Date(obj.createdAt)) });

            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.setFilters()
          },
          error => {
          }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe();
  }

  changeSupportState(support_id: string, event: MatCheckboxChange) {
    this.loading = true;
    console.log("Support ID", support_id)
    this.microcreditService.confirmPayment(this.authenticationService.currentUserValue.user["_id"], this.campaign_id, support_id)
      .pipe(
        tap(
          data => {
            this.fetchCampaignData();
            this.fetchSupportsData();
            Swal.fire({
              title: this.translate.instant('MESSAGE.SUCCESS.TITLE'),
              text: this.translate.instant('MESSAGE.SUCCESS.CAMPAIGN_UPDATED'),
              icon: 'success',
              timer: 2500
            })
          },
          error => {
            event.source.checked = ((this.supports[this.supports.map((x) => { return x._id; }).
              indexOf(support_id)].status === 'unpaid')) ?
              false : true;
            Swal.fire(
              this.translate.instant('MESSAGE.ERROR.TITLE'),
              this.translate.instant(error),
              'error'
            );
          }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe();
  }

}
