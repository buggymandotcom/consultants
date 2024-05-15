import {Client} from "../../client.model";
import {Helpers} from "../../../../helpers";
import {PropertySubkeyType720} from "./property-subkey-type-720";
import {PropertyCountryCod720} from "./property-country-cod-720";
import {DeclarationError} from "../../../foundations/declaration-error";
import {DECLARATION_720_ERROR} from "../../../../consts/declaration-720-error.consts";
import {Valoration} from "./valoration";

export class Property720 {

    id: number;
    declaration_id: number;
    representative_id: number;
    declarant_condition: number;
    declarant_type_ownership: string;
    property_key_type: string;
    property_real_ownership: string;
    identity_key: string;
    identity_values: string;
    identity_key_account: string; // Clave de identificación de la cuenta
    bic_code: string; // BIC code
    account_code: string; // Código de la cuenta
    entity_identity: string; // Identificación de la entidad
    residential_country_nif: string; // NIf en el país de residencia fiscal

    /* Inmueble */
    address: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    address_state: string;
    zip_code: string;
    incorporation_date: string;
    origin: string;
    extinction_date: string;
    value_representation_key: string;
    value_numbers: number;
    real_state_key_type: string; // Clave de tipo bien inmueble
    participation: number;

    created_at: Date;
    updated_at: Date;

    /* Objetos */
    property_subkey_type: PropertySubkeyType720;
    country_cod: PropertyCountryCod720;
    country_address_cod: PropertyCountryCod720;
    representative: Client = new Client();

    valoration1_id: Valoration;
    valoration2_id: Valoration;

    /* Errores y alertas de la propiedad */
    propertyErrors: DeclarationError[]; //Errores
    propertyAlerts: DeclarationError[]; //Alertas
    progress: number = 0;

    /* Errores del formulario de propiedad */
    draftPropertyTypes = DECLARATION_720_ERROR;
    colorError: string;
    currentSection: number = 0;
    isValid: boolean = false;
    state: boolean = false;

    /* Control de campos del formulario */

    /* Declarante */
    PropertyTypeRequire: boolean = true;
    RealOwnershipRequire: boolean = true;
    IdentityKeyRequire: boolean = true;
    IdentityValuesRequire: boolean = true;
    IdentityKeyAccountRequire: boolean = true;
    AccountCodRequire: boolean = true;
    EntityIdentityRequire: boolean = true;
    ResidentialNIFRequire: boolean = true;
    ValueRepresentationKeyRequired: boolean = true;
    ValueNumbersRequired: boolean = true;
    RealStateKeyRequired: boolean = true;

    /* Metadatos */
    ExtinctionDate: boolean = true;

    constructor(obj?) {

        if(obj) {
            this.id = obj.id;
            this.declaration_id = obj.declaration_id;
            if(obj.representative_id) this.representative_id = obj.representative_id;
            if(obj.declarant_condition) this.declarant_condition = parseInt(obj.declarant_condition);
            if(obj.declarant_type_ownership) this.declarant_type_ownership = obj.declarant_type_ownership;
            else this.declarant_type_ownership = '';
            if(obj.property_key_type) this.property_key_type = obj.property_key_type;
            if(obj.property_subkey_type) this.property_subkey_type = new PropertySubkeyType720(obj.property_subkey_type);
            if(obj.property_real_ownership) this.property_real_ownership = obj.property_real_ownership;
            else this.property_real_ownership = '';
            if(obj.country_cod) this.country_cod = new PropertyCountryCod720(obj.country_cod);
            if(obj.identity_key) this.identity_key = obj.identity_key;
            if(obj.identity_values) this.identity_values = obj.identity_values;
            if(obj.identity_key_account) this.identity_key_account = obj.identity_key_account;
            if(obj.bic_code) this.bic_code = obj.bic_code;
            else this.bic_code = '';
            if(obj.account_code) this.account_code = obj.account_code;
            else this.account_code = '';
            if(obj.entity_identity) this.entity_identity = obj.entity_identity;
            else this.entity_identity = '';
            if(obj.residential_country_nif) this.residential_country_nif = obj.residential_country_nif;
            else this.residential_country_nif = '';
            if(obj.representative) this.representative = new Client(obj.representative);

            /* Inmueble */
            if(obj.address) this.address = obj.address;
            else obj.address = '';
            if(obj.street) this.street = obj.street;
            else obj.street = '';
            if(obj.number) this.number = obj.number;
            else obj.number = '';
            if(obj.complement) this.complement = obj.complement;
            else obj.complement = '';
            if(obj.city) this.city = obj.city;
            else obj.city = '';
            if(obj.address_state) this.address_state = obj.address_state;
            else obj.address_state = '';
            if(obj.zip_code) this.zip_code = obj.zip_code;
            else obj.zip_code = '';
            if(obj.country_address_cod) this.country_address_cod = new PropertyCountryCod720(obj.country_address_cod);
            if(obj.incorporation_date) this.incorporation_date = Helpers.parseDateToString(obj.incorporation_date,'YYYY-MM-DDTHH:mm');
            else this.incorporation_date = null;
            if(obj.origin) this.origin = obj.origin;
            if(obj.extinction_date) this.extinction_date = Helpers.parseDateToString(obj.extinction_date,'YYYY-MM-DDTHH:mm');
            else this.extinction_date = null;
            if(obj.valoration1_id) this.valoration1_id = new Valoration(obj.valoration1_id);
            if(obj.valoration2_id) this.valoration2_id = new Valoration(obj.valoration2_id);
            if(obj.value_representation_key) this.value_representation_key = obj.value_representation_key;
            if(obj.value_numbers) this.value_numbers = obj.value_numbers;
            else this.value_numbers = 0;
            if(obj.real_state_key_type) this.real_state_key_type = obj.real_state_key_type;
            if(obj.participation) this.participation = obj.participation;
            else this.participation = 100.00;

            /* */
            this.created_at = Helpers.parseDate(obj.created_at);
            this.updated_at = Helpers.parseDate(obj.updated_at);

        }
    }

    public validateDeclarantFields() {

        this.currentSection = 0;

        /* CAMPOS DEL FORMULARIO */

        /* Tipo de titularidad sobre el bien o derecho */
        if (this.declarant_condition == 8) this.PropertyTypeRequire = false; //Necesario introducir tipo de propiedad sobre el bien o derecho
        else {
            /* No es necesario introducir el bien o derecho */
            this.PropertyTypeRequire = true;
            this.declarant_type_ownership = '';
        }

        /* Tipo de derecho real sobre el bien o derecho */
        if (this.property_key_type == 'B' && this.property_subkey_type.id == 15) this.RealOwnershipRequire = false;
        else {
            /* No es necesario introducir el derecho sobre el bien */
            this.RealOwnershipRequire = true;
            this.property_real_ownership = '';
        }

        /* Clave de identificación y Identificación de valores */
        if (this.property_key_type == 'V' || this.property_key_type == 'I') {
            this.IdentityKeyRequire = false;
            this.IdentityValuesRequire = false;
        } else {
            this.IdentityKeyRequire = true;
            this.IdentityValuesRequire = true;
            this.identity_key = '0';
            this.identity_values = '';
        }

        /* Clave de identificación de la cuenta */
        if (this.property_key_type == 'C') this.IdentityKeyAccountRequire = false;
        else {
            this.IdentityKeyAccountRequire = true;
            this.identity_key_account = '';
        }

        /* Código de cuenta */
        if (this.identity_key_account == 'I') this.AccountCodRequire = false;
        else {
            this.AccountCodRequire = true;
            this.account_code = '';
        }

        /* Identificación de la entidad */
        if (this.property_key_type != 'B') {
            this.EntityIdentityRequire = false;
            this.ResidentialNIFRequire = false;
        } else {
            this.EntityIdentityRequire = true;
            this.ResidentialNIFRequire = true;
            this.entity_identity = '';
            this.residential_country_nif = '';
        }

        /* VALIDACIÓN DEL DECLARANTE */

        if(this.declarant_condition == null ||
            this.property_key_type == null || this.property_key_type == '' ||
            this.property_subkey_type === null || this.property_subkey_type.id == null || isNaN(this.property_subkey_type.id) ||
            this.country_cod === null ||
            this.bic_code == '' || this.bic_code == null
        )
        {
            /* Hay que validar correctamente el formulario */
            this.propertyErrors.push(new DeclarationError(this.draftPropertyTypes.find(e => e.type == 6))); //falta contenido
            this.state = false;
        } else {

            /* Ahora todos los campos requeridos se encuentran dotados de contenido */

            /* Tipo de condición del declarante = 8 */
            if((this.declarant_condition == 8) && ((this.declarant_type_ownership == '') || (this.declarant_type_ownership == null))) {
                this.propertyErrors.push(new DeclarationError(this.draftPropertyTypes.find(e => e.type == 4))); //falta contenido
                this.state = false;
            } else {
                /* Si clave = B y subclave = 5, entonces es necesario introducir la propiedad real del inmueble */
                if(this.property_key_type == 'B' && this.property_subkey_type.id == 15) {
                    this.propertyErrors.push(new DeclarationError(this.draftPropertyTypes.find(e => e.type == 7))); //falta tipo de propiedad real
                    this.state = false;
                } else {
                    /* Identity key */
                    if((this.property_key_type == 'V' || this.property_key_type == 'I') && this.identity_key == '0'){
                        this.propertyErrors.push(new DeclarationError(this.draftPropertyTypes.find(e => e.type == 8))); //falta la clave de identidad
                        this.state = false;
                    } else {
                        /* Identity key Values */
                        if((this.property_key_type == 'V' || this.property_key_type == 'I') && (this.identity_values == '' || this.identity_values == null)){
                            this.propertyErrors.push(new DeclarationError(this.draftPropertyTypes.find(e => e.type == 9))); //falta la identificación de valores
                            this.state = false;
                        } else {
                            /* Identity key account - Clave de identificación de la cuenta*/
                            if(this.property_key_type == 'C' && (this.identity_key_account == '' || this.identity_key_account == null)){
                                this.propertyErrors.push(new DeclarationError(this.draftPropertyTypes.find(e => e.type == 10))); //falta clave de identificación de cuenta
                                this.state = false;
                            } else {
                                /* Código de cuenta */
                                if(this.identity_key_account == 'I' && (this.account_code == '' || this.account_code == null)){
                                    this.propertyErrors.push(new DeclarationError(this.draftPropertyTypes.find(e => e.type == 11))); //falta el código de cuenta
                                    this.state = false;
                                } else {
                                    /* Identificación de la entidad */
                                    if(this.property_key_type != 'B' && (this.entity_identity == '' || this.entity_identity == null)){
                                        this.propertyErrors.push(new DeclarationError(this.draftPropertyTypes.find(e => e.type == 12))); //falta el código de cuenta
                                        this.state = false;
                                    } else {
                                        /* NIF DE RESIDENCIA */
                                        if(this.property_key_type != 'B' && (this.residential_country_nif == '' || this.residential_country_nif == null)){
                                            this.propertyErrors.push(new DeclarationError(this.draftPropertyTypes.find(e => e.type == 13))); //falta el código de cuenta
                                            this.state = false;
                                        } else {
                                            /* TODOS LOS CAMPOS DEL DECLARANTE VALIDADOS, PASAMOS A LOS DEL INMUBLE */
                                            this.propertyAlerts.push(new DeclarationError(this.draftPropertyTypes.find(e => e.type == 14))); // Datos del declarante (inmueble) añadidos correctamente
                                            this.validatePropertyFields();
                                        }
                                    }
                                }
                            }
                        }
                    }

                }

            }
        }
    }

    public validatePropertyFields(){

        /* CAMBIAR DE SECCIÓN */
        this.currentSection = 1;

        /* CAMPOS DEL FORMULARIO */

        /* VALIDACIÓN */
        if(
            this.address == null || this.address == '' ||
            this.number == null || this.number == '' ||
            this.city == null || this.city == '' || this.address_state == null || this.address_state == '' || this.zip_code == null || this.zip_code == ''
        ){
            /* Hay que validar correctamente el formulario */
            this.propertyErrors.push(new DeclarationError(this.draftPropertyTypes.find(e => e.type == 6))); //falta contenido
            this.state = false;
        } else {

            /* TODOS LOS CAMPOS DEL INMUBELE RELLENADOS CORRECTAMENTE */
            this.propertyAlerts.push(new DeclarationError(this.draftPropertyTypes.find(e => e.type == 5))); //Datos seccion 2 ok
            this.validateMetaDataFields();
        }

    }
    public validateMetaDataFields(){

        /* CAMBIAR DE SECCIÓN */
        this.currentSection = 2;

        /* CAMPOS DEL FORMULARIO */

        /* Fecha de extinción */
        if (this.origin == 'C') this.ExtinctionDate = false;
        else {
            this.ExtinctionDate = true;
            this.extinction_date = null;
        }

        /* Clave de representación de valores */
        if (this.property_key_type == 'V' || this.property_key_type == 'I') this.ValueRepresentationKeyRequired = false;
        else {
            /* No es necesario introducir el bien o derecho */
            this.ValueRepresentationKeyRequired = true;
            this.value_representation_key = '';
        }

        /* Número de valores */
        if (this.property_key_type == 'V' || this.property_key_type == 'I') this.ValueNumbersRequired = false;
        else {
            /* No es necesario introducir el bien o derecho */
            this.ValueNumbersRequired = true;
            this.value_numbers = null;
        }

        /* Clave de tipo bien inmueble */
        if (this.property_key_type == 'B') this.RealStateKeyRequired = false;
        else {
            /* No es necesario introducir el bien o derecho */
            this.RealStateKeyRequired = true;
            this.real_state_key_type = '';
        }

        /* VALIDACIÓN */
        if(
            this.incorporation_date == null ||
            this.origin == null || this.address == ''
        ){
            /* Hay que validar correctamente el formulario */
            this.propertyErrors.push(new DeclarationError(this.draftPropertyTypes.find(e => e.type == 6))); //falta contenido
            this.state = false;
        } else {

            /* Si el origen es "C" entonces hay que meter la fecha de extinción */
            if(this.origin == 'C' && (this.extinction_date == null)) {
                /* Falta decha de extinción */
                this.propertyErrors.push(new DeclarationError(this.draftPropertyTypes.find(e => e.type == 16))); //falta fecha de extinción
                this.state = false;
            } else {

                /* Validación de valoraciones */
                if(!this.valoration1_id.value || !this.valoration2_id.value)
                {
                    /* Es necesario dar contenido a las valoraciones */
                    this.propertyErrors.push(new DeclarationError(this.draftPropertyTypes.find(e => e.type == 17))); //falta contenido a las valoraciones
                    this.state = false;

                } else {

                    if((this.property_key_type == 'V' || this.property_key_type == 'I') && (this.value_representation_key == null || this.value_representation_key == '')) {

                        /* Necesaria clave de representación de valores */
                        this.propertyErrors.push(new DeclarationError(this.draftPropertyTypes.find(e => e.type == 18)));
                        this.state = false;

                    } else {

                        if((this.property_key_type == 'V' || this.property_key_type == 'I') && (this.value_numbers == null || this.value_numbers == 0)) {

                            /* Necesario numero de valores */
                            this.propertyErrors.push(new DeclarationError(this.draftPropertyTypes.find(e => e.type == 19)));
                            this.state = false;
                        } else {

                            if((this.real_state_key_type == '' || this.real_state_key_type == null) && this.property_key_type == 'B'){
                                /* Necesaria clave de bien inmueble */
                                this.propertyErrors.push(new DeclarationError(this.draftPropertyTypes.find(e => e.type == 20)));
                                this.state = false;
                            }else{
                                /* TODOS LOS CAMPOS DEL INMUEBLE (METADATOS) RELLENADOS CORRECTAMENTE */
                                this.propertyAlerts.push(new DeclarationError(this.draftPropertyTypes.find(e => e.type == 15))); //Datos seccion 3 (inmueble) ok
                                this.isValid = true;
                                this.state = true; // FIN VALIDACIÓN DE LA PROPIEDAD
                                this.currentSection = 3;
                            }
                        }


                    }


                }

            }
        }

    }

    public validate(){
        this.propertyErrors = [];
        this.propertyAlerts = [];

        this.validateDeclarantFields();

        if(this.state){
            this.colorError = 'greenClass';
            this.isValid = true;
        } else {
            this.colorError = 'redClass';
            this.isValid = false;
        }
    }
}
