import {Component, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {AireFileUploader} from "../../../../../shared/uploads/airefileuploader";
import {BehaviorSubject} from "rxjs";
import {Helpers} from "../../../../../shared/helpers";
import {env} from "../../../../../../environments/env";
import {AlertService} from "../../../../../shared/alerts/services/alert.service";
import {MatDialog, MatSidenav} from "@angular/material";
import {UserService} from "../../../../../shared/services/user.service";
import {AccountingService} from "../../../../../shared/services/accounting.service";
import {PaginationResponse} from "../../../../../shared/models/pagination-response.model";
import {PaginationConfig} from "../../../../../shared/components/pagination/pagination.model";
import {AccountingUpload} from "../../../../../shared/models/client/billing/accounting-upload";
import {FileLikeObject} from "ng2-file-upload";
import {UploadService} from "../../../../../shared/services/upload.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Filter} from "../../../../../shared/components/pagination/filter.model";
import {TranslateService} from "@ngx-translate/core";
import {DShowAcctUploadComponent} from "../../../../../shared/dialogs/d-show-acct-upload/d-show-acct-upload.component";

@Component({
  selector: 'app-services-accounting',
  templateUrl: './services-accounting.component.html',
  styleUrls: ['./services-accounting.component.scss']
})
export class ServicesAccountingComponent implements OnInit {

  accUploads: AccountingUpload[] = [];
  paginationConfig: PaginationConfig = new PaginationConfig();
  filter: Filter = new Filter({
    sort: ['id','desc'],
    all: {
      created_at: {0: null, 1: null},
      invoice_type: ['purchase','sale']
    }
  });
  invoiceType: string;
  newFilter: Filter = new Filter(this.filter);
  uploadUrl: SafeResourceUrl;
  advFilter: boolean = false;

  uploader: AireFileUploader;
  hasBaseDropZoneOver: boolean = false;
  public currentUpload: AccountingUpload;
  public uploading$=new BehaviorSubject(false);
  public uploading=this.uploading$.asObservable();
  public showReject=-1;
  public selectedComment:AccountingUpload = null;
  window:any;
  @Output() onRefreshDocs  = new EventEmitter();

  @ViewChild('fileSidenav') fileSidenav: MatSidenav;
  @ViewChild('uploadedSidenav') uploadedSidenav: MatSidenav;
  @ViewChild('uploadCommentSidenav') uploadCommentSidenav: MatSidenav;

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
      private sanitizer: DomSanitizer,
      private translate: TranslateService,
      private dialog : MatDialog
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
    this.uploader = new AireFileUploader({url:env.baseEndPoint+'/upload',autoUpload:false},{});
    this.setUploaderFormData();
    this.uploader.options.allowedMimeType = ['image/png', 'image/jpeg', 'application/pdf'];
    this.uploader.options.maxFileSize = 10000000;
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
    },{
      name: 'aiCheckMime',
      fn: (item: FileLikeObject): boolean => {
        if (this.uploader.options.allowedMimeType.indexOf(item.type) < 0) {
          // TODO Cancelar barra de carga
          this.alertService.alertError('Ese tipo de archivo no está permitido.');
          return false;
        }
        return true;
      }
    });
    this.uploader.isUploading$.subscribe(data => {
      this.isUploading = data;
    }, err => {
      console.error(err);
    });
    this.uploader.allCompleted$.subscribe(data => {
      if(data) this.loadData(1);
    }, err => {
      console.error(err);
      this.alertService.alertError('Error al subir archivo');
    });

    this.pasteListener = (e)=>{
      this.retrieveImageFromClipboardAsBlob(e,img=>{
        this.addToQueue(img);
      })
    };
    window.addEventListener("paste",this.pasteListener);
    this.loadData(1);

    // this.uploadCommentSidenav.

  }

  setUploaderFormData() {
    this.uploader.setFormData(Helpers.getUploader('accounting', null, {client_id: UserService.userLocal().id, invoice_type: this.invoiceType}));
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

  openFile(id) {
    this.uploadUrl = null;
    let file: AccountingUpload = this.accUploads.find((f: AccountingUpload) => f.id === id);
    if(file) {
      this.currentUpload = new AccountingUpload(file);
      // this.uploadService.requestUrl(file.upload.id)
      //   .subscribe(d => {
          this.uploadUrl = this.sanitizer.bypassSecurityTrustResourceUrl(env.baseEndPoint+'/download/'+this.currentUpload.upload.id+'/download');
      //   }, err => {
      //     console.error(err);
      //     this.alertService.alertError('Error al obtener URL de descarga.');
      //   });
      // this.uploadUrl=env.baseEndPoint+'/download/'+this.currentUpload.upload.id+'/download';
      this.fileSidenav.open();
    }
  }

  closeFile() {
    this.currentUpload = null;
    this.uploadUrl = null;
    this.fileSidenav.close();
  }

  deleteFile(event, id) {
    let file = this.accUploads.find((au: AccountingUpload) => au.id == id);
    let m  = this.alertService.confirmation('pages.clients.services.accounting.process_delete');
    m.componentInstance.confirmed$.subscribe(confirmed=>{
      if(confirmed){

        if(event && file) {
          this.accountingService.delete(id)
            .subscribe(d => {
              file.cancelled_at = new Date();
            }, err => {
              console.error(err);
              // 400
              this.alertService.alertError('Error al borrar archivo.');
            });
        }
      }

    });

  }

  getIconFromFileObject(file: FileLikeObject) {
    switch (file.type) {
      case 'application/pdf':
        return 'file-pdf';
      case 'image/png':
      case 'image/jpg':
      case 'image/jpeg':
        return 'file-image';
      default:
        return 'file';
    }
  }

  parseFileSize(num, decimals, to) {
    return Helpers.parseFileSize(num, decimals, to);
  }

  download($event,au:AccountingUpload){
    $event.stopPropagation();
    this.accountingService.downloadFile(au);
  }


  showComment($event,upload:AccountingUpload,mode:string){
    $event.stopPropagation();
    let m =this.dialog.open(DShowAcctUploadComponent,{width:'40%',height:'40%',data:{upload:upload,mode:mode}});
    m.afterClosed().subscribe(d=>this.loadData(1));

  }

}
