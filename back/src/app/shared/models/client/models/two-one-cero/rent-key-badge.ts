export class RentKeyBadge {

    id: string;
    text: string;

    constructor(obj?) {

        if(obj){
            this.id = obj.id;
            this.text = obj.text;
        }
    }
}
