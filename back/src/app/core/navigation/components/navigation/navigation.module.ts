import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatRippleModule } from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';

import { AiNavigationComponent } from './navigation.component';
import { AiNavVerticalItemComponent } from './vertical/item/item.component';
import { AiNavVerticalCollapsableComponent } from './vertical/collapsable/collapsable.component';
import { AiNavVerticalGroupComponent } from './vertical/group/group.component';
import { AiNavHorizontalItemComponent } from './horizontal/item/item.component';
import { AiNavHorizontalCollapsableComponent } from './horizontal/collapsable/collapsable.component';

@NgModule({
    imports     : [
        CommonModule,
        RouterModule,

        MatIconModule,
        MatRippleModule,

        TranslateModule.forChild()
    ],
    exports     : [
        AiNavigationComponent
    ],
    declarations: [
        AiNavigationComponent,
        AiNavVerticalItemComponent,
        AiNavVerticalCollapsableComponent,
        AiNavVerticalGroupComponent,
        AiNavHorizontalItemComponent,
        AiNavHorizontalCollapsableComponent,
    ]
})
export class AiNavigationModule
{
}
