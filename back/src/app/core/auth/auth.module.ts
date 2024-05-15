import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {RoutingModule} from "../../app-routing.module";

import {FlexLayoutModule} from "@angular/flex-layout";
import {AuthService} from "./services/authentication.service";
import {CanActivateRoleGuard} from "./guards/role.guard";
import {CanActivateClientGuard} from "./guards/client.guard";
import {UserService} from "../../shared/services/user.service";
import {CanActivateHomePageGuard} from "./guards/home-page.guard";
import {MaterialModule} from "../../main/material/material.module";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import {CanActivateAdminGuard} from "./guards/admin.guard";
import {LoginComponent} from "./components/login/login.component";
import {LoginAdminComponent} from "./components/login-admin/login-admin.component";
import {CanActivateSubscriptionGuard} from "./guards/subscription.guard";
import {Register2Component} from "./components/register-2/register-2.component";
import { ActivateComponent } from './components/activate/activate.component';

const routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            // {
            //     path     : 'forgot-password',
            //     component: ForgotPasswordComponent
            // },
            {
                path     : 'login',
                component: LoginComponent
            },
            {
                path     : 'admin/login',
                component: LoginAdminComponent
            },
            // {
            //     path     : 'lock',
            //     component: LockComponent
            // },
            /*{
                path     : 'register',
                component: RegisterComponent
            },*/
            {
                path     : 'register',
                component: Register2Component
            },
            {
                path     : 'activate/:client',
                component: ActivateComponent
            },
            // {
            //     path     : 'reset-password',
            //     component: ResetPasswordComponent
            // },
        ]
    }
];

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(routes),
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      FlexLayoutModule,
      SharedModule,
  ],

  declarations: [
      LoginComponent,
      LoginAdminComponent,
      Register2Component,
      AuthLayoutComponent,
      ActivateComponent,
  ],
  providers: [
      AuthService,
      CanActivateRoleGuard,
      CanActivateClientGuard,
      CanActivateSubscriptionGuard,
      CanActivateHomePageGuard,
      CanActivateAdminGuard,
  ]

})
export class AuthModule {

  constructor() {
    // sidenavService.addItem('Login',null,'/login',20);
  }
}
