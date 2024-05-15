import {isUndefined} from "util";
export class UserSubscription {
    constructor(obj?:any){

        if (obj){
            this.name=obj.name;
            this.subscribed=obj.subscribed;
        }

    }

    public name:string;
    public subscribed:boolean;

}
