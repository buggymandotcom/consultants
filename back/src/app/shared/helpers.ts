import {RequestOptions , Headers , URLSearchParams } from "@angular/http";
import * as moment from "moment";
import {Moment} from "moment";
import {NgForm} from "@angular/forms";
import {ElementRef} from "@angular/core";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {isUndefined} from "util";
import {AireFileUploader} from "./uploads/airefileuploader";
import {env} from "../../environments/env";
import {HttpHeaders} from "@angular/common/http";


/**
 * Created by Jose on 18/05/2017.
 */

export class Helpers {

    requestOptions():RequestOptions{

            let headers = new Headers({'Content-Type': 'application/json'});
            return new RequestOptions({ headers: headers });

    }
    static requestAuthOptions():RequestOptions{

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            // let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token , 'Content-Type': 'application/json'});
            return new RequestOptions({ headers: headers });
        }
    }
    static commonHeaders():HttpHeaders {
    let headers = new HttpHeaders();
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      headers  = headers
        .set('Authorization', 'Bearer '+currentUser.token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Auth-Guard', currentUser.guard);
    }else{
      headers  = headers
        .set('Content-Type', 'application/json; charset=utf-8');
    }
    return headers;
    }
    static objToUrlRequestParams(obj:any):URLSearchParams{
        let params = new URLSearchParams();
        //Recorremos las propiedades del objeto

        if(!isUndefined(obj) && obj){
            Object.keys(obj).map(function(objectKey, index) {
                let value = obj[objectKey];
                params.set(objectKey,value);
            });
        }
        return params;
    }
    static parseDate(dateToParse:any):Date{
        if(dateToParse){
            let constrName=dateToParse.constructor.name;
            if(constrName=='Date' || dateToParse.date){
                if(constrName=='Date'){
                    return  dateToParse;
                }
                let parsedDate= moment(dateToParse.date).toDate();
                return parsedDate;
            } else if(constrName=='String') {
                return moment(dateToParse).toDate();
            }
        }
        return null;

    }

    static resetForm(form:NgForm,el?:ElementRef){
        form.resetForm();
        if(el){
            el.nativeElement.querySelector(':focus').blur();
        }

    }
    //Copia modelos (Debe de estar bien el constructor)
    static copy (source,destination){
        // console.log("source",source);
        // console.log("destination",destination);
        if(source.constructor.name!==destination.constructor.name){
            throw "the class of source and destination are different";
        }
        destination.constructor(source);
        return destination;
    }

    static getUploader (entity, entity_id?, options?:any){

      let conf:any =  {};
      switch (entity){
        case 'accounting':
          conf.type='CLIENTS_SV_ACCT';
          if(options && typeof options === 'object') {
              Object.keys(options).forEach((k) => {
                  conf[k] = options[k];
              });
          }
          break;
        default: throw "Entity not found";
      }
      return conf;

    }

    // static getUploader (doc : Document , entity ,entity_id){
    //
    //     let conf:any =  {doc_type_id:doc.id};
    //     switch (entity){
    //         case 'client':
    //             conf.user_id=entity_id;
    //             conf.type='USERS';
    //             break;
    //         case 'property':
    //             conf.property_id=entity_id;
    //             conf.type='PROPERTIES';
    //             break;
    //         case 'operation':
    //             conf.operation_id=entity_id;
    //             conf.type='OPERATIONS';
    //             break;
    //         case 'purchase_payment':
    //             conf.purchase_payment_id=entity_id;
    //             conf.type='PURCHASE_PAYMENTS';
    //             break;
    //         default: throw "Entity not found";
    //     }
    //     return conf;
    //
    // }

    static parseFileSize(size: number, decimals: number = 2, to: string = 'kB') {
        let num = 0;
        switch (to) {
            case 'kB':
                num = size / Math.pow(10,3); break;
            case 'MB':
                num = size / Math.pow(10,6); break;
            case 'GB':
                num = size / Math.pow(10,9); break;
            case 'KiB':
                num = size / Math.pow(2,10); break;
            case 'MiB':
                num = size / Math.pow(2,20); break;
            case 'GiB':
                num = size / Math.pow(2,30); break;
            case 'TiB':
                num = size / Math.pow(2,40); break;
        }
        return num.toFixed(decimals);
    }

    static parseDateToString(dateToParse:any, format: string):string{
        if(dateToParse){
            if(format) {
                return moment(dateToParse).format(format);
            }
            return moment(dateToParse).toDate().toString();
        }
        return null;
    }


}
