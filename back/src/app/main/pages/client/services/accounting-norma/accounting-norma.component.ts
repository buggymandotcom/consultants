import {Component, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {AireFileUploader} from "../../../../../shared/uploads/airefileuploader";
import {BehaviorSubject} from "rxjs";
import {Helpers} from "../../../../../shared/helpers";
import {env} from "../../../../../../environments/env";
import {AlertService} from "../../../../../shared/alerts/services/alert.service";
import {MatSidenav} from "@angular/material";
import {UserService} from "../../../../../shared/services/user.service";
import {AccountingService} from "../../../../../shared/services/accounting.service";
import {Upload} from "../../../../../shared/models/upload.model";
import {PaginationResponse} from "../../../../../shared/models/pagination-response.model";
import {PaginationConfig} from "../../../../../shared/components/pagination/pagination.model";
import {AccountingUpload} from "../../../../../shared/models/client/billing/accounting-upload";
import {FileItem, FileLikeObject, ParsedResponseHeaders} from "ng2-file-upload";
import {UploadService} from "../../../../../shared/services/upload.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Filter} from "../../../../../shared/components/pagination/filter.model";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-accounting-norma',
  templateUrl: './accounting-norma.component.html',
  styleUrls: ['./accounting-norma.component.scss']
})
export class AccountingNormaComponent implements OnInit {

  accUploads: AccountingUpload[] = [];
  paginationConfig: PaginationConfig = new PaginationConfig();
  filter: Filter = new Filter({
    sort: ['id','desc'],
    all: {
      created_at: {0: null, 1: null},
      invoice_type: 'norma43'
    }
  });
  newFilter: Filter = new Filter(this.filter);
  advFilter: boolean = false;

  uploader: AireFileUploader;
  hasBaseDropZoneOver: boolean = false;
  public uploading$=new BehaviorSubject(false);
  public uploading=this.uploading$.asObservable();
  public showReject=-1;
  window:any;
  @Output() onRefreshDocs  = new EventEmitter();

  @ViewChild('uploadedSidenav') uploadedSidenav: MatSidenav;

  isUploading: boolean = false;
  loadingUploads: boolean = true;
  pasteListener;

  isMd: boolean;
  isSm: boolean;
  isXs: boolean;

  constructor(
      private alertService: AlertService,
      private accountingService: AccountingService,
      private uploadService: UploadService,
  ) {
    this.isMd = window.innerWidth < 1500;
    this.isSm = window.innerWidth < 992;
    this.isXs = window.innerWidth < 768;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMd = event.target.innerWidth < 1500;
    this.isSm = event.target.innerWidth < 992;
    this.isXs = event.target.innerWidth < 768;
  }

  ngOnInit() {
    this.uploader = new AireFileUploader({url:env.baseEndPoint+'/upload',autoUpload:true},{});
    this.uploader.setFormData(
    Helpers.getUploader('accounting', null, {client_id: UserService.userLocal().id, invoice_type: 'norma43'}));
    this.uploader.options.allowedMimeType = ['text/plain'];
    this.uploader.options.maxFileSize = 2000000;
    this.uploader.options.filters.push({
      name: 'aiCheckSize',
      fn: (item: FileLikeObject): boolean => {
        if (item.size > this.uploader.options.maxFileSize) {
          // TODO Cancelar barra de carga
          this.alertService.alertError('El archivo es demasiado grande. (> ' + this.uploader.options.maxFileSize + ' b)');
          return false;
        }
        return true;
      }
    },/*{
      name: 'aiCheckMime',
      fn: (item: FileLikeObject): boolean => {
        console.log(item);
        if (this.uploader.options.allowedMimeType.indexOf(item.type) < 0) {
          // TODO Cancelar barra de carga
          this.alertService.alertError('Ese tipo de archivo no está permitido.');
          return false;
        }
        return true;
      }
    }*/);
    this.uploader.isUploading$.subscribe(data => {
      this.isUploading = data;
    }, err => {
      console.error(err);
    });
    this.uploader.allCompleted$.subscribe(data => {
      if(data) this.loadData(1);
    }, err => {
      console.error(err);
      this.alertService.alertError('app.error_uploading_file');
    });

    this.pasteListener = (e)=>{
      this.retrieveImageFromClipboardAsBlob(e,img=>{
        this.addToQueue(img);
      })
    };
    window.addEventListener("paste",this.pasteListener);
    this.loadData(1);
  }

  loadData(page?) {
    this.loadingUploads = true;
    page = page ? page : this.paginationConfig.currentPage;
    this.accountingService.getAcctInvoices(page, UserService.userLocal().id, this.filter.toUrl())
      .subscribe((paginated: PaginationResponse) => {
        this.accUploads = paginated.data.map(i => new AccountingUpload(i));
        this.paginationConfig = this.paginationConfig.reload(paginated);
        this.loadingUploads = false;
      }, err => {
        console.error(err);
        this.alertService.alertError('Error');
        this.loadingUploads = false;
      });
  }

  search(close: boolean = false) {
    this.filter.search = this.newFilter.search;
    this.filter.all = this.newFilter.all;
    this.loadData(1);
    if(close) {
      this.uploadedSidenav.close();
    }
  }

  directFilter(field,value) {
    if(this.newFilter.all[field] != value) {
      this.newFilter.all[field] = value;
      this.advFilter = true;
      this.loadData(1);
    }
  }

  clearFilter() {
    this.newFilter.search = '';
    this.newFilter.all = {
      created_at: {0: null, 1: null},
      invoice_type: null
    };
  }

  addToQueue(img){
    this.uploader.addToQueue([img],[],[]);
    window.removeEventListener('paste',this.pasteListener);
  }


  handleError($event){
    if ($event.text && $event.title) {
      this.alertService.alertError($event.text,$event.title);
    } else if ($event.text) {
      this.alertService.alertError($event.text);
    } else if ($event.title) {
      this.alertService.alertError($event.title);
    } else {
      let e=$event.error?$event.error:'errors.upload.cannot_upload_doc';
      this.alertService.alertError(e);
    }
    console.log($event);
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public retrieveImageFromClipboardAsBlob(pasteEvent, callback){

    if(pasteEvent.clipboardData == false){
      if(typeof(callback) == "function"){
        callback(undefined);
      }
    };

    let items = pasteEvent.clipboardData.items;

    if(items == undefined){
      if(typeof(callback) == "function"){
        callback(undefined);
      }
    };

    for (let i = 0; i < items.length; i++) {
      // Skip content if not image
      if (items[i].type.indexOf("image") == -1) continue;
      // Retrieve image on clipboard as blob
      let blob = items[i].getAsFile();

      if(typeof(callback) == "function"){

        callback(blob);
      }
    }
  }
  handlePaste(e){
    this.retrieveImageFromClipboardAsBlob(e,img=>{
      this.uploader.addToQueue([img],[],[]);
      // let fi = new FileItem(this.uploader,img,this.uploader.options);
      // fi.upload();
    })
  }

  parseFileSize(num, decimals, to) {
    return Helpers.parseFileSize(num, decimals, to);
  }
  download(au:AccountingUpload){
    this.accountingService.downloadFile(au);
  }
}
