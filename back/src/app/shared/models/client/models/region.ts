export class Region {

    id: number;
    country_code: string;
    name: string;

    constructor(obj?) {
        if(obj) {
            this.id = obj.id;
            this.country_code = obj.country_code;
            this.name = obj.name;
        }
    }

}
