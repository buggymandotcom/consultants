import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ClientService} from '../../../../shared/services/client.service';
import {Client} from '../../../../shared/models/client/client.model';
import {UserService} from '../../../../shared/services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CIVIL_STATUS_AVAILABLES, IDENTIFICATION_TYPES, REGIME_AVAILABLES} from '../../../../shared/consts/user.consts';
import {AlertService} from '../../../../shared/alerts/services/alert.service';
import {AuthService} from '../../../../core/auth/services/authentication.service';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../../core/auth/models/user.model";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    private client: Client;

    profileForm: FormGroup;

    showBirthDateHint = false;
    newClient = false;
    editable = false;
    loading = true;

    CIVIL_STATUSES = CIVIL_STATUS_AVAILABLES;
    REGIME_AVAILABLES = REGIME_AVAILABLES;
    IDENTIFICATION_TYPES = IDENTIFICATION_TYPES;

    private _unsubscribeLoad: Subject<any> = new Subject();
    private _unsubscribeSubmit: Subject<any> = new Subject();
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router,
        private route: ActivatedRoute,
        private _formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.route.queryParams
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((d: any) => {
                if(d.n) {
                    this.newClient = true;
                }
                this.loadProfile();
            });
    }

    private loadProfile() {
        this._unsubscribeLoad.next();
        this.loading = true;
        this.authService.clientProfile({'with[]': ['additionalInfo']})
            .pipe(takeUntil(this._unsubscribeLoad))
            .subscribe((c: Client) => {
                this.client = new Client(c);
                console.log(new Date(this.client.additionalInfo.birth_date));
                // let user = UserService.userLocal();
                // user.firstname = this.client.firstname;
                // user.lastname = this.client.lastname;
                // localStorage.setItem('currentUser', JSON.stringify(user.toLocalstorage()));
                this.loading = false;
                if (this.newClient) {
                    this.toggleEdit(true);
                }
            }, err => {
                console.error(err);
                this.loading = false;
                this.alertService.alertError('error.on_load_client_profile');
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeLoad.next();
        this._unsubscribeLoad.complete();
        this._unsubscribeSubmit.next();
        this._unsubscribeSubmit.complete();
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    toggleEdit(edit = undefined): void {
        if(edit !== undefined && edit !== null) {
            this.editable = edit;
        } else {
            this.editable = !this.editable;
        }
        if (this.editable) {
            console.log(this.client.additionalInfo.birth_date);
            this.profileForm = this._formBuilder.group({
                firstname: [this.client.firstname, Validators.required],
                lastname: [this.client.lastname, Validators.required],
                phone: [this.client.phone, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
                birth_date: [this.client.additionalInfo ? this.client.additionalInfo.birth_date : '', Validators.required],
                civil_status: [this.client.additionalInfo ? this.client.additionalInfo.civil_status : '', Validators.required],
                regime: [this.client.additionalInfo ? this.client.additionalInfo.regime : '', Validators.required],
                ocupation: [this.client.additionalInfo ? this.client.additionalInfo.ocupation : '', Validators.required],
                identification: [this.client.additionalInfo ? this.client.additionalInfo.identification : '', Validators.required],
                // iban: [this.client.additionalInfo ? this.client.additionalInfo.iban : '', [Validators.required, Validators.minLength(34), Validators.maxLength(34)]],
                iban: [this.client.additionalInfo ? this.client.additionalInfo.iban : '', [Validators.minLength(34), Validators.maxLength(34)]],
                // bank: [this.client.additionalInfo ? this.client.additionalInfo.bank : '', Validators.required],
                bank: [this.client.additionalInfo ? this.client.additionalInfo.bank : ''],
            });
        } else {
            if (this.profileForm) {
                this.profileForm.reset();
            }
        }
    }

    save(): void {
        //    Se debería dejar guardar aunque no estén todos los campos necesarios
        //    TODO Hacer comprobación de que no hay datos que rompan nada
        this.authService.updateClientProfile(this.profileForm.value)
            .pipe(takeUntil(this._unsubscribeSubmit))
            .subscribe(d => {
                this.alertService.msg('app.profile.profile_updated');
                if(this.newClient) {
                    this.newClient = false;
                    this.router.navigate([''], {
                        relativeTo: this.route,
                        queryParams: {}
                    });
                }
                this.toggleEdit(false);
                this.loadProfile();
            }, err => {
                console.error(err);
                this.alertService.alertError('error.on_update_client_profile');
            });
    }
}
