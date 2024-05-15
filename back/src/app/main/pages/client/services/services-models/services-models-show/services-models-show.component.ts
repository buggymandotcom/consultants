import {Component, OnInit} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientService} from "../../../../../../shared/services/client.service";
import {User} from "../../../../../../core/auth/models/user.model";
import {TaxModel} from "../../../../../../shared/models/client/models/tax-model.model";
import {PaginationResponse} from "../../../../../../shared/models/pagination-response.model";
import {TaxModelDraft} from "../../../../../../shared/models/client/models/tax-model-draft";
import {Filter} from "../../../../../../shared/components/pagination/filter.model";
import {PaginationConfig} from "../../../../../../shared/components/pagination/pagination.model";
import { MatDialog } from '@angular/material/dialog';
import {NewDraftComponent} from "./new-draft/new-draft.component";
import {AlertService} from "../../../../../../shared/alerts/services/alert.service";
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-services-models-show',
    templateUrl: './services-models-show.component.html',
    styleUrls: ['./services-models-show.component.scss'],
    animations   : fuseAnimations
})

export class ServicesModelsShowComponent implements OnInit {

    client: User;
    drafts: TaxModelDraft[] = [];
    taxModels: TaxModel[] = [];
    nDrafts: number = 0;
    filterBy: number = -1;

    /* Tabla */
    paginationConfig: PaginationConfig = new PaginationConfig();
    filter: Filter = new Filter({
        sort: ['id','desc'],
        per_page : 4,
    });

    /* New draft modal */
    dialogRef: any;

    constructor(
        private clientService: ClientService,
        private route: ActivatedRoute,
        private router : Router,
        private _matDialog: MatDialog,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.client = new User(JSON.parse(localStorage.getItem('currentUser')));

        /* Obtener modelos activos */
        this.clientService.modelsAvailables(this.client.id).subscribe((models: TaxModel[]) => {
            this.taxModels = models.map( e => new TaxModel(e));

            /* Obtener filtro */
            this.route.parent.params.subscribe(d => {
                if(d.id) this.filterBy = d.id;

                /* Cargar borradores */
                this.loadDrafts(1);
            });
        });
    }

    loadDrafts(page?){
        let options = this.filter.toUrl();
        options['client'] = this.client.id;
        if(this.filterBy != -1) options['model'] = this.filterBy;
        this.clientService.getDrafts(page,options).subscribe( (paginated: PaginationResponse) => {
            this.drafts = paginated.data.map(t => new TaxModelDraft(t));
            this.paginationConfig=this.paginationConfig.reload(paginated);
            this.nDrafts = this.drafts.length;
        }), err => {
            console.error(err);
        };
    }

    filterModel(model_id){
        if(this.filterBy != -1){
            if(model_id != this.filterBy && model_id != -1){
                this.loadDrafts(1);
                return this.router.navigate(['/client/services/models/'+model_id]);
            } else {
                return this.router.navigate(['/client/services/models']);
            }
        } else {
            this.loadDrafts(1);
            return this.router.navigate(['/client/services/models/'+model_id]);
        }
    }

    deleteDraft($event,draft_id){
        $event.stopPropagation();
        this.clientService.delDraft(this.client.id,draft_id).subscribe(d => {
            this.loadDrafts(1);
            this.alertService.msg('draft.deleted');
        });
    }

    newDraft(): void {
        this.dialogRef = this._matDialog.open(NewDraftComponent, {
            panelClass: 'new-draft-form-dialog',
            data      : {
                action: 'new',
                client: this.client.id
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }
                /* Crear Borrador */
                let newDraft = new TaxModelDraft();
                newDraft.client_id = this.client.id;
                newDraft.model_id = response.getRawValue()['model_id'];
                newDraft.year = (new Date().getFullYear()-1); //Por defecto el año anterior

                this.clientService.addDraft(this.client.id,newDraft).subscribe((d: TaxModelDraft) => {
                    this.alertService.msg('draft.added');
                    /* Abrir formulario de edición del borrador */
                    return this.router.navigate(['/client/services/models/'+d.model_id+'/draft'+d.model.name+'/'+d.id]);
                });
            });
    }

}
