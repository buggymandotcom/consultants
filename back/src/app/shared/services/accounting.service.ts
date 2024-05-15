import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Helpers} from "../helpers";
import {AccountingUpload} from "../models/client/billing/accounting-upload";
import {env} from "../../../environments/env";

@Injectable({
  providedIn: 'root'
})
export class AccountingService {

  private baseEndPoint = environment.baseEndPoint + '/client/services/accounting';

  constructor(
    private http: HttpClient
  ) { }

  getAcctInvoices(page: number, client_id: number, options?:any) {
    page = page || 1;
    return this.http.post(this.baseEndPoint + '/client/' + client_id + '/invoices?page='+page,options, {headers: Helpers.commonHeaders()});
  }

  delete(id: number) {
    return this.http.delete(this.baseEndPoint + '/invoices/' + id, {headers: Helpers.commonHeaders()});
  }

  downloadFile(file : AccountingUpload){
        let url = env.baseEndPoint+'/download/'+file.upload.id+'/download';
        this.http.get(url,{
            responseType: 'blob',
        }).subscribe(
            (response) => { // download file
                // var blob = new Blob([response.blob()], {type:doc.mime});
                var FileSaver = require('file-saver');
                FileSaver.saveAs(response,file.upload.original_name);
            });

  }

  saveComment(acctUpload:AccountingUpload,comment:string){
      return this.http.post(this.baseEndPoint + '/invoices/' + acctUpload.id + '/save-c-comment',{comment:comment}, {headers: Helpers.commonHeaders()});
  }

  getConfig(clientId:number){
      return this.http.get(this.baseEndPoint+'/client/'+clientId+'/config',{headers:Helpers.commonHeaders()});
  }
  saveConfig(clientId:number,data:any){
      return this.http.put(this.baseEndPoint + '/client/' + clientId + '/save-config',data, {headers: Helpers.commonHeaders()});
  }
}
