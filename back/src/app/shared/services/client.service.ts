import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {AuthService} from "../../core/auth/services/authentication.service";
import {User} from "../../core/auth/models/user.model";
import {HttpClient} from "@angular/common/http";
import {Helpers} from "../helpers";
import {PaginationResponse} from "../models/pagination-response.model";
import {Client} from "../models/client/client.model";
import {Service} from "../models/client/services/service";
import {TaxModel} from "../models/client/models/tax-model.model";
import {TaxModelDraft} from "../models/client/models/tax-model-draft";
import {Declaration720} from "../models/client/models/seven-two-cero/declaration-720";
import {Property720} from "../models/client/models/seven-two-cero/property-720";
import {PropertyCountryCod720} from "../models/client/models/seven-two-cero/property-country-cod-720";
import {env} from "../../../environments/env";
import {Observable} from "rxjs";


//import { User } from '../_models/index';

@Injectable()
export class ClientService {

  private baseEndPoint=environment.baseEndPoint;

  constructor(private http: HttpClient) { }

    index(page: number, options?: any) {
        return this.http.get(this.baseEndPoint + '/client/pagination?page='+page, {headers: Helpers.commonHeaders(), params: options});
    }

    get(user: number,  options?: any) {
        return this.http.get<Client>(this.baseEndPoint + '/client/' + user, {headers: Helpers.commonHeaders(), params: options});
    }

    create(client: Client) {
        return this.http.post(this.baseEndPoint + '/client', {client}, {headers: Helpers.commonHeaders()});
    }

    update(client: Client) {
        return this.http.put(this.baseEndPoint + '/client/'+client.id, {client}, {headers: Helpers.commonHeaders()});
    }

    list(options?: any){
        return this.http.get(this.baseEndPoint + '/client/list', {headers: Helpers.commonHeaders(),params: options});
    }

    /* Servicios */

    modelsAvailables(client: number){
        return this.http.get<TaxModel[]>(this.baseEndPoint + '/client/' + client + '/models-availables', {headers: Helpers.commonHeaders()});
    }

    services(client?: number) {
        let url = this.baseEndPoint + '/client/';
        if (client) { url += client + '/'; }
        return this.http.get<Service[]>(url + 'services', {headers: Helpers.commonHeaders()});
    }

    servicesHired(client?: number) {
        let url = this.baseEndPoint + '/client/';
        if (client) { url += client + '/'; }
        return this.http.get<Service[]>(url + 'services-hired', {headers: Helpers.commonHeaders()});
    }

    servicesAvailable(client?: number) {
        let url = this.baseEndPoint + '/client/';
        if (client) { url += client + '/'; }
        return this.http.get<Service[]>(url + 'services-available', {headers: Helpers.commonHeaders()});
    }

    savePassword(client:Client,newPass:string,notify:boolean=false){
        return this.http.put(this.baseEndPoint + '/client/'+client.id+'/save-password', {password:newPass,notify:notify}, {headers: Helpers.commonHeaders()});
    }

    addService(client: number, service: number) {
        return this.http.post(this.baseEndPoint + '/client/' + client + '/service',{service},{headers: Helpers.commonHeaders()});
    }

    hireService(service: number) {
        return this.http.post(this.baseEndPoint + '/client/services/hire/' + service, {},{headers: Helpers.commonHeaders()});
    }

    deleteService(client: number, service: number) {
        return this.http.post(this.baseEndPoint + '/client/' + client + '/service',{service},{headers: Helpers.commonHeaders()});
    }

    /* Modelos */

    modelsHired(client: number) {
        return this.http.get<TaxModel[]>(this.baseEndPoint + '/client/' + client + '/models-hired', {headers: Helpers.commonHeaders()});
    }

    modelsAvailable(client: number) {
        return this.http.get<TaxModel[]>(this.baseEndPoint + '/client/' + client + '/models-available', {headers: Helpers.commonHeaders()});
    }

    deleteModel(client: number, taxModel: number){
        return this.http.post(this.baseEndPoint + '/client/' + client + '/delete-model',{taxModel},{headers: Helpers.commonHeaders()});
    }

    addModel(client: number, draft: TaxModelDraft){
        return this.http.post(this.baseEndPoint + '/client/' + client + '/add-model',{"draft":draft},{headers: Helpers.commonHeaders()});
    }

    /* Borradores */
    getDrafts(page?: number, options?: any){
        return this.http.get(this.baseEndPoint + '/client/draft?page='+page,{headers: Helpers.commonHeaders(), params: options});
    }

    addDraft(client: number, draft: TaxModelDraft){
        return this.http.post(this.baseEndPoint + '/client/' + client + '/addDraft',{"draft":draft},{headers: Helpers.commonHeaders()});
    }

    delDraft(client: number, draft_id: number){
        return this.http.post(this.baseEndPoint + '/client/' + client + '/delDraft',{draft_id},{headers: Helpers.commonHeaders()});
    }

    getDraft(draft_id: number){
        return this.http.get(this.baseEndPoint + '/client/draft/' + draft_id,{headers: Helpers.commonHeaders()});
    }

    /* Información adicionaal del cliente */
    additionalInfo(client: number,  options?: any){
        return this.http.get<Client>(this.baseEndPoint + '/client/' + client + '/more-info', {headers: Helpers.commonHeaders(),params: options});
    }

    /* Declaración - 720 */
    declaration720(client: number, options?: any){
        return this.http.get<Declaration720>(this.baseEndPoint + '/client/' + client + '/declaration720', {headers: Helpers.commonHeaders(),params: options});
    }

    saveDeclaration720(client: number, declaration: Declaration720,declaration_id: number){
        return this.http.post(this.baseEndPoint + '/client/' + client + '/saveDeclaration720',{"declaration":declaration,"declaration_id":declaration_id},{headers: Helpers.commonHeaders()});
    }

    property720(property_id: number, options?: any){
        return this.http.get<Property720>(this.baseEndPoint + '/declaration720/' + property_id + '/property', {headers: Helpers.commonHeaders(),params: options});
    }

    saveProperty720(property: Property720){
        return this.http.post(this.baseEndPoint + '/declaration720/'+ property.id +'/updateProperty', {"property": property,"property_id":property.id},{headers: Helpers.commonHeaders()});
    }

    addProperty720(declaration_id: number){
        return this.http.post<Property720[]>(this.baseEndPoint + '/declaration720/'+ declaration_id +'/addProperty', {},{headers: Helpers.commonHeaders()});
    }

    removeProperty720(property_id: number, declaration_id: number){
        return this.http.post<Property720[]>(this.baseEndPoint + '/declaration720/'+ property_id +'/removeProperty', {"declaration_id":declaration_id},{headers: Helpers.commonHeaders()});
    }

    getCountries(){
        return this.http.get<PropertyCountryCod720[]>(this.baseEndPoint + '/declaration720/getCountries', {headers: Helpers.commonHeaders()});
    }

    export(draft: number) {
        return this.http.get(env.baseEndPoint + '/client/draft/' + draft + '/export', {
            headers: Helpers.commonHeaders(),
            responseType: 'blob',
        }).subscribe((response) => { // download file
            // var blob = new Blob([response.blob()], {type:doc.mime});
            var FileSaver = require('file-saver');
            let date = new Date(),
                filename = 'T720-'+draft+'-'+date.getFullYear()+date.getMonth()+date.getDate();
            FileSaver.saveAs(response,filename+'.720');
        });
    }

}
