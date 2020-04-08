import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Card} from './card'
import {PlayCard} from "./model/values";
import {Game, OnFinishCallback, OnNextCardCallback, OnScoreChangeCallback} from "./model/game";
import './style.scss'

let game = undefined;
const App = () => {
    const [currentCard, setCard] = useState(null);
    const [controlsActive, setControls] = useState(true)
    const [score, setScore] = useState(0);

    if (!game) {
        const onFinish: OnFinishCallback = () => setControls(false)
        const onNextCard: OnNextCardCallback = (card: PlayCard) => setCard({...card})
        const onScoreChange: OnScoreChangeCallback = (score: number) => setScore(score)
        game = new Game(onNextCard, onFinish, onScoreChange);
        game.start();
    }

    return (
        <div>
            <progress value={game.currentIndex + 1} max={game.cards.length}>Deck Progress</progress>
            <h3>Score: {score}</h3>
            <Card playCard={currentCard}/>
            <button disabled={!controlsActive} onClick={() => {
                controlsActive && game.nextSmaller()
            }}>Lower
            </button>
            <button disabled={!controlsActive} onClick={() => {
                controlsActive && game.nextBigger()
            }}>Higher
            </button>
            <hr/>
            <button disabled={controlsActive} onClick={() => {
                !controlsActive && game.start()
                setControls(true)
            }}>Restart
            </button>
        </div>
    );
}

ReactDOM.render(
    <App/>
    , document.getElementById('root')
);
