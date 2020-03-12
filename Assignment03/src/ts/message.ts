import {Observable} from "./observable";

/**
 * Message data class.
 * @field msgTitle defines the title of the message.
 * @field msgBody defines the body of the message/
 * @field msgRead defines an Observable of the read state.
 */
class Message {
    msgTitle: string;
    msgBody: string;
    msgRead: Observable<boolean>;

    constructor(msgTitle: string, msgBody: string, onReadStateUpdate: (value: boolean, oldValue: boolean) => void) {
        this.msgTitle = msgTitle;
        this.msgBody = msgBody;
        this.msgRead = new Observable<boolean>(false);
        this.msgRead.createObserver(onReadStateUpdate);
    }
}

export {Message};
