const https = require('https');
const fs = require('fs');
const path = require('path');

const TOKEN = fs.readFileSync('token').toString();
const ROOT_DIR = './';

async function downloadInput(token, year, day, filepath) {
    return new Promise((resolve, reject) => {
        const req = https.request({
            hostname: 'adventofcode.com',
            port: 443,
            path: `/${year}/day/${day}/input`,
            method: 'GET',
            headers: {
                'Cookie': `session=${TOKEN}`
            }
        }, (response) => {
            const file = fs.createWriteStream(filepath);
            response.pipe(file);
            resolve();
        });
        
        req.on('error', reject);
        req.end();
    });
}

function readInput(filepath) {
    return new Promise((resolve, reject) => {
            fs.readFile(filepath, 'utf8' , (err, data) => {
                    if (err) {
                            reject(err);
                    }
                    resolve(data);
                });
    })
}

async function getInput(token, rootDir, year, day, filename) {
    const filepath = path.join(rootDir, `${year}`, `${day}`.padStart(2, '0'), filename);
    if (!fs.existsSync(filepath)) {
        await downloadInput(token, year, day, filepath);
    }
    return await readInput(filepath);
}

module.exports = {
    MapStringToBin: function(arr) {
        return arr.map(x => Number.parseInt(x, 2));
    },

    MapStringToInt: function(arr) {
        return arr.map(x => Number.parseInt(x));
    },

    MapStringToFloat: function(arr) {
        return arr.map(x => Number.parseFloat(x));
    },
    
    bin2dec(str) {
        return Number.parseInt(str, 2);
    },
    
    dec2bin(dec, pad=1) {
        return (dec >>> 0).toString(2).padStart(pad, '0');
    },

    maskBits(n) {
        let mask = 0;
        for (let i = 0; i < n; ++i)
            mask = (mask << 1) | 1;
        return mask;
    },

    countBits(n) {
        let count = 0;
        while (n > 0) {
            n >>= 1;
            count++;
        }
        return count;
    },

    populationCount(n) {
        let count = 0;
        while (n > 0) {
            if (n & 1)
                count++;
            n >>= 1;
        }
        return count;
    },

    setBit(i, n, m) {
        n |= 0;
        let result = n | (1 << i)
        result = !m ? result : result & this.maskBits(m);
        return result;
    },

    unsetBit(i, n, m) {
        n |= 0;
        let result = n ^ (1 << i)
        result = !m ? result : result & this.maskBits(m);
        return result;
    },

    filter(arr, func) {
        return Array.prototype.filter.call(arr, func);
    },

    reduce(arr, func, def) {
        return Array.prototype.reduce.call(arr, func, def);
    },

    compare(a1, a2) {
        return !Array.prototype.reduce.call(a1,
            (p, c) => p || !a2.includes(c), false);
    },

    intersection(a1, a2) {
        if (a1.length < a2.length) {
            let tmp = a1;
            a1 = a2;
            a2 = tmp;
        }
        return this.filter(a1, x => a2.includes(x));
    },

    difference(a1, a2) {
        if (a1.length < a2.length) {
            let tmp = a1;
            a1 = a2;
            a2 = tmp;
        }
        return this.filter(a1, x => !a2.includes(x));
    },

    Puzzle: class {
        constructor(year, day, isTest) {
            this.year = year;
            this.day = day;
            this.isTest = isTest;
            
            this.getInput = this.getLineInput;
            
            this.prep = (rawInput) => rawInput;
            this.prep1 = (rawInput) => rawInput;
            this.prep2 = (rawInput) => rawInput;
        }

        async getRawInput() {
            const rawInput = (await getInput(TOKEN, ROOT_DIR, this.year, this.day, this.isTest ? 'example.txt' : 'input.txt'));
            return rawInput.trimEnd();
        }

        async getLineInput() {
            const lines = (await this.getRawInput()).split(/\r?\n/);
            return lines;
        }

        async getListInput() {
            const lines = (await this.getRawInput()).split(',');
            return lines;
        }

        async getSplitOnEmptyInput() {
            const lines = (await this.getRawInput()).split(/\r?\n\r?\n/);
            return lines;
        }

        part1(input) {}
        part2(input) {}

        async run() {
            try {
                const rawInput = await this.getInput();
                
                try {
                    const output1 = this.part1(
                        await this.prep1(
                            await this.prep([...rawInput])));
                    console.log(`part1: ${JSON.stringify(output1)}`);
                } catch (err) {
                    console.error(`error in part 1: ${err}`);
                    throw err;
                }
                
                try {
                    const output2 = this.part2(
                        await this.prep2(
                            await this.prep([...rawInput])));
                    console.log(`part2: ${JSON.stringify(output2)}`);
                } catch (err) {
                    console.error(`error in part 2: ${err}`);
                    throw err;
                }
            } catch (err) {
                console.error(`error processing input: ${err}`);
                throw err;
            }
        }
    }
};
