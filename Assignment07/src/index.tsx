import './style.scss'
import React from 'react';
import ReactDOM from 'react-dom';
import {game} from "./model/game";
import {autorun} from "mobx";
import {observer} from "mobx-react"
import "./cardSymbols"

autorun(() => {
    console.log("Card " + (game.currentIndex + 1) + " / " + game.cards.length + ":")
    console.table(game.currentCard)
})

const App = observer(() => (
    <>
        Score: {game.score}
        <p className={game.currentCard.isRed() ? "red" : undefined}>{game.currentCard.asSymbol()}</p>
        <button disabled={game.isGameOver} onClick={() => game.nextSmaller()}>Lower</button>
        <button disabled={game.isGameOver} onClick={() => game.nextBigger()}>Higher</button>
    </>
));

ReactDOM.render(
    <App/>, document.getElementById('root')
);
