import { Injectable } from '@angular/core';
import {FuseNavigationService} from "../../../../../@fuse/components/navigation/navigation.service";
import {NavigationItem} from "../../../../shared/models/navigation/navigation-item";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AiNavigationService extends FuseNavigationService
{
    protected _registry: { [key: string]: NavigationItem } = {};

    /**
     * Get flattened navigation array
     *
     * @param navigation
     * @param flatNavigation
     * @returns {any[]}
     */
    getFlatNavigation(navigation, flatNavigation: NavigationItem[] = []): any
    {
        for ( const item of navigation )
        {
            if ( item.type === 'item' )
            {
                flatNavigation.push(item);

                continue;
            }

            if ( item.type === 'collapsable' || item.type === 'group' )
            {
                if ( item.children )
                {
                    this.getFlatNavigation(item.children, flatNavigation);
                }
            }
        }

        return flatNavigation;
    }

    /**
     * Get navigation from registry by key
     *
     * @param key
     * @returns {any}
     */
    getNavigation(key): any
    {
        // Check if the navigation exists
        if ( !this._registry[key] )
        {
            console.warn(`The navigation with the key '${key}' doesn't exist in the registry.`);

            return;
        }

        Object.keys(this._registry[key]).forEach(k => {
            this._registry[key][k].checkAccess();
        });
        // Return the sidebar
        return this._registry[key];
    }
}
