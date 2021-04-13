import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule } from '@ngx-translate/core';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ArchwizardModule } from 'angular-archwizard';

//import { ScannerComponent } from './scanner.component';
//import { ScanOffersComponent } from './scan-offers/scan-offers.component';
//import { ScanMicrocreditComponent } from './scan-microcredit/scan-microcredit.component';

import { StepperPartnerLoyaltyPointsComponent } from './stepper-partner-loyalty_points.component';

import { SubAmountFormComponent } from './sub-amount-form/sub-amount-form.component';
import { SubAmountScanComponent } from './sub-amount-scan/sub-amount-scan.component';
import { SubDiscountFormComponent } from './sub-discount-form/sub-discount-form.component';
import { SubFinalStepComponent } from './sub-final-step/sub-final-step.component';

//import { SubOfferFormComponent } from './sub-offer-form/sub-offer-form.component';
//import { SubMicrocreditFormComponent } from './sub-microcredit-form/sub-microcredit-form.component';

import { LocalLoyaltyService } from './_loyalty.service';
import { StepperCommonModule } from '../stepper-common/stepper-common.module';

const routes: Routes = [
    {
        path: '',
        component: StepperPartnerLoyaltyPointsComponent,
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
        MatDialogModule,
        MatCardModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        TranslateModule.forChild(),
        StepperCommonModule
    ],
    providers: [
        LocalLoyaltyService
    ],
    exports: [StepperPartnerLoyaltyPointsComponent],
    declarations: [
        StepperPartnerLoyaltyPointsComponent,

        SubAmountScanComponent,
        SubAmountFormComponent,
        SubDiscountFormComponent,
        SubFinalStepComponent
    ],
    entryComponents: [
        StepperPartnerLoyaltyPointsComponent
    ]
})

export class StepperPartnerLoyaltyPointsModule {
    static forRoot(): ModuleWithProviders<StepperPartnerLoyaltyPointsModule> {
        return {
            ngModule: StepperPartnerLoyaltyPointsModule,
            providers: [

            ]
        };
    }
}