import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FuseNavVerticalItemComponent} from "../../../../../../../@fuse/components/navigation/vertical/item/item.component";
import {NavigationItem} from "../../../../../../shared/models/navigation/navigation-item";
import {FuseNavigationService} from "../../../../../../../@fuse/components/navigation/navigation.service";
import {Subject} from "rxjs";
import {AiNavigationService} from "../../navigation.service";

@Component({
    selector   : 'ai-nav-vertical-item',
    templateUrl: './item.component.html',
    styleUrls  : ['./item.component.scss']
})
export class AiNavVerticalItemComponent extends FuseNavVerticalItemComponent implements OnInit, OnDestroy
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
