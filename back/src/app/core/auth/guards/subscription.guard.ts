import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

import {AuthService} from "../services/authentication.service";

import {AlertService} from "../../../shared/alerts/services/alert.service";
import {Observable} from "rxjs/Rx";
import {catchError, map} from "rxjs/internal/operators";
import {Location} from "@angular/common";
/**
 * Created by Jose on 15/05/2017.
 */

@Injectable()
export class CanActivateSubscriptionGuard implements CanActivate {

    constructor (private router : Router , private authService : AuthService, private alertService : AlertService,private  location : Location){}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,

    ) {

        return this.authService.checkSubscriptions(['accounting']).map(e => {
            if (e) {
                return true;
            }else{
                this.alertService.alertError('errors.unautorized_role_exception' , 'errors.unautorized').afterClosed().subscribe(()=>{});
                this.router.navigate(['/']);
            }
        }).catch(() => {
            this.router.navigate(['/']);
            return Observable.of(false);
        });





    }

        //
        // return this.authService.subscriptions$.map(lu=>{
        //     console.log(lu);
        //     return true;
        // });

        //return true;
        // if (user.token && (user.guard === 'clients')){
        //     return true;
        // }else{
        //
        //     // this.alertService.alertError('errors.not_logged').afterClosed().subscribe(()=>{
        //     //     this.router.navigateByUrl('/login');
        //     // });
        //     this.router.navigate(['/auth/login']);
        //     return false;
        // }




    // canShow() {
    //     let user = UserService.userLocal();
    //     return user.token && (user.guard === 'clients');
    // }
}