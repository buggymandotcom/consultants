/**
 * Created by Jose on 25/05/2017.
 */
import {isUndefined} from "util";
import {ClientInfo} from "./client-info.model";
export class UserProfile  {


    constructor(obj?:any) {

        if(obj){
            this.id = obj.id;
            this.email = obj.email;
            this.firstname = obj.firstname;
            this.lastname = obj.lastname;
            this.lang = obj.lang;
            this.phone=obj.phone;
            this.identification = obj.identification;
            this.identification_type = obj.identification_type;
            this.full_name=this.firstname+' '+this.lastname;
            this.percent=obj.percent;
        }

    //console.log(this);
    }

    id: number;
    email: string;
    firstname: string;
    lastname: string;
    lang: string;
    phone:string;
    identification:string;
    identification_type:string;

    full_name:string;
    percent:number;


}