export class PaginationResponse {
  current_page: number = 1;
  data: any[] = [];
  from: number = 0;
  last_page: number = 1;
  per_page: number = 20;
  to: number = 0;
  total: number = 0;
  constructor(obj?) {
    if (obj) {
      this.current_page = obj.current_page;
      this.data = obj.data;
      this.from = obj.from;
      this.last_page = obj.last_page;
      this.per_page = obj.per_page;
      this.to = obj.to;
      this.total = obj.total;
    }
  }
}
