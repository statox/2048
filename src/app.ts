import P5 from 'p5';
import Vue from 'vue/dist/vue.js';
import Hammer from 'hammerjs';
import 'p5/lib/addons/p5.dom';

import './styles.scss';

import {Grid} from './Grid';
import {RandomAI} from './AI/RandomAI';
import {BFS_AI} from './AI/BFS_AI';

const sketch = (p5: P5) => {
    let appdata = {
        score: 0,
        moves: 0
    };
    let grid: Grid;

    const ai = new RandomAI();
    // const ai = new BFS_AI();

    const runAI = () => {
        hintAI();
        setTimeout(runAI, 50);
    };

    const hintAI = () => {
        if (grid.gameOver) {
            return;
        }
        const move = ai.play(grid);
        grid.slide(move);
    };

    const resetGrid = () => {
        grid = new Grid(p5, {seed: 'totot1', generateStartingCells: true});
    };

    const app = new Vue({
        el: '#app',
        data: appdata,
        methods: {
            runAI,
            hintAI,
            resetGrid
        }
    });

    const swiped = (event) => {
        if (event.direction == 4) {
            grid.slide('RIGHT');
        } else if (event.direction == 8) {
            grid.slide('UP');
        } else if (event.direction == 16) {
            grid.slide('DOWN');
        } else if (event.direction == 2) {
            grid.slide('LEFT');
        }
    };

    p5.setup = () => {
        const screenD = Math.min(window.innerWidth, window.innerHeight);
        const canvas = p5.createCanvas(screenD * 0.7, screenD * 0.7);
        canvas.parent('canvasDiv');
        resetGrid();

        // Use hammer to detect swipes
        var hammer = new Hammer(document.body);
        hammer.get('swipe').set({direction: Hammer.DIRECTION_ALL});
        hammer.on('swipe', swiped);
    };

    // The sketch draw method
    p5.draw = () => {
        p5.background(0, 0, 0);
        grid.draw();
        appdata.score = grid.score;
        appdata.moves = grid.moves;
    };

    p5.keyPressed = () => {
        if (p5.keyCode === p5.UP_ARROW) {
            grid.slide('UP');
        }
        if (p5.keyCode === p5.DOWN_ARROW) {
            grid.slide('DOWN');
        }
        if (p5.keyCode === p5.LEFT_ARROW) {
            grid.slide('LEFT');
        }
        if (p5.keyCode === p5.RIGHT_ARROW) {
            grid.slide('RIGHT');
        }
    };
};

new P5(sketch);
