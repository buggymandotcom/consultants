import {CliComMessage} from './cli-com-message';
import {Helpers} from '../../../helpers';

export class CliComIssue {
    id: number;
    client_id: number;
    company_id: number;
    subject: string;
    status: number;
    unreadCount: number;
    messages: CliComMessage[] = [];
    created_at: Date;
    updated_at: Date;

    constructor(obj?) {
        if (obj) {
            this.id = obj.id;
            this.client_id = obj.client_id;
            this.company_id = obj.company_id;
            this.subject = obj.subject;
            this.status = obj.status;
            this.unreadCount = obj.unreadCount;
            if (obj.messages && obj.messages.length > 0) {
                this.messages = obj.messages.map(m => new CliComMessage(m));
            }
            this.created_at = Helpers.parseDate(obj.created_at);
            this.updated_at = Helpers.parseDate(obj.updated_at);
        }
    }

    statusIcon(): string {
        switch (this.status) {
            case 1:
                return 'progress-wrench';
            case 2:
                return 'check-circle-outline';
            default:
                return;
        }
    }

    statusColor(): string {
        switch (this.status) {
            case 1:
                return '#ff9800';
            case 2:
                return '#4caf50';
            default:
                return;
        }
    }
}
