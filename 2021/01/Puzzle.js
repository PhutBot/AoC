const aoc = require('../../AoC');

class Day1 extends aoc.Puzzle {
    constructor() {
        super(2021, 1, false);
        this.prep = aoc.MapStringToInt;
    }

    part1(input) { // example result: 7
        return input.reduce((prev, curr, i, arr) => {
            prev += curr < arr[i+1] ? 1 : 0;
            return prev;
        }, 0);
    }

    part2(input) { // example result: 5
        return input.reduce((prev, curr, i, arr) => {
            prev += curr < arr[i+3] ? 1 : 0;
            return prev;
        }, 0);
    }
}

new Day1().run();
