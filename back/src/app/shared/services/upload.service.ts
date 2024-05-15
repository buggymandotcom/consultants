import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Helpers } from "../helpers";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private baseEndPoint = environment.baseEndPoint + '/download';

  constructor(
    private http: HttpClient
  ) { }

  requestDownload(id: number) {
    return this.http.get(this.baseEndPoint + '/' + id + '/request-download', { headers: Helpers.commonHeaders() });
  }

  requestUrl(id: number) {
    return this.http.get(this.baseEndPoint + '/' + id + '/request-url', { headers: Helpers.commonHeaders() });
  }

  delete(id: number) {
    return this.http.delete(this.baseEndPoint + '/' + id, { headers: Helpers.commonHeaders() })
  }
}
