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
import { NewMemberComponent } from './new-member/new-member.component';
import { AdminMembersComponent } from './admin-members/admin-members.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: AdminMembersComponent,
                pathMatch: 'full',
                data: {
                    title: 'MENU.MEMBERS'
                }
            },
            {
                path: 'create',
                component: NewMemberComponent,
                data: {
                    title: 'MENU.MEMBERS'
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
    exports: [AdminMembersComponent],
    declarations: [AdminMembersComponent, NewMemberComponent],
    entryComponents: [
    ]
})

export class AdminMembersModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AdminMembersModule,
            providers: [

            ]
        };
    }
}