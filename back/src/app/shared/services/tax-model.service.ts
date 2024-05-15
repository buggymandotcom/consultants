import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Helpers} from "../helpers";
import {TaxModelDraft} from "../models/client/models/tax-model-draft";

@Injectable()
export class TaxModelService {

    private baseEndPoint=environment.baseEndPoint;

    constructor(private http: HttpClient) { }

    update(draft: TaxModelDraft){
        return this.http.post(this.baseEndPoint + '/' + draft.id + '/update',{"draft": draft},{headers: Helpers.commonHeaders()});
    }
}
