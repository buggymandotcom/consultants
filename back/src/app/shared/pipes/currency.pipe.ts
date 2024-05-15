import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";
@Pipe({
    name: 'aiCurrency'
})
export class CurrencyPipe implements PipeTransform {

    transform(value:number,param:string):string {
        let p  = param?param:'eur';
        if(p=='eur' && value){
            return value.toLocaleString('es-ES')+' €';
        }


    }

}

@Pipe({
    name: 'aiDecimal'
})
export class DecimalPipe implements PipeTransform {

    transform(value:number,param:string):string {
        if(value){
            return value.toLocaleString('es-ES')
        }

    }

}