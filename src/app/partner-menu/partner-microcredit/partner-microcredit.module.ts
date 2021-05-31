import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { TranslateModule } from '@ngx-translate/core';
import { NgbModalModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ArchwizardModule } from 'angular-archwizard';

import { NewMicrocreditCampaignComponent } from './new-microcredit-campaign/new-microcredit-campaign.component';
import { EditMicrocreditCampaignComponent } from './edit-microcredit-campaign/edit-microcredit-campaign.component';
import { PartnerCampaignsComponent } from './partner-campaigns/partner-campaigns.component';
import { ManageMicrocreditCampaignComponent } from './manage-microcredit-campaign/manage-microcredit-campaign.component';


import { AuthenticationService } from '../../core/services/authentication.service';
import { AuthGuard } from '../../core/guards/auth.guard';

/**
 * Manage Microcredit Components & Local Services
 */
import {
    SngCoreModule,
} from 'sng-core';
// import { WidgetsModule } from '../../core/_components/widgets.module';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: PartnerCampaignsComponent,
                data: { returnUrl: window.location.pathname }
            },
            {
                path: 'create',
                component: NewMicrocreditCampaignComponent,
                data: { returnUrl: window.location.pathname }
            },
            {
                path: 'edit/:_id',
                component: EditMicrocreditCampaignComponent,
                data: { returnUrl: window.location.pathname }
            },
            {
                path: 'manage/:_id',
                component: ManageMicrocreditCampaignComponent,
                data: { returnUrl: window.location.pathname }
            },
        ]
    }
];

@NgModule({
    imports: [
        ZXingScannerModule,
        ArchwizardModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        RouterModule.forChild(routes),
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        TranslateModule.forChild(),
        MatDialogModule,
        MatCardModule,
        NgbModalModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTabsModule,
        MatTableModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatPaginatorModule,
        NgxMaterialTimepickerModule,
        NgbDropdownModule,
        SngCoreModule,
        // WidgetsModule
    ],
    providers: [
    ],
    declarations: [
        PartnerCampaignsComponent,
        NewMicrocreditCampaignComponent,
        EditMicrocreditCampaignComponent,
        ManageMicrocreditCampaignComponent,
    ],
    entryComponents: [
    ]
})

export class PartnerMicrocreditModule {
    static forRoot(): ModuleWithProviders<PartnerMicrocreditModule> {
        return {
            ngModule: PartnerMicrocreditModule,
            providers: [
                AuthenticationService,
                AuthGuard
            ]
        };
    }
}
