import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../../../../../../shared/services/client.service";
import {AlertService} from "../../../../../../shared/alerts/services/alert.service";
import {Service} from "../../../../../../shared/models/client/services/service";
import {MatSidenav} from "@angular/material";

@Component({
  selector: 'app-adm-client-services',
  templateUrl: './adm-client-services.component.html',
  styleUrls: ['./adm-client-services.component.scss']
})

export class AdmClientServicesComponent implements OnInit {

  id: number;
  servicesHired: Service[] = [];
  servicesAvailable: Service[] = [];

  @ViewChild('svAvailableSidenav') svAvailableSidenav: MatSidenav;

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

  ngOnInit(): void {

    this.route.parent.parent.parent.params
      .subscribe(d => {
        this.id = d.id;
        this.loadServices(this.id);
      }, err => {
        console.error(err);
      });
  }

  addService(service: number) {
    this.clientService.addService(this.id, service)
      .subscribe(d => {
          this.loadServices(this.id);
          this.alertService.msg('msg.client.service.hired');
          this.svAvailableSidenav.close();

      }, err => {
        console.log(err);
        if(err.status==400){
          this.alertService.alertError(err.error);
        }else{
          this.alertService.alertError('error.on_adding_service_to_client');
        }

      })
  }

  removeService(service_id, $event){
      $event.stopPropagation();
    this.alertService.msg('Todavía no elimino servicios');

    // /* TODO provisional, de momento solo se puede elimnar el servicio de modelos */
    // if(service_id != 1) {
    //
    //   this.alertService.confirmation('service.desactivate.question').componentInstance.confirmed.subscribe(res => {
    //     if (res) {
    //       this.clientService.deleteService(this.id, service_id).subscribe(d => {
    //         this.alertService.msg('El servicio fue eliminado');
    //       })
    //     }
    //   })
    //
    // } else this.alertService.msg('No es posible elminar este servicio todavía');
  }


  loadServices(client:number){
    //Contradatos/Asociados
    this.clientService.servicesHired(client)
          .subscribe((services: Service[]) => {
            this.servicesHired = services.map(s => new Service(s));

          }, err => {
            console.error(err);
            this.alertService.alertError('error.on_loading_services_hired');
    });

    this.clientService.servicesAvailable(client)
          .subscribe((services: Service[]) => {
            this.servicesAvailable = services.map(s => new Service(s));
          }, err => {
            console.error(err);
            this.alertService.alertError('error.on_loading_services_availables');
    });


  }
}
