import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmClientAccountingComponent } from './adm-client-accounting.component';
import {RouterModule, Routes} from "@angular/router";
import {MaterialModule} from "../../../../../../material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../../../../../../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material";
import {FuseSharedModule} from "../../../../../../../../@fuse/shared.module";

const routes: Routes = [
  {
    path: '',
    component: AdmClientAccountingComponent
  },
];

@NgModule({
  declarations: [
    AdmClientAccountingComponent
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
  ]
})
export class AdmClientAccountingModule { }
