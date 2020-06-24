import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatCardModule, MatListModule, MatProgressSpinnerModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { ArchwizardModule } from 'angular-archwizard';

//Support Page
// import { MemberSupportComponent } from '../member-support/member-support.component';
//Campaign Single
// import { SingleMicrocreditComponent } from './single-microcredit/single-microcredit.component';

//Pledge Form
import { StepperMemberMicrocreditSupportComponent } from './stepper-member-microcredit_support.component'
import { SubAmountFormComponent } from './sub-amount-form/sub-amount-form.component';
import { SubFinalStepComponent } from './sub-final-step/sub-final-step.component';
import { LocalMicrocreditService } from './_microcredit.service';

import { StepperNoticeComponent } from '../stepper-common/stepper-notice/stepper-notice.component';
//import { CardMicrocreditComponent } from '../views/layout/cards/card-microcredit/card-microcredit.component';

import { ViewsModule } from '../views/views/views.module';
import { MicrocreditCampaignSingleComponent } from '../views/views/single-items/microcredit_campaign-single/microcredit_campaign-single.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { StepperCommonModule } from '../stepper-common/stepper-common.module';

const routes: Routes = [
    {
        path: '',
        component: StepperMemberMicrocreditSupportComponent,
    }
];


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatDialogModule,
        MatCardModule,
        MatListModule,
        MatProgressSpinnerModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),

        ArchwizardModule,
        StepperCommonModule,
    ],
    providers: [LocalMicrocreditService],
    exports: [StepperMemberMicrocreditSupportComponent],
    declarations: [
        StepperMemberMicrocreditSupportComponent,
        SubAmountFormComponent,
        SubFinalStepComponent,
    ],
    entryComponents: [StepperMemberMicrocreditSupportComponent]
})

export class StepperMemberMicrocreditSupportModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: StepperMemberMicrocreditSupportModule,
            providers: [

            ]
        };
    }
}