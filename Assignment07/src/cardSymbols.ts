import {PlayCard} from "./model/game";

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

declare module "./model/game" {
    // ESLint parse error connected with bug in babel parser. (More Info: https://github.com/nuxt/typescript/issues/191)
    export interface PlayCard {
        asSymbol(): string;
    }
}

PlayCard.prototype.asSymbol = function() {
    switch (this.suit) {
        case "hearts":
            return hearts[this.value];
        case "clubs":
            return clubs[this.value];
        case "diamonds":
            return diamonds[this.value];
        case "spades":
            return spades[this.value];
    }
}

export {};
