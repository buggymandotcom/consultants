import {Component, EventEmitter, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/authentication.service';
import {AlertService} from '../../../../shared/alerts/services/alert.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector     : 'login-admin',
    templateUrl  : './login-admin.component.html',
    styleUrls    : ['./login-admin.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginAdminComponent implements OnInit, OnDestroy
{
    loginForm: FormGroup;
    loading = false;
    returnUrl: string;

    private ngUnsubscribe = new EventEmitter();

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private alertService: AlertService,
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        // setTimeout(()=>{
        //
        // },3000);


        // reset login status
        // this.authService.logout();

        // console.log(this.authService.currentUser());

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';

        // this.authService.isLoggedIn().subscribe(d => console.log(d), error2 => console.log(error2));

    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
    }

    login(): void {
        if (this.loginForm.valid) {
            this.loading = true;
            this.ngUnsubscribe.next();
            this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value, 'employees')
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(
                    data => {
                        this.alertService.msg('Login correcto', 2000);
                        this.loading = false;
                        this.router.navigate([this.returnUrl]);
                    },
                    error => {
                        if (error.status == 401 || error.status == 403){
                            this.alertService.msg('Login incorrecto', 2000);
                        }
                        this.loading = false;
                    });
        }
    }
}
