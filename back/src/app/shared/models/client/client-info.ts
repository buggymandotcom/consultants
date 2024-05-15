import {City} from './models/city';
import {Helpers} from '../../helpers';

export class ClientInfo {
    client_id: number;
    nationality: string;
    resident: number;
    residence_address: string;
    identification: string;
    passport: string;
    postal_code: string;
    iban: string;
    bank: string;
    ocupation: string;
    civil_status: string;
    birth_date: Date;
    regime: string;
    mother_name: string;
    father_name: string;
    city: City;

    constructor(obj?: any) {
        console.log(obj);
        if (obj){
            this.client_id = obj.client_id;
            this.nationality = obj.nationality;
            this.resident = obj.resident;
            this.residence_address = obj.residence_address;
            this.identification = obj.identification;
            this.passport = obj.passport;
            this.postal_code = obj.postal_code;
            this.iban = obj.iban;
            this.bank = obj.bank;
            this.ocupation = obj.ocupation;
            this.civil_status = obj.civil_status;
            this.regime = obj.regime;
            this.father_name = obj.father_name;
            this.mother_name = obj.mother_name;
            // this.birth_date = Helpers.parseDateToString(obj.birth_date, 'DD/MM/YYYY');
            this.birth_date = Helpers.parseDate(obj.birth_date);
            if (obj.city) {
                this.city = new City(obj.city);
            }
        }
    }

    /**
     * Devuelve el código ISO del país a partir de una nacionalidad dada.
     *      Si la nacionalidad no es Europea devuelve 00.
     *      Si no tiene poblado el campo nacialidad entonces devuelve null
     */
    public getCountryCode(){

        if (!this.nationality) { return null; }

        /* https://es.wikipedia.org/wiki/Estado_miembro_de_la_Uni%C3%B3n_Europea */

        switch (this.nationality) {
            case 'Alemania' || 'Germany': return 'DE'; case 'Austria': return 'AT'; case 'Bégica' || 'Belgium': return 'BE'; case 'Bulgaria': return 'BG';
            case 'Chipre': return 'CY'; case 'Croacia' || 'Croatia': return 'HR'; case 'Dinamarca' || 'Denmark': return 'DK'; case 'Eslovaquia' || 'Slovakia': return 'SK';
            case 'Eslovenia' || 'Slovenia': return 'SI'; case 'España' || 'Spain': return 'ES'; case 'Estonia': return 'EE'; case 'Finlandia' || 'Finland': return 'FI';
            case 'Francia' || 'France': return 'FR'; case 'Grecia' || 'Greece': return 'EL'; case 'Hungría' || 'Hungary': return 'HU'; case 'Irlanda' || 'Ireland': return 'IE';
            case 'Italia' || 'Italy': return 'IT'; case 'Letonia' || 'Latvia': return 'LV'; case 'Lituania' || 'Lithuania': return 'LT'; case 'Luxemburgo' || 'Luxembourg': return 'LU';
            case 'Malta' || 'Malt': return 'MT'; case 'Países Bajos' || 'Netherlands': return 'NL'; case 'Polonia' || 'Poland': return 'PL'; case 'Portugal': return 'PT';
            case 'República Checha' || 'Czech Republic': return 'CZ'; case 'Rumania' || 'Romania': return 'RO'; case 'Suecia' || 'Sweden': return 'SE';

            /* TODO: REINO UNIDO NO SERÁ COMUNITARIO A PARTIR 20210101 */
            case 'Reino Unido' || 'United Kingdom': return 'GB';

            default: return '00';
        }
    }


    /**
     * Devuelve true si el país el código ISO pertenece a un país de la UE
     *
     * @param country_code: código ISO (https://es.wikipedia.org/wiki/Estado_miembro_de_la_Uni%C3%B3n_Europea)
     */
    public isEuropean(){

        const country_code = this.getCountryCode() ? this.getCountryCode() : '00';

        return country_code == 'DE' || country_code == 'AT' || country_code == 'BE' || country_code == 'BG' ||
            country_code == 'CY' || country_code == 'HR' || country_code == 'DK' || country_code == 'SK' ||
            country_code == 'SI' || country_code == 'ES' || country_code == 'EE' || country_code == 'FI' ||
            country_code == 'FR' || country_code == 'EL' || country_code == 'HU' || country_code == 'IE' ||
            country_code == 'IT' || country_code == 'LV' || country_code == 'LT' || country_code == 'LU' ||
            country_code == 'MT' || country_code == 'NL' || country_code == 'PL' || country_code == 'PT' ||
            country_code == 'CZ' || country_code == 'RO' || country_code == 'SE' ||

            /* TODO: REINO UNIDO NO SERÁ COMUNITARIO A PARTIR 20210101 */
            country_code == 'GB';
    }
}
