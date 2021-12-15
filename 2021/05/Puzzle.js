const aoc = require('../../AoC');

class Day5 extends aoc.Puzzle {
    constructor() {
        super(2021, 5, false);
        this.prep = (lines) => {
            return lines.map(str => {
                let line = {
                    beg: { x: 0, y: 0},
                    end: { x: 0, y: 0}
                };

                let parts = str.split(' -> ');

                let subparts = parts[0].split(',');
                line.beg.x = Number.parseInt(subparts[0]);
                line.beg.y = Number.parseInt(subparts[1]);
                
                subparts = parts[1].split(',');
                line.end.x = Number.parseInt(subparts[0]);
                line.end.y = Number.parseInt(subparts[1]);

                return line;
            });
        };
    }

    subtractPoints(p1, p2) {
        return {
            x: p1.x - p2.x,
            y: p1.y - p2.y
        };
    }

    addPoints(p1, p2) {
        return {
            x: p1.x + p2.x,
            y: p1.y + p2.y
        };
    }

    drawLine(map, mapSize, line) {
        let delta = this.subtractPoints(line.end, line.beg);

        let pos = line.beg;
        let step = {
            x: Math.sign(delta.x),
            y: Math.sign(delta.y),
        }

        let max = Math.max(Math.abs(delta.x), Math.abs(delta.y));
        for (let i = 0; i <= max; ++i) {
            map[pos.y * mapSize + pos.x] ??= 0;
            map[pos.y * mapSize + pos.x] += 1;
            pos = this.addPoints(pos, step);
        }

        return map;
    }

    part1(input) { // example result: 5
        let map = {};
        input.forEach(line => {
            let delta = this.subtractPoints(line.end, line.beg);
            if (delta.x === 0 || delta.y === 0)
                map = this.drawLine(map, 10000, line);
        });

        return Object.values(map).reduce((prev, curr) => {
            if (curr >= 2)
                prev++;
            return prev;
        }, 0);
    }

    part2(input) { // example result: 0
        let map = {};
        input.forEach(line => {
            map = this.drawLine(map, 10000, line);
        });

        return Object.values(map).reduce((prev, curr) => {
            if (curr >= 2)
                prev++;
            return prev;
        }, 0);
    }
}

new Day5().run();
