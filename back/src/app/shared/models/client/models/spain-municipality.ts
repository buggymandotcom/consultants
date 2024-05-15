export class SpainMunicipality {

    id: number;
    name: string;
    code: string;
    province_id: number;

    constructor(obj?) {

        if(obj.id) this.id = obj.id;
        if(obj.name) this.name = obj.name;
        if(obj.code) this.code = obj.code;
        if(obj.province_id) this.province_id = obj.province_id;
    }
}
