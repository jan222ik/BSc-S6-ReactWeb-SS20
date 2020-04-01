import { uuid } from "uuidv4";

/**
 * Message data class.
 * @field msgTitle defines the title of the message.
 * @field msgBody defines the body of the message/
 * @field msgRead defines an Observable of the read state.
 */
class Message {
    msgTitle: string;
    msgBody: string;
    msgRead: boolean;
    uuid: string;

    constructor(msgTitle: string, msgBody: string, msgRead: boolean) {
        this.msgTitle = msgTitle;
        this.msgBody = msgBody;
        this.msgRead = msgRead;
        this.uuid = uuid();
    }
}

export {Message};
