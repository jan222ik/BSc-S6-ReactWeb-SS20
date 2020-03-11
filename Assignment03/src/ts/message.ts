import {Observable} from "./observable";

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
