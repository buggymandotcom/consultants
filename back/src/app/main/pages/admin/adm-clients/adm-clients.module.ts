import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MaterialModule} from "../../../material/material.module";
import {SharedModule} from "../../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import { AdmClientsDashboardComponent } from './adm-clients-dashboard/adm-clients-dashboard.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {TaxModelService} from "../../../../shared/services/tax-model.service";

const routes: Routes = [
  {
    path:'',
    component:AdmClientsDashboardComponent
  },
  {
    path: ':id',
    loadChildren: './adm-clients-show/adm-clients-show.module#AdmClientsShowModule'
  }
];

@NgModule({
  imports: [
    MatAutocompleteModule,
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  declarations: [AdmClientsDashboardComponent],
  exports:[],
  providers: [TaxModelService]

})
export class AdminClientsPageModule {}
