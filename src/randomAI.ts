import {Direction} from './Direction';
import {Grid} from './Grid';

export class RandomAI {
    constructor() {}

    play(grid: Grid): Direction {
        if (grid.gameOver) {
            return;
        }
        const moves: Direction[] = ['UP', 'RIGHT', 'LEFT', 'DOWN'];
        const ind = Math.ceil(Math.random() * moves.length - 1);
        return moves[ind];
    }
}
