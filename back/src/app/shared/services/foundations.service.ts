import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Helpers} from "../helpers";
import {AccountingUpload} from "../models/client/billing/accounting-upload";
import {env} from "../../../environments/env";
import * as moment from "moment";


@Injectable({
  providedIn: 'root'
})

export class FoundationsService {

  private baseEndPoint = environment.baseEndPoint;

  constructor(
    private http: HttpClient
  ) { }



  downloadTransExcel(){
        let url = env.baseEndPoint+'/translation/get/excel';
        this.http.get(url,{
            headers:Helpers.commonHeaders(),
            responseType: 'blob',
        }).subscribe(
            (response) => { // download file
                // var blob = new Blob([response.blob()], {type:doc.mime});
                var FileSaver = require('file-saver');
                FileSaver.saveAs(response,'trans_'+moment().format("DDMMYYYYHHmm")+'.xlsx');
            });

  }




}
