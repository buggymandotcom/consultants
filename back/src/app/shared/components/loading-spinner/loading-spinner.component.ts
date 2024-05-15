import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ai-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  @Input() mode: string = 'center';
  constructor() { }

  ngOnInit() {
    if (this.mode != 'center' && this.mode != 'inline'){
      this.mode = 'center';
      console.error('Ese modo para el spinner no está disponible.');
    }
  }

}
