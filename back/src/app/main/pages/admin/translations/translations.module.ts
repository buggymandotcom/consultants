import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslationsComponent} from "./translations.component";
import {RouterModule, Routes} from "@angular/router";
import { GroupTranslationsComponent } from './group-translations/group-translations.component';
import {MaterialModule} from "../../../material/material.module";
import {SharedModule} from "../../../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {AireTransHttpService} from "./aire-trans-http.service";
import {FlexLayoutModule} from "@angular/flex-layout";







const routes: Routes = [
  {
    path:'',
    component:TranslationsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    FormsModule
  ],

  declarations: [TranslationsComponent, GroupTranslationsComponent ],
  exports:[],
  providers: [AireTransHttpService]

})
export class TranslationsPageModule {}
