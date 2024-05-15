import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../../../material/material.module";
import {SharedModule} from "../../../../shared/shared.module";
import {FuseSharedModule} from "../../../../../@fuse/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "./profile.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material";

const routes: Routes = [
    {
        path        : '',
        component   : ProfileComponent,
    },

];

@NgModule({
    declarations: [
        ProfileComponent
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
        ReactiveFormsModule,
        SharedModule,
    ],
    exports: [
        RouterModule
    ]
})

export class ProfileModule { }
