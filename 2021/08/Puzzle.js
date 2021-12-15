const aoc = require('../../AoC');

class Day8 extends aoc.Puzzle {
    constructor() {
        super(2021, 8, false);
        this.prep = (lines) => {
            return lines.map(line => {
                let [first, second] = line.split(' | ');
                return {
                    signal: first.split(' '),
                    display: second.split(' ')
                }
            });
        }

        this.prep2 = (inputs) => {
            return inputs.map(el => {
                const signal = this.in2bin(el.signal);
                return { 
                    signal,
                    display: this.in2bin(el.display),
                    sigbits: signal.map(el => aoc.populationCount(el))
                }
            });
        }
    }

    in2bin(arr) {
        const offset = 'a'.charCodeAt(0);
        return arr.map(sig => {
            return aoc.reduce(sig, (p, c) => {
                return aoc.setBit(c.charCodeAt(0) - offset, p, 7);
            }, 0);
        });
    }

    part1(input) { // example result: 26
        return input.reduce((p, c) => {
            p += c.display.reduce((pp, cc) => {
                if ([2, 3, 4, 7].includes(cc.length)) {
                    pp++;
                }
                return pp;
            }, 0);
            return p;
        }, 0);
    }

    decode(input) { // single example result: 5353
        let map = new Array(10).fill(null);
        input.sigbits.forEach((bits, idx) => {
            switch (bits) {
                case 2: map[1] = input.signal[idx]; break;
                case 4: map[4] = input.signal[idx]; break;
                case 3: map[7] = input.signal[idx]; break;
                case 7: map[8] = input.signal[idx]; break;
            }
        });
        
        const _235 = input.signal.filter((_, idx) => input.sigbits[idx] === 5);
        map[5] = _235.filter(el => aoc.populationCount(el & (map[1] ^ map[4])) === 2)[0];
        
        const _23 = _235.filter(el => el !== map[5]);
        map[2] = _23.filter(el => aoc.populationCount(el & map[7]) === 2)[0];
        map[3] = _23.filter(el => aoc.populationCount(el & map[7]) === 3)[0];
        
        const _069 = input.signal.filter((_, idx) => input.sigbits[idx] === 6);
        map[6] = _069.filter(el => aoc.populationCount(el & (map[6] ^ map[8]) & map[1]) === 1)[0];

        const _09 = _069.filter(el => el !== map[6]);
        map[0] = _09.filter(el => aoc.populationCount(el ^ map[4]) === 4)[0];
        map[9] = _09.filter(el => aoc.populationCount(el ^ map[4]) === 2)[0];
        
        return input.display.reduce((p, c) => {
            return (p * 10) + map.findIndex(el => el === c);
        }, 0);
    }

    part2(input) { // example result: 61229
        return input.reduce((p, c) => {
            return p + this.decode(c);
        }, 0);
    }
}

new Day8().run();
