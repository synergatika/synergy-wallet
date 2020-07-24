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
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

import { environment } from '../../../environments/environment';

import { QRCodeModule } from 'angularx-qrcode';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

/**
 * Components (Item Card)
 */
import { PartnerCardComponent } from './cards/partner-card/partner-card.component';
import { PostEventCardComponent } from './cards/post_event-card/post_event-card.component';
import { OfferCardComponent } from './cards/offer-card/offer-card.component';
import { MicrocreditCampaignCardComponent } from './cards/microcredit_campaign-card/microcredit_campaign-card.component';
import { MicrocreditSupportCardComponent } from './cards/microcredit_support-card/microcredit_support-card.component';
import { LoyaltyBadgeCardComponent } from './cards/loyalty_badge-card/loyalty_badge-card.component';
import { MicrocreditBadgeCardComponent } from './cards/microcredit_badge-card/microcredit_badge-card.component';
import { LoyaltyBalanceCardComponent } from './cards/loyalty_balance-card/loyalty_balance-card.component';
import { QRCodeCardComponent } from './cards/qr_code-card/qr_code-card.component';

/**
 * Components (Single Item)
 */
import { PartnerSingleComponent } from './single-items/partner-single/partner-single.component';
import { PostEventSingleComponent } from './single-items/post_event-single/post_event-single.component';
import { MicrocreditCampaignSingleComponent } from './single-items/microcredit_campaign-single/microcredit_campaign-single.component';

/**
 * Components (Items List)
 */
import { PartnersListCarouselComponent } from './lists/partners-list-carousel/partners-list-carousel.component';
import { PartnersListScrollComponent } from './lists/partners-list-scroll/partners-list-scroll.component';
import { PostsEventsListCarouselComponent } from './lists/posts_events-list-carousel/posts_events-list-carousel.component';
import { PostsEventsListScrollComponent } from './lists/posts_events-list-scroll/posts_events-list-scroll.component';
import { OffersListCarouselComponent } from './lists/offers-list-carousel/offers-list-carousel.component';
import { OffersListScrollComponent } from './lists/offers-list-scroll/offers-list-scroll.component';
import { MicrocreditCampaignsListCarouselComponent } from './lists/microcredit_campaigns-list-carousel/microcredit_campaigns-list-carousel.component';
import { MicrocreditCampaignsListScrollComponent } from './lists/microcredit_campaigns-list-scroll/microcredit_campaigns-list-scroll.component';
import { MicrocreditSupportsListPaginationComponent } from './lists/microcredit_supports-list-pagination/microcredit_supports-list-pagination.component';

/**
 * Components (Widgets)
 */
import { ShareIconComponent } from './widgets/share-icon/share-icon.component';
import { LanguageSwitcherComponent } from './widgets/language-switcher/language-switcher.component';
import { MapComponent } from './widgets/map/map.component';

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
        MatTooltipModule,
        TranslateModule.forChild(),
        NgbDropdownModule,
        CarouselModule,
        InfiniteScrollModule,
        RouterModule,//  
        NgxPaginationModule,
        QRCodeModule,  // StoreModule.forFeature('auth', authReducer),
        // EffectsModule.forFeature([AuthEffects]),
        AgmCoreModule.forRoot({
            apiKey: `${environment.mapApiKey}`
        }),
    ],
    providers: [
    ],
    exports: [
        PartnerCardComponent,
        OfferCardComponent,
        PostEventCardComponent,
        MicrocreditCampaignCardComponent,
        MicrocreditSupportCardComponent,
        LoyaltyBadgeCardComponent, MicrocreditBadgeCardComponent, LoyaltyBalanceCardComponent, QRCodeCardComponent,

        ShareIconComponent, LanguageSwitcherComponent, MapComponent,

        PartnerSingleComponent, PostEventSingleComponent, MicrocreditCampaignSingleComponent,

        PartnersListCarouselComponent, PartnersListScrollComponent,
        MicrocreditCampaignsListCarouselComponent, MicrocreditCampaignsListScrollComponent,
        MicrocreditSupportsListPaginationComponent,
        OffersListCarouselComponent, OffersListScrollComponent,
        PostsEventsListCarouselComponent, PostsEventsListScrollComponent
    ],
    declarations: [
        PartnerCardComponent,
        OfferCardComponent,
        PostEventCardComponent,
        MicrocreditCampaignCardComponent,
        MicrocreditSupportCardComponent,
        LoyaltyBadgeCardComponent, MicrocreditBadgeCardComponent, LoyaltyBalanceCardComponent, QRCodeCardComponent,

        ShareIconComponent, LanguageSwitcherComponent, MapComponent,

        PartnerSingleComponent, PostEventSingleComponent, MicrocreditCampaignSingleComponent,

        PartnersListCarouselComponent, PartnersListScrollComponent,
        MicrocreditCampaignsListCarouselComponent, MicrocreditCampaignsListScrollComponent,
        MicrocreditSupportsListPaginationComponent,
        OffersListCarouselComponent, OffersListScrollComponent,
        PostsEventsListCarouselComponent, PostsEventsListScrollComponent
    ],
    entryComponents: [

    ]
})

export class ViewsModule {
    static forRoot(): ModuleWithProviders<ViewsModule> {
        return {
            ngModule: ViewsModule,
            providers: [

            ]
        };
    }
}