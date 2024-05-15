import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../../material/material.module";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path        : '',
         component: AdminDashboardComponent,
        //redirectTo: '/ad/services',
        //pathMatch : 'full',
      },
      {
        path      : 'translations',
        loadChildren: './translations/translations.module#TranslationsPageModule'
      },
      {
        path      : 'clients',
        loadChildren: './adm-clients/adm-clients.module#AdminClientsPageModule'
      },
    ]
  },

];


@NgModule({
  declarations: [AdminLayoutComponent, AdminDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})
export class AdminPagesModule { }
