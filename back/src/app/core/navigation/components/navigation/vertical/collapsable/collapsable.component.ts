import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import {FuseNavVerticalCollapsableComponent} from "../../../../../../../@fuse/components/navigation/vertical/collapsable/collapsable.component";
import {fuseAnimations} from "../../../../../../../@fuse/animations";
import {NavigationItem} from "../../../../../../shared/models/navigation/navigation-item";
import {FuseNavigationService} from "../../../../../../../@fuse/components/navigation/navigation.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {AiNavigationService} from "../../navigation.service";

@Component({
    selector   : 'ai-nav-vertical-collapsable',
    templateUrl: './collapsable.component.html',
    styleUrls  : ['./collapsable.component.scss'],
    animations : fuseAnimations
})
export class AiNavVerticalCollapsableComponent extends FuseNavVerticalCollapsableComponent implements OnInit, OnDestroy
{
    /**
     * Constructor
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {Router} _router
     */
    constructor(
      _changeDetectorRef: ChangeDetectorRef,
      _fuseNavigationService: AiNavigationService,
      _router: Router
    )
    {
        super(_changeDetectorRef,_fuseNavigationService,_router);
    }

    @Input()
    item: NavigationItem;

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
    ngOnInit(): void {
        super.ngOnInit();
    }

}
