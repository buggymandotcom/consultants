import {isUndefined} from "util";
import {UserSubscription} from "./user-subscription.model";
export class User {
    id: number;
    phone: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    activated: string = null;
    password_confirmation: string;
    token: string;
    lang: string;
    roles : Array <any> = [];
    guard: string;
    subscriptions:UserSubscription[] = [];

    constructor(userInfo?:any){

        if (userInfo !=null  &&  ! isUndefined (userInfo)){
            this.id = userInfo.id;
            this.email = userInfo.email;
            this.firstname = userInfo.firstname;
            this.lastname = userInfo.lastname;
            this.token = userInfo.token;
            this.lang = userInfo.lang;
            this.roles = userInfo.roles;
            this.guard = userInfo.guard;
            if(userInfo.activated) this.activated = userInfo.activated;

            if(userInfo.subscriptions){
                this.subscriptions = userInfo.subscriptions.map(su => new UserSubscription(su));
            }
        }



    }

    toLocalstorage (){
        return {
            id : this.id,
            email:this.email,
            firstname:this.firstname,
            lastname:this.lastname,
            lang:this.lang,
            token:this.token,
            activated:this.activated,
            guard:this.guard,
        }
    }

    hasRole(roleSearch:string):boolean{
        if(this.roles.length > 0 ){
            let found = false;
            this.roles.forEach((role)=>{
                if(role.name==roleSearch){
                    found = true;
                }
            });
            return found;
        }return false;
    }
}
