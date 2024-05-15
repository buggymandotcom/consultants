import {Pipe, PipeTransform} from "@angular/core";
import {isUndefined} from "util";
@Pipe({
    name: 'filterObj'
})
export class FilterPipe implements PipeTransform {
    transform(value: any, args:any): any {

        if(args.length==2 && !isUndefined(args[1]) && !isUndefined(value)){
          return  value.filter(item => {
                let properties = Object.keys(item);
                //Tenemos que revisar todas las propiedades
                if(typeof args[0]== 'string'){
                    if(args[0].trim()=='*'){
                        let  propRes = false ;
                        properties.forEach(prop => {
                            if (item[prop].toLowerCase().indexOf(args[1]) != -1){
                                propRes=true;
                                return;
                            }
                        });
                        return propRes;
                    }else{
                        if(item.hasOwnProperty(args[0])) {
                            return item[args[0]].toLowerCase().indexOf(args[1].toLowerCase()) != -1;
                        }
                    }

                }else if(Array.isArray(args[0])){
                    let customProps=args[0];
                    let  propRes = false ;
                    customProps.forEach(prop => {
                        //comprobacion de la propiedad
                        if(item.hasOwnProperty(prop)){
                            if (item[prop].toLowerCase().indexOf(args[1].toLowerCase()) != -1){
                                propRes=true;
                                return;
                            }
                        }

                    });
                    return propRes;
                }return true;

            });
        }
        // let filter = args;
        // console.log(filter);
        // return filter ? value.filter(item=> item.name.indexOf(filter) != -1) : value;
    }


}
