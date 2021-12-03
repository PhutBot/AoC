const aoc = require('../../AoC');

class Day8 extends aoc.Puzzle {
    constructor() {
        super(2015, 8, true);
    }

    isAny(c, tok) {
        return tok.indexOf(c) >= 0;
    }

    isHex(c) {
        return (c >= '0' && c <= '9')
            || (c >= 'a' && c <= 'f')
            || (c >= 'A' && c <= 'F');
    }

    matchCount(seq, i, text) {
        let k = 0;
        for (let j = 0; j < seq.length; ++j) {
            if (i + j > text.length - 1) {
                break;
            }
            if (seq[j] === text[i+j]) {
                k++;
            } else {
                break;
            }
        }
        return k;
    }

    matchCountHex(max, i, text) {
        let k = 0;
        for (let j = i; j < text.length && j < i + max; ++j) {
            if (this.isHex(text[j])) {
                k++;
            } else {
                break;
            }
        }
        return k;
    }

    escape(text) {
        let output = '';
        for (let i = 0; i < text.length; ++i) {
            if (text[i] === '\\' || text[i] === '\"') {
                output += '\\';
            }

            output += text[i];
        }
        return output;
    }

    unescape(text) {
        let output = '';
        for (let i = 0; i < text.length; ++i) {
            if (this.matchCount("\\\\", i, text) === 2
                    || this.matchCount("\\\"", i, text) === 2) {
                output += text[++i];
            } else if (this.matchCount("\\x", i, text) === 2) {
                if (this.matchCountHex(2, i+2, text) === 2) {
                    const slice = text.slice(i+2, i+4);
                    const num = Number.parseInt(slice, 16);
                    const c = String.fromCharCode(num);
                    output += c;
                    i += 3;
                } else {
                    output += text.slice(i, i+2);
                    i += 1;
                }
            } else {
                output += text[i];
            }
        }
        return output;
    }

    part1(input) {
        // 12
        // 1371
        let esclen = 0;
        let nrmlen = 0;
        input.forEach(line => {
            esclen += line.length;
            const nrm = this.unescape(line.slice(1, -1));
            nrmlen += nrm.length;
            // console.log(nrm);
        });

        return esclen - nrmlen;
    }

    part2(input) {
        // 19
        // 2117
        let nrmlen = 0;
        let esclen = 0;
        input.forEach(line => {
            nrmlen += line.length;
            const esc = `"${this.escape(line)}"`;
            esclen += esc.length;
            // console.log(esc);
        });

        return esclen - nrmlen;
    }
}

new Day8().run();
