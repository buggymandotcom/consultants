import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public OpenDialogs: MatDialogRef<any>[];

  constructor() {
  }

  public SetState(_state: StateService) {
    this.OpenDialogs = _state.OpenDialogs;
  }
}