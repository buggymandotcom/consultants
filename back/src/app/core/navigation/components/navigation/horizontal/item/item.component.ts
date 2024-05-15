import { Component, HostBinding, Input } from '@angular/core';
import {FuseNavHorizontalItemComponent} from "../../../../../../../@fuse/components/navigation/horizontal/item/item.component";

@Component({
    selector   : 'ai-nav-horizontal-item',
    templateUrl: './item.component.html',
    styleUrls  : ['./item.component.scss']
})
export class AiNavHorizontalItemComponent extends FuseNavHorizontalItemComponent
{
}
