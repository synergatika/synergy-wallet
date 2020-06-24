import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatCardModule, MatSelectModule, MatNativeDateModule, MatTableModule, MatDatepickerModule, MatSortModule, MatProgressSpinnerModule, MatTooltipModule, MAT_DATE_LOCALE, MatPaginatorModule } from '@angular/material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { TranslateModule } from '@ngx-translate/core';

/**
 * Components
 */
import { NewPartnerComponent } from './new-partner/new-partner.component';
import { AdminPartnersComponent } from './admin-partners/admin-partners.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: AdminPartnersComponent,
                pathMatch: 'full',
                data: {
                    title: 'MENU.PARTNERS'
                }
            },
            {
                path: 'create',
                component: NewPartnerComponent,
                data: {
                    title: 'MENU.PARTNERS'
                }
            },
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        RouterModule.forChild(routes),
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        TranslateModule.forChild(),
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatPaginatorModule,
        NgxMaterialTimepickerModule,

        // StoreModule.forFeature('auth', authReducer),
        // EffectsModule.forFeature([AuthEffects]),
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
        // InterceptService,
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: InterceptService,
        //     multi: true
        // },
    ],
    exports: [AdminPartnersComponent],
    declarations: [AdminPartnersComponent, NewPartnerComponent],
    entryComponents: [
    ]
})

export class AdminPartnersModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AdminPartnersModule,
            providers: [

            ]
        };
    }
}