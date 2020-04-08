import {PlayCard, SuitNames, Suits} from "./values";

type OnFinishCallback = () => void
type OnNextCardCallback = (card: PlayCard) => void
type OnScoreChangeCallback = (score: number) => void

class Game {
    onNextCard: OnNextCardCallback;
    onFinish: OnFinishCallback;
    onScoreChange: OnScoreChangeCallback;

    cards: PlayCard[];
    currentIndex: number;
    score: number;

    constructor(onNextCard: OnNextCardCallback, onFinish: OnFinishCallback, onScoreChange: OnScoreChangeCallback) {
        this.onNextCard = onNextCard;
        this.onFinish = onFinish;
        this.onScoreChange = onScoreChange
        this.cards = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 13; j++) {
                this.cards.push(new PlayCard(SuitNames[i] as Suits, j))
            }
        }
    }

    shuffle() {
        this.cards.sort(() => Math.random() - 0.5)
    }

    start() {
        this.score = 0;
        this.onScoreChange(this.score);
        this.currentIndex = -1;
        this.shuffle();
        this.showNext()
    }

    nextBigger() {
        const next = this.cards[this.currentIndex + 1];
        this.awardPoints(next.value > this.cards[this.currentIndex].value)
        this.showNext()
    }

    nextSmaller() {
        const next = this.cards[this.currentIndex + 1];
        this.awardPoints(next.value < this.cards[this.currentIndex].value)
        this.showNext()
    }

    awardPoints(isPositive: boolean) {
        this.score += (isPositive) ? 1 : -1;
        this.onScoreChange(this.score)
    }


    showNext() {
        this.currentIndex++;
        this.onNextCard(this.cards[this.currentIndex])
        if (this.currentIndex >= this.cards.length - 1) {
            this.onFinish();
        }
    }


}

export {Game, OnScoreChangeCallback, OnNextCardCallback, OnFinishCallback}
