export class Declaration720DeclarantKeyCondition {
    key: number;
    value: string;

    constructor(obj?) {
        if(obj) {
            this.key = obj.key;
            this.value = obj.value;
        }
    }
}
