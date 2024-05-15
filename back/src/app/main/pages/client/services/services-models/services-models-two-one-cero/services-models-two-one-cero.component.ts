import { Component, OnInit, HostListener } from '@angular/core';
import {AlertService} from "../../../../../../shared/alerts/services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Declaration210Service} from "../../../../../../shared/services/declaration210.service";
import {Declaration210} from "../../../../../../shared/models/client/models/two-one-cero/declaration-210";
import {DraftState} from "../../../../../../shared/models/foundations/draft-state";
import {DRAFT_STATE} from "../../../../../../shared/consts/draft-state.consts";
import {EARN_PERIOD} from "../../../../../../shared/consts/two-one-cero/earn-period-types.consts";
import {Helpers} from "../../../../../../shared/helpers";
import {RENT_KEY_BADGE, RENT_TYPE} from "../../../../../../shared/consts/two-one-cero/rent-types.consts";
import {FJ_TYPE, FJ_TYPE_DESC, REPRESENT_TYPE} from "../../../../../../shared/consts/two-one-cero/fj.consts";
import {PropertyCountryCod720} from "../../../../../../shared/models/client/models/seven-two-cero/property-country-cod-720";
import {ClientService} from "../../../../../../shared/services/client.service";
import {HOME_NUMERATION_TYPE} from "../../../../../../shared/consts/two-one-cero/numeration-types.consts";
import {WAYTYPES} from "../../../../../../shared/consts/two-one-cero/way-types.consts";
import {
    HOME_QUALIFIER_TYPE,
    RESIDENT_TYPE
} from "../../../../../../shared/consts/two-one-cero/qualifier-types.consts";
import {GeoSpainService} from "../../../../../../shared/services/geo-spain.service";
import {SpainProvince} from "../../../../../../shared/models/client/models/spain-province";
import {SpainMunicipality} from "../../../../../../shared/models/client/models/spain-municipality";
import * as moment from "moment";
import {FjExtend} from "../../../../../../shared/models/client/models/two-one-cero/fjExtend";
import {User} from "../../../../../../core/auth/models/user.model";
import {TaxModelService} from "../../../../../../shared/services/tax-model.service";

@Component({
  selector: 'app-services-models-two-one-cero',
  templateUrl: './services-models-two-one-cero.component.html',
  styleUrls: ['./services-models-two-one-cero.component.scss']
})
export class ServicesModelsTwoOneCeroComponent implements OnInit {

    @HostListener('document:change', ['$event'])
    doSomething($event) {
        if(this.declaration.draft.state == 'active')
            this.declarationSaved = false;
        else this.alertService.msg('declaration.state_not_modify_alert');

    }

    //@ViewChild('saveButton') unsavedTooltip;

    /* Spinner de carga */
    loading: boolean = false;

    /* Formulario con cambios */
    declarationSaved: boolean = true;

    /* Parámetros */
    client_id: number;
    model_id: number;
    draft_id: number;

    /* Declaración */
    declaration: Declaration210;

    /* Borrador */
    draftStates = DRAFT_STATE;
    years: string[] = [(new Date().getFullYear()).toLocaleString(),(new Date().getFullYear()-1).toLocaleString(),(new Date().getFullYear()-2).toLocaleString(),(new Date().getFullYear()-3).toLocaleString(),(new Date().getFullYear()-4).toLocaleString()]; //El actual y los cuatro anteriores

    /* Progreso */
    progress: number;
    loadingDeclaration: boolean = true;

    /* Acordeon */
    public step: number = 0;

    /* Constantes */
    earnPeriodTypes = EARN_PERIOD;
    rentTypes = RENT_TYPE;
    rentKeyBadgeTypes = RENT_KEY_BADGE;
    personTypes = FJ_TYPE;
    representTypes = REPRESENT_TYPE;
    homeNumerationTypes = HOME_NUMERATION_TYPE;
    homeWayTypes = WAYTYPES;
    qualifierTypes = HOME_QUALIFIER_TYPE;
    residentTypes = RESIDENT_TYPE;

    /* Países, provincias y municipios */
    countryCodes: PropertyCountryCod720[] = [];
    spainAgentProvinces: SpainProvince[] = [];
    spainAgentMunicipalities: SpainMunicipality[] = [];
    spainPropertyProvinces: SpainProvince[] = [];
    spainPropertyMunicipalities: SpainMunicipality[] = [];

    constructor(
        private route: ActivatedRoute,
        private declarationService: Declaration210Service,
        private taxModelService: TaxModelService,
        private spainGeoService: GeoSpainService,
        private clientService: ClientService,
        private alertService: AlertService,
        private router : Router,
    ) { }

    ngAfterViewInit(): void {
        this.loading = false;
    }

    ngOnInit() {

        this.loadingDeclaration = true;

        this.route.parent.parent.parent.parent.params.subscribe(d => {
            this.client_id = new User(JSON.parse(localStorage.getItem('currentUser'))).id;

            /* Obtener todos los países */
            this.clientService.getCountries().subscribe( d => {
                this.countryCodes = d;
            });

            this.route.parent.params.subscribe(p => {
                this.model_id = p.model;
                this.draft_id = p.draft;

                /* Obtener declaración */
                this.declarationService.getDeclaration(this.client_id,{'draft_id':this.draft_id,'with[]':['declarant','draft']}).subscribe( dec => {
                    this.declaration = new Declaration210(dec);

                    /* Tipo de gravament según origen del cliente */
                    if(this.declaration.contributor_fiscal_residential){
                        if(this.declaration.isEuropeanCountry()) {
                            this.residentTypes = RESIDENT_TYPE.filter(e => e.id == 19);
                            this.declaration.liq_irnr_law_tax_type = 19;
                        }
                        else {
                            this.residentTypes = RESIDENT_TYPE.filter(e => e.id == 24);
                            this.declaration.liq_irnr_law_tax_type = 24;
                        }
                    }


                    /* Autocompletar campos */
                    this.autoCompleteDeclaration();

                    /* Validar declaración */
                    this.declaration.validate();
                    this.loadingDeclaration = false;

                    /* Sección actual */
                    this.loadSection(1000);

                    /* Obtener provincias */
                    this.spainGeoService.getProvinces().subscribe( provinces => {
                        this.spainAgentProvinces = provinces;
                        this.spainPropertyProvinces = provinces;

                        /* Obtener municipio si hay provincia establecida */
                        if(this.declaration.agent_address_state) {
                            let province_id = this.spainAgentProvinces.find(e => e.code == this.declaration.agent_address_state).id;
                            this.getAgentMunicipalities(province_id);
                        }

                        if(this.declaration.property_address_state) {
                            let province_id = this.spainPropertyProvinces.find(e => e.code == this.declaration.property_address_state).id;
                            this.getPropertyMunicipalities(province_id);
                        }
                    });
                });

            });
        }, err => {
            console.error(err);
        });

    }

    public autoCompleteDeclaration(){

        /* SECCIÓN 1: Persona que realiza la autoliquidación */

        /* Campos de la asesoria */
        if(this.declaration.declarant_nif == null) this.declaration.declarant_nif = 'B73830622';
        if(this.declaration.declarant_name == null) this.declaration.declarant_name = 'LEX FORIS INTERNATIONAL LAW SLP';

        /* Campos del cliente */
        // if(this.declaration.declarant_nif == null || this.declaration.declarant_nif == '') this.declaration.declarant_nif = this.declaration.declarant.additionalInfo.identification;
        // if(this.declaration.declarant_name == null || this.declaration.declarant_name == '') this.declaration.declarant_name = (this.declaration.declarant.lastname + ', ' + this.declaration.declarant.firstname);

        /* Siempre va a ser contribuyente */
        this.declaration.declarant_condition_isRepresentative = true;

        /* SECCIÓN 2: DEVENGO */

        /* Tipos de declaración disponibles */
        if (this.declaration.earn_agrupation) {
            this.rentTypes = RENT_TYPE.filter(e => e.id == '01' || e.id == '35'); //Solo será posible realizar declaraciones de tipo 01 y 35
            this.earnPeriodTypes = EARN_PERIOD; // Todos los peridos disponibles
        } else {
            this.rentTypes = RENT_TYPE.filter(e => e.id == '02'); //Solo posible tipo de renta 02
            if (this.declaration.rent_type == null) this.declaration.rent_type = '02'; // Si es nulo lo establecemos a 02
            this.earnPeriodTypes = EARN_PERIOD.filter( e => e.id == '0A'); // Solo se puede seleccionar el periodo anual
            this.declaration.earn_period = '0A';
        }

        /* SECCIÓN 2: Renta obtenida */

        /* Por defecto el campo divisas se establece a Euros */
        if(this.declaration.rent_key_badge == null) this.declaration.rent_key_badge = '954';

        /* SECCIÓN 3: Contribuyente */
        if(this.declaration.contributor_nif == null) this.declaration.contributor_nif = this.declaration.declarant.additionalInfo.identification; //NIF
        if(this.declaration.contributor_fj == null) this.declaration.contributor_fj = this.personType(this.declaration.declarant.additionalInfo.identification).id;
        if(this.declaration.contributor_name == null) this.declaration.contributor_name = this.declaration.declarant.lastname+', '+this.declaration.declarant.firstname;
        if(this.declaration.contributor_born_date == null) this.declaration.contributor_born_date = this.declaration.declarant.additionalInfo.birth_date;
        if(this.declaration.contributor_born_locality == null) this.declaration.contributor_born_locality = this.declaration.declarant.additionalInfo.city.name;
        if(this.declaration.contributor_country_cod == null) this.declaration.contributor_country_cod = this.declaration.declarant.additionalInfo.city.country_code;

        /* Dirección en el país de residencia */
        if(this.declaration.contributor_address == null) this.declaration.contributor_address = this.declaration.declarant.additionalInfo.residence_address;
        if(this.declaration.contributor_email == null) this.declaration.contributor_email = this.declaration.declarant.email;
        if(this.declaration.contributor_zip_code == null) this.declaration.contributor_zip_code = this.declaration.declarant.additionalInfo.postal_code;
        if(this.declaration.contributor_mobile_phone == null) this.declaration.contributor_mobile_phone = this.declaration.declarant.phone;

        /* SECCIÓN 5: REPRESENTANTE - ESTOS DATOS SON LOS DEL DESPACHO DE LEXFORIS */

        /* TODO de forma provisional instanciamos estos campos a los campos de la asesoria Lexforis*/
        if(this.declaration.agent_nif == null) this.declaration.agent_nif = 'B73830622';
        if(this.declaration.agent_fj == null) this.declaration.agent_fj = 'J';
        if(this.declaration.agent_name == null) this.declaration.agent_name = 'LEX FORIS INTERNATIONAL LAW SLP';
        if(this.declaration.agent_represent == null) this.declaration.agent_represent = 'V';

        /* resto de campos del representante */
        if(this.declaration.agent_road_type == null) this.declaration.agent_road_type = "CALLE";
        if(this.declaration.agent_address == null) this.declaration.agent_address = "de Molina de Segura";
        if(this.declaration.agent_numeration_type == null) this.declaration.agent_numeration_type = "NUM";
        if(this.declaration.agent_address_number == null) this.declaration.agent_address_number = "5";
        if(this.declaration.agent_address_block == null) this.declaration.agent_address_block = "3";
        if(this.declaration.agent_address_floor == null) this.declaration.agent_address_floor = "1";
        if(this.declaration.agent_address_door == null) this.declaration.agent_address_door = "B";
        if(this.declaration.agent_address_zip_code == null) this.declaration.agent_address_zip_code = "30007";
        if(this.declaration.agent_address_municipality == null) this.declaration.agent_address_municipality = "30030";
        if(this.declaration.agent_address_state == null) this.declaration.agent_address_state = "30";
        if(this.declaration.agent_phone == null) this.declaration.agent_phone = "968233151";
        if(this.declaration.agent_fax == null) this.declaration.agent_fax = "968230585";

        /* SECCIÓN 11: MÉTODOS DE PAGO */
        this.declaration.entry_payment_method = 3; //todo provisinal -> dominiciliación del importe a ingresar (Cuenta de la asesoria)
        if(this.declaration.entry_owner_identification == null) this.declaration.entry_owner_identification = 'B73830622'; //Número de identificación del propietario de la cuenta
        if(this.declaration.entry_owner_name == null) this.declaration.entry_owner_name = 'LEX FORIS INTERNATIONAL LAW SLP'; //Nombre de la asesoria
        if(this.declaration.entry_owner_iban == null) this.declaration.entry_owner_iban = 'ES27 2100 1714 9402 0021 4494'; //Cuenta de la asesoria

        /* Autocompletar el IBAN si es que lo tuviese */
        //if(this.declaration.declarant.additionalInfo.iban) this.declaration.entry_owner_iban = this.declaration.declarant.additionalInfo.iban;

    }

    public nextStep() {
        this.step++;
    }

    public prevStep() {
        this.step--;
    }

    public loadSection(delay){
        setTimeout(()=>{
            this.step = this.declaration.currentSection;
        },delay);
    }

    public getDraftState(state){
        let draftState: DraftState = new DraftState(this.draftStates.find( draftState => draftState.key == state ));
        return draftState.name;
    }

    public goToModels(): void{
        this.router.navigate(['/client/services/models']);
    }

    public setStep(index: number) {
        this.step = index;
    }

    public saveDeclaration() {

        this.declarationService.saveDeclaration(this.declaration.id, this.declaration).subscribe(dec => {
            this.declaration = new Declaration210(dec);
            this.loadingDeclaration = false;

            /* Validar declaración */
            this.declaration.validate();

            /* Sección actual */
            this.step = this.declaration.currentSection;

            /* MSG */
            this.alertService.msg('declaration.save');
            this.declarationSaved = true;
        });
    }

    public agrupationChange() {

        /* Poner tipo de renta a nulo */
        this.declaration.rent_type = null;

        if (this.declaration.earn_agrupation) {

            /* Devengo agrupado */

            this.declaration.earn_period_date = null; //No es necesario introducir la fecha de devengo
            this.rentTypes = RENT_TYPE.filter(e => e.id == '01' || e.id == '35'); //Solo será posible realizar declaraciones de tipo 01 y 35
            this.earnPeriodTypes = EARN_PERIOD; // Todos los peridos disponibles
            this.declaration.earn_period = null; // Reiniciar valor del período
        }
        else {

            /* Devengo no agrupado */

            if(this.declaration.earn_period_year){
                this.onEarnPeriodChange(); //Actualizar la fecha del devengo al 31 Diciembre del ejercicio seleccionado
                this.rentTypes = RENT_TYPE.filter(e => e.id == '02'); //Solo posible tipo de renta 02
                this.declaration.rent_type = '02'; //No hay más remedio que el tipo de renta sea el 02
            }

            /* Solo disponible período anual */
            this.earnPeriodTypes = EARN_PERIOD.filter( e => e.id == '0A'); // Solo se puede seleccionar el periodo anual
            this.declaration.earn_period = '0A';
        }

    }

    public contributorBornDateValue(event) {
        this.declaration.contributor_born_date = Helpers.parseDateToString(event.value,'YYYY-MM-DDTHH:mm');
    }

    public getProvinces(){

    }

    public getAgentMunicipalities(province_id){
        this.spainGeoService.getMunicipalities(province_id).subscribe( mun => {
            this.spainAgentMunicipalities = mun;
        })
    }

    public getPropertyMunicipalities(province_id){
        this.spainGeoService.getMunicipalities(province_id).subscribe( mun => {
            this.spainPropertyMunicipalities = mun;
        })
    }

    public onAgentStateSelected(){
        this.declaration.agent_address_municipality = null;
        let province_id = this.spainAgentProvinces.find(e => e.code == this.declaration.agent_address_state).id;
        this.getAgentMunicipalities(province_id);
    }

    public onPropertyStateSelected(){
        this.declaration.property_address_municipality = null;
        let province_id = this.spainPropertyProvinces.find(e => e.code == this.declaration.property_address_state).id;
        this.getPropertyMunicipalities(province_id);
    }

    public onRentTypeSelected(){

        /* Determinación de base imponible - activar formulario que proceda */
        if(this.declaration.rent_type != null && (this.declaration.rent_type == '01' || this.declaration.rent_type == '35')){
            this.declaration.DetTaxBase1 = true;
            this.declaration.DetTaxBase2 = false;

            /* Poner campos del tipo 02 a null */
            this.declaration.det_tax_base_i = null;

            /* NO hace falta el campo valor catastral */
            this.declaration.CadastralValueDisabled = false;

            /* Hay que recalcular la base imponible porque cambia si tipo 01 o 35 (hay un 60% descuento para rentas > 0 en tipo 01) */
            this.declaration.det_full_returns_r = null;
            this.declaration.det_dividends_applied_ext_r = null;
            this.declaration.det_deductible_expenses_r = null;
            this.declaration.det_tax_base_r = null;

        } else if(this.declaration.rent_type != null && this.declaration.rent_type == '02') {
            this.declaration.DetTaxBase1 = false;
            this.declaration.DetTaxBase2 = true;

            /* Poner campos del tipo 01 y 35 a null */
            this.declaration.det_full_returns_r = null;
            this.declaration.det_dividends_applied_ext_r = null;
            this.declaration.det_deductible_expenses_r = null;
            this.declaration.det_tax_base_r = null;

            /* Hacer requerido el campo valor catastral */
            this.declaration.CadastralValueDisabled = true;
        }
    }

    /* Determinación base imponible: TIPO I (TIPO DE RENTA 02) */
    public detTaxBaseIChange(event){
        let base = parseFloat(event.target.value);
        this.declaration.det_tax_base_i_original = Number(base.toFixed(2));
        this.declaration.det_tax_base_i = Number((base + (0.2*this.declaration.property_cadastral_value)).toFixed(2));
        if(this.declaration.liq_irnr_law_tax_type) this.calculateLiqResultI(); //Recalcular el liquido se se ha introducido el porcentaje
    }

    /* Determinación base imponible: TIPO R (TIPO DE RENTA 01 O 35) */
    public calculateDetTaxBaseR(){
        let det_full_returns_r = 0;
        let det_dividends_applied_ext_r = 0;
        let det_deductible_expenses_r = 0;

        if(this.declaration.det_full_returns_r) det_full_returns_r = this.declaration.det_full_returns_r;
        if(this.declaration.det_dividends_applied_ext_r) det_dividends_applied_ext_r = this.declaration.det_dividends_applied_ext_r; //TODO still not used

        /* Gastos deducibles */
        if((this.declaration.det_deductible_expenses_r != 0 && this.declaration.det_deductible_expenses_r > 0) && (this.declaration.det_deductible_expenses_r > 0))
            det_deductible_expenses_r = this.declaration.det_deductible_expenses_r;
        else if(this.declaration.det_deductible_expenses_r < 0) {det_deductible_expenses_r = 0; this.declaration.det_deductible_expenses_r = 0};

        /* Base imponible - gastos deducibles */
        if(det_full_returns_r >= 0) this.declaration.det_tax_base_r = Number((det_full_returns_r - det_deductible_expenses_r).toFixed(2));
        else this.declaration.det_tax_base_r = Number((det_full_returns_r + det_deductible_expenses_r).toFixed(2));

        if(this.declaration.det_tax_base_r > 0 && this.declaration.rent_type == '01')
            this.declaration.det_tax_base_r = Number((this.declaration.det_tax_base_r*0.4).toFixed(2)); //Si el resultado es positivo y la renta es de tipo 01, reducción del 60%

        if(this.declaration.liq_irnr_law_tax_type) this.calculateLiqResultI(); //Recalcular el liquido se se ha introducido el pocentaje
    }

    public detTaxBaseFullReturnsRChange(event){
        this.declaration.det_full_returns_r = parseFloat(event.target.value);
        this.calculateDetTaxBaseR();
    }

    public detTaxBaseDividensAppliedRChange(event){
        this.declaration.det_dividends_applied_ext_r = parseFloat(event.target.value);
        this.calculateDetTaxBaseR();
    }

    public detTaxBaseDeductibleExpensesRChange(event){
        this.declaration.det_deductible_expenses_r = parseFloat(event.target.value);
        this.calculateDetTaxBaseR();
    }

    /* LIQUIDACIÓN TIPO: I o R */

    public liqIrnrlawChange(){
        if(this.declaration.liq_irnr_law) this.declaration.liq_convention = null;
    }

    public liqConventionChange(){
        if(this.declaration.liq_convention) this.declaration.liq_irnr_law = null;
    }

    public calculateLiqResultI(){

        if(this.declaration.DetTaxBase2) {

            /* SOBRE BASE IMPONIBLE DE TIPO 2: I (02) */
            this.declaration.liq_integral_fee = Number(((this.declaration.liq_irnr_law_tax_type / 100) * this.declaration.det_tax_base_i).toFixed(2));
            this.calculateLiqResultIReduced();

        } else if (this.declaration.DetTaxBase1) {

            /* SOBRE BASE IMPONIBLE DE TIPO 1: R (01 o 35) */

            this.declaration.liq_integral_fee = Number(((this.declaration.liq_irnr_law_tax_type / 100) * this.declaration.det_tax_base_r).toFixed(2));
            this.calculateLiqResultIReduced();
        }
    }

    public calculateLiqResultIReduced(){
        if(this.declaration.DetTaxBase2) {
            let donation = 0;
            if (this.declaration.liq_donation_deduction) donation = this.declaration.liq_donation_deduction;
            this.declaration.liq_reduced_integral_fee = Number((((this.declaration.liq_irnr_law_tax_type / 100) * this.declaration.det_tax_base_i) - donation).toFixed(2));
            this.declaration.liq_result = this.declaration.liq_reduced_integral_fee;
        } else if(this.declaration.DetTaxBase1){
            let donation = 0;
            if (this.declaration.liq_donation_deduction) donation = this.declaration.liq_donation_deduction;
            this.declaration.liq_reduced_integral_fee = Number((((this.declaration.liq_irnr_law_tax_type / 100) * this.declaration.det_tax_base_r) - donation).toFixed(2));
            this.declaration.liq_result = this.declaration.liq_reduced_integral_fee;
        }
    }

    public liqDonationSelectedI(event){
        this.declaration.liq_donation_deduction = Number(parseFloat(event.target.value).toFixed(2));
        this.calculateLiqResultIReduced();
    }

    /* Declaración complementaria */
    public aliqComplementaryChange(){
        if(this.declaration.aliq_complementary) this.declaration.AliqComplementaryDisabled = false;
        else this.declaration.AliqComplementaryDisabled = true;
    }

    /* Método de pago */
    public entryMethodChange(){

        if(this.declaration.entry_payment_method == 2) {
            this.declaration.EntryDebitPaymentMethodDisabled = true;
            this.declaration.EntryTransferPaymentMethodDisabled = false;

        }
        else if(this.declaration.entry_payment_method == 4) {
            this.declaration.EntryDebitPaymentMethodDisabled = false;
            this.declaration.EntryTransferPaymentMethodDisabled = true;

            /* Inicializar campos titular y nombre */
            this.declaration.entry_owner_identification = this.declaration.contributor_nif;
            this.declaration.entry_owner_name = this.declaration.contributor_name;

        }

        this.declaration.BankOrigin = null;
        this.declaration.BankOriginURForm = null;
        this.declaration.BankOriginOtherForm = null;
    }

    public bankOriginChange(){

        if(this.declaration.BankOrigin == 0) {

            /* Banco de la unión europea */
            this.declaration.BankOriginURForm = true;
            this.declaration.BankOriginOtherForm = false;

            this.declaration.entry_owner_no_ue_bic_code = null;
            this.declaration.entry_owner_no_ue_account_number = null;
            this.declaration.entry_owner_no_ue_bank_address = null;
            this.declaration.entry_owner_no_ue_bank_city = null;
            this.declaration.entry_owner_no_ue_bank_country_code = null;
        }
        else if(this.declaration.BankOrigin == 1) {

            /* Banco del resto de mundo */
            this.declaration.BankOriginURForm = false;
            this.declaration.BankOriginOtherForm = true;

            this.declaration.entry_owner_ue_bic_code = null;
            this.declaration.entry_owner_iban = null;
        }
    }

    public bankOriginRefundChange(){

        if(this.declaration.BankOriginRefund == 0) {

            /* Banco de la unión europea */
            this.declaration.BankOriginURFormRefund = true;
            this.declaration.BankOriginOtherFormRefund = false;

            //TODO
        }
        else if(this.declaration.BankOriginRefund == 1) {

            /* Banco del resto de mundo */
            this.declaration.BankOriginURFormRefund = false;
            this.declaration.BankOriginOtherFormRefund = true;

            //TODO
        }
    }

    public exportDeclaration(){
        this.declarationService.export(this.draft_id);
    }

    public onEarnPeriodChange(){
        if (!this.declaration.earn_agrupation) {
            let year = Number(this.declaration.earn_period_year);
            let newDate = moment((year + '12' + '31'));
            this.declaration.earn_period_date = newDate.format('DD-MM-YYYY');
            this.alertService.msg('declaration.earn_period_date.autocomplete');
        }
    }

    public personType(nif: string): FjExtend{

        /*
        *  Tipos:
        *   1) España: Juríridica y Física
        *   2) Resto: Jurídica y física
        *
        * */

        /* Establecimientos permanentes de entidades no residentes en territorio español */
        if(nif.length == 9 && (nif.charAt(0).match(/[W]/) || nif.charAt(0).match(/[w]/))){
            /* Longitud de 9 digitos y primer caracter es una letra */
            let numbers = nif.substr(1,7);
            if(numbers.match(/^[0-9]*$/gm) && (nif.charAt(8).match(/[a-zA-Z]/) || nif.charAt(8).match(/[0-9]/))) return FJ_TYPE_DESC.find(e => e.key == 3);
        }

        /* Personas jurídicas y entidades sin personalidad jurídica que carezcan de la nacionalidad española */
        if(nif.length == 9 && (nif.charAt(0).match(/[N]/) || nif.charAt(0).match(/[n]/))){
            /* Longitud de 9 digitos y primer caracter es una letra */
            let numbers = nif.substr(1,7);
            if(numbers.match(/^[0-9]*$/gm) && (nif.charAt(8).match(/[a-zA-Z]/) || nif.charAt(8).match(/[0-9]/))) return FJ_TYPE_DESC.find(e => e.key == 3);
        }

        //Persona jurídica española: A111111111
        if(nif.length == 9 && nif.charAt(0).match(/[a-zA-Z]/)){
            /* Longitud de 9 digitos y primer caracter es una letra */
            let numbers = nif.substr(1,7);
            if(numbers.match(/^[0-9]*$/gm) && (nif.charAt(8).match(/[a-zA-Z]/) || nif.charAt(8).match(/[0-9]/))) return FJ_TYPE_DESC.find(e => e.key == 1);
        }

        //Persona física española
        if(nif.length == 9){
            if(nif.substr(0,7).match(/^[0-9]*$/gm) && nif.charAt(8).match(/[a-zA-Z]/)) return FJ_TYPE_DESC.find(e => e.key == 0); //Español de nacimiento
            if(nif.charAt(0).match(/[a-zA-Z]/) && nif.substr(1,7).match(/^[0-9]*$/gm) && nif.charAt(8).match(/[a-zA-Z]/)) return FJ_TYPE_DESC.find(e => e.key == 5); //Español
        }

        //Persona juridica extranjera
        return FJ_TYPE_DESC.find(e => e.key == 4);

    }

    public castralValueChange(event) {
        this.declaration.property_cadastral_value = parseFloat(event.target.value);

        /* Si la renta es de tipo 02 hay que borrar los campos de la base imponible ya que su campos se ve afectado por este valor */
        if (this.declaration.rent_type == '02') {
            this.declaration.det_tax_base_i = null;
            this.declaration.det_tax_base_i_original = null;
        }
    }

    public onResidentialCountryChange(){

        /* Actualizar gravament */
        if(this.declaration.contributor_fiscal_residential){
            if(this.declaration.isEuropeanCountry()) {
                this.residentTypes = RESIDENT_TYPE.filter(e => e.id == 19);
                this.declaration.liq_irnr_law_tax_type = 19;
            }
            else {
                this.residentTypes = RESIDENT_TYPE.filter(e => e.id == 24);
                this.declaration.liq_irnr_law_tax_type = 24;
            }
        }

        /* Reinciar cálculos de liquidación, para los dos tipos */
        this.declaration.liq_donation_deduction = null; //Deducción por donativos
        this.declaration.liq_integral_fee = null; //Cuota íntegra
        this.declaration.liq_reduced_integral_fee = null; //Cuota íntegra reducida
        this.declaration.liq_result = null; //Resultado de la autodeclaración

        /* Recalcular liquidación */
        this.calculateLiqResultI();

    }

    public goToProfile(){
        this.router.navigate(['client/profile']);
    }

    public getClientIBAN(){
        if(this.declaration.declarant.additionalInfo.iban) this.declaration.entry_owner_iban = this.declaration.declarant.additionalInfo.iban;
    }

    public complete(){
        this.alertService.confirmation('declaration.210.compete_question').componentInstance.confirmed.subscribe(res => {
            if(res){
                /* Cambiar estado de la declaración a completada */
                this.declaration.draft.state = 'complete';
                this.taxModelService.update(this.declaration.draft).subscribe(d => {
                    this.saveDeclaration();
                    //this.sendMailConfirmation();
                });
            }
        });
    }

    public active(){
        this.alertService.confirmation('declaration.210.active_question').componentInstance.confirmed.subscribe(res => {
            if(res){
                /* Cambiar estado de la declaración a completada */
                this.declaration.draft.state = 'active';
                this.taxModelService.update(this.declaration.draft).subscribe(d => {
                });
            }
        });
    }

}
