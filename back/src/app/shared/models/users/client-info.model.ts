import * as moment from "moment";
import _date = moment.unitOfTime._date;
import {Helpers} from "../../helpers";
import {CIVIL_STATUS_AVAILABLES, REGIME_AVAILABLES} from "../../consts/user.consts";
export class ClientInfo{



    constructor(obj?:any) {

        if(obj){
            this.civil_status = obj.civil_status;
            this.regime = obj.regime;
            this.nationality = obj.nationality;
            this.notification_address = obj.notification_address;
            this.residence_address = obj.residence_address;
            this.same_address_notification = obj.same_address_notification;
            this.passport = obj.passport;
            this.iban = obj.iban;
            this.bank = obj.bank; 
            this.bank = obj.bank;
            this.birth_date =  Helpers.parseDate(obj.birth_date);
            this.death_date =  Helpers.parseDate(obj.death_date);
            this.death_place = obj.death_place;
            this.mother_name = obj.mother_name;
            this.father_name = obj.father_name;
        }



    }

        civil_status:string;
        regime:string;
        nationality:string;
        notification_address:string;
        residence_address:string;
        same_address_notification:boolean;
        passport:string;
        iban:string;
        bank:string;
        birth_date:Date|any;
        death_date:Date|any;
        death_place:string;
        mother_name:string;
        father_name:string;

    civilStatusTrans(){
        if(!this.civil_status){
            return null;
        }else{
            let filtered  = CIVIL_STATUS_AVAILABLES.filter(status => {
                return status.value == this.civil_status;
            });
            if(filtered.length>0){
                return filtered[0].text;
            }
            return null;
        }
    }
    regimeTrans(){
        if(!this.regime){
            return null;
        }else{
            let filtered  = REGIME_AVAILABLES.filter(status => {
                return status.value == this.regime;
            });
            if(filtered.length>0){
                return filtered[0].text;
            }
            return null;
        }
    }

}