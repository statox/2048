import {Direction} from '../Direction';
import {Grid} from '../Grid';

export interface AI {
    play(grid: Grid): Direction;
}
