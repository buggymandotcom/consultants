/**
 * Created by Jose on 26/06/2017.
 */
export class PaginationConfig {

    id:string =  'server';
    currentPage:number=1;
    totalItems:number;
    itemsPerPage:number=12;
    from:number;
    to:number;

    reload(config:any){
        this.totalItems=config.total;
        this.currentPage=config.current_page;
        this.itemsPerPage=config.per_page;
        this.from=config.from;
        this.to=config.to;
        return this;
    }

}
