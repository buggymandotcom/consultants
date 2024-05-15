import {
    AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnChanges, OnInit, Output, Renderer2,
    SimpleChanges, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {Filter} from "../pagination/filter.model";

@Component({
  selector: 'ai-custom-th',
  templateUrl: './custom-th.component.html',
  styleUrls: ['./custom-th.component.scss'],
})
export class CustomThComponent implements OnInit,AfterViewInit,OnChanges {


  constructor() { }
  @Input() filter:Filter;
  @Output() filterChange:EventEmitter<Filter> = new EventEmitter();
  @Output() sortChanged:EventEmitter<any> = new EventEmitter();
  @Input() sortField:string;
  status:string='initial'; //initial , asc , desc

  ngOnInit() {
    if(this.filter.sort && this.filter.sort.length == 2) {
      this.status = this.filter.sort[1];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
  }
  ngAfterViewInit(): void {

  }

  click(e){
    //Caso de ordenado
    if(this.sortField){
      this.nextStatus();
      this.status=='initial'? this.filter.sort=[]:this.filter.sort=[this.sortField,this.status];
      this.sortChanged.emit(true);
    }
  }

  nextStatus(){
    if(this.status=='initial'){
      this.status='asc';
    }else if(this.status=='asc'){
      this.status='desc';
    }else{
      this.status='initial';
    }
  }

}
