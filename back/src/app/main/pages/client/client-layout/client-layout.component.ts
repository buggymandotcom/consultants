import { Component, OnInit } from '@angular/core';
import {FuseConfigService} from "../../../../../@fuse/services/config.service";
import {MatDialog} from '@angular/material/dialog';
import {DClientCommunicationsComponent} from './d-client-communications/d-client-communications.component';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss']
})
export class ClientLayoutComponent implements OnInit {

  constructor(
    private fuseConfig: FuseConfigService,
    private dialog: MatDialog
  ) {
    const config = {
      colorTheme      : 'theme-default',
      customScrollbars: true,
      layout          : {
        style    : 'horizontal-layout-1',
        width    : 'fullwidth',
        navbar   : {
          primaryBackground  : 'fuse-navy-700',
          secondaryBackground: 'fuse-navy-900',
          folded             : false,
          hidden             : false,
          position           : 'top',
          variant            : 'horizontal-style-1'
        },
        toolbar  : {
          customBackgroundColor: false,
          background           : 'fuse-white-500',
          hidden               : false,
          position             : 'above'
        },
        footer   : {
          customBackgroundColor: true,
          background           : 'fuse-navy-900',
          hidden               : false,
          position             : 'below-fixed'
        },
        sidepanel: {
          hidden  : false,
          position: 'right'
        }
      }
    };
    this.fuseConfig.setDefaultConfig(config);
    this.fuseConfig.config = config;
  }

  ngOnInit(): void {
  }

  openHelp(): void {
      this.dialog.open(DClientCommunicationsComponent, {
          width: '100%', maxWidth: '1200px',
          height: '800px', maxHeight: '100%',
          id: 'client-help-modal', panelClass: 'client-help-modal',
          closeOnNavigation: true,
      });
  }

}
