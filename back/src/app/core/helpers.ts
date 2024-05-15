import {RequestOptions , Headers , URLSearchParams } from "@angular/http";
import * as moment from "moment";
import {HttpHeaders} from "@angular/common/http";


/**
 * Created by Jose on 18/05/2017.
 */

export class Helpers {


    static commonHeaders(guard='api'):HttpHeaders {
        let headers = new HttpHeaders();
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            headers  = headers
                .set('Authorization', 'Bearer '+currentUser.token)
                .set('App-Guard',guard)
                .set('Content-Type', 'application/json; charset=utf-8');
        }else{
            headers  = headers
                .set('App-Guard',guard)
                .set('Content-Type', 'application/json; charset=utf-8');
        }
        return headers;
    }
    static parseDate(dateToParse: any): Date {
        if (dateToParse){
            const constrName = dateToParse.constructor.name;
            if (constrName === 'Date' || dateToParse.date){
                if (constrName === 'Date'){
                    return  dateToParse;
                }
                const parsedDate = moment(dateToParse.date).toDate();
                return parsedDate;
            } else if (constrName === 'String') {
                const parsedDate = moment(dateToParse.date).toDate();
                return parsedDate;
            }
        }
        return null;

    }

    // static resetForm(form:NgForm,el?:ElementRef){
    //     form.resetForm();
    //     if(el){
    //         el.nativeElement.querySelector(':focus').blur();
    //     }
    // }
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



    static clone<T>(instance: T): T {
        const copy = new (instance.constructor as { new (): T })();
        Object.assign(copy, instance);
        return copy;
    }


}
