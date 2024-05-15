import {Component, HostListener, OnInit} from '@angular/core';
import {Client} from "../../../../../../shared/models/client/client.model";
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../../../../../../shared/services/client.service";
import {User} from "../../../../../../core/auth/models/user.model";
import {AlertService} from "../../../../../../shared/alerts/services/alert.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-adm-client-info',
  templateUrl: './adm-client-info.component.html',
  styleUrls: ['./adm-client-info.component.scss']
})
export class AdmClientInfoComponent implements OnInit {

  client: Client;

  clientForm: FormGroup;
  showClientForm: boolean = false;
  passwordForm: FormGroup;
  bIsPwdVisible: boolean = false;
  bEnableClient: boolean;
  passChangedNotification : boolean = false;
  disableSendPass:boolean;


  isMd: boolean;
  isSm: boolean;
  isXs: boolean;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private alertService: AlertService,
  ) {
    this.isMd = window.innerWidth < 1500;
    this.isSm = window.innerWidth < 992;
    this.isXs = window.innerWidth < 768;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMd = event.target.innerWidth < 1500;
    this.isSm = event.target.innerWidth < 992;
    this.isXs = event.target.innerWidth < 768;
  }

  ngOnInit() {
    this.route.parent.parent.parent.params
      .subscribe(d => {
        this.clientService.get(d.id)
          .subscribe((client: Client) => {
            this.client = new Client(client);
            this.createForm();
            this.bEnableClient = !!this.client.status;
          }, err => {
            console.error(err);
            this.alertService.alertError('error.on_load_client');
          });
      });
  }

  private createForm() {
    this.clientForm = new FormGroup({
      firstname: new FormControl(this.client.firstname, Validators.required),
      lastname: new FormControl(this.client.lastname, Validators.required),
      email: new FormControl(this.client.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.client.phone, Validators.required),
    });
    this.passwordForm = new FormGroup({
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required),
      passChangedNotification: new FormControl(''),
    }, this.passwordMatchValidator);
  }


  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirm_password').value
      ? null : {'mismatch': true};
  }

  changeClientStatus() {

  }

  savePassword(){
      this.disableSendPass=true;
      this.clientService.savePassword(this.client,this.passwordForm.value['password'],
          this.passwordForm.value['passChangedNotification']).subscribe(d=>{
          this.passwordForm.reset();
          this.alertService.msg('msg.client.password_changed');
          this.disableSendPass=false;
      },err=>this.disableSendPass=false);
  }

  updateClient(){
      this.disableSendPass=true;
      let c  = new Client(Object.assign(this.clientForm.value,{id:this.client.id}));
      this.clientService.update(c).subscribe(d=>{
          this.alertService.msg('msg.client.updated');
          this.client=new Client(d);
          this.showClientForm=false;
      },(err:HttpErrorResponse)=>{
         if(err.status==422){
         let valErrors=err.error.errors;
         if(valErrors.hasOwnProperty('client.email')){
            //Email ya existente
            let strDuplicate="validation.email.already_exist_in_the_system";
            if(valErrors['client.email'].find(i=>i==strDuplicate)){
              this.clientForm.controls['email'].setErrors({duplicated:strDuplicate});
            }
          }else{
            this.alertService.alertError('error.on_create_client_validation');
          }
        }else{
          this.alertService.alertError('error.on_create_client');
        }
        //this.showClientForm=false;
      });
  }

}
