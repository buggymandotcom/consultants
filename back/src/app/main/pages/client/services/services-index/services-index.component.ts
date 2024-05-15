import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {FuseConfigService} from "../../../../../../@fuse/services/config.service";
import {FormBuilder} from "@angular/forms";
import {AccountingService} from "../../../../../shared/services/accounting.service";
import {AiNavigationService} from "../../../../../core/navigation/components/navigation/navigation.service";
import {AuthService} from "../../../../../core/auth/services/authentication.service";
import {navigation} from "../../../../../navigation/navigation";
import {UserService} from "../../../../../shared/services/user.service";
import {User} from "../../../../../core/auth/models/user.model";
import {UserSubscription} from "../../../../../core/auth/models/user-subscription.model";
import {ClientService} from "../../../../../shared/services/client.service";
import {Service} from "../../../../../shared/models/client/services/service";
import {ServiceTrans} from "../../../../../shared/models/client/services/service-trans";
import {ActivatedRoute, Router} from "@angular/router";
import {TaxModelDraft} from "../../../../../shared/models/client/models/tax-model-draft";
import {Filter} from "../../../../../shared/components/pagination/filter.model";
import {PaginationResponse} from "../../../../../shared/models/pagination-response.model";
import {TaxModel} from "../../../../../shared/models/client/models/tax-model.model";
import { TranslateService } from '@ngx-translate/core';
import {AlertService} from "../../../../../shared/alerts/services/alert.service";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-services-index',
  templateUrl: './services-index.component.html',
  styleUrls: ['./services-index.component.scss']
})
export class ServicesIndexComponent implements OnInit {

    client: User;
    servicesHired: Service[] = [];
    servicesAvailable: Service[] = [];
    lastModelsUpdates: TaxModelDraft[] = [];
    modelsAvailable: TaxModel[] = [];

    loadingHired: boolean;
    loadingAvailable: boolean;

    filter: Filter = new Filter({
        sort: ['id', 'desc'],
        per_page : 4,
    });

    @ViewChild('svAvailableSidenav') svAvailableSidenav: MatSidenav;

    isMd: boolean;
    isSm: boolean;
    isXs: boolean;

    constructor(
        private clientService: ClientService,
        private alertService: AlertService,
        private router: Router,
        private _translateService: TranslateService,
    ) {
        this.isMd = window.innerWidth < 1500;
        this.isSm = window.innerWidth < 992;
        this.isXs = window.innerWidth < 768;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event): void {
        this.isMd = event.target.innerWidth < 1500;
        this.isSm = event.target.innerWidth < 992;
        this.isXs = event.target.innerWidth < 768;
    }

    ngOnInit(): void {
        this.client = UserService.userLocal();
        if(this.client.activated) this.loadServices();
        else {
            this.alertService.msg('app.login_activation_required', 2000);
            this.router.navigate(['/auth/activate/'+this.client.id]);
        }
    }

    private loadServices(): void {
        this.loadingHired = true;
        this.clientService.servicesHired().subscribe((services: Service[]) => {
            /* SERVICIOS CONTRATADOS */
            this.servicesHired = services.map(s => new Service(s));

            let options = this.filter.toUrl();
            options['client'] = this.client.id;
            this.clientService.getDrafts(1, options).subscribe((paginated: PaginationResponse) => {
                this.lastModelsUpdates = paginated.data.map(t => new TaxModelDraft(t));
            });

            /* MODELOS CONTRATADOS */
            this.clientService.modelsAvailables(this.client.id).subscribe((models: TaxModel[]) => {
                this.modelsAvailable = models.map(d => new TaxModel(d));
            });

            this.loadingHired = false;

            /* Idioma */
            // this._translateService.setDefaultLang(UserService.userLocal().lang.id);
            // this._translateService.use(UserService.userLocal().lang.id);

        }, err => {
            console.error(err);
            this.loadingHired = false;
        });

        this.loadingAvailable = true;
        this.clientService.servicesAvailable()
            .subscribe((services: Service[]) => {
                this.servicesAvailable = services.map(s => new Service(s));
                this.loadingAvailable = false;
            }, err => {
                console.error(err);
                this.alertService.alertError('error.on_loading_services_availables');
                this.loadingAvailable = false;
            });
    }

    /* Retorna la traducción del servicio a partir del idioma del cliente */
    getServiceTranslation(service: Service): ServiceTrans {
        return service.translations.find(e => e.locale == this.client.lang);
    }

    goToService(service: Service): Promise<boolean> {
        switch (service.name) {
            case 'accounting':
                return this.router.navigate(['client/services/accounting']);
            case 'models':
                if(this.modelsAvailable.length > 0) return this.router.navigate(['client/services/models']);
                else this.alertService.msg('app.models.no_models_availables');
        }
    }

    hireService(service: number): void {
        this.alertService.confirmation('app.client_services.hire_service_confirmation').afterClosed()
            .subscribe(d => {
                if (d) {
                    this.clientService.hireService(service)
                        .subscribe(d => {
                            this.loadServices();
                            this.alertService.msg('msg.client.service_instructions_sent');
                            this.svAvailableSidenav.close();

                        }, err => {
                            console.log(err);
                            if (err.status == 400) {
                                this.alertService.alertError(err.error);
                            } else {
                                this.alertService.alertError('error.on_client_hiring_service');
                            }
                        });
                }
            });
    }

}
