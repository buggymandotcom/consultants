import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
    MatDialog,
    MatIconRegistry
} from '@angular/material';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';

import { RoutingModule } from './app-routing.module';
import { AlertModule } from "./shared/alerts/alert.module";

import {StateService} from "./state.service";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {env} from "../environments/env";

import {MOMENT_DATE_FORMATS} from "./shared/custom-date-adapter";
import {MomentDateAdapter} from "@angular/material-moment-adapter";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http,env.baseEndPoint+'/translation/','');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RoutingModule,

        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AlertModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,

        //Custom Modules

    ],
    bootstrap   : [
        AppComponent
    ],
    providers :[
        {provide: MAT_DATE_FORMATS, useValue: MOMENT_DATE_FORMATS},
        {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    ]


})


export class AppModule
{
    constructor(private state: StateService, public dialog: MatDialog, matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/materialdesignicons/mdi.svg'));
    }
    OnInit(store) {
        if (store !== undefined) {
            this.state.SetState(store.State);

            for (let i = 0; i < this.state.OpenDialogs.length; i++) {
                const t = this.state.OpenDialogs[i].componentInstance;
                this.dialog.open(t.constructor, { data: t.data });
            }
        }
    }

    OnDestroy(store) {
        this.state.OpenDialogs = this.dialog.openDialogs;
        store.State = this.state;

        const elements = document.getElementsByClassName('cdk-overlay-container');
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = '';
        }
    }
}
