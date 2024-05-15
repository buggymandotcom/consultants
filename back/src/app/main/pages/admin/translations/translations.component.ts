import {Component, ElementRef, OnInit} from '@angular/core';
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/debounceTime';
import {AlertService} from "../../../../shared/alerts/services/alert.service";
import {GroupTranslation} from "../../../../core/trans/model/group_translation.model";
import {Translation} from "../../../../core/trans/model/translation.model";
import {AireTransHttpService} from "./aire-trans-http.service";
import {DefaultLangChangeEvent, TranslateService} from '@ngx-translate/core';
import {FoundationsService} from "../../../../shared/services/foundations.service";
import {AireFileUploader} from "../../../../shared/uploads/airefileuploader";
import {env} from "../../../../../environments/env";



@Component({
  selector: 'ai-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.scss'],
  host: {
    //'[@fadeInAnimation]': 'true'
  },
  // animations: [ fadeInAnimation ]
})
export class TranslationsComponent implements OnInit {
  step: number = null;


  constructor(private transHttp:AireTransHttpService,
              private alertService:AlertService,
              private translationService:TranslateService,
              private foundationsService:FoundationsService

  ) {
   // trans.current().subscribe(lang=>this.currentLang=lang);

    this.searchModelChanged
        //.debounceTime(400) // wait 300ms after the last event before emitting last event
        //.distinctUntilChanged() // only emit if value is different from previous value
        .subscribe(model => {
          this.search()
        });
  }

  public newTranslation:Translation = new Translation();

  public translationAll:GroupTranslation[];
  public currentLang:string='es';
  public term:string;
  public searchModelChanged: Subject<string> = new Subject<string>();
  public countTranslations=0;

  public uploader:AireFileUploader;

  public toggle:boolean=false;

  ngOnInit() {
    this.uploader = new AireFileUploader({url:env.baseEndPoint+'/translation/upload-translations',autoUpload:true},{});
    this.uploader.options.filters = [];

    this.transHttp.allObj(this.currentLang).subscribe(d=>{
      this.translationAll=d;
      this.countTrans(d);
      //console.log(d);
    },error2 => console.log(error2));
    //Actualizamos cuando cambiamos de idioma
    // this.trans.current().subscribe(d=>{
    //   this.reloadTrans();
    // });
    console.log(this.translationService.currentLang);
    this.currentLang=this.translationService.currentLang?this.translationService.currentLang:'es';

    //Detectamos el cambio de idioma para obtener las traducciones
    this.translationService.onDefaultLangChange.subscribe(d=>{
      this.currentLang=d.lang;
      this.reloadTrans();
    })


  }

  newTrans(){
    // this.loaderService.set(true);
    let newTrans =  this.newTranslation;
    newTrans.lang=this.currentLang;

    this.transHttp.create(newTrans).subscribe(
      res => {
        this.reloadTrans();
        this.alertService.msg(newTrans.key+': '+this.translationService.instant('app.saved'),1500);
        // this.trans.use(newTrans.lang);
        this.resetInputs();
        // this.loaderService.set(false);
      },err =>  {
        //console.log(err);
        // this.loaderService.set(false);
      }
    );

  }

  updateGroupTrans(group:GroupTranslation){
    // this.loaderService.set(true);
    this.transHttp.update(group).subscribe(d=>{
      // this.loaderService.set(false);
      this.alertService.msg(this.translationService.instant('app.saved'),1500);
      this.reloadTrans();
    },err => {
      console.log(err);
    });
  }

  deleteTrans(trans){
   // this.loaderService.set(true);
   this.transHttp.delete(trans.id).subscribe(d=>{
     // this.loaderService.set(false);
     this.alertService.msg(this.translationService.instant('app.saved'),1500);
     this.reloadTrans();
   },err=>{
     console.log(err);
   });
  }

  reloadTrans(){
    this.transHttp.allObj(this.currentLang).subscribe(d=>{
      this.translationAll=d;
      this.countTrans(this.translationAll);
    });
    this.translationService.reloadLang(this.currentLang).subscribe(d=>{
       this.translationService.use(this.currentLang);
    });
  }

  search(){
    // this.loaderService.set(true);
    this.transHttp.allObj(this.currentLang,this.term).subscribe(d=>{
      this.translationAll=d;
      this.countTrans(d);
      // this.loaderService.set(false);
      if(this.term!=''){
        this.toggle=false;
      }
    });
  }
  toggleExpand(){
    if (this.toggle==true){
      this.toggle=false;
    }else{
      this.toggle=true;
    }
  }

  resetInputs(){
    this.newTranslation.key='';
    this.newTranslation.text='';
    document.getElementById("key-trans").focus();
  }

  searchChanged(text: string) {
    this.searchModelChanged.next(text);
  }

  countTrans(groups : GroupTranslation[]){
    let count = 0;
    groups.forEach(g=>{
      count +=g.translations.length;
    });
    this.countTranslations=count;
  }

  setStep(index) {
    this.step = index;
  }

  downloadExcel(){
    this.foundationsService.downloadTransExcel();
  }

  handleSuccessUploaded(){
    this.alertService.msg('Se han subido correctamente las traducciones');
    this.reloadTrans();
  }

  handleErrorUploaded($event){
    this.alertService.msg('Se produjo un error');
    console.log($event);
  }


}
