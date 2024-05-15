import {Helpers} from "../../../../helpers";

export class Valoration {

    id: number;
    sign: string; // N: Negativo, P: Positivo o nulo
    value: number;
    decimal: number;
    completeValoration: string;

    created_at: Date;
    updated_at: Date;

    icon: string;

    constructor(obj?) {
        if(obj) {
            if(obj.id) this.id = parseInt(obj.id);
            if(obj.sign) this.sign = obj.sign;
            if(obj.value) this.value = parseInt(obj.value);
            else obj.value = null;
            this.decimal = 0;
            if(obj.decimal) this.decimal = parseInt(obj.decimal);
            else obj.decimal = 0;
            if(obj.created_at) this.created_at = Helpers.parseDate(obj.created_at);
            if(obj.updated_at) this.updated_at = Helpers.parseDate(obj.updated_at);

            this.getSign();
            this.getValoration();
        }
    }

    public getValoration(){
        if(this.value == null) this.completeValoration = null;
        else {
            let val = 0;
            let dec = 0;
            if(this.value) val = this.value;
            if(this.decimal) dec = this.decimal;
            this.completeValoration = val+'.'+dec;
        }
    }

    public getSign(){
        if(this.sign == 'N') {
            this.icon = 'trending_down';
        } else if (this.sign == 'P') {
            this.icon = 'trending_up';
        } else {
            /* Sin signo, establecemos por defecto a positivo */
            this.sign = 'P';
            this.icon = 'trending_up';
        }
    }

    public changeSign(){
        if(this.sign == 'N') {
            this.sign = 'P';
            this.icon = 'trending_up';
        } else {
            this.sign = 'N';
            this.icon = 'trending_down';
        }
    }

    public setValues(val, sign){
        this.sign = sign;
        this.value = parseInt(val);
        this.decimal = val - Math.floor(val);
        this.completeValoration = this.value+'.'+this.decimal;
    }
}
