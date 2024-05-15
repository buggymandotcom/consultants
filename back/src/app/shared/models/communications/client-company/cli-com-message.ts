import {Helpers} from '../../../helpers';
import {CommunicationMessageSender} from '../communication-message-sender';

export class CliComMessage {
    id: number;
    issue_id: number;
    client_id: number;
    company_id: number;
    senderType: string;
    sender: CommunicationMessageSender;
    message: string;
    read: boolean;
    created_at: Date;
    updated_at: Date;

    constructor(obj?) {
        if (obj) {
            this.id = obj.id;
            this.issue_id = obj.issue_id;
            this.client_id = obj.client_id;
            this.company_id = obj.company_id;
            this.senderType = obj.senderType;
            if (obj.sender) {
                this.sender = new CommunicationMessageSender(obj.sender);
            }
            this.message = obj.message;
            this.read = obj.read;
            this.created_at = Helpers.parseDate(obj.created_at);
            this.updated_at = Helpers.parseDate(obj.updated_at);
        }
    }
}
