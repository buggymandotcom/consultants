import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckbox,
    MatCheckboxModule, MatChipsModule,
    MatDialogModule, MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule, MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule
} from "@angular/material";
import {MatMomentDateModule, MomentDateAdapter} from "@angular/material-moment-adapter";
import {CurrencyPipe, DecimalPipe} from "../../shared/pipes/currency.pipe";
import {FilterPipe} from "../../shared/pipes/filter.pipe";
import {UpperPipe} from "../../shared/pipes/str.pipe";
import {ObjNgForPipe} from "../../shared/pipes/obj-ng-for.pipe";
import {DateAdapter} from "angular-calendar";



@NgModule({
    declarations: [
        CurrencyPipe,
        DecimalPipe,
        FilterPipe,
        UpperPipe,
        ObjNgForPipe,
    ],
    imports: [
        CommonModule,

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule,
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatListModule,
        MatMomentDateModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatDialogModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatTooltipModule,
        MatSelectModule,
        MatChipsModule,
        MatExpansionModule,
        MatBadgeModule,
    ],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule,
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatListModule,
        MatMomentDateModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatDialogModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatTooltipModule,
        MatSelectModule,
        MatChipsModule,
        MatExpansionModule,
        MatBadgeModule,

        CurrencyPipe,
        DecimalPipe,
        FilterPipe,
        UpperPipe,
        ObjNgForPipe,
    ],
    // providers: [
    //    {provide: DateAdapter,useClass: MomentDateAdapter}
    // ]
})
export class MaterialModule { }
