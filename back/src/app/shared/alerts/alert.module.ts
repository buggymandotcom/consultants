import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {RoutingModule} from "../../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {FlexLayoutModule} from "@angular/flex-layout";
import {AlertService} from "./services/alert.service";
import {
  ConfirmationDialogComponent, ErrorDialogComponent,
  ErrorValidationDialogComponent
} from "./dialogs/dialog.component";
import {TranslateModule} from "@ngx-translate/core";

import {MatSnackBarConfig} from "@angular/material";
import {MaterialModule} from "../../main/material/material.module";
import {SharedModule} from "../shared.module";


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    //FormsModule,
    //ReactiveFormsModule,
    BrowserModule,
    //FormsModule,
    //ReactiveFormsModule,
    HttpModule,
    RoutingModule,
    BrowserAnimationsModule,
    TranslateModule,
    SharedModule
  ],
  entryComponents:[
   ErrorDialogComponent,
   ErrorValidationDialogComponent,
   ConfirmationDialogComponent
  ],
  declarations: [ErrorDialogComponent,ErrorValidationDialogComponent,ConfirmationDialogComponent],
  exports:[],
  providers: [AlertService,MatSnackBarConfig]

})
export class AlertModule {

}
