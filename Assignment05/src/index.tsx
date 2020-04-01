import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components'
import {Message} from "./message";
import {lightenDarkenColor} from './lightenDarkenColor'
import {colors} from "./colors";

const MAX_DISPLAY_NUM = 5;
const ALLOW_TOGGLE_READ = true;

type Props = {
    theme: {
        colors: {
            bg: string,
            surface: string,
            primary: string,
            secondary: string,
            fontColor: string
        }
    }
};

const GlobalStyle = createGlobalStyle`

    body {
        background-color: ${(props: Props) => props.theme.colors.bg};
        color: ${(props: Props) => props.theme.colors.fontColor};
         -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
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

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: ${(props: Props) => props.theme.colors.bg};
    }

    ::-webkit-scrollbar-thumb {
        background: ${(props: Props) => props.theme.colors.surface};
    }

    ::-webkit-scrollbar-thumb:hover {
        background: ${(props: Props) => props.theme.colors.primary};
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
        background: ${(props: Props) => props.theme.colors.surface};
        border-radius: 25px;
        padding-left: 25px;
        padding-right: 25px;
        padding-bottom: 10px;
        min-height: 54px;
        transition-duration: 300ms;
        
        & > h3 {
            padding-top: 10px;
        }

        & > p {
            border-radius: 25px;
            padding: 5px 10px 10px 25px;
            margin: 0;
        }
    `;

const MsgStyleUnread = styled.div`
        background: ${(props: Props) => lightenDarkenColor(props.theme.colors.surface, 10)};
        border-radius: 25px;
        padding-left: 25px;
        padding-right: 25px;
        padding-bottom: 10px;
        min-height: 54px;
        transition-duration: 300ms;
         & > h3 {
            padding-top: 10px;
        }

        & > p {
            border-radius: 25px;
            padding: 5px 10px 10px 25px;
            margin: 0;
        }
    `;

const NavButton = styled.button`
  background: ${(props: Props) => props.theme.colors.primary};
  border-radius: 25px;
  border-width: 0;
  transition-duration: 0.4s;
  outline: none;
  color: ${(props: Props) => lightenDarkenColor(props.theme.colors.surface, -13)};

  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;

  &:hover {
    background: ${(props: Props) => props.theme.colors.secondary};
  }
`

const Container = styled.div`margin: 4vh 5vw 0;`;
const Red = styled.span`color: red;`


const App = () => {
    const [isDark, setDarkMode] = useState(true);
    const refFirstInput = useRef<HTMLInputElement>();
    const [isComposeTab, setTab] = useState(true);
    const [messages, setMessages] = useState(new Array<Message>())
    const unreadCount = messages.filter(it => !it.msgRead).length;

    const Msg = (props: { msg: Message }) => {
        const handleClick = () => {
            props.msg.msgRead = !(ALLOW_TOGGLE_READ && props.msg.msgRead);
            setMessages([...messages]);
        }
        const contents = <><h3>{props.msg.msgTitle}</h3><p>{props.msg.msgBody}</p></>

        return (!props.msg.msgRead) ? <MsgStyleBase onClick={handleClick}>{contents}</MsgStyleBase> :
            <MsgStyleUnread onClick={handleClick}>{contents}</MsgStyleUnread>;
    };

    const ComposeSection = () => {
        const [composeTitle, setComposeTile] = useState("");
        const [composeBody, setComposeBody] = useState("");

        useEffect(() => {
            refFirstInput.current.focus()
        }, [messages]);
        return <section>
            <form onSubmit={(e) => {
                setMessages([...messages, new Message(composeTitle, composeBody, false)]);
                setComposeTile("")
                setComposeBody("")
                e.preventDefault();
            }
            }>
                <label>Subject:</label><br/>
                <input type="text"
                       name="subject"
                       ref={refFirstInput}
                       onChange={(e) => setComposeTile(e.target.value)}
                       value={composeTitle}/>
                <br/><br/>
                <label>Body:</label><br/>
                <input type="text"
                       name="body"
                       onChange={(e) => setComposeBody(e.target.value)}
                       value={composeBody}/>
                <br/><br/>
                <button>Submit!</button>
            </form>
        </section>;
    }
    const MsgSection = () => <section>
        {
            (messages.length < 1) ? <span>You have no messages!</span> :
                <>
                    <Red>
                        {(unreadCount > 0) ? "You have " + unreadCount + " unread messages!" : ""}
                    </Red>
                    <ul>{messages.map(m => <li key={m.uuid}><Msg msg={m}/></li>)}</ul>
                </>
        }
    </section>;
    const Tab = () => isComposeTab ? <ComposeSection/> : <MsgSection/>

    return (
        <ThemeProvider theme={{colors: colors(isDark)}}>
            <GlobalStyle/>
            <Container>
                <nav>
                    <NavButton onClick={() => setTab(false)}>Your
                        Messages <span>{(unreadCount > 0) ? "(" + ((unreadCount > MAX_DISPLAY_NUM) ? MAX_DISPLAY_NUM + "+" : unreadCount) + " new)" : ""}</span>
                    </NavButton>
                    <NavButton onClick={() => {
                        setTab(true)
                    }}>Compose a Message
                    </NavButton>
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
                <Tab/>
            </Container>
        </ThemeProvider>
    );
}

ReactDOM.render(

        <App/>
    , document.getElementById('root')
);
