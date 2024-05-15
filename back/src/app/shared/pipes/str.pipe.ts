import {Pipe, PipeTransform} from "@angular/core";
import {isUndefined} from "util";
@Pipe({
    name: 'uppercase'
})
export class UpperPipe implements PipeTransform {
    transform(value: any): any {
        if(value){
            return value.toUpperCase();
        }return value;

        // let filter = args;
        // console.log(filter);
        // return filter ? value.filter(item=> item.name.indexOf(filter) != -1) : value;
    }


}
// @Pipe({
//     name: 'emptyComplete'
// })
// export class EmptyCompletePipe implements PipeTransform {
//     transform(value: any,param:number|string): any {
//         if(isUndefined(value)|| value==null){
//             if(!param){
//                 return '---';
//             }
//             return param
//         }return value;
//     }
//
//
// }
