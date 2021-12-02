const aoc = require('../../AoC');

class Day5 extends aoc.Puzzle {
    constructor() {
        super(2018, 5, false);
        this.getInput = this.getRawInput;
    }

    doThing(input) {
        let done = false;
        while (!done) {
            let count = 0;
            for (let i = 1; i < input.length; ++i) {
                if (input[i-1] !== input[i] && input[i-1].toLowerCase() === input[i].toLowerCase()) {
                    let j = i !== input.length ? i+1 : input.length;
                    input = input.slice(0, i-1) + input.slice(j);
                    count++;
                }
            }
            if (count === 0) {
                done = true;
            }
        }
        return input;
    }

    part1(input) {
        // 10
        // 10978
        return this.doThing(input).length;
    }

    part2(input) {
        // 4
        // 4840
        input = this.doThing(input);

        let min = Infinity;
        Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').forEach((c) => {
            let clean_input = input.replace(new RegExp('[' + c + c.toLowerCase() + ']', 'g'), '');
            min = Math.min(this.part1(clean_input), min);
        });

        return min;
    }
}

new Day5().run();
