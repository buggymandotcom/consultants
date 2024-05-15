import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Property720} from "../../../../../../../../../shared/models/client/models/seven-two-cero/property-720";
import {ClientService} from "../../../../../../../../../shared/services/client.service";
import {AlertService} from "../../../../../../../../../shared/alerts/services/alert.service";
import {
    DECLARATION_720_DECLARANT_KEY_CONDITION,
    DECLARATION_720_DECLARANT_PROPERTY_KEY,
    DECLARATION_720_PROPERTY_SUBKEY_TYPE,
    DECLARATION_PROPERTY_IDENTITY_KEY,
    DECLARATION_PROPERTY_IDENTITY_KEY_ACCOUNT,
    DECLARATION_PROPERTY_ORIGIN_VALUES, DECLARATION_PROPERTY_REAL_STATE_KEY,
    DECLARATION_PROPERTY_REPRESENTATION_KEY_VALUE
} from "../../../../../../../../../shared/consts/declaration-720-error.consts";
import {PropertySubkeyType720} from "../../../../../../../../../shared/models/client/models/seven-two-cero/property-subkey-type-720";
import {PropertyCountryCod720} from "../../../../../../../../../shared/models/client/models/seven-two-cero/property-country-cod-720";
import {Helpers} from "../../../../../../../../../shared/helpers";
import {Valoration} from "../../../../../../../../../shared/models/client/models/seven-two-cero/valoration";

@Component({
  selector: 'app-adm-seven-tow-cero-property',
  templateUrl: './adm-seven-two-cero-property.component.html',
  styleUrls: ['./adm-seven-two-cero-property.component.scss']
})

export class AdmSevenTwoCeroPropertyComponent implements OnInit {

    @Input() property: Property720;
    @Output() changeValue = new EventEmitter();
    newProperty: Property720;

    /* Lista de códigos de países */
    countryCodes: PropertyCountryCod720[] = [];

    /* Acordeon */
    private step: number = 0;

    /* Claves */
    declarantKeyConditions = DECLARATION_720_DECLARANT_KEY_CONDITION;
    declarantPropertyKeys = DECLARATION_720_DECLARANT_PROPERTY_KEY;
    declarantPropertySubkeyTypes = DECLARATION_720_PROPERTY_SUBKEY_TYPE;
    declarantPropertyIdentityKeys = DECLARATION_PROPERTY_IDENTITY_KEY;
    declarantPropertyIdentityAccounts = DECLARATION_PROPERTY_IDENTITY_KEY_ACCOUNT;
    declarantPropertyOriginKeys = DECLARATION_PROPERTY_ORIGIN_VALUES;
    declarantPropertyRepresentationKeys = DECLARATION_PROPERTY_REPRESENTATION_KEY_VALUE;
    declarantRealStateKeys = DECLARATION_PROPERTY_REAL_STATE_KEY;
    subkeysAvailables: PropertySubkeyType720 [] = []; // Almacena las subcalves disponibles en función del campo key condition seleccionado

    /* Valoraciones */
    val1: Valoration;
    val2: Valoration;

    constructor(
        private clientService: ClientService,
        private alertService: AlertService,
    ) { }

    ngOnInit() {
        this.clientService.property720(this.property.id,{'with[]':['representative','subkey_type','country_cod','country_address_cod','valoration1','valoration2']}).subscribe((d: Property720) => {
            this.newProperty = new Property720(d);

            /* Validar propiedad */
            this.newProperty.validate();

            /* Autocompletar */
            this.autoCompleteProperty();

            /* Cargar campos disponibles */
            this.subkeysAvailables = this.declarantPropertySubkeyTypes.filter( e => e.property_key_type == this.newProperty.property_key_type);

            /* Obtener todos los países */
            this.clientService.getCountries().subscribe( d => {
                this.countryCodes = d;
            });

            /* Actualizar valoraciones */
            this.val1 = new Valoration(this.newProperty.valoration1_id);
            this.val2 = new Valoration(this.newProperty.valoration2_id);

            /* Sección actual */
            this.step = this.newProperty.currentSection;
        })

    }

    autoCompleteProperty(){

        /* Sección 1: Datos del declarante */
        // if(this.newProperty.declarant_condition == 1) this.newProperty.declarant
    }

    public validateProperty(){

        /* Actualizar valoraciones */
        this.newProperty.valoration1_id = new Valoration(this.val1);
        this.newProperty.valoration2_id = new Valoration(this.val2);

        /* Validar propiedad */
        this.newProperty.validate();
        this.changeValue.emit(this.newProperty); //Envía la propiedad al padre
        this.step = this.newProperty.currentSection;
    }

    public setStep(index: number) {
        this.step = index;
    }

    // public nextStep() {
    //     this.newProperty.validate();
    //     if(this.newProperty.isValid) this.step++;
    // }
    //
    // public prevStep() {
    //     this.step--;
    // }

    /* Funciones para validar el formulario */
    public propertySubkeySelected(id){
        this.newProperty.property_subkey_type = new PropertySubkeyType720(this.declarantPropertySubkeyTypes.find(e => e.id == id));
        this.newProperty.validate();
    }

    public propertySubKeyTypeAvailable() {
        this.newProperty.property_subkey_type = new PropertySubkeyType720();
        this.subkeysAvailables = [];
        this.subkeysAvailables = this.declarantPropertySubkeyTypes.filter(e => e.property_key_type == this.newProperty.property_key_type);
        this.newProperty.validate();
    }

    public declarantKeyConditionClick(){
        this.newProperty.validate();
    }

    public countryCodSelected(id){
        this.newProperty.country_cod = new PropertyCountryCod720(this.countryCodes.find(e => e.id == id));
    }

    public countryAddressCodSelected(id){
        this.newProperty.country_address_cod = new PropertyCountryCod720(this.countryCodes.find(e => e.id == id));
    }

    public propertyAccountCodeChange(){
        this.newProperty.validate();
    }

    public propertyOriginChange(){
        this.newProperty.validate();
    }

    public inDateValue(event) {
        this.newProperty.incorporation_date = Helpers.parseDateToString(event.value,'YYYY-MM-DDTHH:mm');
    }

    public exDateValue(event) {
        this.newProperty.extinction_date = Helpers.parseDateToString(event.value,'YYYY-MM-DDTHH:mm');
    }

    public selectSign(v: Valoration){
        v.changeSign();
        console.log(v.value+', '+v.decimal+', '+v.sign);
    }

    public valorationChange(v: Valoration,event){

        let val = event.target.value;
        let elements = val.split('.');
        let control: boolean = false;

        if(elements.length <= 2) {
            /* La cadena esta bien formada */
            if (elements[0].match(/\D/) == null) {
                /* El primer elemento son dígitos */
                v.value = parseInt(elements[0]);
                if (elements.length > 1) {
                    /* Tiene parte decimal*/
                    if (elements[1].match(/\D/) == null) {
                        /* La parte decimal tiene solo digitos */
                        v.decimal = parseInt(elements[1]);
                        control = true;
                    } else control = false;
                } else {
                    v.decimal = 0;
                    control = true;
                }
            }
        }


        console.log(v.value+', '+v.decimal+', '+v.sign);

        if(!control) this.alertService.msg('declaration.property.valoration.sintax.wrong.formated');
    }

    public numberOfValuesChange(event){
        this.newProperty.value_numbers = parseFloat(event.target.value);
    }

    public ParticipationChange(event){
        this.newProperty.participation = parseFloat(event.target.value);
    }
}
