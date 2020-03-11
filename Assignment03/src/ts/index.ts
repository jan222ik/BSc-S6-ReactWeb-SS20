import '../styles/main.scss'

import {Observable} from './observable'
import {Message} from './message'

const PLUS_NOTATION_MIN = 5;
const messages: Observable<Array<Message>> = new Observable(new Array<Message>());
let messageCount: Observable<number>;

function readStateChange(isRead: boolean, oldValue: boolean): void {
    if (messageCount && isRead != oldValue) {
        if (isRead) {
            messageCount.update(messageCount.value - 1)
        } else {
            messageCount.update(messageCount.value + 1)
        }
    }
}

// noinspection JSUnusedGlobalSymbols
const demo = function (size = 10): void {
    console.log("Create DemoData");
    const arr = new Array<Message>(0);
    for (let i = 0; i < size; i++) {
        const msg = new Message("Msg " + i, "Msg Body " + i, readStateChange);
        arr.push(msg);
    }
    messages.update(arr);
};

function updateNavigationMsgCountLabel(number: number): void {
    const msgLabel = document.getElementById("newMsgLabel");
    const textNumber: string = (number > PLUS_NOTATION_MIN) ? "5+" : number.toString();
    msgLabel.textContent = (number < 1) ? "" : `(${textNumber} new)`;
}

function updateCorrectTotalsHeading(): void {
    document.getElementById('totalMessages').textContent = `You have ${messageCount.value} unread messages out of ${messages.value.length} messages.`
}

function createMessageLayoutElement(msg: Message): HTMLDivElement {
    const div = document.createElement('div');
    div.className = "msg" + ((msg.msgRead.value) ? "" : " unread");
    div.addEventListener('click', () => {
        console.log('Clicked');
        msg.msgRead.update(!msg.msgRead.value);
        div.className = "msg" + ((msg.msgRead.value) ? "" : " unread");
    });
    const title = document.createElement("h3");
    title.textContent = msg.msgTitle;
    const body = document.createElement('p');
    body.textContent = msg.msgBody;
    div.append(title, body);
    return div;
}

function renderMessages(): void {
    const container = document.getElementById('message-overview-container');
    container.innerHTML = '';
    messages.value.forEach(item => container.append(createMessageLayoutElement(item)));
}

function setupDataStore(): void {
    messageCount = new Observable(messages.value.filter(value => value.msgRead.value != true).length);
    messageCount.createObserver(function (value: number) {
        updateNavigationMsgCountLabel(value);
        updateCorrectTotalsHeading();
    });
    updateNavigationMsgCountLabel(messageCount.value);
    messages.createObserver(() => renderMessages());
    updateCorrectTotalsHeading();
    renderMessages();
}

function setupFormListeners(): void {
    document.getElementById('composeForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const form = document.getElementById('composeForm') as HTMLFormElement;
        const formData = new FormData(form);
        const msgTitle = formData.get('msgtitle') as string;
        const msgBody = formData.get('msgbody') as string;
        const msg = new Message(msgTitle, msgBody, readStateChange);
        messageCount.update(messageCount.value + 1);
        messages.value.push(msg);
        messages.notifyObservers(null);
        form.reset();
    })
}

function setupNavigationListener(): void {
    const switchView = function (toComposeMessage: boolean): void {
        const overviewContainer = document.getElementById('message-overview-layout');
        const composeContainer = document.getElementById('message-compose-container');
        if (toComposeMessage) {
            composeContainer.className = '';
            overviewContainer.className = 'gone';
        } else {
            composeContainer.className = 'gone';
            overviewContainer.className = '';
        }
    };
    document.getElementById('messageOverviewBtn')
        .addEventListener('click', () => switchView(false));
    document.getElementById('messageComposeBtn')
        .addEventListener('click', () => switchView(true));

    const navTarget = new URLSearchParams(window.location.search).get('navTarget');
    switchView((navTarget && navTarget == 'compose'));
}

const run = function (): void {
    console.log("Start Setup");
    setupDataStore();
    setupFormListeners();
    setupNavigationListener();
    console.log(messages)
};

export {run, demo}
