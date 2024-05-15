export class TaxModelTrans {

    model_id: number;
    lang_id: number;
    name: string;
    description: string;
    locale: string;

    constructor(obj?) {
        if(obj) {
            this.model_id = obj.model_id;
            this.lang_id = obj.lang_id;
            this.name = obj.name;
            this.description = obj.description;
            this.locale = obj.locale;
        }
    }

}
