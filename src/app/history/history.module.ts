import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatDialogModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { HistoryComponent } from './history.component';
import { LoyaltyHistoryComponent } from './loyalty/loyalty.component';
import { MicrocreditHistoryComponent } from './microcredit/microcredit.component';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
    {
        path: '',
        component: HistoryComponent,
        children: [
            {
                path: '',
                redirectTo: 'loyalty',
            },
            {
                path: 'loyalty',
                component: LoyaltyHistoryComponent,
                data: { title: 'SETTINGS.SUBMENU.LOYALTY' }
            },
            {
                path: 'microcredit',
                component: MicrocreditHistoryComponent,
                data: { title: 'SETTINGS.SUBMENU.MICROCREDIT' }
            }
        ]
    }
];


@NgModule({
    imports: [
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
        NgxPaginationModule
        // StoreModule.forFeature('auth', authReducer),
        // EffectsModule.forFeature([AuthEffects]),
    ],
    providers: [
        // InterceptService,
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: InterceptService,
        //     multi: true
        // },
    ],
    exports: [HistoryComponent],
    declarations: [
        HistoryComponent,
        LoyaltyHistoryComponent,
        MicrocreditHistoryComponent
    ],
    entryComponents: [
    ]
})

export class HistoryModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: HistoryModule,
            providers: [

            ]
        };
    }
}