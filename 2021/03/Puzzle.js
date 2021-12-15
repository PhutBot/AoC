const aoc = require('../../AoC');

class Day3 extends aoc.Puzzle {
    constructor() {
        super(2021, 3, false);
        this.prep = aoc.MapStringToBin;
        this.bitCount = 1;
    }

    findGamma(input) {
        let counter = new Array(this.bitCount);
        counter.fill(0);

        input.forEach(el => {
            let x = 1;
            let i = 0;
            while (x <= el) {
                counter[i++] += (el & x) !== 0;
                x <<= 1;
            }
        });

        let x = 1;
        let gamma = 0;
        counter.forEach(el => {
            if (el >= input.length / 2) {
                gamma |= x;
            }
            x <<= 1;
        });

        return gamma;
    }

    calcEpsilon(gamma, len) {
        return ~gamma & aoc.maskBits(len);
    }

    part1(input) { // example result: 198
        this.bitCount = input.reduce((prev, curr) => {
            return Math.max(prev, aoc.countBits(curr))
        }, 0);

        const gamma = this.findGamma(input);
        // console.log(aoc.dec2bin(gamma, 5));

        const epsilon = this.calcEpsilon(gamma, this.bitCount);
        // console.log(aoc.dec2bin(epsilon, 5));
        
        return gamma * epsilon;
    }

    filterInput(bitPos, filterFunc, input) {
        const filter = filterFunc.apply(this, [input]);
        for (let i = input.length-1; i >= 0; --i) {
            if (input.length === 1)
                break;
            if ((input[i] & (1 << bitPos)) !== (filter & (1 << bitPos))) {
                input.splice(i, 1);
            }
        }

        if (input.length > 1) {
            this.filterInput(bitPos-1, filterFunc, input);
        }

        return input[0];
    }

    part2(input) { // example result: 230
        input = input.reverse();
        
        const o2Rate = this.filterInput(this.bitCount, this.findGamma, [...input]);
        // console.log(aoc.dec2bin(o2Rate, 5));

        const co2Rate = this.filterInput(this.bitCount, (x) => this.calcEpsilon(this.findGamma(x), this.bitCount), [...input]);
        // console.log(aoc.dec2bin(co2Rate, 5));

        return o2Rate * co2Rate;
    }
}

new Day3().run();
