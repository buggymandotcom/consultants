import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {auditTime, takeUntil} from 'rxjs/operators';
import {AuthService} from '../../services/authentication.service';
import {AlertService} from '../../../../shared/alerts/services/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-activate',
    templateUrl: './activate.component.html',
    styleUrls: ['./activate.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ActivateComponent implements OnInit, OnDestroy {

    client: number;

    activateForm: FormGroup;
    wrongActivationCode = false;
    activating = false;
    activated = false;
    sending = false;
    private ngUnsubscribeActivation = new EventEmitter();
    private ngUnsubscribe = new EventEmitter();

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

    @ViewChild('codeInputEl') codeInputEl: ElementRef;

    constructor(
        private _formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService,
        private _translateService: TranslateService,
    ) {
        this.activateForm = this._formBuilder.group({
            code: [{value: '', disabled: false}, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        });
    }

    ngOnInit(): void {
        this.route.params
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(d => {
                this.client = d.client;
                this.authService.checkActivated(this.client)
                    .pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe((d: any) => {
                        this.activated = !!d.activated;
                    }, err => {
                        console.error(err);
                    });
            });
        this.codeInput.valueChanges
            .pipe(takeUntil(this.ngUnsubscribe), auditTime(500))
            .subscribe((e: string) => {
                this.wrongActivationCode = false;
                this.activate();
            });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribeActivation.next();
        this.ngUnsubscribe.next();
    }

    get codeInput(): AbstractControl {
        return this.activateForm.get('code');
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

    activate(): void {
        if (!this.activating && this.codeInput.valid) {
            this.activating = true;
            this.codeInput.disable({emitEvent: false});
            this.ngUnsubscribeActivation.next();
            const code = this.codeInput.value;
            this.authService.activateClient(this.client, code)
                .pipe(takeUntil(this.ngUnsubscribeActivation))
                .subscribe(d => {
                    this.activating = false;
                    this.activated = true;
                }, (err: HttpErrorResponse) => {
                    console.error(err);
                    this.activating = false;
                    this.codeInput.enable({emitEvent: false});
                    if (err.status === 409) {
                        this.wrongActivationCode = true;
                        this.codeInput.setErrors({invalid: true});
                        if (this.codeInputEl) {
                            this.codeInputEl.nativeElement.focus();
                        }
                    } else {
                        this.alertService.alertError('errors.client.activation_generic_error');
                    }
                });
        }
    }

    resendToken(): void {
        this.sending = true;
        this.authService.sendToken(this.client)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(d => {
                this.sending = false;
                this.alertService.msg('app.activate.token_resent', 2000);
            }, err => {
                console.log(err);
                this.sending = false;
                if (err.error && err.error.reason) {
                    this.alertService.msg('error.client.activate_token_sent_recently', 5000);
                } else {
                    this.alertService.msg('error.error_has_occurred', 8000);
                }
            });
    }

}
