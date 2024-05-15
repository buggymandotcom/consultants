export class ResidentType {

    id: number;
    text: string;

    constructor(obj?) {

        if(obj){
            this.id = obj.id;
            this.text = obj.text;
        }
    }
}
