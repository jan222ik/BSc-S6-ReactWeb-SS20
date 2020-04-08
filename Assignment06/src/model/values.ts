const hearts = [
    "🂲", // 2
    "🂳", // 3
    "🂴", // 4
    "🂵", // 5
    "🂶", // 6
    "🂷", // 7
    "🂸", // 8
    "🂹", // 9
    "🂺", // 10
    "🂻", // Jack
    "🂽", // Queen
    "🂾", // King
    "🂱"  // Ace
]

const clubs = [
    "🃒", // 2
    "🃓", // 3
    "🃔", // 4
    "🃕", // 5
    "🃖", // 6
    "🃗", // 7
    "🃘", // 8
    "🃙", // 9
    "🃚", // 10
    "🃛", // Jack
    "🃝", // Queen
    "🃞", // King
    "🃑"  // Ace
]

const diamonds = [
    "🃂", // 2
    "🃃", // 3
    "🃄", // 4
    "🃅", // 5
    "🃆", // 6
    "🃇", // 7
    "🃈", // 8
    "🃉", // 9
    "🃊", // 10
    "🃋", // Jack
    "🃍", // Queen
    "🃎", // King
    "🃁"  // Ace
]

const spades = [
    "🂢", // 2
    "🂣", // 3
    "🂤", // 4
    "🂥", // 5
    "🂦", // 6
    "🂧", // 7
    "🂨", // 8
    "🂩", // 9
    "🂪", // 10
    "🂫", // Jack | 11
    "🂭", // Queen | 12
    "🂮", // King | 13
    "🂡"  // Ace | 14
]

type Suits = 'hearts' | 'clubs' | 'diamonds' | 'spades'
const SuitNames = [
    'hearts', 'clubs', 'diamonds', 'spades'
]
class PlayCard {
    suit: Suits;
    value: number;
    displayCard: string;

    constructor(suit: Suits, value: number) {
        this.suit = suit;
        this.value = value;
        switch (suit) {
            case "hearts":
                this.displayCard = hearts[value];
                break;
            case "clubs":
                this.displayCard = clubs[value];
                break;
            case "diamonds":
                this.displayCard = diamonds[value];
                break;
            case "spades":
                this.displayCard = spades[value];
                break;

        }
    }
}

export {PlayCard, Suits, SuitNames}
