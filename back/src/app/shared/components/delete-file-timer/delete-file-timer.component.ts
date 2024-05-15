import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TimeInterval} from "rxjs";

@Component({
  selector: 'ai-delete-file-timer',
  templateUrl: './delete-file-timer.component.html',
  styleUrls: ['./delete-file-timer.component.scss']
})
export class DeleteFileTimerComponent implements OnInit, OnDestroy {

  @Input('time') time: Date;
  // minutes: number;
  // seconds: number;
  // interval: any;
  start: boolean = false;

  @Output('requestDelete') requestDelete: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.start = true;
    /*let tempTime = new Date();
    if(this.time.getTime() > tempTime.getTime()) {
      this.minutes = Math.floor(this.getDiff() / 60);
      this.seconds = this.getDiff() % 60;
      this.interval = setInterval(() => {
        this.counter++;

        if(this.seconds == 0) {
          this.seconds = 59;
          this.minutes--;
        } else {
          this.seconds--;
        }
        if(this.seconds == 0 && this.minutes == 0) {
          clearInterval(this.interval);
        }
      }, 1000);
      this.start = true;
    }*/
  }

  ngOnDestroy(): void {
    // clearInterval(this.interval);
  }

  get diff() {
    let time = new Date();
    return Math.ceil((this.time.getTime() - time.getTime()) / 1000);
  }

  deleteFile($event) {
    $event.stopPropagation();
    this.requestDelete.next(true);
  }

}
