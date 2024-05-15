import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../../material/material.module";
import {FuseSharedModule} from "../../../../@fuse/shared.module";
import {RouterModule, Routes} from "@angular/router";
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import {SharedModule} from "../../../shared/shared.module";
import { ProfileComponent } from './profile/profile.component';
import {TaxModelService} from "../../../shared/services/tax-model.service";
import { DClientCommunicationsComponent } from './client-layout/d-client-communications/d-client-communications.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FuseDirectivesModule} from '../../../../@fuse/directives/directives';

const routes: Routes = [
    {
        path: '',
        component: ClientLayoutComponent,
        children: [
            {
                path        : '',
                // component: ClientDashboardComponent,
                redirectTo: '/client/services',
                pathMatch : 'full',
            },
            {
                path        : 'services',
                loadChildren: './services/services.module#ServicesPagesModule',
            },
            {
                path        : 'profile',
                loadChildren: './profile/profile.module#ProfileModule',
            },
        ]
    }
];


@NgModule({
    declarations: [ClientLayoutComponent, ClientDashboardComponent, DClientCommunicationsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        FuseDirectivesModule,
    ],
    exports: [
        RouterModule
    ],
    entryComponents: [
        DClientCommunicationsComponent
    ],
    providers: [TaxModelService]
})
export class ClientPagesModule { }
