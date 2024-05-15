import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AccountingService} from "../../services/accounting.service";
import {AlertService} from "../../alerts/services/alert.service";


@Component({
  selector: 'ai-d-select-device',
  templateUrl: './d-show-acct-upload.component.html',
  styleUrls: ['./d-show-acct-upload.component.scss']
})
export class DShowAcctUploadComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DShowAcctUploadComponent> ,
              @Inject(MAT_DIALOG_DATA) public data:any,private accountingService:AccountingService,private alertService:AlertService
  ){
    // if(this.data){
    //   this.devsSelected=this.data.initSelected;
    // }
  }
  public newComment:string;
  // public devices:DevSystem[]=[];
  // public devsSelected:any=[];
  // public searchterm:string;
  // private selected$:Subject<DevSystem[]>=new Subject();
  // public selected:Observable<DevSystem[]>=this.selected$.asObservable();
  // public loading:Boolean=false;
  ngOnInit() {
  }

  saveComment(){
      this.accountingService.saveComment(this.data.upload,this.newComment).subscribe(d=>{
        this.dialogRef.close();
        this.alertService.msg('app.saved');
      },err=>console.log(err))
  }

}
