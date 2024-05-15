export class Declaration720DeclarantSubkeyType {
    key: number;
    property_subkey_type: string;
    value: number;
    text: string;

    constructor(obj?) {
        if(obj) {
            this.key = parseInt(obj.key);
            this.property_subkey_type = obj.property_subkey_type;
            this.value = parseInt(obj.value);
            this.text= obj.text;
        }
    }
}
