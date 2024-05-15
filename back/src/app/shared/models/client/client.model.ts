/**
 * Created by Jose on 25/05/2017.
 */
import {ClientInfo} from "./client-info";

export class Client  {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    lang: string;
    phone: string;
    full_name: string;
    status: number;
    hired_services_count: number;
    additionalInfo: ClientInfo;

    constructor(obj?: any) {
        if (obj){
            this.id = obj.id;
            this.email = obj.email;
            this.firstname = obj.firstname;
            this.lastname = obj.lastname;
            this.lang = obj.lang;
            this.phone = obj.phone;
            if (this.firstname && this.lastname) {
                this.full_name = this.firstname + ' ' + this.lastname;
            }
            this.status = obj.status;
            this.hired_services_count = obj.hired_services_count;
            if (obj.additionalInfo) {
                this.additionalInfo = new ClientInfo(obj.additionalInfo);
            }
        }
    }

    formattedPhone(): string {
        return this.phone;
        // if(this.phone) {
        //     // Se filtran todos los teléfonos individualmente
        //     let pattern = '(\\(\\?+\\d{1,2}\\)?)?(\\d{3})(-|\\s)?((\\d{3})(-|\\s)?(\\d{3})|(\\d{2})(-|\\s)?(\\d{2})(-|\\s)?(\\d{2}))',
        //       phones = this.phone.match(new RegExp(pattern, 'g')),
        //       parsed = [];
        //     phones.forEach(ph => {
        //         // Formatea cada teléfono que encuentra
        //         let parts = ph.match(new RegExp(pattern));
        //         if(parts[0]) {
        //             if(parts[5]) {
        //                 parsed.push([parts[1],parts[2],parts[5],parts[7]].join(' '));
        //             } else if(parts[8]) {
        //                 parsed.push([parts[1],parts[2],parts[8],parts[10],parts[12]].join(' '));
        //             }
        //         }
        //     });
        //     if (parsed.length > 0) {
        //         return parsed.join(' / ');
        //     }
        // }
        // return '---';
    }

}