/**
 * Created by Jose on 26/06/2017.
 */
export class Filter {

    search:string;
    sort:string[]=[];
    status: string;
    all:any={};
    per_page: number;
    search_id: number;

    constructor(obj?) {
      if(obj) {
        this.search = obj.search;
        this.sort = obj.sort;
        this.status = obj.status;
        this.all = obj.all;
        this.per_page = obj.per_page;
        this.search_id = obj.search_id;
      }
    }


    toUrl(){
        let r:any={};
        r.search=this.search != undefined ? this.search : '';
        r.order=this.sort && this.sort.length == 2 ?this.sort[0]+','+this.sort[1]:'';
        r.per_page = this.per_page;
        r.search_id = this.search_id;
        if (this.status) r.status = this.status;
        if (this.all) {
          if (Array.isArray(this.all)) {
            this.all.forEach(item => {
              Object.keys(item).forEach(key=> {
                if(item[key] != null && (typeof item[key] != 'string' || item[key].trim() != '')) r[key]=item[key];
              });
            });
          } else {
            Object.keys(this.all).forEach(key=> {
              if(this.all[key] != null && (typeof this.all[key] != 'string' || this.all[key].trim() != '')) {
                if(Array.isArray(this.all[key])) {
                  r[key]=this.all[key];
                } else {
                  r[key]=this.all[key];
                }
              };
            });
          }
        }
        return r;

    }

//    TODO Método para saber si el filtro está sucio
}
