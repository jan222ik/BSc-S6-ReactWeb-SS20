import {action, observable} from "mobx";

const SuitNames = [
    'hearts', 'clubs', 'diamonds', 'spades'
]

class PlayCard {
    suit: string;
    value: number;

    constructor(suit: string, value: number) {
        this.suit = suit;
        this.value = value;
    }

    isRed = () => !(this.suit == 'clubs' || this.suit == 'spades')
}

class Game {
    cards: PlayCard[];
    currentIndex: number;
    @observable score: number;
    @observable currentCard: PlayCard;
    @observable isGameOver: boolean;

    constructor() {
        this.cards = [];
        for (let i = 0; i < 4; i++) {
            for (let value = 0; value < 13; value++) {
                let suit = SuitNames[i];
                this.cards.push(new PlayCard(suit, value))
            }
        }
        this.cards.sort(() => Math.random() - 0.5)
        this.score = 0;
        this.currentIndex = -1;
        this.isGameOver = false;
        this.showNext()
    }

    @action nextBigger() {
        const next = this.cards[this.currentIndex + 1];
        this.awardPoints(next.value > this.cards[this.currentIndex].value)
        this.showNext()
    }

    @action nextSmaller() {
        const next = this.cards[this.currentIndex + 1];
        this.awardPoints(next.value < this.cards[this.currentIndex].value)
        this.showNext()
    }

    awardPoints(isPositive: boolean) {
        this.score += (isPositive) ? 1 : 0;
    }

    showNext() {
        this.currentIndex++;
        this.currentCard = this.cards[this.currentIndex];
        this.isGameOver = this.currentIndex >= this.cards.length - 1
    }


}
const game = new Game();

export {game, PlayCard};
