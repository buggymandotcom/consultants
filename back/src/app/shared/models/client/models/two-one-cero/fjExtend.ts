export class FjExtend {

    key: number;
    id: string;
    origin: string;
    text: string;

    constructor(obj?) {

        if(obj){
            this.key = obj.key;
            this.id = obj.id;
            this.origin = obj.origin;
            this.text = obj.text;
        }
    }
}
