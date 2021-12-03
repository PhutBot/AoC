const aoc = require('../../AoC');

class Day2 extends aoc.Puzzle {
    constructor() {
        super(2021, 2, false);
        this.prep = (rawInput) => rawInput.reduce((prev, curr, i, arr) => {
            const part = curr.split(' ');
            prev.push({
                direction: part[0],
                distance: Number.parseInt(part[1])
            });
            return prev;
        }, []);
    }

    part1(input) { // example result: 150
        const result = input.reduce((prev, curr) => {
            if (curr.direction === 'forward')
                prev.distance += curr.distance;
            else 
                prev.depth += curr.distance * (curr.direction === 'up' ? -1 : 1);
            return prev;
        }, { distance: 0, depth: 0 });

        return result.distance * result.depth;
    }

    part2(input) { // example result: 900
        const result = input.reduce((prev, curr) => {
            if (curr.direction === 'forward') {
                prev.distance += curr.distance;
                prev.depth += curr.distance * prev.aim;
            } else 
                prev.aim += curr.distance * (curr.direction === 'up' ? -1 : 1);
            return prev;
        }, { distance: 0, depth: 0, aim: 0 });

        return result.distance * result.depth;
    }
}

new Day2().run();
