import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components'
import {Message} from "./message";
import {lightenDarkenColor} from './lightenDarkenColor'
import {colors} from "./colors";

const MAX_DISPLAY_NUM = 5;
const ALLOW_TOGGLE_READ = true;

type StyleProps = {
    theme: {
        colors: {
            bg: string,
            surface: string,
            primary: string,
            secondary: string,
            fontColor: string
        }
    },
    nav: {
        isSelected: boolean
    }
};

const GlobalStyle = createGlobalStyle`
        body {
            background-color: ${(props: StyleProps) => props.theme.colors.bg};
            color: ${(props: StyleProps) => props.theme.colors.fontColor};
             -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
            -moz-animation: fadein 2s; /* Firefox < 16 */
            -ms-animation: fadein 2s; /* Internet Explorer */
            -o-animation: fadein 2s; /* Opera < 12.1 */
            animation: fadein 2s;
            transition: background-color 250ms linear;
            transition: color 250ms linear;
        }
        
        nav {
            width: 100%;
            top: 0;
            height: 4vh;
            display: flex;
            justify-content: flex-end;
        
            & > button {
                margin-right: 1vw;
            }
        }
        
        input, textarea {
             background-color: ${(props: StyleProps) => props.theme.colors.bg};
             color: ${(props: StyleProps) => props.theme.colors.fontColor};
             transition: background-color 250ms linear;
             transition: color 250ms linear;
        }
    
        ::-webkit-scrollbar {
            width: 10px;
        }
    
        ::-webkit-scrollbar-track {
            background: ${(props: StyleProps) => props.theme.colors.bg};
        }
    
        ::-webkit-scrollbar-thumb {
            background: ${(props: StyleProps) => props.theme.colors.surface};
        }
    
        ::-webkit-scrollbar-thumb:hover {
            background: ${(props: StyleProps) => props.theme.colors.primary};
        }
    
        ul {
            list-style-type: none;
        }
        
        @keyframes fadein {
            from { opacity: 0; }
            to   { opacity: 1; }
        }
    
        /* Firefox < 16 */
        @-moz-keyframes fadein {
            from { opacity: 0; }
            to   { opacity: 1; }
        }
        
        /* Safari, Chrome and Opera > 12.1 */
        @-webkit-keyframes fadein {
            from { opacity: 0; }
            to   { opacity: 1; }
        }
        
        /* Internet Explorer */
        @-ms-keyframes fadein {
            from { opacity: 0; }
            to   { opacity: 1; }
        }
        
        /* Opera < 12.1 */
        @-o-keyframes fadein {
            from { opacity: 0; }
            to   { opacity: 1; }
        }
    `;

const MsgStyleBase = styled.div`
        background: ${(props: StyleProps) => props.theme.colors.surface};
        border-radius: 25px;
        padding-left: 25px;
        padding-right: 25px;
        padding-bottom: 10px;
        min-height: 54px;
        transition-duration: 300ms;
        
        & > h3 {
            padding-top: 10px;
        }

        & > pre {
            border-radius: 25px;
            padding: 5px 10px 10px 25px;
            margin: 0;
        }
    `;

const MsgStyleUnread = styled.div`
        background: ${(props: StyleProps) => lightenDarkenColor(props.theme.colors.surface, 10)};
        border-radius: 25px;
        padding-left: 25px;
        padding-right: 25px;
        padding-bottom: 10px;
        min-height: 54px;
        transition-duration: 300ms;
         & > h3 {
            padding-top: 10px;
        }

        & > pre {
            border-radius: 25px;
            padding: 5px 10px 10px 25px;
            margin: 0;
            white-space: pre-wrap
        }
    `;

const CustomButton = styled.button`
        background: ${(props: StyleProps) => (props.nav.isSelected) ? props.theme.colors.secondary : props.theme.colors.primary};
        border-radius: 25px;
        border-width: 0;
        transition-duration: 0.4s;
        outline: none;
        color: ${(props: StyleProps) => lightenDarkenColor(props.theme.colors.surface, -13)};
      
        -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadein 2s; /* Firefox < 16 */
        -ms-animation: fadein 2s; /* Internet Explorer */
        -o-animation: fadein 2s; /* Opera < 12.1 */
        animation: fadein 2s;
      
        &:hover {
          background: ${(props: StyleProps) => props.theme.colors.secondary};
        }
    `;

const Container = styled.div`margin: 4vh 5vw 0;`;
const Red = styled.span`color: red;`

type MsgProps = { msg: Message, handleClick: () => void }
const Msg = (props: MsgProps) => {
    const contents = <><h3>{props.msg.msgTitle}</h3>
        <pre>{props.msg.msgBody}</pre>
    </>
    return (!props.msg.msgRead) ? <MsgStyleBase onClick={props.handleClick}>{contents}</MsgStyleBase> :
        <MsgStyleUnread onClick={props.handleClick}>{contents}</MsgStyleUnread>;
};

type ComposeSectionProps = { messages: Message[], setMessages: any, refFirstInput: any }
const ComposeSection = (props: ComposeSectionProps) => {
    const [composeTitle, setComposeTile] = useState("");
    const [composeBody, setComposeBody] = useState("");

    useEffect(() => {
        props.refFirstInput.current.focus()
    }, [props.messages]);
    return <section>
        <form onSubmit={(e) => {
            props.setMessages([...props.messages, new Message(composeTitle, composeBody, false)]);
            setComposeTile("")
            setComposeBody("")
            e.preventDefault();
        }
        }>
            <label>Subject:</label><br/>
            <input type="text"
                   name="subject"
                   ref={props.refFirstInput}
                   onChange={(e) => setComposeTile(e.target.value)}
                   value={composeTitle}/>
            <br/><br/>
            <label>Body:</label><br/>
            <textarea type="text"
                      name="body"
                      onChange={(e) => setComposeBody(e.target.value)}
                      value={composeBody}/>
            <br/><br/>
            <CustomButton nav={{isSelected : false}}>Submit!</CustomButton>
        </form>
    </section>;
}
type MsgSectionProps = { messages: Message[], setMessages: any, unreadCount: number }
const MsgSection = (props: MsgSectionProps) => {
    return <section>
        {
            (props.messages.length < 1) ? <span>You have no messages!</span> :
                <>
                    <Red>
                        {(props.unreadCount > 0) ? "You have " + props.unreadCount + " unread messages!" : ""}
                    </Red>
                    <ul>{props.messages.map((m: Message) => <li key={m.uuid}><Msg msg={m} handleClick={
                        () => {
                            m.msgRead = !(ALLOW_TOGGLE_READ && m.msgRead);
                            props.setMessages([...props.messages]);
                        }
                    }/></li>)}</ul>
                </>
        }
    </section>;
};


const App = () => {
    const [isDark, setDarkMode] = useState(true);
    const refFirstInput = useRef<HTMLInputElement>();
    const [isComposeTab, setTab] = useState(true);
    const [messages, setMessages] = useState(new Array<Message>())
    const unreadCount = messages.filter(it => !it.msgRead).length;

    return (
        <ThemeProvider theme={{colors: colors(isDark)}}>
            <GlobalStyle/>
            <Container>
                <nav>
                    <CustomButton nav={{isSelected: !isComposeTab}} onClick={() => setTab(false)}>
                        Your Messages
                        <span>
                            {(unreadCount > 0) ? " (" + ((unreadCount > MAX_DISPLAY_NUM) ? MAX_DISPLAY_NUM + "+" : unreadCount) + " new)" : ""}
                        </span>
                    </CustomButton>
                    <CustomButton nav={{isSelected: isComposeTab}} onClick={() => setTab(true)}>
                        Compose a Message
                    </CustomButton>
                    <label>
                        Dark Mode:
                        <input
                            name="darkmodetoggle"
                            type="checkbox"
                            checked={isDark}
                            onChange={() => {
                                setDarkMode(!isDark)
                            }}/>
                    </label>
                </nav>
                {
                    isComposeTab ?
                        <ComposeSection messages={messages} setMessages={setMessages} refFirstInput={refFirstInput}/> :
                        <MsgSection messages={messages} setMessages={setMessages} unreadCount={unreadCount}/>
                }
            </Container>
        </ThemeProvider>
    );
}

ReactDOM.render(
    <App/>
    , document.getElementById('root')
);
