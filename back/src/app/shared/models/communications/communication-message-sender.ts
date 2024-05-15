export class CommunicationMessageSender {
    id: number;
    name: string;

    constructor(obj?) {
        if (obj) {
            this.id = obj.id;
            this.name = obj.name;
        }
    }
}
