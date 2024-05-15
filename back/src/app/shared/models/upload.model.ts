import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

export class Upload  {
  constructor(obj?) {
    if(obj){
      this.id = obj.id;
      this.mime = obj.mime;
      this.extension = obj.extension;
      this.original_name = obj.original_name;
      this.size = obj.size;
      // this.url = obj.url;
      this.url_th = obj.url_th;
    }
  }

  id:number;
  mime:string;
  extension:string;
  original_name:string;
  size:number;
  // url:string;
  url_th:string;
  sanitized_url: SafeResourceUrl;

  isImage(){
      if(this.mime && this.mime.startsWith('image/')){
          return true;
      }return false;
  }

  getIcon() {
    switch (this.mime) {
      case 'image/png':
      case 'image/jpg':
      case 'image/jpeg':
        return 'file-image';
      case 'application/pdf':
        return 'file-pdf';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/vnd.oasis.opendocument.text':
        return 'file-word';
      case 'application/vnd.oasis.opendocument.spreadsheet':
        return 'file-excel';
      default:
        return 'file';
    }
  }
}
