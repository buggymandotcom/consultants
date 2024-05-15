import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {environment} from "../../../environments/environment";
import {AuthService} from "../../core/auth/services/authentication.service";
import {User} from "../../core/auth/models/user.model";
import {HttpClient} from "@angular/common/http";
import {Helpers} from "../helpers";
import {PaginationResponse} from "../models/pagination-response.model";
import {UserSubscription} from "../../core/auth/models/user-subscription.model";


//import { User } from '../_models/index';

@Injectable()
export class UserService {

  private baseEndPoint=environment.baseEndPoint;

  constructor(private http: HttpClient) { }

  // getById() {
  //     return this.http.get(this.baseEndPoint+'/auth/user/', this.jwt()).map((response: Response) => response.json());
  // }

  changeLang(lang:string){
       return this.http.post(this.baseEndPoint+'/profile/lang/' + lang,{},{headers: Helpers.commonHeaders()});
  }


  static userLocal(){
      return new User(JSON.parse(localStorage.getItem('currentUser')));
  }


  // getAll() {
  //     return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
  // }
  //
  // getById(id: number) {
  //     return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  // }
  //
  // create(user: User) {
  //     return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
  // }
  //
  // update(user: User) {
  //     return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
  // }
  //
  // delete(id: number) {
  //     return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  // }

  // private helper methods


  index() {
    return this.http.get<User[]>(this.baseEndPoint + '/user', {headers: Helpers.commonHeaders()});
  }

  pagination(page: number, options?: any) {
    return this.http.get<PaginationResponse>(this.baseEndPoint + '/user/pagination?page='+page, {headers: Helpers.commonHeaders(), params: options});
  }

  get(user: number) {
    return this.http.get<User>(this.baseEndPoint + '/user/' + user, {headers: Helpers.commonHeaders()});
  }

  create(user: User) {
    return this.http.post(this.baseEndPoint + '/user', {user}, {headers: Helpers.commonHeaders()});
  }

  update(user: User) {
    return this.http.put(this.baseEndPoint + '/user/'+user.id, {user}, {headers: Helpers.commonHeaders()});
  }

  subscriptions(user: number){
      return this.http.get<UserSubscription[]>(this.baseEndPoint + '/user/' + user + '/subscriptions', {headers: Helpers.commonHeaders()});
  }

}
