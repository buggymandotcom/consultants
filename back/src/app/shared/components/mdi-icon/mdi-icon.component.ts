import {Component, ElementRef, Inject, Input, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {element} from "protractor";

@Component({
  selector: 'mdi-icon',
  templateUrl: './mdi-icon.component.html',
  styleUrls: ['./mdi-icon.component.scss'],
  host: {
    '[class.mat-icon]': 'true',
  },
})
export class MdiIconComponent implements OnInit {


  constructor(private _ref: ElementRef) { }
  @Input () fontSize:number;
  ngOnInit() {
    if(this.fontSize) {
      this._ref.nativeElement.style.fontSize = this.fontSize+'px';
    }
  }

}
