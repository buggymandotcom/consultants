export class PropertySubkeyType720 {

    id: number;
    property_key_type: string;
    value: number;

    constructor(obj?) {
        if(obj) {
            this.id = parseInt(obj.id);
            this.property_key_type = obj.property_key_type;
            this.value = parseInt(obj.value);
        }
    }
}
