import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ThumParams} from "./thum-params.model";


@Component({
  selector: 'ai-thum',
  templateUrl: './thum.component.html',
  styleUrls: ['./thum.component.scss']
})
export class ThumComponent implements OnInit {

  @Input() file : File;
  @Input() params : ThumParams;
  @ViewChild('canvas') canvas : ElementRef;
  constructor() { }

  ngOnInit() {
    //this.canvas.attr({ width: 120, height: 120 });

    let reader = new FileReader();
    let canvasObj = this.canvas;
    let paramsObj = this.params;

    reader.onload = onLoadFile;
    reader.readAsDataURL(this.file);

    function onLoadFile(event) {
      let img = new Image();
      img.onload = onLoadImage;
      img.src = event.target.result;
    }

    function onLoadImage() {

      //canvasObj.nativeElement.attr({ width: 150, height: 150 });
      canvasObj.nativeElement.getContext('2d').drawImage(this, 0, 0,paramsObj.width, paramsObj.height);
    }

    //this.canvas.nativeElement.getContext('2d').drawImage(i, 0, 0, 120, 120);
  }

}
