import {Direction} from '../Direction';
import {Grid} from '../Grid';
import {AI} from './AI';
const seedrandom = require('seedrandom');

export class RandomAI implements AI {
    constructor() {}

    play(grid: Grid): Direction {
        if (grid.gameOver) {
            throw new Error('Called RandomAI on a finished game');
        }
        const moves: Direction[] = ['UP', 'RIGHT', 'LEFT', 'DOWN'];
        const ind = Math.ceil(Math.random() * moves.length - 1);
        return moves[ind];
    }
}
