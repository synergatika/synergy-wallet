import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { MatDialog, MatDialogConfig, MatSort, MatTableDataSource, MatCheckboxChange, MatPaginator } from '@angular/material';
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

/**
 * Models & Interfaces
 */
import { MicrocreditSupport } from 'src/app/core/models/microcredit_support.model';
import { MicrocreditCampaign } from 'src/app/core/models/microcredit_campaign.model';
import { PaymentList } from 'src/app/core/interfaces/payment-list.interface';

/**
 * Local Services & Interfaces
 */
// import { SupportService } from '../../partner-microcredit-support/_support.service';
// import { SupportInterface } from '../../partner-microcredit-support/_support.interface';

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

  /**
   * Flags(Check) Variables
   */
  canSupportCampaign: boolean = false;
  canConfirmPayment: boolean = false;
  canRevertPayment: boolean = false;

  /**
   * Data Table Variables
   */
  displayedColumns: string[] = ['payment_id', 'method', 'remainingTokens', 'initialTokens', 'createdAt', 'status'];
  dataSource: MatTableDataSource<MicrocreditSupport>;

  seconds: number = 0;

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
    // private supportService: SupportService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.campaign_id = params['_id'];
    });
    this.paymentsList = this.staticDataService.getPaymentsList;

    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit() {
    const now = new Date();
    this.seconds = parseInt(now.getTime().toString());
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
   * Table Filters (, Payment Mehod)
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
    // const adate = parseInt(((new Date(this.supports[0].createdAt)).setHours(0, 0, 0, 0)).toString());
    // const bdate = parseInt(((event.value).getTime()).toString());
    // console.log("eq", adate == bdate)
    // console.log("Filter Date:", parseInt(((event.value).getTime()).toString()));
    this.selectedMethod = { ...this.defaultMethod };
    this.textValueFilter = '';
    this.dataSource.filter = ((event.value).getTime());
    // console.log(typeof (event as HTMLInputElement).value);
  }

  setFilters() {
    this.dataSource.filterPredicate = (data: MicrocreditSupport, filter: any) =>
      (data.payment_id.includes(filter)) ||
      (data.method == filter) ||
      ((typeof filter != "string") && ((parseInt(((new Date(data.createdAt)).setHours(0, 0, 0, 0)).toString())) == parseInt(filter.toString())));

    const availableMethods = [...new Set(this.supports.map(item => item.method))];
    this.currentMethods = this.paymentsList.filter(obj => {
      return availableMethods.includes(obj.bic);
    })

    if (availableMethods.includes('store')) {
      this.currentMethods.push({ bic: "store", title: "FIELDS.PROFILE.PAYMENT_CHOICES._F", name: "Store", value: "", description: "" })
    }
    if (this.currentMethods.length > 1) {
      this.currentMethods.unshift({ bic: "all", title: "FIELDS.PROFILE.PAYMENT_CHOICES._G", name: "All", value: "", description: "" })
    }
    this.defaultMethod = { ...this.currentMethods[0] }
    this.selectedMethod = { ...this.defaultMethod };
  }

  /**
   * Fetch Microcredit Campaign Data (One Campaign)
   */
  fetchCampaignData() {
    this.itemsService.readCampaign(this.authenticationService.currentUserValue.user["_id"], this.campaign_id)
      .pipe(
        tap(
          data => {
            this.campaign = data;
            this.canSupportCampaign = ((this.campaign.startsAt < this.seconds) && (this.campaign.expiresAt > this.seconds)) ? true : false;
            this.canRevertPayment = (this.campaign.redeemStarts > this.seconds) ? true : false;
            this.canConfirmPayment = (this.campaign.redeemEnds > this.seconds) ? true : false;
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
            console.log(data);
            this.supports = data;
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            // console.log(((new Date(this.supports[0].createdAt)).getTime()));
            // console.log(parseInt(((new Date(this.supports[0].createdAt)).setHours(0, 0, 0, 0)).toString()));
            // console.log("My date:", new Date(((new Date(this.supports[0].createdAt)).setHours(0, 0, 0, 0))));

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

    this.microcreditService.confirmPayment(this.authenticationService.currentUserValue.user["_id"], this.campaign_id, support_id)
      .pipe(
        tap(
          data => {
            this.fetchSupportsData();
            Swal.fire({
              title: this.translate.instant('MESSAGE.SUCCESS.TITLE'),
              text: this.translate.instant('MESSAGE.SUCCESS.CAMPAIGN_UPDATED'),
              icon: 'success',
              timer: 2500
            })
          },
          error => {
            event.source.checked = (this.supports[this.supports.map((x) => { return x.support_id; }).
              indexOf(support_id)].status === 'order') ?
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

  /**
   * Open Dialog
   * 
   * @param campaign: MicrocreditCampaign
   */
  openModal(campaign: MicrocreditCampaign) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      campaign: campaign
    };
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(StepperPartnerMicrocreditSupportComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(value => {
      if (value) this.fetchSupportsData();
    });
  }

  // closeModal(event) {
  //   console.log("NOOO", event);
  //   this.fetchSupportsData();
  // }
}
