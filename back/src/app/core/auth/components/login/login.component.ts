import { Component, OnInit, OnDestroy,  ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/authentication.service";
import {AlertService} from "../../../../shared/alerts/services/alert.service";
import {UserService} from "../../../../shared/services/user.service";

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit, OnDestroy
{
    loginForm: FormGroup;
    loading: boolean = false;
    returnUrl: string;
    newClient = false;

    /* Lang */
    languages: any;
    selectedLanguage: any;

    // Private
    private _unsubscribeAll: Subject<any> = new Subject();

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
        private _translateService: TranslateService,
    ) {
        this.languages = [
            {
                id   : 'en',
                title: 'English',
                flag : 'en'
            },
            {
                id   : 'es',
                title: 'Español',
                flag : 'es'
            }
        ];

        /* Set the privat edefaults */
        this._unsubscribeAll = new Subject();
        this.route.queryParams
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((d: any) => {
                console.log('params', d);
                this.newClient = !!d.n;
            });
    }

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

        /* LANG */
        // Set the selected language from default languages
        // this.selectedLanguage = _.find(this.languages, {'id': 'en'});
        // this.setLanguage(this.selectedLanguage);


        // setTimeout(()=>{
        //
        // },3000);


        // reset login status
        //this.authService.logout();

        //console.log(this.authService.currentUser());

        // get return url from route parameters or default to '/'
        this.returnUrl = this.newClient ? '/client/profile' : (this.route.snapshot.queryParams['returnUrl'] || 'client');

        // this.authService.isLoggedIn().subscribe(d => console.log(d), error2 => console.log(error2));

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    login(): void {
        if (this.loginForm.valid) {
            this.loading = true;
            this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
              .subscribe(
                data => {

                    this.loading = false;
                    let user = UserService.userLocal();
                    if(user.activated){
                        this.alertService.msg('app.login_successfully', 2000);
                        if (this.newClient) {
                            this.router.navigate([this.returnUrl], {queryParams: {n: 1}});
                        } else {
                            this.router.navigate([this.returnUrl]);
                        }
                    } else {
                        this.alertService.msg('app.login_activation_required', 2000);
                        this.router.navigate(['/auth/activate/'+user.id]);
                    }
                },
                error => {
                    // if (error.status==401 || error.status==403){
                        this.alertService.msg('app.login_error', 2000);
                    // }
                    this.loading = false;
                });
        }
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void
    {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.setDefaultLang(lang.id);
        this._translateService.use(lang.id);
        // this.userService.changeLang(lang.id).subscribe(d=>{
        //     let u =UserService.userLocal();
        //     u.lang=lang.id;
        //     localStorage.setItem('currentUser', JSON.stringify(u.toLocalstorage()));
        // },err=>console.log(err));

    }
}
