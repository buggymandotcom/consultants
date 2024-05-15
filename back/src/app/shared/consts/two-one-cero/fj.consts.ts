/**
 * Created by EDAS 10/12/2019
 */
import {Fj} from "../../models/client/models/two-one-cero/fj";
import {FjExtend} from "../../models/client/models/two-one-cero/fjExtend";

export const FJ_TYPE: Fj[] = [
    new Fj({
        id: 'F',
        text: 'declaration.210.F'
    }),
    new Fj({
        id: 'J',
        text: 'declaration.210.J'
    }),
];

export const FJ_TYPE_DESC: FjExtend[] = [
    new FjExtend({
        key: 0,
        id: 'F', //Español de nacimiento
        origin: 'born-spain',
        text: 'declaration.210.F.spain'
    }),
    new FjExtend({
        key: 1,
        id: 'J',
        origin: 'spain',
        text: 'declaration.210.J.spain'
    }),
    new FjExtend({
        key: 2,
        id: 'F',
        origin: 'word',
        text: 'declaration.210.J.word'
    }),
    new FjExtend({
        key: 3,
        id: 'J',
        origin: 'word',
        text: 'declaration.210.J.word'
    }),
    new FjExtend({
        key: 4,
        id: '-',
        origin: '',
        text: 'declaration.210.no.identification.number'
    }),
    new FjExtend({
        key: 5,
        id: 'F', //Nacionalidad española
        origin: 'spain',
        text: 'declaration.210.F.spain'
    }),
];

export const REPRESENT_TYPE: Fj[] = [
    new Fj({
        id: 'L',
        text: 'declaration.210.L'
    }),
    new Fj({
        id: 'V',
        text: 'declaration.210.V'
    }),
];