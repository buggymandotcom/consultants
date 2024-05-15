export class FileModel {
    constructor (fileInfo:any){
        this.id  = fileInfo.id,
        this.mime  = fileInfo.mime,
        this.extension  = fileInfo.extension,
        this.original_name  = fileInfo.original_name
    }

    id:number;
    mime:string;
    extension:string;
    original_name:string;
}