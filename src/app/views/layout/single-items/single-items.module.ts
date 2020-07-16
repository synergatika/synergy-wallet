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
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ArchwizardModule } from 'angular-archwizard';

import { SinglePartnerComponent } from './single-partner/single-partner.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { SingleMicrocreditComponent } from './single-microcredit/single-microcredit.component';
import { MemberSupportModule } from 'src/app/member-support/member-support.module';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { CardsModule } from '../cards/cards.module';

@NgModule({
    imports: [
        // MemberSupportModule,
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
        MatTooltipModule,
        TranslateModule.forChild(),
        CarouselModule,

        CardsModule
        //  
        // StoreModule.forFeature('auth', authReducer),
        // EffectsModule.forFeature([AuthEffects]),
    ],
    providers: [
    ],
    exports: [SinglePartnerComponent, SinglePostComponent, SingleMicrocreditComponent],
    declarations: [
        SinglePartnerComponent,
        SinglePostComponent,
        SingleMicrocreditComponent
    ],
    entryComponents: [

    ]
})

export class SingleItemsModule {
    static forRoot(): ModuleWithProviders<SingleItemsModule> {
        return {
            ngModule: SingleItemsModule,
            providers: [

            ]
        };
    }
}