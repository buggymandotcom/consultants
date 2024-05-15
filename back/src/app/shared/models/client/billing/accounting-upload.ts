import {Upload} from "../../upload.model";
import {Helpers} from "../../../helpers";

export class AccountingUpload {
  id: number;
  upload: Upload;
  c_comment:string;
  c_comment_at:Date;
  invoice_type: 'purchase'|'sale';
  cancelled_at: Date;
  sent_at: Date;
  created_at: Date;
  blocks_at: Date;

  constructor(obj?) {
    if(obj) {
      this.id = obj.id;
      this.upload = new Upload(obj.upload);
      this.invoice_type = obj.invoice_type;
      this.c_comment = obj.c_comment;
      this.cancelled_at = Helpers.parseDate(obj.cancelled_at);
      this.sent_at = Helpers.parseDate(obj.sent_at);
      this.created_at = Helpers.parseDate(obj.created_at);
      this.c_comment_at = Helpers.parseDate(obj.c_comment_at);

      let blocks_at = new Date(this.created_at.getTime());
      blocks_at.setMinutes(blocks_at.getMinutes() + 2);
      this.blocks_at = blocks_at;
    }
  }

}
