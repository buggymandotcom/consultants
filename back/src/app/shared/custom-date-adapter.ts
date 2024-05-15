// import { DateAdapter, NativeDateAdapter } from "@angular/material";
// import { Optional, LOCALE_ID, Inject, Injectable } from "@angular/core";
// import { isNullOrUndefined } from "util";
import { DateAdapter, MatDateFormats } from '@angular/material';

export const MOMENT_DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};



// @Injectable()
// export class CustomDateAdapter extends DateAdapter<number> {
//
//   inner: NativeDateAdapter;
//
//   constructor(@Optional() @Inject(LOCALE_ID) localeId: any) {
//     super();
//     super.setLocale(localeId);
//     this.inner = new NativeDateAdapter();
//   }
//
//   toIso8601(d): string{
//       return "";
//   }
//     /**
//      * Checks whether the given object is considered a date instance by this DateAdapter.
//      * @param obj The object to check
//      * @returns Whether the object is a date instance.
//      */
//   isDateInstance(obj: any){return true;}
//     /**
//      * Checks whether the given date is valid.
//      * @param date The date to check.
//      * @returns Whether the date is valid.
//      */
//   isValid(date: D){
//       return true;
//   }
//   getYear(date: number): number {
//     if (isNullOrUndefined(date)) return date;
//     return new Date(date).getFullYear();
//
//   }
//   getMonth(date: number): number {
//     if (isNullOrUndefined(date)) return date;
//     return new Date(date).getMonth();
//   }
//   getDate(date: number): number {
//     if (isNullOrUndefined(date)) return date;
//     return new Date(date).getDate();
//   }
//   getDayOfWeek(date: number): number {
//     if (isNullOrUndefined(date)) return date;
//     return new Date(date).getDay();
//   }
//   getMonthNames(style: "long" | "short" | "narrow"): string[] {
//     return this.inner.getMonthNames(style);
//   }
//   getDateNames(): string[] {
//     return this.inner.getDateNames();
//   }
//   getDayOfWeekNames(style: "long" | "short" | "narrow"): string[] {
//     return this.inner.getDayOfWeekNames(style);
//   }
//   getYearName(date: number): string {
//     // return "Year of the Dragon"; // ;-P
//     if (isNullOrUndefined(date)) return null;
//     return "" + new Date(date).getFullYear();
//   }
//   getFirstDayOfWeek(): number {
//     return this.inner.getFirstDayOfWeek();
//   }
//   getNumDaysInMonth(date: number): number {
//     if (isNullOrUndefined(date)) return date;
//     return this.inner.getNumDaysInMonth(new Date(date));
//   }
//   clone(date: number): number {
//     return date;
//   }
//   createDate(year: number, month: number, date: number): number {
//     return new Date(year, month, date).getTime();
//   }
//   today(): number {
//     return new Date().getTime();
//   }
//   parse(value: any, parseFormat: any): number {
//     if (isNullOrUndefined(value)  || value === '') return value;
//     let date = this.inner.parse(value, parseFormat);
//     if (!date) return null;
//     return date.getTime();
//   }
//   format(date: number, displayFormat: any): string {
//     if (isNullOrUndefined(date)) return null;
//     let dateToFormat = new Date(date);
//     return this.inner.format(dateToFormat, displayFormat);
//   }
//   addCalendarYears(date: number, years: number): number {
//     let dateToModify = new Date(date);
//     dateToModify.setFullYear(dateToModify.getFullYear() + years);
//     return dateToModify.getTime();
//   }
//   addCalendarMonths(date: number, months: number): number {
//     let dateToModify = new Date(date);
//     dateToModify.setMonth(dateToModify.getMonth() + months);
//     return dateToModify.getTime();
//   }
//   addCalendarDays(date: number, days: number): number {
//     let dateToModify = new Date(date);
//     dateToModify.setDate(dateToModify.getDate() + days);
//     return dateToModify.getTime();
//   }
//   getISODateString(date: number): string {
//     if (isNullOrUndefined(date)) return null;
//     return new Date(date).toISOString();
//   }
//
// }