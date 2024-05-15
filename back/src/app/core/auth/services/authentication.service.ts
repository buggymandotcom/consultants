  import {Injectable, NgZone, OnInit} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../../environments/environment';
import {User} from "../models/user.model";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {isUndefined} from "util";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/first';
import {Helpers} from "../../../shared/helpers";
  import {AiNavigationService} from "../../navigation/components/navigation/navigation.service";
  import {UserSubscription} from "../models/user-subscription.model";
  import {HttpClient, HttpHeaders} from "@angular/common/http";
  import {Client} from "../../../shared/models/client/client.model";



@Injectable()
export class AuthService  {

    private baseEndPoint = environment.baseEndPoint;

    private logger = new Subject<boolean>();
    private loggedUser = new BehaviorSubject(new User(JSON.parse(localStorage.getItem('currentUser'))));
    private subscriptions = new Subject<UserSubscription[]>();
    public loggedUser$ : Observable <User>  = this.loggedUser.asObservable();
    public subscriptions$ : Observable <UserSubscription[]>  = this.subscriptions.asObservable();


    /*
    *   TODO Cambiar Http por HttpClient. Http está deprecated.
    *   TODO Cambiar la suscripción. No se puede hacer en el servicio. Aquí sólo se emitiría y se suscribiría a esos
    *    cambios donde se necesiten los cambios.
    *   TODO Terminamos antes rehaciendo la autenticación desde 0.
    *  */
    constructor(
        private http: Http,
        private httpClient: HttpClient,
        private  router: Router,
        private zone: NgZone,
        private navigationService: AiNavigationService) {
        //Refrescamos el "user" cuando se produce un login o logout
        this.isLoggedIn().subscribe(d => {
            if(d==true){
                let u = new User(JSON.parse(localStorage.getItem('currentUser')));
                this.loggedUser.next(u);
                // console.log("Logeado");

            }else if(d==false){
                this.loggedUser.next(new User(null));
                console.log("Logout");
            }
        });
        //Si hay un token almacenado en el navegador obtiene el usuario
        if (UserService.userLocal().token){
            this.authUser().subscribe(
                user=>{
                    let u = new User(user);
                    user.token =  UserService.userLocal().token;
                    this.loggedUser.next(u);
                    this.subscriptions.next(u.subscriptions);
                });

        }
    }

    public handleError = (error) => {
        this.router.navigate(['/auth/login']);
        console.error(error);
        return Observable.throw(error);
    }

    private test (){
        this.router.navigate(['/auth/login']);
    }



    login(email: string, password: string,guard:string='clients') {
        let headers      = new Headers({ 'Content-Type': 'application/json', 'App-Guard': guard}); // ... Set content type to JSON
        let options      = new RequestOptions({ headers: headers });

        return this.http.post(environment.baseEndPoint+'/auth-v2', JSON.stringify({ email: email, password: password }),options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                let userObj = new User(user);

                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(userObj.toLocalstorage()));
                    this.logger.next(true);
                    this.loggedUser.next(userObj);
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        let user = UserService.userLocal();
        let target = user.guard=='employees'?'/auth/admin/login':'/auth/login';
        localStorage.removeItem('currentUser');
        this.logger.next(false);
        this.router.navigate([target]);

    }

    isLoggedIn():Observable<boolean>{
        return this.logger.asObservable();
    }
    //Actualizar usuario logeado
    // updateLoggedUser(){
    //
    //     let u = JSON.parse(localStorage.getItem('currentUser'));
    //     let token  = u.token;
    //     this.http.get(this.baseEndPoint+'/auth-v2/user',Helpers.requestAuthOptions()).map((response: Response) => response.json()).subscribe(userNew => {
    //         let userObj=new User(userNew);
    //         userObj.token=token;
    //         localStorage.setItem('currentUser',JSON.stringify(userObj.toLocalstorage()));
    //         this.loggedUser.next(userObj);
    //     });
    //
    // }

    authUser(){

        return this.http.get(this.baseEndPoint+'/auth-v2/user',Helpers.requestAuthOptions())
            .map((response) => response.json())
            .catch(this.handleError);
    }

    checkRoles(roles:Array<string>):Observable<boolean>{

        let sub = new Subject<boolean>();
        this.loggedUser$.subscribe(user=>{
            if(!isUndefined(user.roles)){
                user.roles.forEach(userRole => {
                    if(roles.indexOf(userRole.name) !==-1){
                        //Todo buscar porque en stackoverflow
                        setTimeout(()=>sub.next(true),1);
                    }
                });
                setTimeout(()=>sub.next(false),1);
            }
        });
        return sub.asObservable().first();
    }

    checkSubscriptions(subscriptions:Array<string>):Observable<boolean>{
        let sub = new Subject<boolean>();
        this.loggedUser$.subscribe(userlogged=>{
                if(!isUndefined(userlogged.subscriptions)){
                     userlogged.subscriptions.forEach(subs => {
                       if(subscriptions.indexOf(subs.name) !==-1){
                        setTimeout(()=>sub.next(true),1);
                        }
                    });
                    setTimeout(()=>sub.next(false),1);
                }
        });
        return sub.asObservable().first();
    }

    // subscriptions(user: number) {
    //     return this.http.get(this.baseEndPoint+'/subscriptions', Helpers.requestAuthOptions());
    // }



    // currentUser():Observable <User> {
    //     return this.loggedUser.asObservable();
    // }

    register(data: any): Observable<object> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        return this.httpClient.post(environment.baseEndPoint + '/auth/register', data, {headers});
    }

    checkActivated(client: number): Observable<object> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        return this.httpClient.get(environment.baseEndPoint + '/auth/client/' + client + '/activate', {headers});
    }

    activateClient(client: number, code: string): Observable<object> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        return this.httpClient.post(environment.baseEndPoint + '/auth/client/' + client + '/activate', {code}, {headers});
    }

    sendToken(client: number): Observable<object> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        return this.httpClient.post(environment.baseEndPoint + '/auth/client/' + client + '/resend-token', {headers});
    }

    clientProfile(options?: any): Observable<Client> {
        return this.httpClient.get<Client>(this.baseEndPoint + '/auth/client-profile', {headers: Helpers.commonHeaders(), params: options});
    }

    updateClientProfile(data: any): Observable<Client> {
        return this.httpClient.put<Client>(this.baseEndPoint + '/auth/client-profile', data, {headers: Helpers.commonHeaders()});
    }

}