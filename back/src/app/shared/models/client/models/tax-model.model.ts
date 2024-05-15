import {TaxModelTrans} from "./tax-model-trans.model";
import {Helpers} from "../../../helpers";
import {UserService} from "../../../services/user.service";

export class TaxModel {

    id: number;
    name: string;
    color: string;
    route: string;
    translations: TaxModelTrans [] = [];
    created_at: Date;

    constructor(obj?) {
        if(obj) {
            this.id = obj.id;
            this.name = obj.name;
            this.color = obj.color;
            this.route = obj.route;
            if(obj.translations && obj.translations.length > 0) {
                this.translations = obj.translations.map(t => new TaxModelTrans(t));
            }
            this.created_at = Helpers.parseDate(obj.created_at);
        }
    }

    trans(): TaxModelTrans {
        let lang = UserService.userLocal().lang;
        return this.translations.find((t: TaxModelTrans) => t.locale === lang) || new TaxModelTrans();
    }

}
