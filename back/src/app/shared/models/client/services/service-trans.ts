export class ServiceTrans {
  service_id: number;
  lang_id: number;
  name: string;
  description: string;
  locale: string;

  constructor(obj?) {
    if(obj) {
      this.service_id = obj.service_id;
      this.lang_id = obj.lang_id;
      this.name = obj.name;
      this.description = obj.description;
      this.locale = obj.locale;
    }
  }
}
