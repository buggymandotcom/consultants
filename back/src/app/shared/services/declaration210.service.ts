import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Helpers} from "../helpers";
import {Declaration210} from "../models/client/models/two-one-cero/declaration-210";
import {Client} from "../models/client/client.model";
import {env} from "../../../environments/env";

@Injectable()
export class Declaration210Service {

    private baseEndPoint=environment.baseEndPoint + '/declaration210/';

    constructor(private http: HttpClient) { }

    getDeclaration(client: number, options?: any){
        return this.http.get<Declaration210>(this.baseEndPoint + client + '/getDeclaration', {headers: Helpers.commonHeaders(),params: options});
    }

    saveDeclaration(declaration_id: number, declaration: Declaration210){
        return this.http.post(this.baseEndPoint + declaration_id + '/saveDeclaration',{"declaration": declaration},{headers: Helpers.commonHeaders()});
    }

    export(draft: number) {
        return this.http.get(env.baseEndPoint + '/client/draft/' + draft + '/export', {
            headers: Helpers.commonHeaders(),
            responseType: 'blob',
        }).subscribe((response) => { // download file
            // var blob = new Blob([response.blob()], {type:doc.mime});
            var FileSaver = require('file-saver');
            let date = new Date(),
                filename = 'T210-'+draft+'-'+date.getFullYear()+date.getMonth()+date.getDate();
            FileSaver.saveAs(response,filename+'.210');
        });
    }
}
