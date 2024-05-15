import {Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {AlertService} from "../../../../../shared/alerts/services/alert.service";
import {GroupTranslation} from "../../../../../core/trans/model/group_translation.model";


@Component({
  selector: 'ai-group-translations',
  templateUrl: './group-translations.component.html',
  styleUrls: ['./group-translations.component.scss']
})
export class GroupTranslationsComponent implements OnInit {

  constructor(private alertService:AlertService) { }

  @Output() updateGroupTrans$: EventEmitter<any> = new EventEmitter();
  @Output() deleteTrans$: EventEmitter<any> = new EventEmitter();
  @Input()  group:GroupTranslation;
  @Input()  open:boolean;
  @Input()  toggle:boolean;
  public name;
  public translations;


  ngOnInit() {
  }

  updateGroupTrans(){
      this.updateGroupTrans$.emit(this.group);
  }
  deleteTrans(trans){
      this.deleteTrans$.emit(trans);
  }
  toogleOpen(){
    if(this.open==true){
      this.open=false;
    }else{
      this.open=true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.toggle){
      this.open=changes.toggle.currentValue;
    }
  }

  addToClipboard(keyEl:ElementRef){
    let Copied = keyEl.nativeElement.createRange();
    Copied.execCommand('Copy');
  }

  showCopied(){
    this.alertService.msg('Copiado',2000);
  }



}
