import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {count} from "rxjs/operator/count";
import {AuthService} from "../services/authentication.service";
import {User} from "../models/user.model";
import {UserService} from "../../../shared/services/user.service";
import {AlertService} from "../../../shared/alerts/services/alert.service";
/**
 * Created by Jose on 15/05/2017.
 */

@Injectable()
export class CanActivateClientGuard implements CanActivate {

    constructor (private router : Router , private authService : AuthService, private alertService : AlertService){}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {

        let user = UserService.userLocal();
        if (user.token && (user.guard === 'clients')){
            return true;
        }else{

            // this.alertService.alertError('errors.not_logged').afterClosed().subscribe(()=>{
            //     this.router.navigateByUrl('/login');
            // });
            this.router.navigate(['/auth/login']);
            return false;
        }


    }

    canShow() {
        let user = UserService.userLocal();
        return user.token && (user.guard === 'clients');
    }
}