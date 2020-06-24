import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatCardModule, MatRadioModule, MatProgressSpinnerModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ArchwizardModule } from 'angular-archwizard';

//import { ScannerComponent } from './scanner.component';
//import { ScanOffersComponent } from './scan-offers/scan-offers.component';
//import { ScanMicrocreditComponent } from './scan-microcredit/scan-microcredit.component';

import { StepperPartnerLoyaltyPointsComponent } from './stepper-partner-loyalty_points.component';

import { SubAmountFormComponent } from './sub-amount-form/sub-amount-form.component';
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

        SubAmountFormComponent,
        SubDiscountFormComponent,
        SubFinalStepComponent
    ],
    entryComponents: [
        StepperPartnerLoyaltyPointsComponent
    ]
})

export class StepperPartnerLoyaltyPointsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: StepperPartnerLoyaltyPointsModule,
            providers: [

            ]
        };
    }
}