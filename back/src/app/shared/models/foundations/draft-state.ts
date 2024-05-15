export class DraftState {
    order: number;
    index: number;
    key: string;
    name: string;

    constructor(obj?) {
        if(obj) {
            this.index = obj.index;
            this.key = obj.key;
            this.name = obj.name;
        }
    }
}
