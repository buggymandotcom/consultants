import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AireFileUploader} from "../airefileuploader";
import {FileItem, ParsedResponseHeaders, FileLikeObject} from "ng2-file-upload";
import {FileModel} from "../models/file.model";
import {ErrorDialogComponent} from "../../alerts/dialogs/dialog.component";
import {AlertService} from "../../alerts/services/alert.service";
import {Upload} from "../../models/upload.model";
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'ai-custom-upload',
  templateUrl: './custom-upload.component.html',
  styleUrls: ['./custom-upload.component.scss']
})

export class CustomUploadComponent implements OnInit,OnChanges {
  @Input() uploader : AireFileUploader;
  @Input() maxFileSize : number = 5242880; // 5 MB
  @Input() multiple : boolean = false;
  @Input() allowedMimeTypes : Array<string> = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];
  @Output() onUploading = new EventEmitter();
  @Output() onSuccess : EventEmitter<Upload> = new EventEmitter();
  @Output() onError = new EventEmitter();

  public isUploading:boolean=false;
  public idInput : string = 'uploader-' + Math.floor(Math.random() * Math.floor(Math.random() * 50000));
  public file : FileModel;


  public config :  any = {
    text : 'Selecciona un archivo',
    class : {},
    color : 'primary',
  };

  constructor(
      private alertService: AlertService
  ) { }

  ngOnInit() {
    this.uploader.allCompleted$.subscribe(d=>{
      //Con esto podemos subir la misma imagen dos veces seguidas o mas .
        //jQuery('#'+this.idInput).val('');
       //document.getElementById(this.idInput).value = '';
    });

    this.uploader.options.maxFileSize = this.maxFileSize;
    this.uploader.options.allowedMimeType = this.allowedMimeTypes;
    this.uploader.options.filters.push({
        name: 'aiCheckSize',
        fn: (item: FileLikeObject): boolean => {
          if (item.size > this.maxFileSize) {
            // TODO Cancelar barra de carga
            this.onError.emit({
                text: 'El archivo es demasiado grande. (> ' + this.maxFileSize + ' b)',
                title: 'Ha ocurrido un error'
            });
            return false;
          }
          return true;
      }
    },{
        name: 'aiCheckMime',
        fn: (item: FileLikeObject): boolean => {
          if (this.allowedMimeTypes.indexOf(item.type) < 0) {
            // TODO Cancelar barra de carga
            this.onError.emit({
                text: 'Ese tipo de archivo no está permitido.',
                title: 'Ha ocurrido un error'
            });
            return false;
          }
          return true;
        }
    });
    //console.log(this.uploader);
    // this.uploader.isUploading$.subscribe(d=>{
    //   console.log("subiendo",d);
    //   this.isUploading=d;
    //   this.onUploading.emit(d);
    // });





    // this.uploader.onAfterAddingFile = (file:FileItem) => {
    //   this.onAfterAddingFile(file);
    // }
  }

  ngOnChanges(changes) {
    if(changes.uploader){
      this.uploader.isUploading$.subscribe(d=>{
        this.isUploading=d;
        this.onUploading.emit(d);
      });
      this.uploader.onErrorItem= (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
        //this.onErrorItem(item,response,status,headers);
        this.onError.emit(JSON.parse(response));
      };
      this.uploader.onSuccessItem= (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
        let res = JSON.parse(response);
        let upload = new Upload(res);
        this.onSuccess.emit(upload);
        //this.onSuccessItem(item,response,status,headers);
      };
    }

  }

  upload(){
    this.uploader.uploadAll()
  }


  // onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders){
  //   console.log(JSON.parse(response));
  // }
  // onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders){
  //   this.file= new FileModel(JSON.parse(response));
  //   console.log(this.file);
  // }



}
