import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {AlertService} from "../../../../../shared/alerts/services/alert.service";
import {ClientService} from "../../../../../shared/services/client.service";
import {Client} from "../../../../../shared/models/client/client.model";
import {PaginationConfig} from "../../../../../shared/components/pagination/pagination.model";
import {Filter} from "../../../../../shared/components/pagination/filter.model";
import {PaginationResponse} from "../../../../../shared/models/pagination-response.model";
import {MatSidenav} from "@angular/material";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../../core/auth/models/user.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-adm-clients-dashboard',
  templateUrl: './adm-clients-dashboard.component.html',
  styleUrls: ['./adm-clients-dashboard.component.scss']
})
export class AdmClientsDashboardComponent implements OnInit {

  clients:Client[]=[];
  loading: boolean = true;

  /* Buscador de clientes */
  clientsList:Client[]=[];
  searchClient: string = '';
  searchForClient: number;

  paginationConfig: PaginationConfig = new PaginationConfig();
  filter: Filter = new Filter({
    sort: ['id','desc'],
    per_page : 12,
    all: {
        invoice_type: null,
    }
  });

  clientForm: FormGroup;

  @ViewChild('createUserSidenav') createUserSidenav: MatSidenav;

  isMd: boolean;
  isSm: boolean;
  isXs: boolean;

  constructor(
    private alertService:AlertService,
    private clientService:ClientService,
    private router : Router
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

        /* Load client list */
        this.clientService.list().subscribe((clients: Client[]) => {
            this.clientsList = clients;
            this.loading = false;
        });

        this.loadData(1);
        this.createForm();
    }

  private createForm() {
    this.clientForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
    });
  }

  loadData(page?) {
    //LLamada al servicio de clients
    let options = this.filter.toUrl();
    options['search_id'] = this.searchForClient ? this.searchForClient : null;
    this.clientService.index(page,options)
      .subscribe((paginated: PaginationResponse) => {
        this.clients = paginated.data.map(i => new Client(i));
        this.paginationConfig = this.paginationConfig.reload(paginated);
      }, err => {
        console.error(err);
        this.alertService.alertError('Error');
      });
  }

  createClient() {
    let client = new Client(this.clientForm.value);
    this.clientService.create(client)
      .subscribe(d => {
        this.clientForm.reset();
        this.alertService.msg('msg.client_created');
        this.router.navigate(['/admin/clients/'+(d as any).id+'/information']);
        this.createUserSidenav.close();
      }, (err:HttpErrorResponse) => {
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

      });
  }

    setClient($event) {
        if($event && $event.option && $event.option.value && $event.option.value.id) {
            this.searchForClient = $event.option.value.id;
            this.loadData(1);
        }
    }

    displayClientName(client?: Client) : string | undefined {
        return client ? client.firstname+' '+client.lastname : undefined;
    }

    filteredClients(): Client[] {
        return this.clientsList.filter((client: Client) => client.firstname ? client.firstname.toLowerCase().indexOf(this.searchClient) >= 0 : '');
    }

    searchForClientReset(){
      this.searchForClient = null;
      this.searchClient = '';
      this.loadData(1);
    }
}
