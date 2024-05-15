import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {ClientService} from "../../../../../../../../shared/services/client.service";
import {AlertService} from "../../../../../../../../shared/alerts/services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from '@angular/forms';
import {DraftState} from "../../../../../../../../shared/models/foundations/draft-state";
import {DRAFT_STATE} from "../../../../../../../../shared/consts/draft-state.consts";
import {DECLARATION_720_ERROR} from "../../../../../../../../shared/consts/declaration-720-error.consts";
import {DeclarationError} from "../../../../../../../../shared/models/foundations/declaration-error";
import {Declaration720} from "../../../../../../../../shared/models/client/models/seven-two-cero/declaration-720";
import {Property720} from "../../../../../../../../shared/models/client/models/seven-two-cero/property-720";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatStepper} from '@angular/material';

@Component({
  selector: 'app-adm-client-model-seven-two-cero',
  templateUrl: './adm-client-model-seven-two-cero.component.html',
  styleUrls: ['./adm-client-model-seven-two-cero.component.scss']
})
export class AdmClientModelSevenTwoCeroComponent implements OnInit, AfterViewInit {

    client_id: number;
    model_id: number;
    draft_id: number;

    /* Vista de las propiedades */
    property_index: number;
    loadingProperties = true; // Si true --> esta cargando la lista de propiedades
    loadProperty: boolean = false; //Muestra la lista de propiedades

    /* Modelos - Angular */
    declaration: Declaration720;

    /* Sección actual
    *   - 0: Declarante
    *   - 1: Bien o propiedad
    *   - 2: Resumen    *
    *  */
    selectedIndex: number = 0;

    /* Estados del borrador disponibles */
    draftStates = DRAFT_STATE;
    draftPropertyErrors: number[] = []; // Ids de los errores de las propiedades

    /* Errores del borrador */
    draftErrorTypes = DECLARATION_720_ERROR;
    draftErrors: DeclarationError[] = []; //Errores
    draftAlerts: DeclarationError[] = []; //Alertas
    colorError: string;

    /* Años disponibles */
    years: number[] = [(new Date().getFullYear()),(new Date().getFullYear()-1),(new Date().getFullYear()-2),(new Date().getFullYear()-3),(new Date().getFullYear()-4)]; //El actual y los dos anteriores

    /* Progreso */
    progress: number;

    /* Valoraciones totales */
    totalValoration1: number;
    totalValoration2: number;

    /* Tabla de propiedades */
    displayedColumns: string[] = ['id','created_at','updated_at','errors','val1','val2','options'];
    dataSource: MatTableDataSource<Property720>;
    @ViewChild(MatPaginator, {}) paginator: MatPaginator;
    @ViewChild(MatSort, {}) sort: MatSort;

    /* Steeper */
    @ViewChild('stepper') stepper: MatStepper;

    constructor(
        private route: ActivatedRoute,
        private clientService: ClientService,
        private alertService: AlertService,
        private router : Router,
        private _formBuilder: FormBuilder
    ) { }

    ngOnInit() {

        this.loadingProperties = true;

        this.route.parent.parent.parent.parent.params.subscribe(d => {
            this.client_id = d.id;

            this.route.parent.params.subscribe(p => {

                this.model_id = p.model;
                this.draft_id = p.draft;

                /* Obtenemos la información de la declaración, el cliente asociado (declarante), el borrador y las propiedades */
                this.clientService.declaration720(this.client_id,{'draft_id':this.draft_id,'with[]':['declarant','draft','properties','valoration1','valoration2']}).subscribe(dec => {
                    this.declaration = new Declaration720(dec);

                    /* Tabla de propiedades */
                    this.dataSource = new MatTableDataSource(this.declaration.properties);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;

                    /* Autocompletar información */
                    this.autoCompleteDeclaration();

                    /* Validar declaración */
                    this.validateDeclaration(true,1000);

                });
            });
        }, err => {
            console.error(err);
        });

    }

    ngAfterViewInit() {

    }

    autoCompleteDeclaration(){

        /* Sección 1 */

        /* Datos del declarante y persona con quién relaccionarse */
        if(this.declaration.person_contact_name == null || this.declaration.person_contact_name == '') this.declaration.person_contact_name = 'Lexforis International Law';
        if(this.declaration.person_contact_phone == null || this.declaration.person_contact_phone == '') this.declaration.person_contact_phone = '968233151';

    }

    /*
    * Valida el formulario de la sección 1
    *
    * */
    public validateDeclarantForm(){
        return (
            (this.declaration.declarant.full_name != '') && (this.declaration.declarant.additionalInfo.identification != '') &&
            (this.declaration.person_contact_name != '') && (this.declaration.person_contact_phone != '')
        );
    }

    /*
    * Esta función recibe la propiedad del componente hijo
    *
    * */
    public saveProperty($event){

        /* Recupera la propiedad */
        let index = this.declaration.properties.findIndex(e => e.id == $event.id);

        /* Añade la nueva propiedad a la declaración */
        this.declaration.properties[index] = new Property720($event);

        /* Valida la declaración, con la nueva propiedad actualizada */
        this.validateDeclaration(true,0);

        /* Tabla de propiedades */
        this.dataSource = new MatTableDataSource(this.declaration.properties);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        /* Actualizar propiedad */
        this.saveProperty720(this.declaration.properties[index]);

    }

    public saveProperty720(property: Property720){

        this.clientService.saveProperty720(property).subscribe(d => {
        });
    }

    public loadSection(section, delay){
        setTimeout(()=>{
            switch (section) {
                case 1:
                    this.stepper.selectedIndex = 1;
                    this.selectedIndex = 1;
                    break;
                case 2:
                    this.stepper.selectedIndex = 1;
                    this.stepper.selectedIndex = 2;
                    this.selectedIndex = 2;
                    break;
            }

        },delay);
    }

    public validateProperties() {
        let state: boolean = true;

        if (this.declaration.properties.length != 0) {
            for(let i=0;i<this.declaration.properties.length;i++) {
                this.declaration.properties[i].validate();
                if (!this.declaration.properties[i].isValid) {
                    state = false; //Propiedad con errores
                    for(let j=0;j<this.declaration.properties[i].propertyErrors.length;j++){
                        this.draftErrors.push(this.declaration.properties[i].propertyErrors[j]); //Añadir error al log de errores de la declaración
                        this.draftPropertyErrors.push(this.declaration.properties[i].id);
                    }
                }
            }
        }
        else {
            this.draftErrors.push(new DeclarationError(this.draftErrorTypes.find(e => e.type == 3))); // No hay propiedades
            state = false;
        }

        this.loadingProperties = false;
        return state;
    }

    /*
    * Valida los campos del formulario de la declaración (secciones 1, 2 y 3). El parámetro "loadSection" es un booleano que establece:
    *   - true: se carga la última sección válida
    *   - false: la sección permanece impasible
    *
    * */
    public validateDeclaration(loadSection, delay){
        this.draftErrors = [];
        this.draftAlerts = [];
        this.draftPropertyErrors = [];

        let state: boolean;
        let currentSection: number = 0; //Sección actual de acuerdo al proceso de validación

        /* Validación del declarante - Sección 1 */
        if(this.validateDeclarantForm()) {
            this.draftAlerts.push(new DeclarationError(this.draftErrorTypes.find(e => e.type == 1))); // Sección declarante cuumplimentada correctamente
            currentSection = 1;
            this.progress = 33;
            state = true;

            /* Validación de los bienes o propieades - Sección 2 */
            if(this.validateProperties()){
                this.draftAlerts.push(new DeclarationError(this.draftErrorTypes.find(e => e.type == 2))); // Sección bienes cuumplimentada correctamente
                this.progress = 66;
                currentSection = 2;
                state = true;

                /* Calcular valoraciones totales */
                this.calculateTotalValorations();

            } else {
                state = false;
                currentSection = 1; // Nos quedamos en la sección 2
                this.progress = 33;
            }

        } else {
            /* Errores de la sección 1 */
            this.draftErrors.push(new DeclarationError(this.draftErrorTypes.find(e => e.type == 0))); // Campos del declarante invalidos
            state = false;
            this.progress = 0;
        }

        if(state){
            this.colorError = 'greenClass';
            this.loadingProperties = false;
        } else {
            this.colorError = 'redClass';
            this.alertService.msg('app.errors.in.declaration');
        }

        //Guardar la declaración sin actualizar las propiedades
        this.saveDeclaration(false);

        //Ir a la sección actual
        if (loadSection) this.loadSection(currentSection, delay);
    }

    /*
    * Captura el evento en el que el usuario cambia de sección
    *
    * */
    public stepperStateChange($event){
        this.selectedIndex = $event.selectedIndex;
        this.validateDeclaration(false, 0);
    }

    /*
    * Guarda la declaración
    *
    * */
    public saveDeclaration(validateDeclaration: boolean){
        this.clientService.saveDeclaration720(this.client_id,this.declaration,this.declaration.id).subscribe(d => {

            /* Actualiza la declaración, la valida y actualiza las propiedades que hay en baase de datos */
            if(validateDeclaration) {

                /* Sobreescribe las propiedades y los campos */
                this.declaration = new Declaration720(d);

                /* Tabla de propiedades */
                this.dataSource = new MatTableDataSource(this.declaration.properties);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

                /* Valida la declaración */
                this.validateDeclaration(true,1000);
            }
            this.alertService.msg('declaration.save');

        }, err => {
            console.error(err);
        });
    }

    public getDraftState(state){
        let draftState: DraftState = new DraftState(this.draftStates.find( draftState => draftState.key == state ));
        return draftState.name;
    }

    public goToModels(): void{
        this.router.navigate(['/admin/clients/'+this.client_id+'/services/models']);
    }

    /* PROPIEDADES */

    public showListOfProperties(){
        this.loadProperty = false;
    }

    public addProperty(){
        this.clientService.addProperty720(this.declaration.id).subscribe(d => {
            this.declaration.properties = d.map(e => new Property720(e));

            /* Tabla de propiedades */
            this.dataSource = new MatTableDataSource(this.declaration.properties);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.validateDeclaration(false,0);
            this.alertService.msg('app.declaration.property.added');
        });
    }

    public deleteProperty(property_id){
        this.clientService.removeProperty720(property_id,this.declaration.id).subscribe(properties => {
            this.declaration.properties = properties.map(e => new Property720(e));

            /* Tabla de propiedades */
            this.dataSource = new MatTableDataSource(this.declaration.properties);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.validateDeclaration(false,0);
            this.alertService.msg('app.declaration.property.delete');
        });
    }

    public showProperty(property_id){
        this.property_index = this.declaration.properties.findIndex(e => e.id == property_id);
        this.loadProperty = true;
    }

    public getErrorsInProperty(property_id){
        return this.declaration.properties.find(e => e.id == property_id).propertyErrors.length;
    }

    public calculateTotalValorations(){

        let total1 = 0;
        let total2 = 0;

        /* Suma total de las valoraciones de tipo 1 y tipo 2 */
        for(let i=0; i<this.declaration.properties.length; i++){
            if (this.declaration.properties[i].valoration1_id.sign == 'N') total1 -= parseFloat(this.declaration.properties[i].valoration1_id.completeValoration);
            else total1 += parseFloat(this.declaration.properties[i].valoration1_id.completeValoration);
            if (this.declaration.properties[i].valoration2_id.sign == 'N') total2 -= parseFloat(this.declaration.properties[i].valoration2_id.completeValoration);
            else total2 += parseFloat(this.declaration.properties[i].valoration2_id.completeValoration);
        }

        /* Establecer signo */
        if(total1 < 0) this.declaration.valoration1_id.setValues(Math.abs(total1),'N');
        else this.declaration.valoration1_id.setValues(total1,'P');
        if(total2 < 0) this.declaration.valoration2_id.setValues(Math.abs(total2),'N');
        else this.declaration.valoration2_id.setValues(total2,'P');

        /* Valores del formulario */
        this.totalValoration1 = total1;
        this.totalValoration2 = total2;

    }

    public exportDeclaration(){
        this.clientService.export(this.draft_id);
    }

}
