export class PropertyCountryCod720 {

    id: number;
    cod: string;
    value: string;

    constructor(obj?) {
        if(obj) {
            this.id = obj.id;
            this.cod = obj.cod;
            this.value = obj.value;
        }
    }

}
