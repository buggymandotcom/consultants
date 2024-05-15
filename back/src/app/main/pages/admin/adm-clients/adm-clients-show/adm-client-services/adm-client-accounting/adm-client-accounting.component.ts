import {Component, HostListener, OnInit, ViewChild} from "@angular/core";
import {AccountingUpload} from "../../../../../../../shared/models/client/billing/accounting-upload";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Filter} from "../../../../../../../shared/components/pagination/filter.model";
import {AlertService} from "../../../../../../../shared/alerts/services/alert.service";
import {AccountingService} from "../../../../../../../shared/services/accounting.service";
import {UploadService} from "../../../../../../../shared/services/upload.service";
import {TranslateService} from "@ngx-translate/core";
import {PaginationResponse} from "../../../../../../../shared/models/pagination-response.model";
import {Helpers} from "../../../../../../../shared/helpers";
import {MatDialog, MatSidenav} from "@angular/material";
import {UserService} from "../../../../../../../shared/services/user.service";
import {env} from "../../../../../../../../environments/env";
import {ActivatedRoute} from "@angular/router";
import {Service} from "../../../../../../../shared/models/client/services/service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PaginationConfig} from "../../../../../../../shared/components/pagination/pagination.model";
import {DShowAcctUploadComponent} from "../../../../../../../shared/dialogs/d-show-acct-upload/d-show-acct-upload.component";

@Component({
  selector: 'app-adm-client-accounting',
  templateUrl: './adm-client-accounting.component.html',
  styleUrls: ['./adm-client-accounting.component.scss']
})
export class AdmClientAccountingComponent implements OnInit {
  // Client
  id: number;

  // Norma43
  norma43Uploads: AccountingUpload[] = [];
  norma43Pagination: PaginationConfig = new PaginationConfig();
  normaFilter: Filter = new Filter({
    sort: ['id','desc'],
    all: {
      created_at: {0: null, 1: null},
      invoice_type: 'norma43'
    }
  });
  newNormaFilter: Filter = new Filter(this.normaFilter);
  normaAdvFilter: boolean = false;
  loadingNorma: boolean = true;
  @ViewChild('normaFilterSidenav') normaFilterSidenav: MatSidenav;

  // Invoices
  invoices: AccountingUpload[] = [];
  invoicesPagination: PaginationConfig = new PaginationConfig();
  invoicesFilter: Filter = new Filter({
    sort: ['id','desc'],
    all: {
      created_at: {0: null, 1: null},
      invoice_type: ['purchase','sale']
    }
  });
  newInvoicesFilter: Filter = new Filter(this.invoicesFilter);
  uploadUrl: SafeResourceUrl;
  invAdvFilter: boolean = false;
  currentUpload: AccountingUpload;
  @ViewChild('fileSidenav') fileSidenav: MatSidenav;
  @ViewChild('invoicesFilterSidenav') invoicesFilterSidenav: MatSidenav;
  loadingInvoices: boolean = true;

  // Config
  exactForm: FormGroup;
  trifactForm: FormGroup;
  moreConfigForm: FormGroup;

  window:any;
  isMd: boolean;
  isSm: boolean;
  isXs: boolean;

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private accountingService: AccountingService,
    private uploadService: UploadService,
    private sanitizer: DomSanitizer,
    private dialog:MatDialog
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
    this.route.parent.parent.parent.parent.params
      .subscribe(d => {
        this.id = d.id;
        this.loadNorma43Data(1);
      }, err => {
        console.error(err);
      });
    this.createForm();
    this.loadConfData();
    this.loadInvoicesData(1);
  }

  loadNorma43Data(page?) {
    this.loadingNorma = true;
    page = page ? page : this.norma43Pagination.currentPage;
    this.accountingService.getAcctInvoices(page, this.id, this.normaFilter.toUrl())
      .subscribe((paginated: PaginationResponse) => {
        this.norma43Uploads = paginated.data.map(i => new AccountingUpload(i));
        this.norma43Pagination = this.norma43Pagination.reload(paginated);
        this.loadingNorma = false;
      }, err => {
        console.error(err);
        this.alertService.alertError('Error');
        this.loadingNorma = false;
      });
  }

  searchNorma(close: boolean = false) {
    this.normaFilter.search = this.newNormaFilter.search;
    this.normaFilter.all = this.newNormaFilter.all;
    this.loadNorma43Data(1);
    if(close) {
      this.normaFilterSidenav.close();
    }
  }

  clearNormaFilter() {
    this.newNormaFilter.search = '';
    this.newNormaFilter.all = {
      created_at: {0: null, 1: null},
      invoice_type: 'norma43'
    };
  }

  loadInvoicesData(page?) {
    this.loadingInvoices = true;
    page = page ? page : this.invoicesPagination.currentPage;
    this.accountingService.getAcctInvoices(page, this.id, this.invoicesFilter.toUrl())
      .subscribe((paginated: PaginationResponse) => {
        this.invoices = paginated.data.map(i => new AccountingUpload(i));
        this.invoicesPagination = this.invoicesPagination.reload(paginated);
        this.loadingInvoices = false;
      }, err => {
        console.error(err);
        this.alertService.alertError('Error');
        this.loadingInvoices = false;
      });
  }

  private createForm() {
    this.exactForm = new FormGroup({
      exact_code: new FormControl('', Validators.required),
    });
    this.trifactForm = new FormGroup({
      endpoint_email: new FormControl('', Validators.required),
    });
    this.moreConfigForm = new FormGroup({
      default_provider: new FormControl('', Validators.required),
    });
  }

  searchInvoices(close: boolean = false) {
    this.invoicesFilter.search = this.newInvoicesFilter.search;
    this.invoicesFilter.all = this.newInvoicesFilter.all;
    this.loadInvoicesData(1);
    if(close) {
      this.invoicesFilterSidenav.close();
    }
  }

  directFilterInvoices(field, value) {
    if(this.newInvoicesFilter.all[field] != value) {
      this.newInvoicesFilter.all[field] = value;
      this.invAdvFilter = true;
      this.loadInvoicesData(1);
    }
  }

  clearFilter() {
    this.newInvoicesFilter.search = '';
    this.newInvoicesFilter.all = {
      created_at: {0: null, 1: null},
      invoice_type: ['purchase','sale']
    };
  }

  openFile(id) {
    this.uploadUrl = null;
    let file: AccountingUpload = this.invoices.find((f: AccountingUpload) => f.id === id);
    if(file) {
      this.currentUpload = new AccountingUpload(file);
      this.uploadUrl = this.sanitizer.bypassSecurityTrustResourceUrl(env.baseEndPoint+'/download/'+this.currentUpload.upload.id+'/download');
      this.fileSidenav.open();
    }
  }

  closeFile() {
    this.currentUpload = null;
    this.uploadUrl = null;
    this.fileSidenav.close();
  }

  deleteFile(event, id) {
    let file = this.invoices.find((au: AccountingUpload) => au.id == id);
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

  parseFileSize(num, decimals, to) {
    return Helpers.parseFileSize(num, decimals, to);
  }

  download($event,au:AccountingUpload){
    $event.stopPropagation();
    this.accountingService.downloadFile(au);
  }

  loadConfData() {
      this.accountingService.getConfig(this.id).subscribe((config:[] )=>{
          config.forEach((provider:any)=>{
            if(provider.provider=='trifact'){
                this.trifactForm.controls['endpoint_email'].setValue(provider.config.endpoint_email);
            }else if(provider.provider=='exact'){
                this.exactForm.controls['exact_code'].setValue(provider.config.exact_code);
            }else if(provider.provider=='generic_conf'){
                this.moreConfigForm.controls['default_provider'].setValue(provider.config.default_provider);
            }
          });
      } , err => console.log(err));
  }

  saveConf(provider:string){
    let config = {};
    if(provider=='trifact'){config=this.trifactForm.getRawValue();}
    if(provider=='exact'){config=this.exactForm.getRawValue();}
    if(provider=='generic_conf'){config=this.moreConfigForm.getRawValue();}
    // if(provider=='generic_conf'){config=this.moreConfigForm.getRawValue())}
    let d = {provider:provider,config:config};
    this.accountingService.saveConfig(this.id,d).subscribe(d=>{
      this.loadConfData();
      this.alertService.genericSaved();
    },err=>console.log(err));

  }

  showComment($event,upload:AccountingUpload,mode:string){
    $event.stopPropagation();
    let m =this.dialog.open(DShowAcctUploadComponent,{width:'40%',height:'40%',data:{upload:upload,mode:mode}});

  }

}
