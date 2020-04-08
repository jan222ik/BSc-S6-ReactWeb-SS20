import React from 'react';
import {PlayCard} from "./model/values";

type CardProps = {
    playCard: PlayCard
}

const Card = (props: CardProps) => {
    let colorClass = (props.playCard.suit == 'diamonds' || props.playCard.suit == 'spades') ? "black" : "red";
    return <div className={`card ${colorClass}`}>
        <p>
            {props.playCard.displayCard}
        </p>
    </div>;
}

export {Card};
