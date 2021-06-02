import P5 from 'p5';
import Hammer from 'hammerjs';
import 'p5/lib/addons/p5.dom';
import {Grid} from './Grid';
import './styles.scss';

const sketch = (p5: P5) => {
    let grid: Grid;
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
        canvas.parent('app');
        grid = new Grid(p5);

        // Use hammer to detect swipes
        var hammer = new Hammer(document.body);
        hammer.get('swipe').set({direction: Hammer.DIRECTION_ALL});
        hammer.on('swipe', swiped);
    };

    // The sketch draw method
    p5.draw = () => {
        p5.background(0, 0, 0);
        grid.draw();
        document.getElementById('score').innerText = grid.score.toString();
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
