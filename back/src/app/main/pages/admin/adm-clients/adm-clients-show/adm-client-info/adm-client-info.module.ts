import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmClientInfoComponent } from './adm-client-info.component';
import {RouterModule, Routes} from "@angular/router";
import {MaterialModule} from "../../../../../material/material.module";
import {SharedModule} from "../../../../../../shared/shared.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material";

const routes: Routes = [
  {
    path: '',
    component: AdmClientInfoComponent
  }
];

@NgModule({
  declarations: [AdmClientInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    SharedModule,
  ]
})
export class AdmClientInfoModule { }
