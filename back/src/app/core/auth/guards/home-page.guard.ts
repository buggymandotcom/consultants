import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {count} from "rxjs/operator/count";
import {AuthService} from "../services/authentication.service";
import {User} from "../models/user.model";
import {isUndefined} from "util";
import {Subject} from "rxjs/Subject";
import {env} from "../../../../environments/env";
/**
 * Created by Jose on 15/05/2017.
 */

@Injectable()
export class CanActivateHomePageGuard  implements CanActivate {

    constructor (private router : Router , private authService : AuthService){}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        this.authService.checkRoles(['employee_admin','root']).subscribe(d => {
            if(d){
                this.router.navigate([env.manage_prefix+'/dashboard']);
            }else{
                this.router.navigate(['/home']);
            }
        });
       return false;

    }
}