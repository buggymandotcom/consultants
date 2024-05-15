export class Translation {
    constructor(translation?:any){
        if(translation){
            this.id=translation.id;
            this.lang=translation.lang;
            this.key=translation.key;
            this.text=translation.text;
        }

    }
    id:number;
    lang:string;
    key:string;
    text:string;

}