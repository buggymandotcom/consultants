import {ServiceTrans} from "./service-trans";
import {UserService} from "../../../services/user.service";
import {Helpers} from "../../../helpers";

export class Service {
  id: number;
  name: string;
  color: string;
  route: string;
  translations: ServiceTrans[] = [];
  created_at: Date;

  constructor(obj?) {
    if(obj) {
      this.id = obj.id;
      this.name = obj.name;
      this.color = obj.color;
      this.route = obj.route;
      if(obj.translations && obj.translations.length > 0) {
        this.translations = obj.translations.map(t => new ServiceTrans(t));
      }
      this.created_at = Helpers.parseDate(obj.created_at);
    }
  }

  trans(): ServiceTrans {
    let lang = UserService.userLocal().lang;
    return this.translations.find((t: ServiceTrans) => t.locale === lang) || new ServiceTrans();
  }
}
