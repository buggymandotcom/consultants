import {Component, Input, OnInit, Output} from '@angular/core';
import {AireFileUploader} from "../airefileuploader";
import {FileItem, ParsedResponseHeaders} from "ng2-file-upload";
import {FileModel} from "../models/file.model";



@Component({
  selector: 'ai-simple-upload',
  templateUrl: './simple-upload.component.html',
  styleUrls: ['./simple-upload.component.scss']
})
export class SimpleUploadComponent implements OnInit {
  @Input() uploader : AireFileUploader;

  public isUploading:boolean=false;
  public idInput : string = 'uploader-' + Math.floor(Math.random() * Math.floor(Math.random() * 50000));
  public file : FileModel;


  public config :  any = {
    text : 'select file',
    class : {},
    color : 'primary',
  };

  constructor() { }

  ngOnInit() {
    this.uploader.isUploading$.subscribe(d=>this.isUploading=d);


    this.uploader.onErrorItem= (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      this.onErrorItem(item,response,status,headers);
    };

    this.uploader.onSuccessItem= (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      this.onSuccessItem(item,response,status,headers);
    };

    // this.uploader.onAfterAddingFile = (file:FileItem) => {
    //   this.onAfterAddingFile(file);
    // }
  }

  upload(){
    this.uploader.uploadAll()
  }


  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders){
    console.log(JSON.parse(response));
  }
  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders){
    this.file= new FileModel(JSON.parse(response));
    console.log(this.file);
  }



}
