import {Helpers} from "../../../../helpers";
import {Client} from "../../client.model";
import {TaxModelDraft} from "../tax-model-draft";
import {Property720} from "./property-720";
import {Valoration} from "./valoration";

export class Declaration720 {

    id: number;
    declarant_id: number;
    draft_id: number;
    person_contact_name: string;
    person_contact_phone: string;
    declaration_number: number;
    complementary_declaration: string;
    substitutive_declaration: string;
    declaration_parent_number: number;
    valoration1_id: Valoration;
    valoration2_id: Valoration;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    declarant: Client;
    draft: TaxModelDraft;
    properties: Property720[] = [];

    constructor(obj?) {

        if(obj) {
            this.id = obj.id;
            this.declarant_id = obj.declarant_id;
            this.draft_id = obj.draft_id;
            this.person_contact_name = obj.person_contact_name;
            this.person_contact_phone = obj.person_contact_phone;
            if(obj.declaration_number) this.declaration_number = obj.declaration_number;
            if(obj.complementary_declaration) this.complementary_declaration = obj.complementary_declaration;
            if(obj.substitutive_declaration) this.substitutive_declaration = obj.substitutive_declaration;
            if(obj.declaration_parent_number) this.declaration_parent_number = obj.declaration_parent_number;
            if(obj.valoration1_id) this.valoration1_id = obj.valoration1_id;
            if(obj.valoration2_id) this.valoration2_id = obj.valoration2_id;
            this.created_at = Helpers.parseDate(obj.created_at);
            this.updated_at = Helpers.parseDate(obj.updated_at);
            if(obj.deleted_at) this.deleted_at = Helpers.parseDate(obj.deleted_at);
            if(obj.declarant) this.declarant = new Client(obj.declarant);
            if(obj.draft) this.draft = new TaxModelDraft(obj.draft);
            if(obj.properties && obj.properties.length > 0) this.properties = obj.properties.map(b => new Property720(b));
            if(obj.valoration1_id) this.valoration1_id = new Valoration(obj.valoration1_id);
            if(obj.valoration2_id) this.valoration2_id = new Valoration(obj.valoration2_id);
        }
    }
}
