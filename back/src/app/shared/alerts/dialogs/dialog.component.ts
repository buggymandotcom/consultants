import {Component, EventEmitter, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'ai-dialog-error',
    templateUrl: 'templates/error-dialog.component.html',
    styleUrls: ['error-dialog.component.scss']
})
export class ErrorDialogComponent {
    public data;
    constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>){}
}

@Component({
    selector: 'ai-dialog-validation-error',
    templateUrl: 'templates/error-validation-dialog.component.html',
    styleUrls: ['error-dialog.component.scss']
})
export class ErrorValidationDialogComponent {
    public errors:any;
    public data;
    constructor(public dialogRef: MatDialogRef<ErrorValidationDialogComponent> ){
    }
}


@Component({
    selector: 'ai-dialog-confirmation',
    templateUrl: 'templates/confirmation-dialog.component.html',
    styleUrls: ['error-dialog.component.scss']
})
export class ConfirmationDialogComponent  {
    public data;
    public confirmed$ : BehaviorSubject<boolean> = new BehaviorSubject(false);
    public confirmed : Observable<boolean> = this.confirmed$.asObservable();
    public eventConfirmed: EventEmitter<boolean> = new EventEmitter();

    constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>){
    }

    // setText(text:any){
    //     this.translateSevice.get('aa {{value}}',{value:'hola'});
    // }
}

// @Component({
//     selector: 'ai-dialog-success',
//     templateUrl: 'templates/success-dialog.component.html',
//     styleUrls: ['error-dialog.component.scss']
// })
// export class SuccessDialogComponent  {
//     public data;
//     public confirmed$ : BehaviorSubject<boolean> = new BehaviorSubject(false);
//     public confirmed : Observable<boolean> = this.confirmed$.asObservable();
//
//     constructor(public dialogRef: MatDialogRef<SuccessDialogComponent>){
//     }
// }

// @Component({
//     selector: 'app-dialog-simple',
//     templateUrl: 'templates/simple-dialog.component.html'
// })
// export class SimpleDialogComponent {
//     constructor(public dialogRef: MatDialogRef<SimpleDialogComponent>){}
// }
//
// @Component({
//     selector: 'app-dialog-simple',
//     templateUrl: 'templates/accept-cancel-dialog.component.html'
// })


// @Component({
//     selector: 'app-dialog-advanced',
//     templateUrl: 'templates/simple-dialog.component.html'
// })
// export class AdvancedDialogComponent {
//     constructor(public dialogRef: MatDialogRef<AdvancedDialogComponent>){}
// }
//
// @Component({
//     selector: 'app-dialog-custom',
//     templateUrl: 'templates/custom-dialog.component.html'
// })
// export class CustomDialogComponent {
//     constructor(public dialogRef: MatDialogRef<CustomDialogComponent>){}
// }
