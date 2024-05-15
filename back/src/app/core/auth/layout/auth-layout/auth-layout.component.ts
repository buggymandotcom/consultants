import { Component, OnInit } from '@angular/core';
import {FuseConfigService} from '../../../../../@fuse/services/config.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {
  constructor(
      private fuseConfig: FuseConfigService
  ) {
    const config = {
      layout     : {
          style: 'vertical-layout-1',
          width: 'fullwidth',
          navbar: {
              primaryBackground: 'fuse-navy-700',
              secondaryBackground: 'fuse-navy-900',
              folded: false,
              hidden: true,
              position: 'left',
              variant: 'vertical-style-1'
          },
          toolbar: {
              customBackgroundColor: false,
              background: 'fuse-white-500',
              hidden: true,
              position: 'below-static'
          },
          footer: {
              customBackgroundColor: true,
              background: 'fuse-navy-900',
              hidden: true,
              position: 'below-fixed'
          },
          sidepanel: {
              hidden: true,
              position: 'right'
          }
      }
    };
    this.fuseConfig.setDefaultConfig(config);
    this.fuseConfig.config = config;
  }

  ngOnInit() {
  }

}
