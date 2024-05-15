import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {FuseNavigationComponent} from "../../../../../@fuse/components/navigation/navigation.component";
import {AiNavigationService} from "./navigation.service";


@Component({
    selector       : 'ai-navigation',
    templateUrl    : './navigation.component.html',
    styleUrls      : ['./navigation.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AiNavigationComponent extends FuseNavigationComponent implements OnInit
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

    ngOnInit(): void {
        super.ngOnInit();
    }
}
