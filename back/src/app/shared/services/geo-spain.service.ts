import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Helpers} from "../helpers";
import {SpainProvince} from "../models/client/models/spain-province";
import {SpainMunicipality} from "../models/client/models/spain-municipality";

@Injectable()
export class GeoSpainService {

    private baseEndPoint=environment.baseEndPoint;

    constructor(private http: HttpClient) { }

    getProvinces(){
        return this.http.get<SpainProvince[]>(this.baseEndPoint + '/geo-spain/provinces', {headers: Helpers.commonHeaders()});
    }

    getMunicipalities(province: number){
        return this.http.get<SpainMunicipality[]>(this.baseEndPoint + '/geo-spain/provinces/'+province+'/municipalities', {headers: Helpers.commonHeaders()});
    }
}
