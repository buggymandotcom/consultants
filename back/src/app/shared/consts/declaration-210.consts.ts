/**
 * Created by EDAS 10/12/2019
 */

import {DeclarationError} from "../models/foundations/declaration-error";

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

export const DECLARATION_210_ERROR: DeclarationError[] = [

    /* Campos del formulario requeridos - seccion 1 */
    new DeclarationError({
        type: 0,
        error: 1,
        declaration: 210,
        section: 0,
        color: 'warn',
        name: 'declaration.tip.fields.required',
        solution: 'declaration.tip.fields.required_solution'
    }),

    /* Sección 1 - ok */
    new DeclarationError({
        type: 1,
        error: 0,
        declaration: 210,
        section: 0,
        color: 'accent',
        name: 'declaration.section.1.ok',
        solution: ''
    }),

    /* Campos del formulario requeridos - seccion 2 */
    new DeclarationError({
        type: 2,
        error: 1,
        declaration: 210,
        section: 1,
        color: 'warn',
        name: 'declaration.tip.fields.required',
        solution: 'declaration.tip.fields.required_solution'
    }),

    /* Necesaria fecha de devengo - seccion 2 */
    new DeclarationError({
        type: 3,
        error: 1,
        declaration: 210,
        section: 1,
        color: 'warn',
        name: 'declaration.210.earn.date.required',
        solution: 'declaration.210.earn.date.required.solution'
    }),

    /* Sección 2 - ok */
    new DeclarationError({
        type: 4,
        error: 0,
        declaration: 210,
        section: 1,
        color: 'accent',
        name: 'declaration.section.2.ok',
        solution: ''
    }),

    /* Campos del formulario requeridos - seccion 3 */
    new DeclarationError({
        type: 5,
        error: 1,
        declaration: 210,
        section: 2,
        color: 'warn',
        name: 'declaration.tip.fields.required',
        solution: 'declaration.tip.fields.required_solution'
    }),

    /* Sección 3 - ok */
    new DeclarationError({
        type: 6,
        error: 0,
        declaration: 210,
        section: 2,
        color: 'accent',
        name: 'declaration.section.3.ok',
        solution: ''
    }),

    /* Campos del formulario requeridos - seccion 4 */
    new DeclarationError({
        type: 7,
        error: 1,
        declaration: 210,
        section: 3,
        color: 'warn',
        name: 'declaration.tip.fields.required',
        solution: 'declaration.tip.fields.required_solution'
    }),

    /* Sección 4 - ok */
    new DeclarationError({
        type: 8,
        error: 0,
        declaration: 210,
        section: 3,
        color: 'accent',
        name: 'declaration.section.4.ok',
        solution: ''
    }),

    /* Sección 5 - ok */
    new DeclarationError({
        type: 9,
        error: 0,
        declaration: 210,
        section: 4,
        color: 'accent',
        name: 'declaration.section.5.ok',
        solution: ''
    }),

    /* Sección 6 - ok */
    new DeclarationError({
        type: 10,
        error: 0,
        declaration: 210,
        section: 5,
        color: 'accent',
        name: 'declaration.section.6.ok',
        solution: ''
    }),

    /* Sección 7 - ok */
    new DeclarationError({
        type: 11,
        error: 0,
        declaration: 210,
        section: 6,
        color: 'accent',
        name: 'declaration.section.7.ok',
        solution: ''
    }),

    /* Sección 8 - ok */
    new DeclarationError({
        type: 12,
        error: 0,
        declaration: 210,
        section: 7,
        color: 'accent',
        name: 'declaration.section.8.ok',
        solution: ''
    }),

    new DeclarationError({
        type: 13,
        error: 1,
        declaration: 210,
        section: 7,
        color: 'warn',
        name: 'declaration.210.det_tax_base_r.required',
        solution: ''
    }),

    new DeclarationError({
        type: 14,
        error: 1,
        declaration: 210,
        section: 7,
        color: 'warn',
        name: 'declaration.210.det_tax_base_i.required',
        solution: ''
    }),

    new DeclarationError({
        type: 15,
        error: 0,
        declaration: 210,
        section: 8,
        color: 'accent',
        name: 'declaration.section.9.ok',
        solution: ''
    }),

    new DeclarationError({
        type: 16,
        error: 1,
        declaration: 210,
        section: 8,
        color: 'warn',
        name: 'declaration.210.liq_irnr_law_tax_type.required',
        solution: ''
    }),

    new DeclarationError({
        type: 17,
        error: 1,
        declaration: 210,
        section: 9,
        color: 'warn',
        name: 'declaration.210.aliq_complementary_previous_number.required',
        solution: ''
    }),

    new DeclarationError({
        type: 18,
        error: 0,
        declaration: 210,
        section: 9,
        color: 'accent',
        name: 'declaration.section.10.ok',
        solution: ''
    }),

    new DeclarationError({
        type: 19,
        error: 1,
        declaration: 210,
        section: 10,
        color: 'warn',
        name: 'declaration.entry_payment_method.required',
        solution: ''
    }),

    new DeclarationError({
        type: 20,
        error: 0,
        declaration: 210,
        section: 10,
        color: 'accent',
        name: 'declaration.section.11.ok',
        solution: ''
    }),

    new DeclarationError({
        type: 21,
        error: 1,
        declaration: 210,
        section: 10,
        color: 'warn',
        name: 'declaration.transfer.fields.required',
        solution: ''
    }),

    new DeclarationError({
        type: 22,
        error: 1,
        declaration: 210,
        section: 10,
        color: 'warn',
        name: 'declaration.transfer.origin.country.required',
        solution: ''
    }),

    new DeclarationError({
        type: 23,
        error: 1,
        declaration: 210,
        section: 10,
        color: 'warn',
        name: 'declaration.transfer.origin.ue.required.fields',
        solution: ''
    }),

    new DeclarationError({
        type: 24,
        error: 1,
        declaration: 210,
        section: 3,
        color: 'warn',
        name: 'declaration.210.residential.country.invalid',
        solution: ''
    }),

    new DeclarationError({
        type: 25,
        error: 1,
        declaration: 210,
        section: 6,
        color: 'warn',
        name: 'declaration.210.cadastral.value.required',
        solution: ''
    }),

    new DeclarationError({
        type: 26,
        error: 1,
        declaration: 210,
        section: 6,
        color: 'warn',
        name: 'declaration.210.property.fields.required',
        solution: ''
    }),

    new DeclarationError({
        type: 27,
        error: 1,
        declaration: 210,
        section: 3,
        color: 'warn',
        name: 'declaration.210.property.fiscal.residence.required',
        solution: ''
    }),

    new DeclarationError({
        type: 28,
        error: 1,
        declaration: 210,
        section: 8,
        color: 'warn',
        name: 'declaration.210.rent_type_02_negative_error',
        solution: ''
    }),

    new DeclarationError({
        type: 29,
        error: 1,
        declaration: 210,
        section: 8,
        color: 'warn',
        name: 'declaration.210.rent_type_01_35_negative_error',
        solution: ''
    }),

    new DeclarationError({
        type: 30,
        error: 1,
        declaration: 210,
        section: 8,
        color: 'warn',
        name: 'declaration.210.declaration_result_0',
        solution: ''
    })

];