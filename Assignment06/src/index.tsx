import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Card} from './card'
import {PlayCard} from "./model/values";
import {Game, OnFinishCallback, OnNextCardCallback, OnScoreChangeCallback} from "./model/game";
import './style.scss'

let game = undefined;
const Progressbar = () => {
    const value = game.currentIndex + 1;
    let total = game.cards.length;
    const displayText = (value == total) ? "Game Finished!" : "Card " + value + " / " + total;
    return <progress value={value} max={total} data-label={displayText}>{displayText}</progress>
}

const App = () => {
    const [currentCard, setCard] = useState(null);
    const [controlsActive, setControls] = useState(true)
    const [wNegativePoints, setWNegativePoints] = useState(false)
    const [score, setScore] = useState(0);

    if (!game) {
        const onFinish: OnFinishCallback = () => setControls(false)
        const onNextCard: OnNextCardCallback = (card: PlayCard) => setCard({...card})
        const onScoreChange: OnScoreChangeCallback = (score: number) => setScore(score)
        game = new Game(onNextCard, onFinish, onScoreChange);
        game.start(wNegativePoints);
    }

    const handleNextBigger = () => game.nextBigger()
    const handleNextSmaller = () => game.nextSmaller();
    const handleRestart = () => {
        game.start(wNegativePoints);
        setControls(true);
    };

    return (
        <div>
            <Progressbar/>
            <h3>Score: {score}</h3>
            <Card playCard={currentCard}/>
            <button disabled={!controlsActive} onClick={handleNextSmaller}>Lower</button>
            <button disabled={!controlsActive} onClick={handleNextBigger}>Higher</button>
            <hr/>
            <button onClick={handleRestart}>Restart</button>
            <label>
                &emsp;With Negative Points:
                <input type="checkbox" checked={wNegativePoints} onChange={() => setWNegativePoints(!wNegativePoints)}/>
            </label>
        </div>
    );
}

ReactDOM.render(
    <App/>, document.getElementById('root')
);
