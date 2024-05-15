import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';

import {FuseNavVerticalGroupComponent} from "../../../../../../../@fuse/components/navigation/vertical/group/group.component";
import {NavigationItem} from "../../../../../../shared/models/navigation/navigation-item";
import {FuseNavigationService} from "../../../../../../../@fuse/components/navigation/navigation.service";
import {AiNavigationService} from "../../navigation.service";
import {Subject} from "rxjs";

@Component({
    selector   : 'ai-nav-vertical-group',
    templateUrl: './group.component.html',
    styleUrls  : ['./group.component.scss']
})
export class AiNavVerticalGroupComponent extends FuseNavVerticalGroupComponent implements OnInit, OnDestroy
{

    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    constructor(
      _changeDetectorRef: ChangeDetectorRef,
      _fuseNavigationService: AiNavigationService
    )
    {
        super(_changeDetectorRef,_fuseNavigationService);
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
