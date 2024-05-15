import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmClientsShowLayoutComponent } from './adm-clients-show-layout/adm-clients-show-layout.component';
import {RouterModule, Routes} from "@angular/router";
import {MaterialModule} from "../../../../material/material.module";
import {SharedModule} from "../../../../../shared/shared.module";
import {FlexLayoutModule} from "@angular/flex-layout";

const routes : Routes = [
  {
    path: '',
    component: AdmClientsShowLayoutComponent,
    children: [
      {
        path: 'information',
        loadChildren: './adm-client-info/adm-client-info.module#AdmClientInfoModule'
      },
      {
        path: 'services',
        loadChildren: './adm-client-services/adm-client-services.module#AdmClientServicesModule'
      },
    ]
  }
];

@NgModule({
  declarations: [AdmClientsShowLayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    SharedModule
  ]
})
export class AdmClientsShowModule { }
