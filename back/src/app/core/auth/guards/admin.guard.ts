import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/authentication.service";
import {UserService} from "../../../shared/services/user.service";
import {AlertService} from "../../../shared/alerts/services/alert.service";
/**
 * Created by Jose on 15/05/2017.
 */

@Injectable()
export class CanActivateAdminGuard implements CanActivate {

    constructor (private router : Router , private authService : AuthService, private alertService : AlertService){}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {

        let user = UserService.userLocal();
        if (user.token && user.guard === 'employees'){
            return true;
        }else{

            // this.alertService.alertError('errors.not_logged').afterClosed().subscribe(()=>{
            //     this.router.navigateByUrl('/login');
            // });
            this.router.navigate(['/auth/admin/login']);
            return false;
        }


    }

    canShow() {
        let user = UserService.userLocal();
        return user.token && (user.guard === 'employees');
    }
}