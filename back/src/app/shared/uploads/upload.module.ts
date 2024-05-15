import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import {FlexLayoutModule} from "@angular/flex-layout";
import {ThumComponent} from "./thum/thum.component";
import {FileUploadModule} from "ng2-file-upload";
import { SimpleUploadComponent } from './simple-upload/simple-upload.component';
import {CustomUploadComponent} from "./custom-upload/custom-upload.component";
import {TranslateModule} from "@ngx-translate/core";
import {MaterialModule} from "../../main/material/material.module";
import {UploadService} from "../services/upload.service";




@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FileUploadModule,
    TranslateModule,
  ],

  declarations: [
    ThumComponent,
    SimpleUploadComponent,
    CustomUploadComponent,
  ],
  exports:[
    FileUploadModule,
    SimpleUploadComponent,
    CustomUploadComponent,
    ThumComponent,
  ],
  providers: [
    UploadService
  ]

})
export class UploadModule {
}
