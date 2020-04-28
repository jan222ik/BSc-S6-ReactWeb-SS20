const range = (start, end) => Array.from({length: end - start + 1}, (_, i) => i)

const roundNextHighest = (number: number):number => {
    const numberRounded = Math.round(number);
    return numberRounded < number ? Math.round(number + 1) : numberRounded;
}

export {range, roundNextHighest}
