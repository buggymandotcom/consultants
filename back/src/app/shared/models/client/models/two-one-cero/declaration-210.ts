import {Helpers} from "../../../../helpers";
import {Client} from "../../client.model";
import {TaxModelDraft} from "../tax-model-draft";
import {DeclarationError} from "../../../foundations/declaration-error";
import {DECLARATION_210_ERROR} from "../../../../consts/declaration-210.consts";
import {EARN_PERIOD} from "../../../../consts/two-one-cero/earn-period-types.consts";
import {RENT_TYPE} from "../../../../consts/two-one-cero/rent-types.consts";

export class Declaration210 {

    id: number;
    declaration_type: string;

    /* Borrador */
    draft: TaxModelDraft;

    /* Persona que realiza la declaración */
    declarant: Client;
    declarant_nif: string;
    declarant_name: string;
    declarant_condition_isRepresentative: boolean;
    declarant_condition_payer: boolean;
    declarant_condition_holder: boolean;
    declarant_condition_manager: boolean;
    declarant_condition_keeper: boolean;


    /* Devengo */
    earn_agrupation: boolean;
    earn_period: string;
    earn_period_year: string;
    earn_period_date: string; //date

    /* Renta obtenida */
    rent_type: string;
    rent_key_badge: string;

    /* Contribuyente */
    contributor_nif: string;
    contributor_fj: string;
    contributor_name: string;
    contributor_residential_nif: string;
    contributor_born_date: string;
    contributor_born_locality: string;
    contributor_country_cod: string;
    contributor_fiscal_residential: string;
    contributor_address: string;
    contributor_complementary_address: string;
    contributor_locality: string;
    contributor_email: string;
    contributor_zip_code: string;
    contributor_state: string;
    contributor_country: string;
    contributor_phone: string;
    contributor_mobile_phone: string;
    contributor_fax: string;

    /* Representante del contribuyente */
    agent_nif: string;
    agent_fj: string;
    agent_name: string;
    agent_represent: string;
    agent_road_type: string;
    agent_address: string;
    agent_numeration_type: string;
    agent_address_number: string;
    agent_address_qualifier_number: string;
    agent_address_block: string;
    agent_address_portal: string;
    agent_address_stairs: string;
    agent_address_floor: string;
    agent_address_door: string;
    agent_address_complementary: string;
    agent_address_locality: string;
    agent_address_city: string;
    agent_address_state: string;
    agent_address_municipality: string;
    agent_address_zip_code: string;
    agent_phone: string;
    agent_mobile_phone: string;
    agent_fax: string;

    /* Pagador */
    payer_nif: string;
    payer_fj: string;
    payer_name: string;

    /* Situación del inmueble */
    property_address_road_type: string;
    property_address_road_name: string;
    property_address_numeration_type: string;
    property_address_number: string;
    property_address_qualifier_number: string;
    property_address_block: string;
    property_address_portal: string;
    property_address_stairs: string;
    property_address_floor: string;
    property_address_door: string;
    property_address_complementary: string;
    property_address_locality: string;
    property_address_state: string;
    property_address_municipality: string;
    property_address_zip_code: string;
    property_address_cadastral_ref: string;
    property_cadastral_value: number;

    /* Determinación de la base imponible */
    det_tax_base_i: number;
    det_tax_base_i_original: number; // En rentas de tipo 02 la base orriginal sufre un incremento del 20% sobre el valor catastral del inmueble
    det_full_returns_r: number;
    det_dividends_applied_ext_r: number;
    det_deductible_expenses_r: number;
    det_tax_base_r: number;
    det_tax_base_co_h: string;
    det_taxpayer_participation_fee_h: number;
    det_spouse_participation_fee_h: number;
    det_spouse_nif_h: string;
    det_spouse_name_h: string;

    /* Adquisición */
    det_adquisition_transmission_value_h: number;
    det_adquisition_value_h: number;
    det_adquisition_diff_h: number;
    det_adquisition_gain_h: number;

    /* Adquisición 2 */
    det_adquisition2_transmission_value_h: number;
    det_adquisition2_value_h: number;
    det_adquisition2_diff_h: number;
    det_adquisition2_gain_h: number;
    det_tax_base_h: number;

    det_adquisition_date_h: string;
    det_adquisition2_date_h: string;
    det_model_voucher_number_h: string;
    det_tax_base_g: number;

    /* Liquidación */
    liq_irnr_law: boolean;
    liq_convention: boolean;
    liq_irnr_law_tax_type: number;
    liq_integral_fee: number;
    liq_donation_deduction: number;
    liq_irnr_law_fee: number;
    liq_convention_percentage: number;
    liq_convention_limit: number;
    liq_convention_reduction: number;
    liq_reduced_integral_fee: number;
    liq_retentions_income: number;
    liq_previous_income_return: number;
    liq_result: number;

    /* Autoliquidación complementaria */
    aliq_complementary: boolean;
    aliq_complementary_previous_number: string;

    /* Tipo de declaración */
    contact_person_name: string;
    contact_person_phone1: number;
    contact_person_phone2: number;
    contact_person_email: string;
    entry_payment_method: number;
    entry_owner_identification: string;
    entry_owner_name: string;
    entry_owner_iban: string;
    entry_owner_ue_bic_code: string;
    entry_owner_no_ue_bic_code: string;
    entry_owner_no_ue_account_number: string;
    entry_owner_no_ue_bank_name: string;
    entry_owner_no_ue_bank_address: string;
    entry_owner_no_ue_bank_city: string;
    entry_owner_no_ue_bank_country_code: string;
    refund_renounce: string;
    refund_account_identification: string;
    refund_account_name: string;
    refund_account_iban: string;
    refund_account_bic_code: string;
    refund_no_ue_bic_code: string;
    refund_no_ue_account_number: string;
    refund_no_ue_bank_name: string;
    refund_no_ue_bank_address: string;
    refund_no_ue_bank_city: string;
    refund_no_ue_country_code: string;

    /* TimeStamp */
    created_at: Date;
    updated_at: Date;

    /* Errores */
    declarationErrorsTypes = DECLARATION_210_ERROR;
    declarationErrors: DeclarationError[]; //Errores
    declarationAlerts: DeclarationError[]; //Alertas
    progress: number = 0;
    colorError: string;
    currentSection: number = 0;
    isValid: boolean = false;

    /* Control de campos del formulario */
    SolidarityDisabled: boolean = true;
    AliqComplementaryDisabled: boolean = true;
    EntryDebitPaymentMethodDisabled: boolean = false;
    EntryTransferPaymentMethodDisabled: boolean = false;
    CadastralValueDisabled: boolean = false;

    /* Origen del banco para INGRESOS */
    BankOrigin: number = null;  /* 0: UE, 1: RESTO DE PAÍSES DEL MUNDO */
    BankOriginURForm: boolean = false;
    BankOriginOtherForm: boolean = false;

    /* Origen para banco DEVOLUCIÓN */
    BankOriginRefund: number = null;  /* 0: UE, 1: RESTO DE PAÍSES DEL MUNDO */
    BankOriginURFormRefund: boolean = false;
    BankOriginOtherFormRefund: boolean = false;

    /* Formularios para determinación de base imponible */
    DetTaxBase1: boolean = false; // Derterminación de la base imponibles: tipos 01 y 35
    DetTaxBase2: boolean = false; // Derterminación de la base imponibles: tipo 02

    /* Resume */
    resume: String[] = [];
    earnPeriodTypes = EARN_PERIOD;
    rentTypes = RENT_TYPE;

    constructor(obj?) {

        if(obj) {
            if(obj.id) this.id = obj.id;
            // if(obj.declaration_type) this.declaration_type = obj.declaration_type;
            this.declaration_type = 'U';
            if(obj.declarant_nif) this.declarant_nif = obj.declarant_nif;
            if(obj.declarant_name) this.declarant_name = obj.declarant_name;
            if(obj.declarant_condition_isRepresentative == 0 || obj.declarant_condition_isRepresentative == 1) this.declarant_condition_isRepresentative = obj.declarant_condition_isRepresentative;
            if(obj.declarant_condition_payer) this.declarant_condition_payer = obj.declarant_condition_payer;
            if(obj.declarant_condition_holder) this.declarant_condition_holder = obj.declarant_condition_holder;
            if(obj.declarant_condition_manager) this.declarant_condition_manager = obj.declarant_condition_manager;
            if(obj.declarant_condition_keeper) this.declarant_condition_keeper = obj.declarant_condition_keeper;
            if(obj.earn_agrupation == 0 || obj.earn_agrupation == 1) this.earn_agrupation = obj.earn_agrupation;
            if(obj.earn_period) this.earn_period = obj.earn_period;
            if(obj.earn_period_year) this.earn_period_year = obj.earn_period_year;
            if(obj.earn_period_date) this.earn_period_date = Helpers.parseDateToString(obj.earn_period_date,'DD-MM-YYYY');
            if(obj.rent_type) this.rent_type = obj.rent_type;
            if(obj.rent_key_badge) this.rent_key_badge = obj.rent_key_badge;
            if(obj.contributor_nif) this.contributor_nif = obj.contributor_nif;
            if(obj.contributor_name) this.contributor_name = obj.contributor_name;
            if(obj.contributor_fj) this.contributor_fj = obj.contributor_fj;
            if(obj.contributor_residential_nif) this.contributor_residential_nif = obj.contributor_residential_nif;
            if(obj.contributor_born_date) this.contributor_born_date = Helpers.parseDateToString(obj.contributor_born_date,'YYYY-MM-DDTHH:mm');
            if(obj.contributor_born_locality) this.contributor_born_locality = obj.contributor_born_locality;
            if(obj.contributor_address) this.contributor_address = obj.contributor_address;
            if(obj.contributor_complementary_address) this.contributor_complementary_address = obj.contributor_complementary_address;
            if(obj.contributor_locality) this.contributor_locality = obj.contributor_locality;
            if(obj.contributor_email) this.contributor_email = obj.contributor_email;
            if(obj.contributor_zip_code) this.contributor_zip_code = obj.contributor_zip_code;
            if(obj.contributor_state) this.contributor_state = obj.contributor_state;
            if(obj.contributor_phone) this.contributor_phone = obj.contributor_phone;
            if(obj.contributor_mobile_phone) this.contributor_mobile_phone = obj.contributor_mobile_phone;
            if(obj.contributor_fax) this.contributor_fax = obj.contributor_fax;
            if(obj.agent_nif) this.agent_nif = obj.agent_nif;
            if(obj.agent_fj) this.agent_fj = obj.agent_fj;
            if(obj.agent_name) this.agent_name = obj.agent_name;
            if(obj.agent_represent) this.agent_represent = obj.agent_represent;
            if(obj.agent_road_type) this.agent_road_type = obj.agent_road_type;
            if(obj.agent_address) this.agent_address = obj.agent_address;
            if(obj.agent_numeration_type) this.agent_numeration_type = obj.agent_numeration_type;
            if(obj.agent_address_number) this.agent_address_number = obj.agent_address_number;
            if(obj.agent_address_qualifier_number) this.agent_address_qualifier_number = obj.agent_address_qualifier_number;
            if(obj.agent_address_block) this.agent_address_block = obj.agent_address_block;
            if(obj.agent_address_portal) this.agent_address_portal = obj.agent_address_portal;
            if(obj.agent_address_stairs) this.agent_address_stairs = obj.agent_address_stairs;
            if(obj.agent_address_floor) this.agent_address_floor = obj.agent_address_floor;
            if(obj.agent_address_door) this.agent_address_door = obj.agent_address_door;
            if(obj.agent_address_complementary) this.agent_address_complementary = obj.agent_address_complementary;
            if(obj.agent_address_locality) this.agent_address_locality = obj.agent_address_locality;
            if(obj.agent_address_city) this.agent_address_city = obj.agent_address_city;
            if(obj.agent_address_zip_code) this.agent_address_zip_code = obj.agent_address_zip_code;
            if(obj.agent_phone) this.agent_phone = obj.agent_phone;
            if(obj.agent_mobile_phone) this.agent_mobile_phone = obj.agent_mobile_phone;
            if(obj.agent_fax) this.agent_fax = obj.agent_fax;
            if(obj.payer_nif) this.payer_nif = obj.payer_nif;
            if(obj.payer_fj) this.payer_fj = obj.payer_fj;
            if(obj.payer_name) this.payer_name = obj.payer_name;
            if(obj.property_address_road_type) this.property_address_road_type = obj.property_address_road_type;
            if(obj.property_address_road_name) this.property_address_road_name = obj.property_address_road_name;
            if(obj.property_address_numeration_type) this.property_address_numeration_type = obj.property_address_numeration_type;
            if(obj.property_address_number) this.property_address_number = obj.property_address_number;
            if(obj.property_address_qualifier_number) this.property_address_qualifier_number = obj.property_address_qualifier_number;
            if(obj.property_address_block) this.property_address_block = obj.property_address_block;
            if(obj.property_address_portal) this.property_address_portal = obj.property_address_portal;
            if(obj.property_address_stairs) this.property_address_stairs = obj.property_address_stairs;
            if(obj.property_address_floor) this.property_address_floor = obj.property_address_floor;
            if(obj.property_address_door) this.property_address_door = obj.property_address_door;
            if(obj.property_address_complementary) this.property_address_complementary = obj.property_address_complementary;
            if(obj.property_address_locality) this.property_address_locality = obj.property_address_locality;
            if(obj.property_address_zip_code) this.property_address_zip_code = obj.property_address_zip_code;
            if(obj.property_address_cadastral_ref) this.property_address_cadastral_ref = obj.property_address_cadastral_ref;
            if(obj.property_cadastral_value) this.property_cadastral_value = obj.property_cadastral_value;
            this.det_tax_base_i = obj.det_tax_base_i;
            this.det_tax_base_i_original = obj.det_tax_base_i_original;
            this.det_full_returns_r = obj.det_full_returns_r;
            this.det_dividends_applied_ext_r = obj.det_dividends_applied_ext_r;
            if(obj.det_deductible_expenses_r) this.det_deductible_expenses_r = obj.det_deductible_expenses_r;
            this.det_tax_base_r = obj.det_tax_base_r;
            if(obj.det_tax_base_co_h) this.det_tax_base_co_h = obj.det_tax_base_co_h;
            if(obj.det_taxpayer_participation_fee_h) this.det_taxpayer_participation_fee_h = obj.det_taxpayer_participation_fee_h;
            if(obj.det_spouse_participation_fee_h) this.det_spouse_participation_fee_h = obj.det_spouse_participation_fee_h;
            if(obj.det_spouse_nif_h) this.det_spouse_nif_h = obj.det_spouse_nif_h;
            if(obj.det_spouse_name_h) this.det_spouse_name_h = obj.det_spouse_name_h;
            if(obj.det_adquisition_transmission_value_h) this.det_adquisition_transmission_value_h = obj.det_adquisition_transmission_value_h;
            if(obj.det_adquisition_value_h) this.det_adquisition_value_h = obj.det_adquisition_value_h;
            if(obj.det_adquisition_diff_h) this.det_adquisition_diff_h = obj.det_adquisition_diff_h;
            if(obj.det_adquisition_gain_h) this.det_adquisition_gain_h = obj.det_adquisition_gain_h;
            if(obj.det_adquisition2_transmission_value_h) this.det_adquisition2_transmission_value_h = obj.det_adquisition2_transmission_value_h;
            if(obj.det_adquisition2_value_h) this.det_adquisition2_value_h = obj.det_adquisition2_value_h;
            if(obj.det_adquisition2_diff_h) this.det_adquisition2_diff_h = obj.det_adquisition2_diff_h;
            if(obj.det_adquisition2_gain_h) this.det_adquisition2_gain_h = obj.det_adquisition2_gain_h;
            if(obj.det_tax_base_h) this.det_tax_base_h = obj.det_tax_base_h;
            if(obj.det_adquisition_date_h) this.det_adquisition_date_h = Helpers.parseDateToString(obj.det_adquisition_date_h,'YYYY-MM-DDTHH:mm');
            if(obj.det_adquisition2_date_h) this.det_adquisition2_date_h = Helpers.parseDateToString(obj.det_adquisition2_date_h,'YYYY-MM-DDTHH:mm');
            if(obj.det_model_voucher_number_h) this.det_model_voucher_number_h = obj.det_model_voucher_number_h;
            if(obj.det_tax_base_g) this.det_tax_base_g = obj.det_tax_base_g;
            if(obj.liq_irnr_law) this.liq_irnr_law = obj.liq_irnr_law;
            if(obj.liq_convention) this.liq_convention = obj.liq_convention;
            if(obj.liq_irnr_law_tax_type) this.liq_irnr_law_tax_type = obj.liq_irnr_law_tax_type;
            this.liq_integral_fee = obj.liq_integral_fee;
            this.liq_donation_deduction = obj.liq_donation_deduction;
            this.liq_irnr_law_fee = obj.liq_irnr_law_fee;
            if(obj.liq_convention_percentage) this.liq_convention_percentage = obj.liq_convention_percentage;
            if(obj.liq_convention_limit) this.liq_convention_limit = obj.liq_convention_limit;
            if(obj.liq_convention_reduction) this.liq_convention_reduction = obj.liq_convention_reduction;
            this.liq_reduced_integral_fee = obj.liq_reduced_integral_fee;
            if(obj.liq_retentions_income) this.liq_retentions_income = obj.liq_retentions_income;
            if(obj.liq_previous_income_return) this.liq_previous_income_return = obj.liq_previous_income_return;
            this.liq_result = obj.liq_result;
            if(obj.aliq_complementary) this.aliq_complementary = obj.aliq_complementary;
            if(obj.aliq_complementary_previous_number) this.aliq_complementary_previous_number = obj.aliq_complementary_previous_number;
            this.created_at = Helpers.parseDate(obj.created_at);
            this.updated_at = Helpers.parseDate(obj.updated_at);
            if(obj.agent_address_state) this.agent_address_state = obj.agent_address_state;
            if(obj.agent_address_municipality) this.agent_address_municipality = obj.agent_address_municipality;
            if(obj.property_address_state) this.property_address_state = obj.property_address_state;
            if(obj.property_address_municipality) this.property_address_municipality = obj.property_address_municipality;
            if(obj.contributor_country_cod) this.contributor_country_cod = obj.contributor_country_cod;
            if(obj.contributor_fiscal_residential) this.contributor_fiscal_residential = obj.contributor_fiscal_residential;
            if(obj.contributor_country) this.contributor_country = obj.contributor_country;
            if(obj.contact_person_name) this.contact_person_name = obj.contact_person_name;
            if(obj.contact_person_phone1) this.contact_person_phone1 = obj.contact_person_phone1;
            if(obj.contact_person_phone2) this.contact_person_phone2 = obj.contact_person_phone2;
            if(obj.contact_person_email) this.contact_person_email = obj.contact_person_email;
            if(obj.entry_payment_method) this.entry_payment_method = obj.entry_payment_method;
            if(obj.entry_owner_identification) this.entry_owner_identification = obj.entry_owner_identification;
            if(obj.entry_owner_name) this.entry_owner_name = obj.entry_owner_name;
            if(obj.entry_owner_iban) this.entry_owner_iban = obj.entry_owner_iban;
            if(obj.entry_owner_ue_bic_code) { this.entry_owner_ue_bic_code = obj.entry_owner_ue_bic_code; this.BankOrigin = 0 }
            if(obj.entry_owner_no_ue_bic_code) { this.entry_owner_no_ue_bic_code = obj.entry_owner_no_ue_bic_code; this.BankOrigin = 1 }
            if(obj.entry_owner_no_ue_account_number) this.entry_owner_no_ue_account_number = obj.entry_owner_no_ue_account_number;
            if(obj.entry_owner_no_ue_bank_name) this.entry_owner_no_ue_bank_name = obj.entry_owner_no_ue_bank_name;
            if(obj.entry_owner_no_ue_bank_address) this.entry_owner_no_ue_bank_address = obj.entry_owner_no_ue_bank_address;
            if(obj.entry_owner_no_ue_bank_city) this.entry_owner_no_ue_bank_city = obj.entry_owner_no_ue_bank_city;
            if(obj.entry_owner_no_ue_bank_country_code) this.entry_owner_no_ue_bank_country_code = obj.entry_owner_no_ue_bank_country_code;
            if(obj.refund_renounce) this.refund_renounce = obj.refund_renounce;
            if(obj.refund_account_identification) this.refund_account_identification = obj.refund_account_identification;
            if(obj.refund_account_name) this.refund_account_name = obj.refund_account_name;
            if(obj.refund_account_iban) { this.refund_account_iban = obj.refund_account_iban; this.BankOriginRefund = 0 }
            if(obj.refund_account_bic_code) this.refund_account_bic_code = obj.refund_account_bic_code;
            if(obj.refund_no_ue_bic_code) this.refund_no_ue_bic_code = obj.refund_no_ue_bic_code;
            if(obj.refund_no_ue_account_number) { this.refund_no_ue_account_number = obj.refund_no_ue_account_number; this.BankOriginRefund = 1 }
            if(obj.refund_no_ue_bank_name) this.refund_no_ue_bank_name = obj.refund_no_ue_bank_name;
            if(obj.refund_no_ue_bank_address) this.refund_no_ue_bank_address = obj.refund_no_ue_bank_address;
            if(obj.refund_no_ue_bank_city) this.refund_no_ue_bank_city = obj.refund_no_ue_bank_city;
            if(obj.refund_no_ue_country_code) this.refund_no_ue_country_code = obj.refund_no_ue_country_code;

            /* Declarante y borrador */
            if(obj.declarant) this.declarant = new Client(obj.declarant);
            if(obj.draft) this.draft = new TaxModelDraft(obj.draft);

        }
    }

    public validatePerson(){

        this.currentSection = 0;
        this.progress = 0;

        /* Campos del formulario */
        if(!this.declarant_condition_isRepresentative){
            this.declarant_condition_payer = null;
            this.declarant_condition_holder = null;
            this.declarant_condition_manager = null;
            this.declarant_condition_keeper = null;
            this.SolidarityDisabled = true;
        } else this.SolidarityDisabled = false;

        /* Validación */
        if(
            this.declarant_nif == '' || this.declarant_nif == null ||
            this.declarant_name == '' || this.declarant_name == null ||
            this.declarant_condition_isRepresentative == null
        ){
            /* Hay que validar correctamente el formulario */
            this.declarationErrors.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 0))); //falta contenido en sección 1
            this.isValid = false;
        } else {
            this.declarationAlerts.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 1))); //Sección 1 ok
            this.validateEarn();
        }
    }

    public validateEarn(){

        this.currentSection = 1;
        this.progress = 9;

        /* Campos del formulario */
        if(this.earn_agrupation) this.earn_period_date = null;

        /* Validación */
        if(
            this.earn_period == null || this.earn_period_year == null
        ){
            /* Hay que validar correctamente el formulario */
            this.declarationErrors.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 2))); //falta contenido en sección 2
            this.isValid = false;
        } else {

            if(this.earn_period_date == null && !this.earn_agrupation) {
                /* Necesaria fecha de devengo */
                this.declarationErrors.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 3))); //falta fecha de devengo
                this.isValid = false;
            } else {
                /* Sección 2 validada correctamnte */
                this.declarationAlerts.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 4))); //Sección 2 ok
                this.validateRent();
            }
        }
    }

    public validateRent(){
        this.currentSection = 2;
        this.progress = 18;
        this.resume[0] = this.earnPeriodTypes.find(e => e.id == this.earn_period).text;

        /* Campos del formulario */

        /* Validación */
        if(
            this.rent_type == null
        ){
            /* Hay que validar correctamente el formulario */
            this.declarationErrors.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 5))); //falta contenido en sección 2
            this.isValid = false;
        } else {
            /* Sección 3 validada correctamnte */
            this.declarationAlerts.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 6))); //Sección 3 ok
            this.validateContributor();
        }
    }

    public validateContributor(){
        this.currentSection = 3;
        this.progress = 27;
        this.resume[1] = this.rentTypes.find(e => e.id == this.rent_type).id;
        this.resume[2] = this.rentTypes.find(e => e.id == this.rent_type).text;

        /* Campos del formulario */

        /* Validación */
        if(
            this.contributor_fj == null
        ){
            /* Hay que validar correctamente el formulario */
            this.declarationErrors.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 7))); //falta contenido en sección 2
            this.isValid = false;
        } else {

            if(this.contributor_fiscal_residential == null){
                this.declarationErrors.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 27))); //residencia fiscal obligatoria
                this.isValid = false;
            } else{
                if(this.contributor_fiscal_residential == 'ES'){
                    /* No es posible establecer el país de residencia a España, est formulario esta dirigido a personas no residentes */
                    this.declarationErrors.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 24))); //Error en el país de residencia
                    this.isValid = false;
                } else {
                    this.declarationAlerts.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 8))); //Sección 4 ok
                    this.validateAgent();
                }
            }
        }
    }

    public validateAgent(){
        this.currentSection = 4;
        this.progress = 36;

        /* Campos del formulario */

        /* Validación */
        this.declarationAlerts.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 9))); //Sección 5 ok
        this.validatePayer();
    }

    public validatePayer(){
        this.currentSection = 5;
        this.progress = 45;

        /* Campos del formulario */

        /* Validación */
        this.declarationAlerts.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 10))); //Sección 6 ok
        this.validateDetTax();
    }

    public validateDetTax(){
        this.currentSection = 6;
        this.progress = 54;

        /* SITUACIÓN DEL INMUEBLE */

        /* Campos del formulario */
        if(this.rent_type == '02') this.CadastralValueDisabled = true; // Hacer requerido el campo valor catastral
        else this.CadastralValueDisabled = false; //No hace falta

        /* Validación */
        if(
            this.property_address_road_name == null ||
            this.property_address_number == null || this.property_address_number == '' ||
            this.property_address_state == null || this.property_address_state == '' ||
            this.property_address_municipality == null || this.property_address_municipality == '' ||
            this.property_address_zip_code == null || this.property_address_zip_code == '' ||
            this.property_address_cadastral_ref == null || this.property_address_cadastral_ref == '' ||
            (!this.property_cadastral_value && this.CadastralValueDisabled)
        ){
            /* Es necesario dotar de contenido a los campos de esta sección */
            this.declarationErrors.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 26))); //falta contenido en sección 7
            this.isValid = false;
        } else {

            /* Si el tipo de rento es 02 es necesario introducir el valor catastral del inmueble */
            if(this.rent_type == '02' && !this.property_cadastral_value){
                this.declarationErrors.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 25))); //falta contenido en sección 7
                this.isValid = false;
            } else {
                this.declarationAlerts.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 11))); //Sección 7 ok
                this.validateDetBaseTax();
            }
        }

    }

    /**
     * Determinación de la base imponible
     */
    public validateDetBaseTax(){
        this.currentSection = 7;
        this.progress = 63;

        /* Campos del formulario */
        if(this.rent_type != null && (this.rent_type == '01' || this.rent_type == '35')){
            this.DetTaxBase1 = true;
            this.DetTaxBase2 = false;

            /* Poner campos del tipo 02 a null */
            this.det_tax_base_i = null;

        } else if(this.rent_type != null && this.rent_type == '02') {
            this.DetTaxBase1 = false;
            this.DetTaxBase2 = true;

            /* Poner campos del tipo 01 y 35 a null */
            this.det_full_returns_r = null;
            this.det_dividends_applied_ext_r = null;
            this.det_deductible_expenses_r = null;
            this.det_tax_base_r = null;
        }

        /* Validación */
        if(this.rent_type != null && (this.rent_type == '01' || this.rent_type == '35')){

            /* Renta de tipo 1 */
            if(this.det_tax_base_r == null){
                this.declarationErrors.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 13))); //falta añadir base impobile tipo 1
                this.isValid = false;
            } else {
                this.declarationAlerts.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 12))); //Sección 8 ok
                this.validateLiquidation();
            }
        } else if(this.rent_type != null && this.rent_type == '02'){
            /* Renta de tipo 2 */
            if(this.det_tax_base_i == null){
                this.declarationErrors.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 14))); //falta añadir base impobile tipo 1
                this.isValid = false;
            } else {
                this.declarationAlerts.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 12))); //Sección 8 ok
                this.validateLiquidation();
            }
        }

    }

    public validateLiquidation(){
        this.currentSection = 8;
        this.progress = 72;

        if(this.liq_irnr_law_tax_type == null){
            /* Falta tipo de retención */
            this.declarationErrors.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 16))); //falta tipo de retención
            this.isValid = false;
        } else if(this.rent_type == '02' && this.liq_result <= 0) { // Declaración de TIPO 02 (ANUAL) NO PUEDE SER NEGATIVO NI TAMPOCO CERO
            this.declarationErrors.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 28))); //La declaración no puede ser negativa NI CERO
            this.isValid = false;
        } else if (this.rent_type != '02' && this.liq_result < 0 && this.earn_period != '0A'){ //TIPO 01 O 25, NEGATIVA Y TRIMESTRAL NO PUEDE SER
            this.declarationErrors.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 29))); //La declaración no puede ser negativa
            this.isValid = false;
        } else {
            this.declarationAlerts.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 15))); //Sección 9 ok
            this.validateAutoLiquidation();
        }
    }

    public validateAutoLiquidation(){
        this.currentSection = 9;
        this.progress = 81;

        /* Campos del formulario */
        if(this.aliq_complementary) this.AliqComplementaryDisabled = false;
        else {
            this.AliqComplementaryDisabled = true;
            this.aliq_complementary_previous_number = null;
        }

        /* Validación */
        if(this.aliq_complementary && (this.aliq_complementary_previous_number == null || this.aliq_complementary_previous_number == '')) {
            /* Es necesairo introducir el numero de la liquidación complemtaria */
            this.declarationErrors.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 17)));
            this.isValid = false;
        } else {
            /* Sección 10 correctamente cumplimentada */
            this.declarationAlerts.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 18))); //Sección 10 ok
            this.validateDeclarationType();
        }
    }

    public validateDeclarationType(){
        this.currentSection = 10;
        this.progress = 90;

        /* Método de pago */
        if(this.entry_payment_method == 2) this.EntryDebitPaymentMethodDisabled = true;
        else {
            this.EntryDebitPaymentMethodDisabled = false;
        }
        if(this.entry_payment_method == 4) this.EntryTransferPaymentMethodDisabled = true;
        else {
            this.EntryTransferPaymentMethodDisabled = false;

            this.entry_owner_no_ue_bic_code = null;
            this.entry_owner_no_ue_account_number = null;
            this.entry_owner_no_ue_bank_address = null;
            this.entry_owner_no_ue_bank_city = null;
            this.entry_owner_no_ue_bank_country_code = null;
        }

        /* Tipo de país */
        if(this.BankOrigin == 0) {
            this.BankOriginURForm = true;
            this.BankOriginOtherForm = false;

            this.entry_owner_no_ue_account_number = null;
            this.entry_owner_no_ue_account_number = null;
            this.entry_owner_no_ue_bank_address = null;
            this.entry_owner_no_ue_bank_city = null;
            this.entry_owner_no_ue_bank_country_code = null;

        } else if(this.BankOrigin == 1) {

            this.BankOriginURForm = false;
            this.BankOriginOtherForm = true;

            this.entry_owner_iban = null;
            this.entry_owner_ue_bic_code = null;
        }


        /* VALIDACIÓN */
        if((this.liq_result > 0)) {

            /* Validación para declaraciones en las que hay que ingresar */

            if (this.entry_payment_method == null) {
                /* Se ha de elegir un método de pago para el ingreso */
                this.declarationErrors.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 19))); // Necesario introducir tipo de pago
                this.isValid = false;
            } else {

                /* Análisis de casos para el método de pago (el método de pago ya tiene un valor) */

                /* Si el método de pago es "A ingresar" entonces no hace falta hacer nada más */
                if (this.entry_payment_method == 2){
                    this.declarationAlerts.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 20))); //Sección 11 ok --> Método de pago = 2
                    this.declarationIsValid();
                } else if (this.entry_payment_method == 4){

                    /* El método de pago es transferencia */
                    if(this.BankOrigin == null){
                        /* Hace falta establecer un origen */
                        this.declarationErrors.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 22))); // Necesario introducir origen del páis
                        this.isValid = false;
                    } else {

                        /* El origen ya ha sido establecido */
                        if(this.BankOrigin == 0){
                            /* Unión europea */
                            if(
                                this.entry_owner_iban == null || this.entry_owner_iban == '' ||
                                this.entry_owner_ue_bic_code == null || this.entry_owner_ue_bic_code == ''
                            )
                            {
                                /* Es necesario introducir los campos del formulario para paises cuyo origen es europa */
                                this.declarationErrors.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 23))); // Faltan datos obligatorios
                                this.isValid = false;
                            } else {
                                /* Sección 11 ok */
                                this.declarationAlerts.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 20))); //Sección 11 ok
                                this.declarationIsValid();
                            }
                        } else if(this.BankOrigin == 0) {
                            /* Resto del mundo */
                            if(this.entry_owner_no_ue_account_number == null || this.entry_owner_no_ue_account_number == '' ||
                                this.entry_owner_no_ue_bic_code == null || this.entry_owner_no_ue_bic_code == '' ||
                                this.entry_owner_no_ue_bank_name == null || this.entry_owner_no_ue_bank_name == '' ||
                                this.entry_owner_no_ue_bank_address == null || this.entry_owner_no_ue_bank_address == '' ||
                                this.entry_owner_no_ue_bank_city == null || this.entry_owner_no_ue_bank_city == '' ||
                                this.entry_owner_no_ue_bank_country_code == null || this.entry_owner_no_ue_bank_country_code == ''
                            ) {
                                this.declarationErrors.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 21))); //Necesario rellenar campos de transferencia bancaria
                                this.isValid = false;
                            } else {
                                this.declarationAlerts.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 20))); //Sección 11 ok
                                this.declarationIsValid();
                            }
                        }
                    }
                } else if(this.entry_payment_method == 3){
                    /* Domicilización bancaria - De forma provisional instanciaremos los valores a la cuenta de Lexforis por lo tanto no hay que comprobar nada */
                    this.declarationAlerts.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 20))); //Sección 11 ok
                    this.declarationIsValid();
                }


            }
        } else if(this.liq_result < 0){
            this.declarationIsValid();
        } else if(this.liq_result == 0 && this.earn_period == '0A') { //Si la declaración es 0 y no es trimestral entonces error
            this.declarationErrors.push(new DeclarationError(this.declarationErrorsTypes.find(e => e.type == 30))); //Liquidación con importe = 0
            this.isValid = false;
        } else this.declarationIsValid();
    }

    public declarationIsValid(){
        this.isValid = true;
        this.currentSection = 11;
        this.progress = 100;
    }

    public validate(){

        this.declarationErrors = [];
        this.declarationAlerts = [];

        this.validatePerson();

        if(this.isValid) this.colorError = 'greenClass';
        else this.colorError = 'redClass';
    }

    public isEuropeanCountry(){

        /* https://es.wikipedia.org/wiki/Estado_miembro_de_la_Uni%C3%B3n_Europea */

        return this.contributor_fiscal_residential == 'DE' || this.contributor_fiscal_residential == 'AT' || this.contributor_fiscal_residential == 'BE' || this.contributor_fiscal_residential == 'BG' ||
            this.contributor_fiscal_residential == 'CY' || this.contributor_fiscal_residential == 'HR' || this.contributor_fiscal_residential == 'DK' || this.contributor_fiscal_residential == 'SK' ||
            this.contributor_fiscal_residential == 'SI' || this.contributor_fiscal_residential == 'ES' || this.contributor_fiscal_residential == 'EE' || this.contributor_fiscal_residential == 'FI' ||
            this.contributor_fiscal_residential == 'FR' || this.contributor_fiscal_residential == 'EL' || this.contributor_fiscal_residential == 'HU' || this.contributor_fiscal_residential == 'IE' ||
            this.contributor_fiscal_residential == 'IT' || this.contributor_fiscal_residential == 'LV' || this.contributor_fiscal_residential == 'LT' || this.contributor_fiscal_residential == 'LU' ||
            this.contributor_fiscal_residential == 'MT' || this.contributor_fiscal_residential == 'NL' || this.contributor_fiscal_residential == 'PL' || this.contributor_fiscal_residential == 'PT' ||
            this.contributor_fiscal_residential == 'CZ' || this.contributor_fiscal_residential == 'RO' || this.contributor_fiscal_residential == 'SE' ||

            /* TODO REINO UNIDO NO SERÁ COMUNITARIO A PARTIR 20210101 */
            this.contributor_fiscal_residential == 'GB';
    }

}
