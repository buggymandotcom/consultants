export class Declaration720DeclarantPropertyKey {
    key: string;
    value: string;

    constructor(obj?) {
        if(obj) {
            this.key = obj.key;
            this.value = obj.value;
        }
    }
}
