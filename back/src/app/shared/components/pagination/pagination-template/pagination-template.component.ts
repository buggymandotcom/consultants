import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {PaginationConfig} from "../pagination.model";

@Component({
  selector: 'ai-pagination-template',
  templateUrl: './pagination-template.component.html',
  styleUrls: ['./pagination-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AiPaginationTemplateComponent implements OnInit {

  constructor() { }
  @Input() pagination: PaginationConfig;
  @Input() disableNumbers: boolean = false;
  @Output() pageChange:EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }
  emitPage($event){
    this.pageChange.emit($event);
  }

}
