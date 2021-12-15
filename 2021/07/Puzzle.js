const aoc = require('../../AoC');

class Day7 extends aoc.Puzzle {
    constructor() {
        super(2021, 7, false);
        this.getInput = this.getListInput;
        this.prep = aoc.MapStringToInt;
    }

    part1(input) { // example result: 37
        const max = Math.max(...input);
        const min = Math.min(...input);
        let result = Number.POSITIVE_INFINITY;
        for (let i = min; i < max; ++i) {
            let total = 0;
            for (let x of input) {
                let used = Math.abs(x - i);
                total += used;
            }
            result = Math.min(total, result);
        }

        return result;
    }

    part2(input) { // example result: 168
        const max = Math.max(...input);
        const min = Math.min(...input);
        let result = Number.POSITIVE_INFINITY;
        for (let i = min; i < max; ++i) {
            let total = 0;
            for (let x of input) {
                let used = Math.abs(x - i);
                for (let j = used-1; j >= 0; --j) {
                    used += j;
                }
                total += used;
            }
            result = Math.min(total, result);
        }

        return result;
    }
}

new Day7().run();
