import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {fuseAnimations} from '../../../../../@fuse/animations';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/authentication.service';
import {AlertService} from '../../../../shared/alerts/services/alert.service';

@Component({
    selector     : 'register-2',
    templateUrl  : './register-2.component.html',
    styleUrls    : ['./register-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class Register2Component implements OnInit, OnDestroy
{
    registerForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    /* Lang */
    languages: any = [
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
    selectedLanguage: any;

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private alertService: AlertService,
        private _translateService: TranslateService,
    )
    {
        // Configure the layout
        /*this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };*/

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.registerForm = this._formBuilder.group({
            email          : ['', [Validators.required, Validators.email]],
            password       : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
            terms: ['', Validators.required]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('passwordConfirm').updateValueAndValidity();
            });
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

    submit(): void {
        if (this.registerForm.valid) {
            const data = {
                'email': this.registerForm.get('email').value,
                'password': this.registerForm.get('password').value,
                'password_confirmation': this.registerForm.get('passwordConfirm').value,
            };
            this.authService.register(data)
                .subscribe((r: any) => {
                    this.alertService.msg('app.register.started');
                    if (r.created) {
                        this.router.navigate(['/auth/activate', r.created]);
                    }
                }, err => {
                    console.error(err);
                    if (err.error && err.error.reason) {
                        this.alertService.alertError(err.error.reason);
                    } else {
                        this.alertService.alertError('error.error_has_occurred');
                    }
                });
        }
    }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if ( !control.parent || !control )
    {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return null;
    }

    if ( passwordConfirm.value === '' )
    {
        return null;
    }

    if ( password.value === passwordConfirm.value )
    {
        return null;
    }

    return {'passwordsNotMatching': true};
};
