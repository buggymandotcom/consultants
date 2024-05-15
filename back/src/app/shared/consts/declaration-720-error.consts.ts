/**
 * Created by EDAS 10/12/2019
 */

import {DeclarationError} from "../models/foundations/declaration-error";
import {Declaration720DeclarantKeyCondition} from "../models/foundations/declaration-720-declarant-key-condition";
import {Declaration720DeclarantPropertyKey} from "../models/foundations/declaration-720-declarant-property-key";
import {PropertySubkeyType720} from "../models/client/models/seven-two-cero/property-subkey-type-720";
import {PropertyIdentityKey720} from "../models/client/models/seven-two-cero/property-identity-key-720";
import {PropertyIdentityKeyAccount720} from "../models/client/models/seven-two-cero/property-identity-key-account-720";
import {PropertyOriginValues720} from "../models/client/models/seven-two-cero/property-origin-values-720";
import {PropertyRepresentationKeyValue720} from "../models/client/models/seven-two-cero/property-representation-key-value-720";
import {PropertyRealStateKeyValue720} from "../models/client/models/seven-two-cero/property-real-state-key-value-720";

export const DECLARATION_PROPERTY_REAL_STATE_KEY: PropertyRealStateKeyValue720[] = [

    new PropertyRealStateKeyValue720({
        id: 'U',
        text: 'declaration.property.real.state.key.U'
    }),
    new PropertyRealStateKeyValue720({
        id: 'R',
        text: 'declaration.property.real.state.key.R'
    }),

];

export const DECLARATION_PROPERTY_REPRESENTATION_KEY_VALUE: PropertyRepresentationKeyValue720[] = [

    new PropertyRepresentationKeyValue720({
        id: 'A',
        text: 'declaration.property.representation.key.A'
    }),
    new PropertyRepresentationKeyValue720({
        id: 'B',
        text: 'declaration.property.representation.key.B'
    }),

];

export const DECLARATION_PROPERTY_IDENTITY_KEY: PropertyIdentityKey720[] = [

    new PropertyIdentityKey720({
        id: '1',
        text: 'declaration.property.isin.cod'
    }),
    new PropertyIdentityKey720({
        id: '2',
        text: 'declaration.property.without.isin.cod'
    }),

];

export const DECLARATION_PROPERTY_ORIGIN_VALUES: PropertyOriginValues720[] = [

    new PropertyOriginValues720({
        id: 'A',
        text: 'declaration.property.origin.A'
    }),
    new PropertyOriginValues720({
        id: 'M',
        text: 'declaration.property.origin.M'
    }),
    new PropertyOriginValues720({
        id: 'C',
        text: 'declaration.property.origin.C'
    }),
];

export const DECLARATION_PROPERTY_IDENTITY_KEY_ACCOUNT: PropertyIdentityKeyAccount720[] = [

    new PropertyIdentityKeyAccount720({
        id: 'I',
        text: 'declaration.property.iban.account.cod'
    }),
    new PropertyIdentityKeyAccount720({
        id: 'O',
        text: 'declaration.property.other.account.cod'
    }),

];

export const DECLARATION_720_DECLARANT_PROPERTY_KEY: Declaration720DeclarantPropertyKey[] = [

    new Declaration720DeclarantPropertyKey({
        key: 'C',
        value: 'property.key.C'
    }),
    new Declaration720DeclarantPropertyKey({
        key: 'V',
        value: 'property.key.V'
    }),
    new Declaration720DeclarantPropertyKey({
        key: 'I',
        value: 'property.key.I'
    }),
    new Declaration720DeclarantPropertyKey({
        key: 'S',
        value: 'property.key.S'
    }),
    new Declaration720DeclarantPropertyKey({
        key: 'B',
        value: 'property.key.B'
    }),
];

export const DECLARATION_720_DECLARANT_KEY_CONDITION: Declaration720DeclarantKeyCondition[] = [

    new Declaration720DeclarantKeyCondition({
        key: 1,
        value: 'property.key.condition.holder' //Titular
    }),
    new Declaration720DeclarantKeyCondition({
        key: 2,
        value: 'property.key.condition.representative' //Representante
    }),
    new Declaration720DeclarantKeyCondition({
        key: 3,
        value: 'property.key.condition.authorized' //Autorizado
    }),
    new Declaration720DeclarantKeyCondition({
        key: 4,
        value: 'property.key.condition.beneficiary' //Beneficiario
    }),
    new Declaration720DeclarantKeyCondition({
        key: 5,
        value: 'property.key.condition.usufructuary' //Usufractuario
    }),
    new Declaration720DeclarantKeyCondition({
        key: 6,
        value: 'property.key.condition.taker' //Tomador
    }),
    new Declaration720DeclarantKeyCondition({
        key: 7,
        value: 'property.key.condition.with.disposition.power' //Con poder de disposición
    }),
    new Declaration720DeclarantKeyCondition({
        key: 8,
        value: 'property.key.condition.others.ownership' //Otras formas de titularidad
    }),
];

export const DECLARATION_720_PROPERTY_SUBKEY_TYPE: PropertySubkeyType720[] = [

    new PropertySubkeyType720({
        id: 1,
        property_key_type: 'C',
        value: 1
    }),
    new PropertySubkeyType720({
        id: 2,
        property_key_type: 'C',
        value: 2
    }),
    new PropertySubkeyType720({
        id: 3,
        property_key_type: 'C',
        value: 3
    }),
    new PropertySubkeyType720({
        id: 4,
        property_key_type: 'C',
        value: 4
    }),
    new PropertySubkeyType720({
        id: 5,
        property_key_type: 'C',
        value: 5
    }),
    new PropertySubkeyType720({
        id: 6,
        property_key_type: 'V',
        value: 1
    }),
    new PropertySubkeyType720({
        id: 7,
        property_key_type: 'V',
        value: 2
    }),
    new PropertySubkeyType720({
        id: 8,
        property_key_type: 'V',
        value: 3
    }),
    new PropertySubkeyType720({
        id: 9,
        property_key_type: 'S',
        value: 1
    }),
    new PropertySubkeyType720({
        id: 10,
        property_key_type: 'S',
        value: 1
    }),
    new PropertySubkeyType720({
        id: 10,
        property_key_type: 'S',
        value: 2
    }),
    new PropertySubkeyType720({
        id: 11,
        property_key_type: 'B',
        value: 1
    }),
    new PropertySubkeyType720({
        id: 12,
        property_key_type: 'B',
        value: 2
    }),
    new PropertySubkeyType720({
        id: 13,
        property_key_type: 'B',
        value: 3
    }),
    new PropertySubkeyType720({
        id: 14,
        property_key_type: 'B',
        value: 4
    }),
    new PropertySubkeyType720({
        id: 15,
        property_key_type: 'B',
        value: 5
    }),
    new PropertySubkeyType720({
        id: 16,
        property_key_type: 'I',
        value: 0
    }),
];

/*
*
*   Type: identificador del error
*   Error: 1 -> Error; 0 -> No error
*   Declaration: nombre de la declaración a la que pertenece. La declaración SevenTwoCero tiene 3 secciones:
*          - 0: Registro del declatante
*          - 1: Registro de bienes
*          - 2: Resumen
*   Section: Sección de la declaración a la que pertenece (0 si puede estar presente en todas)
*   Name: Descripción del error
*   Solution: Acciones a llevar a cabo para solucionar el error
*   Color: color
*
* */

export const DECLARATION_720_ERROR: DeclarationError[] = [

    /* Campos del formulario requeridos */
    new DeclarationError({
        type: 0,
        error: 1,
        declaration: 720,
        section: 0,
        color: 'warn',
        name: 'declaration.tip.fields.required',
        solution: 'declaration.tip.fields.required_solution'
    }),

    /* La sección 1 declarante ha sido correctamente cumplimentada */
    new DeclarationError({
        type: 1,
        error: 0,
        declaration: 720,
        section: 0,
        color: 'accent',
        name: 'declaration.section1.complete',
        solution: ''
    }),

    /* La sección 2 declarante ha sido correctamente cumplimentada */
    new DeclarationError({
        type: 2,
        error: 0,
        declaration: 720,
        section: 1,
        color: 'accent',
        name: 'declaration.section2.complete',
        solution: ''
    }),

    /* No hay propiedades */
    new DeclarationError({
        type: 3,
        error: 1,
        declaration: 720,
        section: 1,
        color: 'warn',
        name: 'declaration.no.properties',
        solution: 'declaration.add.one.property'
    }),

    /* PROPIEDADES */

    /* Falta campo declarant_condition */
    new DeclarationError({
        type: 4,
        error: 1,
        declaration: 720,
        section: 1,
        color: 'warn',
        name: 'declaration.property.no.declarant_condition',
        solution: 'declaration.property.add.declarant_condition'
    }),

    /* Propiedad - Datos del delcarante ok */
    new DeclarationError({
        type: 5,
        error: 0,
        declaration: 720,
        section: 1,
        color: 'accent',
        name: 'declaration.property.section1.ok',
        solution: ''
    }),

    /* Campos del formulario requeridos */
    new DeclarationError({
        type: 6,
        error: 1,
        declaration: 720,
        section: 1,
        color: 'warn',
        name: 'declaration.tip.fields.required',
        solution: 'declaration.tip.fields.required_solution'
    }),

    /* Falta tipo de propiedad real */
    new DeclarationError({
        type: 7,
        error: 1,
        declaration: 720,
        section: 1,
        color: 'warn',
        name: 'declaration.property.real.ownership.required',
        solution: 'declaration.property.real.ownership.solution'
    }),

    /* Falta Clave de indentificación */
    new DeclarationError({
        type: 8,
        error: 1,
        declaration: 720,
        section: 1,
        color: 'warn',
        name: 'declaration.property.identity.key.require',
        solution: 'declaration.property.identity.key.require.solution'
    }),

    /* Falta la indentificación de valores*/
    new DeclarationError({
        type: 9,
        error: 1,
        declaration: 720,
        section: 1,
        color: 'warn',
        name: 'declaration.property.identity.values.require',
        solution: 'declaration.property.identity.values.require.solution'
    }),

    /* Falta la clave de identificación de la cuenta */
    new DeclarationError({
        type: 10,
        error: 1,
        declaration: 720,
        section: 1,
        color: 'warn',
        name: 'declaration.property.identity.key.account.require',
        solution: 'declaration.property.identity.key.account.require.solution'
    }),

    /* Falta la clave de identificación de la entidad */
    new DeclarationError({
        type: 11,
        error: 1,
        declaration: 720,
        section: 1,
        color: 'warn',
        name: 'declaration.property.account.code.require',
        solution: 'declaration.property.account.code.require.solution'
    }),

    /* Falta la clave de identificación de la entidad */
    new DeclarationError({
        type: 12,
        error: 1,
        declaration: 720,
        section: 1,
        color: 'warn',
        name: 'declaration.property.entity.identity.require',
        solution: 'declaration.property.entity.identity.require.solution'
    }),

    /* Falta la clave de identificación de la entidad */
    new DeclarationError({
        type: 13,
        error: 1,
        declaration: 720,
        section: 1,
        color: 'warn',
        name: 'declaration.property.residential.nif.require',
        solution: 'declaration.property.residential.nif.require.solution'
    }),

    new DeclarationError({
        type: 14,
        error: 0,
        declaration: 720,
        section: 1,
        color: 'accent',
        name: 'declaration.property.declarant.form.is.ok',
        solution: ''
    }),

    new DeclarationError({
        type: 15,
        error: 0,
        declaration: 720,
        section: 2,
        color: 'accent',
        name: 'declaration.property.metadata.form.is.ok',
        solution: ''
    }),

    new DeclarationError({
        type: 16,
        error: 1,
        declaration: 720,
        section: 2,
        color: 'warn',
        name: 'declaration.property.extinction.date.required',
        solution: ''
    }),

    new DeclarationError({
        type: 17,
        error: 1,
        declaration: 720,
        section: 2,
        color: 'warn',
        name: 'declaration.property.valoration.value.required',
        solution: ''
    }),

    new DeclarationError({
        type: 18,
        error: 1,
        declaration: 720,
        section: 2,
        color: 'warn',
        name: 'declaration.property.representation.key.value.required',
        solution: ''
    }),

    new DeclarationError({
        type: 19,
        error: 1,
        declaration: 720,
        section: 2,
        color: 'warn',
        name: 'declaration.property.numbers.of.values.required',
        solution: ''
    }),

    new DeclarationError({
        type: 20,
        error: 1,
        declaration: 720,
        section: 2,
        color: 'warn',
        name: 'declaration.property.key.property.real.required',
        solution: ''
    }),


];