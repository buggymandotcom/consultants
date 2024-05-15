import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { AdmClientModelSevenTwoCeroComponent } from './adm-client-model-seven-two-cero.component';
import { AdmSevenTwoCeroPropertyComponent } from './adm-seven-two-cero-property/adm-seven-two-cero-property.component';
import {MaterialModule} from "../../../../../../../material/material.module";
import {SharedModule} from "../../../../../../../../shared/shared.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatStepperModule} from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';

const routes: Routes = [
    {
        path: '',
        component: AdmClientModelSevenTwoCeroComponent
    }
];

@NgModule({
  declarations: [AdmClientModelSevenTwoCeroComponent, AdmSevenTwoCeroPropertyComponent],
  imports: [
      CommonModule,
      RouterModule.forChild(routes),
      MaterialModule,
      FlexLayoutModule,
      FormsModule,
      ReactiveFormsModule,
      MatSlideToggleModule,
      SharedModule,
      MatGridListModule,
      MatButtonToggleModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatStepperModule,
      MatDatepickerModule
      ]
})

export class AdmClientModelSevenTwoCeroModule { }
