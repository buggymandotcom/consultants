import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesIndexComponent } from './services-index/services-index.component';
import {RouterModule, Routes} from "@angular/router";
import {MaterialModule} from "../../../material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import { ServicesAccountingComponent } from './services-accounting/services-accounting.component';
import {SharedModule} from "../../../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {FuseSharedModule} from "../../../../../@fuse/shared.module";
import {MatDatepickerModule} from "@angular/material";
import {NavigationItem} from "../../../../shared/models/navigation/navigation-item";

import {AccountingNormaComponent} from "./accounting-norma/accounting-norma.component";
import {CanActivateClientGuard} from "../../../../core/auth/guards/client.guard";
import {CanActivateSubscriptionGuard} from "../../../../core/auth/guards/subscription.guard";
import {AuthModule} from "../../../../core/auth/auth.module";

const routes: Routes = [
    {
        path        : '',
        component   : ServicesIndexComponent,
    },
    {
        path        : 'accounting',
        component   : ServicesAccountingComponent,
        // canActivate : [CanActivateSubscriptionGuard],
        // data        : {services:['accounting']}
    },
    {
        path        : 'accounting/norma-43',
        component   : AccountingNormaComponent
    },
    {
        path        : 'models',
        loadChildren: './services-models/services-models.module#ServicesModelsModule'
    },
    {
        path        : 'models/:id',
        loadChildren: './services-models/services-models.module#ServicesModelsModule'
    }

];

@NgModule({
  declarations: [
    ServicesIndexComponent,
    ServicesAccountingComponent,
    AccountingNormaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    MatDatepickerModule,
    FuseSharedModule,
  ],
  providers: [
      CanActivateSubscriptionGuard
  ],
  exports: [
      RouterModule
  ]
})
export class ServicesPagesModule {
  constructor() {}
}
