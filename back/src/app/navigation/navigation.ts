import { FuseNavigation } from '@fuse/types';
import {NavigationItem} from "../shared/models/navigation/navigation-item";
import {CanActivateClientGuard} from "../core/auth/guards/client.guard";
import {CanActivateAdminGuard} from "../core/auth/guards/admin.guard";
import {getExpressionLoweringTransformFactory} from "@angular/compiler-cli/src/transformers/lower_expressions";

export const navigation: NavigationItem[] = [
    new NavigationItem({
        id          : 'home.client',
        title       : 'home.client',
        translate   : 'nav.home',
        type        : 'item',
        url         : '/',
        exactMatch  : true,
        guard       : [
            CanActivateClientGuard,
        ]
    }),
    new NavigationItem({
        id          : 'home.admin',
        title       : 'home.admin',
        translate   : 'nav.home',
        type        : 'item',
        url         : '/admin',
        exactMatch  : true,
        guard       : [
            CanActivateAdminGuard,
        ]
    }),
    new NavigationItem({
        id          : 'client-sv',
        title       : 'Services',
        translate   : 'nav.client_services',
        type        : 'item',
        // icon        : 'mdi-briefcase',
        url         : '/client/services',
        exactMatch  : false,
        guard       : [
             CanActivateClientGuard,
        ]
        // children : [
        //     {
        //         id       : 'sample',
        //         title    : 'Sample',
        //         translate: 'NAV.SAMPLE.TITLE',
        //         type     : 'item',
        //         icon     : 'email',
        //         url      : '/sample',
        //         badge    : {
        //             title    : '25',
        //             translate: 'NAV.SAMPLE.BADGE',
        //             bg       : '#F44336',
        //             fg       : '#FFFFFF'
        //         }
        //     }
        // ]
    }),
    new NavigationItem({
        id          : 'admin.clients',
        title       : 'Clients',
        translate   : 'nav.admin.clients',
        type        : 'item',
        url         : '/admin/clients',
        exactMatch  : false,
        guard       : [
            CanActivateAdminGuard,
        ]
    }),
    new NavigationItem({
        id          : 'admin.translations',
        title       : 'admin.translations',
        translate   : 'Traducciones',
        type        : 'item',
        url         : '/admin/translations',
        // icon        : 'mdi-briefcase',
        exactMatch  : false,
        guard       : [
            CanActivateAdminGuard,
        ]

    }),



];
