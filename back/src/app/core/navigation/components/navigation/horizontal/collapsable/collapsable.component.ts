import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';

import {FuseNavHorizontalCollapsableComponent} from "../../../../../../../@fuse/components/navigation/horizontal/collapsable/collapsable.component";
import {fuseAnimations} from "../../../../../../../@fuse/animations";

@Component({
    selector   : 'ai-nav-horizontal-collapsable',
    templateUrl: './collapsable.component.html',
    styleUrls  : ['./collapsable.component.scss'],
    animations : fuseAnimations
})
export class AiNavHorizontalCollapsableComponent extends FuseNavHorizontalCollapsableComponent implements OnInit, OnDestroy
{

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
    ngOnInit(): void {
        super.ngOnInit();
    }
}
