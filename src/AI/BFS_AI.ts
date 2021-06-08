import {Direction} from '../Direction';
import {Grid} from '../Grid';
import {AI} from './AI';

export class BFS_AI implements AI {
    constructor() {}

    play(grid: Grid): Direction {
        if (grid.gameOver) {
            throw new Error('Called RandomAI on a finished game');
        }
        return this.choseChild(grid, 5);
    }

    choseChild(grid: Grid, depth: number) {
        const moves: Direction[] = ['UP', 'RIGHT', 'LEFT', 'DOWN'];
        let maxChildrenScore;
        let bestMoves = [];

        console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');
        console.log('For parent');
        grid.print();

        for (const move of moves) {
            // debugger; // AFA
            const child = grid.clone();
            child.slide(move);
            const score = this.scoreGrid(child);

            console.log('Move', move, 'score', score);
            child.print();

            if (!maxChildrenScore || score > maxChildrenScore) {
                bestMoves = [move];
                maxChildrenScore = score;
            } else if (maxChildrenScore === score) {
                bestMoves.push(move);
            }
        }
        // debugger; // AFA

        console.log({bestMoves});
        const ind = Math.ceil(Math.random() * bestMoves.length - 1);
        console.log('chose', bestMoves[ind]);
        return bestMoves[ind];
    }

    scoreGrid(grid: Grid) {
        let maxValue = 0;
        let totalScore = 0;
        for (let y = 0; y < grid.size; y++) {
            for (let x = 0; x < grid.size; x++) {
                totalScore += grid.cells[y][x].value;
                if (grid.cells[y][x].value > maxValue) {
                    maxValue = grid.cells[y][x].value;
                }
            }
        }
        // return maxValue;
        return totalScore;
    }
}
