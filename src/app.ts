import P5 from 'p5';
import 'p5/lib/addons/p5.dom';
import {Grid} from './Grid';
import './styles.scss';

const sketch = (p5: P5) => {
    let grid: Grid;
    p5.setup = () => {
        const screenD = Math.min(window.innerWidth, window.innerHeight);
        const canvas = p5.createCanvas(screenD * 0.7, screenD * 0.7);
        canvas.parent('app');
        grid = new Grid(p5);
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
