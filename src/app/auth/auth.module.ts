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
import { MatSelectModule } from '@angular/material/select';
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

import {
  SngCoreModule,
  ITranslationService,
  IAuthenticationService,
  IStaticDataService,
  IMenuService
} from 'sng-core';
import { MenuService } from '../core/helpers/menu.service';
import { StaticDataService } from '../core/helpers/static-data.service';
import { TranslationService } from '../core/helpers/translation.service';

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
        ViewsModule,
        SngCoreModule,
    ],
    providers: [
      { provide: IMenuService, useClass: MenuService },
      { provide: IStaticDataService, useClass: StaticDataService },
      { provide: ITranslationService, useClass: TranslationService },
      { provide: IAuthenticationService, useClass: AuthenticationService },
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
    static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
                AuthenticationService,
                AuthGuard
            ]
        };
    }
}
