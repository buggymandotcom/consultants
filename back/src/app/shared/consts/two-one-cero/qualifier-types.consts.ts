/**
 * Created by EDAS 10/12/2019
 */
import {Home} from "../../models/client/models/two-one-cero/home";
import {ResidentType} from "../../models/client/models/two-one-cero/resident-type";

export const HOME_QUALIFIER_TYPE: Home[] = [
    new Home({
        id: 'BIS',
        text: 'declaration.210.home.numeration.BIS'
    }),
    new Home({
        id: 'DUP',
        text: 'declaration.210.home.numeration.DUP'
    }),
    new Home({
        id: 'MOD',
        text: 'declaration.210.home.numeration.MOD'
    }),
    new Home({
        id: 'ANT',
        text: 'declaration.210.home.numeration.ANT'
    }),
];

export const RESIDENT_TYPE: ResidentType[] = [
    new ResidentType({
        id: 19,
        text: 'declaration.210.resident.type.19'
    }),
    new ResidentType({
        id: 24,
        text: 'declaration.210.resident.type.24'
    }),
];