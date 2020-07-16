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
import { TranslateModule } from '@ngx-translate/core';
import { ArchwizardModule } from 'angular-archwizard';

import { CardPartnerComponent } from './card-partner/card-partner.component';
import { CardOfferComponent } from './card-offer/card-offer.component';
import { CardPostComponent } from './card-post/card-post.component';
import { CardMicrocreditComponent } from './card-microcredit/card-microcredit.component';
import { CardSupportComponent } from './card-support/card-support.component';

import { ShareIconComponent } from '../../widgets/share-icon/share-icon.component';

@NgModule({
    imports: [
        ArchwizardModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        // RouterModule.forChild(),
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatDialogModule,
        MatCardModule,
        TranslateModule.forChild(),
        //  
        // StoreModule.forFeature('auth', authReducer),
        // EffectsModule.forFeature([AuthEffects]),
    ],
    providers: [
    ],
    exports: [CardPartnerComponent, CardOfferComponent, CardPostComponent, CardMicrocreditComponent, CardSupportComponent, ShareIconComponent],
    declarations: [
        CardPartnerComponent,
        CardOfferComponent,
        CardPostComponent,
        CardMicrocreditComponent,
        CardSupportComponent,

        ShareIconComponent
    ],
    entryComponents: [

    ]
})

export class CardsModule {
    static forRoot(): ModuleWithProviders<CardsModule> {
        return {
            ngModule: CardsModule,
            providers: [

            ]
        };
    }
}