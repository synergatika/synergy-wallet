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

import { ScannerComponent } from './scanner.component';
import { ScanOffersComponent } from './scan-offers/scan-offers.component';
import { ScanLoyaltyComponent } from './scan-loyalty/scan-loyalty.component';
import { ScanMicrocreditComponent } from './scan-microcredit/scan-microcredit.component';

import { SubScannerComponent } from './sub-scanner/sub-scanner.component';
import { SubAmountFormComponent } from './sub-amount-form/sub-amount-form.component';
import { SubEmailFormComponent } from './sub-email-form/sub-email-form.component';
import { SubDiscountFormComponent } from './sub-discount-form/sub-discount-form.component';
import { SubOfferFormComponent } from './sub-offer-form/sub-offer-form.component';
import { SubIdentifierFormComponent } from './sub-identifier-form/sub-identifier-form.component';
import { SubFinalStepComponent } from './sub-final-step/sub-final-step.component';
import { SubMicrocreditFormComponent } from './sub-microcredit-form/sub-microcredit-form.component';

import { ScannerNoticeComponent } from './scanner-notice/scanner-notice.component';

import { ScannerService } from './_scanner.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CardsModule } from '../views/layout/cards/cards.module';

const routes: Routes = [
    {
        path: '',
        component: ScannerComponent,
        children: [
            {
                path: 'offer/:offer_id',
                component: ScanOffersComponent,
            },
            {
                path: 'loyalty',
                component: ScanLoyaltyComponent
            },
            {
                path: 'microcredit',
                component: ScanMicrocreditComponent,
            }
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
        MatDialogModule,
        MatCardModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        CarouselModule,
        TranslateModule.forChild(),
        // StoreModule.forFeature('auth', authReducer),
        // EffectsModule.forFeature([AuthEffects]),
        CardsModule,
    ],
    providers: [
        ScannerService
        // InterceptService,
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: InterceptService,
        //     multi: true
        // },
    ],
    exports: [ScannerComponent],
    declarations: [
        ScannerComponent,
        ScanOffersComponent,
        ScanLoyaltyComponent,
        ScanMicrocreditComponent,
        SubScannerComponent,
        SubAmountFormComponent,
        SubEmailFormComponent,
        SubDiscountFormComponent,
        SubOfferFormComponent,
        SubIdentifierFormComponent,
        SubFinalStepComponent,
        SubMicrocreditFormComponent,
        ScannerNoticeComponent
    ],
    entryComponents: [
    ]
})

export class ScannerModule {
    static forRoot(): ModuleWithProviders<ScannerModule> {
        return {
            ngModule: ScannerModule,
            providers: [

            ]
        };
    }
}