export class SpainProvince {

    id: number;
    name: string;
    code: string;

    constructor(obj?) {

        if(obj.id) this.id = obj.id;
        if(obj.name) this.name = obj.name;
        if(obj.code) this.code = obj.code;
    }
}
