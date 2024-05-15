import {Injectable} from "@angular/core";
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

import {AuthService} from "../services/authentication.service";

import {UserService} from "../../../shared/services/user.service";
import {AlertService} from "../../../shared/alerts/services/alert.service";


/**
 * Created by Jose on 15/05/2017.
 */

@Injectable()
export class CanActivateRoleGuard implements CanActivate {

    constructor (private router : Router , private authService : AuthService , private alertService:AlertService){}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,

    ) {


        let roles  = route.data.roles;
        if (!UserService.userLocal().token){
            this.router.navigate(['/auth/login']);
            return false;
        }

        this.authService.checkRoles(roles).subscribe(res => {

            if (!res){
                this.alertService.alertError('errors.unautorized_role_exception' , 'errors.unautorized').afterClosed().subscribe(()=>{
                    this.router.navigateByUrl('');
                });
                //this.router.navigateByUrl('/error-page');

            }
        },err => console.log(err));

        return true;

    }
}