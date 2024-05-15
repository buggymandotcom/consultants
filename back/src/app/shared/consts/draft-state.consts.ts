/**
 * Created by EDAS 10/12/2019
 */
import {DraftState} from "../models/foundations/draft-state";

/*
*   Activo: El borrador ha sido creado
*   Incompleto: El borrador se ha guardado pero no ha sido validado por la aplicación
*   Completo: Borrador validado por la aplicación
*   Inválido: El modelo se ha intentado validar en los servidores de la AEAT pero se han obtenido errores
*   Válido: Validado contra el servidor de la AEAT satisfactoriamente
*   No presentado: Modelo validado pero no presentado
*   Presentado: Modelo validado y presentado contra los servidores de la AEAT
*
* */

export const DRAFT_STATE: DraftState[] = [
    new DraftState({
        key: 'active',
        name: 'model.state.active'
    }),
    new DraftState({
        key: 'incomplete',
        name: 'model.state.incomplete'
    }),
    new DraftState({
        key: 'complete',
        name: 'model.state.complete'
    }),
    new DraftState({
        key: 'invalid',
        name: 'model.state.invalid'
    }),
    new DraftState({
        key: 'valid',
        name: 'model.state.valid'
    }),
    new DraftState({
        key: 'not_presented',
        name: 'model.state.not_presented'
    }),
    new DraftState({
        key: 'presented',
        name: 'model.state.presented'
    })
];