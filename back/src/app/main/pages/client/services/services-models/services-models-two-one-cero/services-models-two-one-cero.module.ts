import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MaterialModule} from "../../../../../material/material.module";
import {SharedModule} from "../../../../../../shared/shared.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ServicesModelsTwoOneCeroComponent} from "./services-models-two-one-cero.component";

const routes: Routes = [
    {
        path: '',
        component: ServicesModelsTwoOneCeroComponent
    }
];

@NgModule({
  declarations: [ServicesModelsTwoOneCeroComponent],
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
      MatDatepickerModule,
      MatRadioModule,
      MatTooltipModule
  ]
})
export class ServicesModelsTwoOneCeroModule { }
