import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {json} from "d3";
import {isUndefined} from "util";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Helpers} from "../../../../core/helpers";
import {GroupTranslation} from "../../../../core/trans/model/group_translation.model";
import {Translation} from "../../../../core/trans/model/translation.model";



//import { User } from '../_models/index';

@Injectable()
export class AireTransHttpService {

    private baseEndPoint=environment.baseEndPoint+'/translation';
    constructor(
        private http:HttpClient
    ) {}

    all(lang:string):Observable<any>{
        return this.http.get(this.baseEndPoint+'/'+lang,{headers:Helpers.commonHeaders()});
    }

    create(translation:Translation):Observable<any> {
         return this.http.post(this.baseEndPoint,translation,{headers:Helpers.commonHeaders()});
    }

    update(group:GroupTranslation):Observable<any>{
        return this.http.put(this.baseEndPoint+'/manager',group,{headers:Helpers.commonHeaders()});
    }

    allObj(lang:string,search?:string):Observable<GroupTranslation[]>{
        if(isUndefined(search)){
            search='';
        }

        return this.http.get<any>(this.baseEndPoint+'/manager/'+lang+'?search='+search,{headers:Helpers.commonHeaders()});
            // .map(res => {
            //   let collection = [];
            //     res.forEach((v) => {
            //         collection.push(new GroupTranslation());
            //     });
            //     return collection;
            // });
 
    }

    delete(id:number){
        return this.http.delete(this.baseEndPoint+'/manager/'+id,{headers:Helpers.commonHeaders()});
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}