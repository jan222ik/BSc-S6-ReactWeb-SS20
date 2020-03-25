import React, {useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import './main.scss';
import {Message} from "./message";

const MAX_DISPLAY_NUM = 5;
const ALLOW_TOGGLE_READ = true;

const App = () => {
    const formRef = useRef<HTMLFormElement>();
    const [isComposeTab, setTab] = useState(true);
    const [messages, setMessages] = useState(new Array<Message>())
    const unreadCount = messages.filter(it => !it.msgRead).length;
    const Msg = (props: { msg: Message }) => {
        return <div className={"msg " + (props.msg.msgRead ? "" : "unread")} onClick={
            () => {
                props.msg.msgRead = !(ALLOW_TOGGLE_READ && props.msg.msgRead);
                setMessages([...messages]);
            }
        }>
            <h3>{props.msg.msgTitle}</h3>
            <p>{props.msg.msgBody}</p>
        </div>;
    };
    const ComposeSection = () => {
        const [composeTitle, setComposeTile] = useState("");
        const [composeBody, setComposeBody] = useState("");
        return <section>
            <form ref={() => formRef} onSubmit={(e) => {
                setMessages([...messages, new Message(composeTitle, composeBody, false)]);
                console.log(formRef.current)
                formRef.current?.reset();
                setComposeTile("")
                setComposeBody("")
                e.preventDefault();
            }
            }>
                <label>Subject:</label><br/>
                <input type="text" name="subject" onChange={(e) => setComposeTile(e.target.value)}
                       value={composeTitle}/>
                <br/><br/>
                <label>Body:</label><br/>
                <input type="text" name="body" onChange={(e) => setComposeBody(e.target.value)}
                       value={composeBody}/>
                <br/><br/>
                <button>Submit!</button>
            </form>
        </section>;
    }
    const MsgSection = () => <section>
        {
            (messages.length < 1) ? <span className="white">You have no messages!</span> :
                <>
                    <span className="totalMessages">
                        {(unreadCount > 0) ? "You have " + unreadCount + " unread messages!" : ""}
                    </span>
                    <ul>{messages.map(m => <li key={m.uuid}><Msg msg={m}/></li>)}</ul>
                </>
        }
    </section>;
    const Tab = () => isComposeTab ? <ComposeSection/> : <MsgSection/>

    return (
        <div className="container">
            <nav>
                <button onClick={() => setTab(false)}>Your
                    Messages <span>{(unreadCount > 0) ? "(" + ((unreadCount > MAX_DISPLAY_NUM) ? MAX_DISPLAY_NUM + "+" : unreadCount) + " new)" : ""}</span>
                </button>
                <button onClick={() => {
                    setTab(true)
                }}>Compose a Message
                </button>
            </nav>
            <Tab/>
        </div>
    );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
