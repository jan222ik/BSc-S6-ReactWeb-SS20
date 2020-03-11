import '../styles/main.scss'

import square from "./square";
import multiplication from "./multiplication";

const run = function (a: number, b: number) {
    let result: number = multiplication(a, b);
    document.writeln(`Multiplication of ${a} and ${b} is ${result}<br>`);
    result = square(a);
    document.writeln(`The square of ${a} is ${result}`);
};

export {run}
