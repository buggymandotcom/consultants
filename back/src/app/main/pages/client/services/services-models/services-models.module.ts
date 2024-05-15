import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../../../../material/material.module";
import {SharedModule} from "../../../../../shared/shared.module";
import {ServicesModelsShowComponent} from "./services-models-show/services-models-show.component";
import {RouterModule, Routes} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { NewDraftComponent } from './services-models-show/new-draft/new-draft.component';
import {FormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ServicesModelsSevenTwoCeroComponent } from './services-models-seven-two-cero/services-models-seven-two-cero.component';
import {TaxModelService} from "../../../../../shared/services/tax-model.service";

const routes : Routes = [
    {
        path: '',
        component: ServicesModelsShowComponent,
    },
    {
        path: ':model/draft210/:draft',
        loadChildren: './services-models-two-one-cero/services-models-two-one-cero.module#ServicesModelsTwoOneCeroModule',
    },
    {
        path: ':model/draft720/:draft',
        loadChildren: './services-models-seven-two-cero/services-models-seven-two-cero.module#ServicesModelsSevenTwoCeroModule',
    }
];

@NgModule({
    declarations: [ServicesModelsShowComponent, NewDraftComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        FlexLayoutModule,
        SharedModule,
        FuseSharedModule,
        FuseSidebarModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        FormsModule,
        MatDatepickerModule,
        MatSlideToggleModule
    ],
    entryComponents: [
        NewDraftComponent
    ]
})
export class ServicesModelsModule { }
