const aoc = require('../../AoC');

class Day4 extends aoc.Puzzle {
    constructor() {
        super(2021, 4, false);
        this.getInput = this.getSplitOnEmptyInput;
        this.prep = (arr) => {
            let result = {
                balls: [],
                boards: []
            };
            
            result.balls = aoc.MapStringToInt(arr.shift().split(','));

            result.boards = arr
                .map(r => {
                    let rows = r.split(/\r?\n/);
                    return rows
                        .map(c => {
                            let cols = c.trim().split(/\s+/);
                            return aoc.MapStringToInt(cols);
                        }).flat();
                });

            return result;
        };
    }

    checkForWin(board) {
        const winCriteria = [
            0b1111100000000000000000000,
            0b0000011111000000000000000,
            0b0000000000111110000000000,
            0b0000000000000001111100000,
            0b0000000000000000000011111,
            0b0000100001000010000100001,
            0b0001000010000100001000010,
            0b0010000100001000010000100,
            0b0100001000010000100001000,
            0b1000010000100001000010000,
        ];

        let result = false;
        winCriteria.some(criteria => {
            if ((board & criteria) === criteria) {
                result = true;
            }
            return result;
        });

        return result;
    }

    calcWin(board, markers, ball) {
        let result = 0;
        for (let i = 0; i < 25; ++i) {
            if ((markers & 1) === 0)
                result += board[i];
            markers >>= 1;
        }
        return result * ball;
    }

    part1(input) { // example result: 4512
        let boardMarkers = new Array(input.boards.length);
        let winner = -1;
        let winBall = -1;
        input.balls.some((ball, ballIdx) => {
            input.boards.some((board, boardIdx) => {
                board.forEach((cell, cellIdx) => {
                    if (cell === ball) {
                        boardMarkers[boardIdx] = aoc.setBit(cellIdx, boardMarkers[boardIdx], 25);
                    }
                });

                if (this.checkForWin(boardMarkers[boardIdx])) {
                    winBall = ball;
                    winner = boardIdx;
                }
                return winBall !== -1;
            });
            
            return winBall !== -1;
        });

        return this.calcWin(input.boards[winner], boardMarkers[winner], winBall);
    }

    part2(input) { // example result: 1924
        let boardMarkers = new Array(input.boards.length).fill(0);
        let winMask = new Array(input.boards.length).fill(false);
        let winCount = 0;
        let winner = -1;
        let winBall = -1;
        input.balls.some((ball, ballIdx) => {
            input.boards.some((board, boardIdx) => {
                if (!winMask[boardIdx]) {
                    board.forEach((cell, cellIdx) => {
                        if (cell === ball) {
                            boardMarkers[boardIdx] = aoc.setBit(cellIdx, boardMarkers[boardIdx], 25);
                        }
                    });

                    if (this.checkForWin(boardMarkers[boardIdx])) {
                        if (winCount === winMask.length - 1) {
                            winBall = ball;
                            winner = boardIdx;
                        }
                        winCount++;
                        winMask[boardIdx] = true;
                    }
                    return winBall !== -1;
                } else {
                    return false;
                }
            });
            
            return winBall !== -1;
        });

        return this.calcWin(input.boards[winner], boardMarkers[winner], winBall);
    }
}

new Day4().run();
