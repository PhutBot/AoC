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
    MapStringToInt: function(arr) {
        return arr.map(x => Number.parseInt(x));
    },

    MapStringToFloat: function(arr) {
        return arr.map(x => Number.parseFloat(x));
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
            return rawInput;
        }

        async getLineInput() {
            const lines = (await this.getRawInput()).split(/\r?\n/);
            return lines.slice(0, -1);
        }

        part1(input) {}
        part2(input) {}

        async run() {
            try {
                const rawInput = await this.getInput();
                
                try {
                    const output1 = this.part1(
                        await this.prep1(
                            await this.prep(rawInput)));
                    console.log(`part1: ${output1}`);
                } catch (err) {
                    console.error(`error in part 1: ${err}`);
                }
                
                try {
                    const output2 = this.part2(
                        await this.prep2(
                            await this.prep(rawInput)));
                    console.log(`part2: ${output2}`);
                } catch (err) {
                    console.error(`error in part 2: ${err}`);
                }
            } catch (err) {
                console.error(`error processing input: ${err}`);
            }
        }
    }
};
