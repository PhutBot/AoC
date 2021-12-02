const aoc = require('../../AoC');

class Day1 extends aoc.Puzzle {
    constructor() {
        super(2021, 1, false);
        this.prep = aoc.MapStringToInt;
    }

    part1(input) {
        // 7
        // 1482
        return input.reduce((prev, curr, i, arr) => {
            prev += curr < arr[i+1] ? 1 : 0;
            return prev;
        }, 0);
    }

    part2(input) {
        // 5
        // 1518
        return input.reduce((prev, curr, i, arr) => {
            prev += curr < arr[i+3] ? 1 : 0;
            return prev;
        }, 0);
    }
}

new Day1().run();
