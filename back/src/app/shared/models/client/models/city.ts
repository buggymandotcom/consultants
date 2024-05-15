export class City {

    id: number;
    country_code: string;
    region_id: string;
    name: string;

    constructor(obj?) {
        if(obj) {
            this.id = obj.id;
            this.country_code = obj.country_code;
            this.region_id = obj.region_id;
            this.name = obj.name;
        }
    }

    public isEuropeanCountry(){

        /* https://es.wikipedia.org/wiki/Estado_miembro_de_la_Uni%C3%B3n_Europea */

        return this.country_code == 'DE' || this.country_code == 'AT' || this.country_code == 'BE' || this.country_code == 'BG' ||
            this.country_code == 'CY' || this.country_code == 'HR' || this.country_code == 'DK' || this.country_code == 'SK' ||
            this.country_code == 'SI' || this.country_code == 'ES' || this.country_code == 'EE' || this.country_code == 'FI' ||
            this.country_code == 'FR' || this.country_code == 'EL' || this.country_code == 'HU' || this.country_code == 'IE' ||
            this.country_code == 'IT' || this.country_code == 'LV' || this.country_code == 'LT' || this.country_code == 'LU' ||
            this.country_code == 'MT' || this.country_code == 'NL' || this.country_code == 'PL' || this.country_code == 'PT' ||
            this.country_code == 'CZ' || this.country_code == 'RO' || this.country_code == 'SE' ||

            /* TODO REINO UNIDO NO SERÁ COMUNITARIO A PARTIR 20210101 */
            this.country_code == 'GB';
    }
}


