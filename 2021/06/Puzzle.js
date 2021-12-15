const aoc = require('../../AoC');

class Day6 extends aoc.Puzzle {
    constructor() {
        super(2021, 6, false);
        this.getInput = this.getListInput;
        this.prep = aoc.MapStringToInt;
    }

    part1(input) { // example result: 5934
        for (let i = 0; i < 80; ++i) {
            for (let j = input.length-1; j >= 0; --j) {
                if (--input[j] < 0) {
                    input.push(8);
                    input[j] = 6;
                }
            }
        }

        return input.length;
    }

    part2(input) { // example result: 26984457539
        // 0 1 2 3 4 5 6 7 8
        // 0 1 1 2 1 0 0 0 0
        // 1 1 2 1 0 0 0 0 0
        // 1 2 1 0 0 0 1 0 *
        
        // 0 1 2 3 4 5 6 7 8        0
        // 0 1 1 2 1 0 0 0 0
        
        // 8 0 1 2 3 4 5 6 7        1
        // 0 1 1 2 1 0 0 0 0
        
        // 7 8 0 1 2 3 4 5 6        2
        // 0 1 1 2 1 0 0 0 1
        
        // 6 7 8 0 1 2 3 4 5        3
        // 1 1 1 2 1 0 0 0 1
        let buckets = new Array(9).fill(0);
        for (let fish of input) {
            buckets[fish]++;
        }

        for (let i = 0; i < 256; ++i) {
            let o = i % 9;
            buckets[(o + 7) % 9] += buckets[o];
        }

        return buckets.reduce((prev, curr) => prev += curr, 0);
    }
}

new Day6().run();
