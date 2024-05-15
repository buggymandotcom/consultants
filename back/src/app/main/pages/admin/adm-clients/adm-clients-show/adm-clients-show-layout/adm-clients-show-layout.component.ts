import { Component, OnInit } from '@angular/core';
import {Client} from "../../../../../../shared/models/client/client.model";
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../../../../../../shared/services/client.service";
import {AlertService} from "../../../../../../shared/alerts/services/alert.service";
import {Service} from "../../../../../../shared/models/client/services/service";



@Component({
  selector: 'app-adm-clients-show-layout',
  templateUrl: './adm-clients-show-layout.component.html',
  styleUrls: ['./adm-clients-show-layout.component.scss']
})
export class AdmClientsShowLayoutComponent implements OnInit {
  id: number;
  client: Client;
  servicesHired:Service[]=[];

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.route.parent.params
      .subscribe(d => {
        this.id = d.id;
        this.clientService.get(this.id)
          .subscribe((client: Client) => {
            this.client = new Client(client);
            this.clientService
                .servicesHired(this.client.id).subscribe(d=>this.servicesHired = d.map(s => new Service(s)),
                    err=>this.alertService.msg('error.on_loading_services_hired'));

          }, err => {
            console.error(err);
            this.alertService.alertError('error.on_load_client');
          });
      });
  }

}
