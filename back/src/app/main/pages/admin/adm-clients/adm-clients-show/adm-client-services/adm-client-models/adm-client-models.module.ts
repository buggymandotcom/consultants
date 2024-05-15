import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdmClientModelsComponent} from "./adm-client-models.component";
import {MaterialModule} from "../../../../../../material/material.module";
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../../../../../../../shared/shared.module";
import {FuseSharedModule} from "../../../../../../../../@fuse/shared.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";

const routes: Routes = [
    {
        path: '',
        component: AdmClientModelsComponent,
    },
    {
        path: ':model/draft720/:draft',
        loadChildren: './adm-client-model-seven-two-cero/adm-client-model-seven-two-cero.module#AdmClientModelSevenTwoCeroModule',
    },
    {
        path: ':model/draft210/:draft',
        loadChildren: './adm-client-model-two-one-cero/adm-client-model-two-one-cero.module#AdmClientModelTwoOneCeroModule',
    },
];

@NgModule({
  declarations: [
      AdmClientModelsComponent
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
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatSlideToggleModule
  ],
})
export class AdmClientModelsModule { }
