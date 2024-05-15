import {FuseNavigationItem} from "../../../../@fuse/types";
import {CanActivate} from "@angular/router";

export class NavigationItem implements FuseNavigationItem {
  id: string;
  title: string;
  type: 'item' | 'group' | 'collapsable';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  externalUrl?: boolean;
  openInNewTab?: boolean;
  function?: any;
  badge?: {
    title?: string;
    translate?: string;
    bg?: string;
    fg?: string;
  };
  children?: NavigationItem[] = [];
  // guard?: string[] = [];
  guard?: any[] = [];

  constructor(obj?) {
    if(obj) {
      this.id = obj.id;
      this.title = obj.title;
      this.type = obj.type;
      obj.translate ? this.translate = obj.translate : null;
      obj.icon ? this.icon = obj.icon : null;
      obj.hidden ? this.hidden = obj.hidden : null;
      obj.url ? this.url = obj.url : null;
      obj.classes ? this.classes = obj.classes : null;
      obj.exactMatch ? this.exactMatch = obj.exactMatch : null;
      obj.externalUrl ? this.externalUrl = obj.externalUrl : null;
      obj.openInNewTab ? this.openInNewTab = obj.openInNewTab : null;
      if(obj.badge) {
        this.badge = {
          title: obj.badge.title,
          translate: obj.badge.translate,
          bg: obj.badge.bg,
          fg: obj.badge.fg,
        }
      }
      if(obj.children && obj.children.length > 0) {
        this.children = obj.children.map(c => new NavigationItem(c));
      }
      if(obj.guard && obj.guard.length > 0) {
        this.guard = obj.guard;
        this.checkAccess();
      }
    }
  }

  checkAccess() {
    this.hidden = this.guard.length > 0 && !this.guard.some((g) => {
      let guard = new g;
      return guard.canShow();
    });
  }
}
