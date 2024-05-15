import {Injectable, TemplateRef} from '@angular/core';
import {
    ConfirmationDialogComponent, ErrorDialogComponent,
    ErrorValidationDialogComponent
} from "../dialogs/dialog.component";
// import {componentFactoryName} from "@angular/compiler";
// import {AireTransService} from "../../trans/aire-trans.service";
import {isUndefined} from "util";
// import {textDef} from "@angular/core/src/view";

import {
    MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar,
    MatSnackBarConfig
} from "@angular/material";
import {TranslateService} from "@ngx-translate/core";
// import {LoaderService} from "../../../main/toolbar/loader.service";


//import { User } from '../_models/index';

@Injectable()
export class AlertService {
    public action:string = 'X';
    constructor(
        private snackBar: MatSnackBar,
        private snackBarConfig : MatSnackBarConfig,
        private dialog:MatDialog,
        private translateService:TranslateService
        // private loaderService:LoaderService

    ) { }


    msg(msg:string,duration:number=2000){
        this.snackBarConfig.duration=duration;
        this.snackBar.open(this.translateService.instant(msg),this.action,{duration:duration});
    }

    irtMsg(msg:string,duration:number=2000){
    this.snackBarConfig.duration=duration;
    this.snackBar.open(this.translateService.instant(msg),this.action,{
        duration: duration,
        horizontalPosition: 'right',
        verticalPosition: 'top',
    });
    }

    genericError(){
        this.msg('Se produjo un error.');
    }

    genericSaved(){
        this.msg('app.saved');
    }

    alertError(text:string,title?:string):MatDialogRef<any> {
        let config = new MatDialogConfig();
        config.width='600px';
        let modal =  this.dialog.open(ErrorDialogComponent,config);
        modal.componentInstance.data={title:title?this.translateService.instant(title):this.translateService.instant('error.error_has_occurred'),text:this.translateService.instant(text)};
        return modal;
    }

    alertValidationError(errors,title?):MatDialogRef<ErrorValidationDialogComponent>{
        let modal = this.modal(ErrorValidationDialogComponent,'sm');
        modal.componentInstance.data={title:title?title:'errors.default_validation_title_alert'};
        console.log(errors);
        modal.componentInstance.errors=errors;
        return modal;
    }

    confirmation(text:string,param?:string){
      let modal = this.modal(ConfirmationDialogComponent,'custom',{width:'400px'});
      modal.componentInstance.data={msg:{text:text,param:{value:param}},title:'app.are_you_sure'};
      return modal;
    }

    success(title: string, text?: string) {
      let modal = this.modal(ConfirmationDialogComponent,'custom',{width:'400px'});
      modal.componentInstance.data={title, text: text || 'msg.dialog_confirmation'};
      modal.componentInstance.confirmed.subscribe(res => {
        if(res){
          modal.close();
        }
      });
      return modal;
    }

    modal(ref,size?:string,custom?:any,data?:any):MatDialogRef<any>{
        let sizes = {
            custom : custom,
            sm : {width:'600px'},
            md : {width:'50%',height:'60%'},
            lg : {width:'80%',height:'80%'},
            xl : {width:'100%',height:'80%'},
            full : {width:'100%',height:'98%'},
        };
        let res = sizes[size];

        let config = new MatDialogConfig();
        if(!isUndefined(res)){
            config.width=res.width;
            config.height=res.height;
        }else{
            config.width='100%';
            config.height='70%';
        }
        config.data=data;
        let modal =  this.dialog.open(ref,config);
        return modal;
    }
    loader(status:boolean){
        // this.loaderService.set(status);
    }
}
