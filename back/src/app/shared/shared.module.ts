import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UploadModule} from "./uploads/upload.module";
import {LoadingSpinnerComponent} from "./components/loading-spinner/loading-spinner.component";
import {AuthService} from "../core/auth/services/authentication.service";
import {MomentModule} from "angular2-moment";
import {NgxPaginationModule} from "ngx-pagination";
import {AiPaginationTemplateComponent} from "./components/pagination/pagination-template/pagination-template.component";
import {MaterialModule} from "../main/material/material.module";
import {MdiIconComponent} from "./components/mdi-icon/mdi-icon.component";
import {CustomThComponent} from "./components/custom-th/custom-th.component";
import {UserService} from "./services/user.service";
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {Http} from "@angular/http";
import {ClipboardModule} from "ngx-clipboard";
import {AiNavigationService} from "../core/navigation/components/navigation/navigation.service";
import {ClientService} from "./services/client.service";
import {DeleteFileTimerComponent} from "./components/delete-file-timer/delete-file-timer.component";
import {AccountingService} from "./services/accounting.service";
import {DShowAcctUploadComponent} from "./dialogs/d-show-acct-upload/d-show-acct-upload.component";
import {FormsModule} from "@angular/forms";
import {FoundationsService} from "./services/foundations.service";
import {Declaration210Service} from "./services/declaration210.service";
import {GeoSpainService} from "./services/geo-spain.service";



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    AiPaginationTemplateComponent,
    MdiIconComponent,
    CustomThComponent,
    DeleteFileTimerComponent,
    DShowAcctUploadComponent
  ],
  imports: [
    CommonModule,
    UploadModule,
    MomentModule,
    MaterialModule,
    NgxPaginationModule,
    ClipboardModule,
    TranslateModule,
    FormsModule
  ],
  exports: [
    UploadModule,
    LoadingSpinnerComponent,
    MomentModule,
    NgxPaginationModule,
    TranslateModule,

    AiPaginationTemplateComponent,
    MdiIconComponent,
    CustomThComponent,
    ClipboardModule,
    DeleteFileTimerComponent,
    DShowAcctUploadComponent

  ],
  entryComponents: [
    CustomThComponent,
    DShowAcctUploadComponent

  ],
  providers: [
    AuthService,
    UserService,
    AiNavigationService,
    ClientService,
    AccountingService,
    FoundationsService,
    Declaration210Service,
    GeoSpainService
  ]
})
export class SharedModule { }
