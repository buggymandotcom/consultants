import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TaxModel} from "../../../../../../../shared/models/client/models/tax-model.model";
import {ClientService} from "../../../../../../../shared/services/client.service";
import {AlertService} from "../../../../../../../shared/alerts/services/alert.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TaxModelDraft} from "../../../../../../../shared/models/client/models/tax-model-draft";
import {DRAFT_STATE} from "../../../../../../../shared/consts/draft-state.consts";
import {DraftState} from "../../../../../../../shared/models/foundations/draft-state";
import {Client} from "../../../../../../../shared/models/client/client.model";
import {PaginationConfig} from "../../../../../../../shared/components/pagination/pagination.model";
import {Filter} from "../../../../../../../shared/components/pagination/filter.model";
import {PaginationResponse} from "../../../../../../../shared/models/pagination-response.model";
import {TaxModelService} from "../../../../../../../shared/services/tax-model.service";


@Component({
  selector: 'app-adm-client-models',
  templateUrl: './adm-client-models.component.html',
  styleUrls: ['./adm-client-models.component.scss']
})

export class AdmClientModelsComponent implements OnInit {

    clientId: number; //Cliente
    client: Client;
    isLoading: boolean = true;
    model_id: number = 0;

    /* Modelos */
    taxModelsAvailable: TaxModel[] = [];
    taxModelsHired: TaxModel[] = [];
    taxModelsHiredDistinct: TaxModel[] = []; //Modelos contratados distintos
    taxModels: TaxModel[] = []; //Modelos contratados + Disponibles

    /* Borradores */
    drafts: TaxModelDraft[] = [];
    nDrafts: number = 0;

    /* Selected Tab */
    selectedIndex: number = 0;

    // @ViewChild('svAvailableSidenav') svAvailableSidenav: MatSidenav;

    isMd: boolean;
    isSm: boolean;
    isXs: boolean;

    /* Estados del borrador disponibles */
    draftStates = DRAFT_STATE;

    /* MatTable Modelos */
    displayedColumns: string[] = ['id','name','description', 'drafts','state'];
    dataSource: MatTableDataSource<TaxModel>;
    @ViewChild(MatPaginator, {}) paginator: MatPaginator;
    @ViewChild(MatSort, {}) sort: MatSort;

    /* Paginacion para tablas de borradores */
    paginationConfig: PaginationConfig = new PaginationConfig();
    filter: Filter = new Filter({
        sort: ['id','desc'],
        per_page : 4,
    });

    constructor(
        private route: ActivatedRoute,
        private clientService: ClientService,
        private taxModelService: TaxModelService,
        private alertService: AlertService,
        private router : Router,
    ) {
        this.isMd = window.innerWidth < 1500;
        this.isSm = window.innerWidth < 992;
        this.isXs = window.innerWidth < 768;
    }

    ngOnInit() {
        this.loadModels();
    }

    loadModels(){
        this.isLoading = true;
        this.route.parent.parent.parent.params.subscribe(d => {
            this.clientId = d.id;

            this.clientService.modelsAvailable(this.clientId).subscribe(availableModels => {
                this.taxModelsAvailable = availableModels.map(m => new TaxModel(m));

                this.clientService.modelsHired(this.clientId).subscribe( hiredModels => {
                    this.taxModelsHired = hiredModels.map(d => new TaxModel(d));
                    this.taxModelsHiredDistinct = this.getDistinctModels();
                    this.taxModels = this.taxModelsHiredDistinct.concat(this.taxModelsAvailable); //Contratados + disponibles

                    /* Dotar de contenido a tabla de modelos */
                    this.dataSource = new MatTableDataSource(this.taxModels);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.dataSource.paginator.firstPage();

                    /* Dotar de contenido a las tablas de borradores */
                    this.clientInfo();
                })
            })
        }, err => {
            console.error(err);
        });
    }

    tabChange(indexNumber){
        if(indexNumber != 0) {
            this.model_id = this.taxModelsHiredDistinct[(indexNumber - 1)].id;
            this.getDraftsFromService(1);
        }
    }

    getDraftsFromService(page?){

        let options = this.filter.toUrl();
        options['client'] = this.clientId;
        options['model'] = this.model_id;

        /* Traemos los borradores con paginación */
        this.clientService.getDrafts(page,options).subscribe((paginated: PaginationResponse) => {
            this.drafts = paginated.data.map(t => new TaxModelDraft(t));
            this.paginationConfig=this.paginationConfig.reload(paginated);
            this.nDrafts = this.drafts.length;
        }, err => {
            console.error(err);
        });
    }

    clientInfo(){
        this.clientService.get(this.clientId,{'with[]':['additionalInfo']}).subscribe((d: Client) => {
            this.client = new Client(d);
        })
    }

    getModelState(model: TaxModel){
        return (this.getDrafts(model.id) > 0)
    }

    getDraftState(state){
        let draftState: DraftState = new DraftState(this.draftStates.find( draftState => draftState.key == state));
        return draftState.name;
    }

    getDistinctModels(){
        let taxModels: TaxModel[] = [];
        for(let i=0;i<this.taxModelsHired.length;i++){
            if(taxModels.findIndex(element => element.id == this.taxModelsHired[i].id) == -1) taxModels.push(this.taxModelsHired[i]);
        }
        return taxModels;
    }

    getDrafts(model_id){
        let drafts = 0;
        for(let i=0;i<this.taxModelsHired.length;i++){
            if(this.taxModelsHired[i].id == model_id) drafts++;
        }
        return drafts;
    }

    commuteModel(model: TaxModel){
        if(this.getModelState(model)){
            /* El modelo esta activo, hay que avisar de su desactivación */
            this.alertService.confirmation('model.deactivate.question').componentInstance.confirmed.subscribe(res => {
                if(res){
                    /* Desactivar el modelo del cliente */
                    this.clientService.deleteModel(this.clientId,model.id).subscribe(d => {
                        this.alertService.msg('model.desactivate');
                        this.loadModels();
                    })
                } else this.loadModels();
            })
        } else {
            /* El modelo no esta activo, hay que avisar de su activación */
            this.alertService.confirmation('model.activate.question').componentInstance.confirmed.subscribe(res => {
                if(res){

                    /* Crear Borrador */
                    let newDraft = new TaxModelDraft();
                    newDraft.client_id = this.clientId;
                    newDraft.model_id = model.id;
                    newDraft.year = (new Date().getFullYear()-1); //Por defecto el año anterior

                    /* Activar el modelo del cliente */
                    this.clientService.addModel(this.clientId,newDraft).subscribe(d => {
                        this.alertService.msg('model.activate');
                        this.loadModels();
                    })
                } else this.loadModels();
            })
        }
    }

    getTabFromModel(model_id){
        return (this.taxModelsHiredDistinct.findIndex(element => element.id == model_id)+1);
    }

    selectedTab(row): void {
        if(this.getDrafts(row) != 0) this.selectedIndex = this.getTabFromModel(row);
        else this.alertService.msg('model.not_activated.information');
    }

    getTranslationOfDraft(model_id){
        if(this.getDrafts(model_id) > 1) return 'model.drafts';
        return 'model.draft';
    }

    addDraft(model_id){

        /* Crear Borrador */
        let newDraft = new TaxModelDraft();
        newDraft.client_id = this.clientId;
        newDraft.model_id = model_id;
        newDraft.year = (new Date().getFullYear()-1); //Por defecto el año anterior

        this.clientService.addDraft(this.clientId,newDraft).subscribe((d: TaxModelDraft) => {
            //this.getDraftsFromService(1); //Recarga las lista de borradores
            this.alertService.msg('draft.added');

            /* Abrir formulario de edición del borrador */
            return this.router.navigate(['/admin/clients/'+this.clientId+'/services/models/'+d.model_id+'/draft'+d.model.name+'/'+d.id]);
        })
    }

    deleteDraft($event,draft_id){
        $event.stopPropagation();
        this.alertService.confirmation('declaration.210.deleted_question').componentInstance.confirmed.subscribe(res => {
            if (res) {
                this.clientService.delDraft(this.clientId, draft_id).subscribe(d => {
                    this.getDraftsFromService(1);
                    this.alertService.msg('draft.deleted');
                });
            }
        });
    }

    goToDraft(draft_id,model_id){
        let model = this.taxModelsHiredDistinct.find(model => model.id == model_id).name;
        return this.router.navigate(['/admin/clients/'+this.clientId+'/services/models/'+model_id+'/draft'+model+'/'+draft_id]);
    }

    presentedDraft($event,draft_id){
        $event.stopPropagation();
        this.alertService.confirmation('declaration.210.presented_question').componentInstance.confirmed.subscribe(res => {
            if(res){
                /* Cambiar estado de la declaración a presentada */
                let d = this.drafts.find(e => e.id == draft_id);
                d.state = 'presented';
                this.taxModelService.update(d).subscribe(d => {
                    this.alertService.msg('draft.presented');
                });
            }
        });
    }



}


