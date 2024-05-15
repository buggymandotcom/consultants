import {Helpers} from "../../../helpers";
import {TaxModel} from "./tax-model.model";
import {Client} from "../client.model";
import {Declaration210} from "./two-one-cero/declaration-210";

export class TaxModelDraft {

    id: number;
    client_id: number;
    model_id: number;
    year: number;
    state: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    model: TaxModel;
    declaration: Declaration210;

    constructor(obj?) {
        if(obj) {
            this.id = obj.id;
            this.client_id = obj.client_id;
            this.model_id = obj.model_id;
            this.year = obj.year;
            this.state = obj.state;
            this.model = new TaxModel(obj.model);
            this.created_at = Helpers.parseDate(obj.created_at);
            this.updated_at = Helpers.parseDate(obj.updated_at);
            this.deleted_at = Helpers.parseDate(obj.deleted_at);
            if(obj.declaration) this.declaration = new Declaration210(obj.declaration);
        }
    }
}
