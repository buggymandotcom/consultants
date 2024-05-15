import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {env} from '../../../environments/env';
import {Helpers} from '../helpers';
import {Observable} from 'rxjs';
import {PaginationResponse} from '../models/pagination-response.model';

@Injectable({
  providedIn: 'root'
})
export class ClientCompanyHelpService {

    private baseEndPoint = env.baseEndPoint + '/cli-com-help';

  constructor(
      private http: HttpClient
  ) { }

  issues(options?: any): Observable<PaginationResponse> {
      return this.http.get<PaginationResponse>(this.baseEndPoint + '/issue', {headers: Helpers.commonHeaders(), params: options});
  }

  show(issue: number): Observable<object> {
      return this.http.get(this.baseEndPoint + '/issue/' + issue, {headers: Helpers.commonHeaders()});
  }

  postMessage(issue: number, message: string): Observable<object> {
      return this.http.post(this.baseEndPoint + '/issue/' + issue, {message}, {headers: Helpers.commonHeaders()});
  }
}
