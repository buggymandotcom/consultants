import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmClientServicesComponent } from './adm-client-services.component';
import {RouterModule, Routes} from "@angular/router";
import {MaterialModule} from "../../../../../material/material.module";
import {SharedModule} from "../../../../../../shared/shared.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import { AdmClientModelsComponent } from './adm-client-models/adm-client-models.component';

const routes: Routes = [
    {
        path: '',
        component: AdmClientServicesComponent
    },
    {
        path: 'accounting',
        loadChildren: './adm-client-accounting/adm-client-accounting.module#AdmClientAccountingModule'
    },
    {
        path: 'models',
        loadChildren: './adm-client-models/adm-client-models.module#AdmClientModelsModule'
    }
];

@NgModule({
  declarations: [AdmClientServicesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
  ]
})
export class AdmClientServicesModule { }
