import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatCardModule, MatProgressSpinnerModule, MatSelectModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModalModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

/**
 * Guards
 */
import { AuthGuard } from '../core/guards/auth.guard';
import { SubConfigGuard } from '../core/guards/subConfig.guard';

/**
 * Components
 */
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterPartnerComponent } from './register-partner/register-partner.component';
import { ForgotPasswordComponent } from './forgot_password/forgot_password.component';
import { PasswordVerificationComponent } from './password_verification/password_verification.component';
import { EmailVerificationComponent } from './email_verification/email_verification.component';
import { NeedVerificationComponent } from './need_verification/need_verification.component';
import { PasswordRestorationComponent } from './password_restoration/password_restoration.component';
import { AuthNoticeComponent } from './auth-notice/auth-notice.component';
import { TermsComponent } from './terms/synergy_terms.component';
// import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';

/**
 * Services
 */
import { AuthenticationService } from '../core/services/authentication.service';
import { ViewsModule } from '../views/views/views.module';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: LoginComponent,
                data: { returnUrl: window.location.pathname }
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'partner',
                component: RegisterPartnerComponent,
                data: {
                    accessIndex: 3,
                },
                canActivate: [SubConfigGuard]
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent,
            },
            {
                path: 'need-verification',
                component: NeedVerificationComponent,
            },
            {
                path: 'verify-password/:token',
                component: PasswordVerificationComponent,
            },
            {
                path: 'verify-email/:token',
                component: EmailVerificationComponent,
            },
            {
                path: 'reset-password/:token',
                component: PasswordRestorationComponent,
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
        MatCardModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        NgbModalModule,
        NgbDropdownModule,
        ViewsModule
    ],
    providers: [
    ],
    exports: [AuthComponent],
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        RegisterPartnerComponent,
        ForgotPasswordComponent,
        PasswordVerificationComponent,
        EmailVerificationComponent,
        NeedVerificationComponent,
        PasswordRestorationComponent,
        AuthNoticeComponent,
        TermsComponent,
    ],
    entryComponents: [
        TermsComponent
    ]
})

export class AuthModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [
                AuthenticationService,
                AuthGuard
            ]
        };
    }
}