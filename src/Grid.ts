import P5 from 'p5';
import {Cell} from './Cell';
import {Direction} from './Direction';

export class Grid {
    cells: Cell[][];
    p5: P5;
    size: number;
    gameOver: boolean;
    score: number;
    constructor(p5) {
        this.p5 = p5;
        this.size = 4;
        this.cells = [];
        this.gameOver = false;
        this.score = 0;
        for (let i = 0; i < this.size; i++) {
            let line = [];
            for (let j = 0; j < this.size; j++) {
                //line.push(2**Math.ceil(this.p5.random(11)));
                line.push(new Cell(p5, p5.createVector(j, i), 0, this.size));
            }
            this.cells.push(line);
        }

        this.generateNewCell();
        this.generateNewCell();
    }

    slide(d: Direction) {
        let orderedCells = [];
        if (d === 'UP' || d === 'LEFT') {
            for (let x = 0; x < this.size; x++) {
                for (let y = 0; y < this.size; y++) {
                    this.cells[y][x].merged = false;
                    orderedCells.push(this.cells[y][x]);
                }
            }
        } else {
            for (let x = this.size - 1; x >= 0; x--) {
                for (let y = this.size - 1; y >= 0; y--) {
                    this.cells[y][x].merged = false;
                    orderedCells.push(this.cells[y][x]);
                }
            }
        }
        let didAMove = false;
        let nonZeroBlocked = 0;
        for (const currentCell of orderedCells) {
            let finished = false;

            while (!finished) {
                const {state, destination} = this.cellIsBlocked(currentCell, d);
                if (state === 'swap') {
                    this.swapCells(currentCell, destination);
                    didAMove = true;
                }
                if (state === 'merge') {
                    this.mergeCells(currentCell, destination);
                    didAMove = true;
                }
                if (state === 'blocked') {
                    finished = true;
                }
            }
        }

        if (didAMove) {
            this.generateNewCell();
        }
        this.updateGameOver();
    }
    swapCells(origin: Cell, target: Cell) {
        const c1 = origin.coord;
        const c2 = target.coord;
        this.cells[c1.y][c1.x] = target;
        this.cells[c2.y][c2.x] = origin;

        const tmpCoord = this.cells[c1.y][c1.x].coord;
        this.cells[c1.y][c1.x].coord = this.cells[c2.y][c2.x].coord;
        this.cells[c2.y][c2.x].coord = tmpCoord;
    }
    mergeCells(origin: Cell, target: Cell) {
        this.cells[target.coord.y][target.coord.x].value += this.cells[origin.coord.y][origin.coord.x].value;
        this.cells[origin.coord.y][origin.coord.x].value = 0;
        this.score += this.cells[target.coord.y][target.coord.x].value;
        target.merged = true;
    }
    cellIsBlocked(c: Cell, d: Direction) {
        let offset;
        if (d === 'UP') {
            offset = this.p5.createVector(0, -1);
        } else if (d === 'RIGHT') {
            offset = this.p5.createVector(1, 0);
        } else if (d === 'DOWN') {
            offset = this.p5.createVector(0, 1);
        } else if (d === 'LEFT') {
            offset = this.p5.createVector(-1, 0);
        }

        const destinationCoord = offset.add(c.coord);
        if (
            (destinationCoord.x < 0 && d === 'LEFT') ||
            (destinationCoord.y < 0 && d === 'UP') ||
            (destinationCoord.x >= this.size && d === 'RIGHT') ||
            (destinationCoord.y >= this.size && d === 'DOWN')
        ) {
            return {state: 'blocked'};
        }
        const destinationCell = this.cells[destinationCoord.y][destinationCoord.x];
        if (c.value !== 0 && destinationCell.value === 0) {
            return {state: 'swap', destination: destinationCell};
        }
        if (c.value !== 0 && destinationCell.value === c.value && !destinationCell.merged) {
            return {state: 'merge', destination: destinationCell};
        }
        return {state: 'blocked'};
    }
    generateNewCell() {
        let availableCells = [];
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                if (this.cells[y][x].value === 0) {
                    availableCells.push(this.cells[y][x]);
                }
            }
        }

        if (!availableCells.length) {
            return false;
        }

        const randIndex = Math.ceil(this.p5.random(availableCells.length - 1));
        availableCells[randIndex].value = Math.random() < 0.5 ? 2 : 4;
        return availableCells[randIndex];
    }
    updateGameOver() {
        let availableCells = [];
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                if (this.cells[y][x].value === 0) {
                    availableCells.push(this.cells[y][x]);
                }
            }
        }

        if (availableCells.length) {
            return false;
        }
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                const cell = this.cells[y][x];
                const canMove =
                    this.cellIsBlocked(cell, 'UP').state !== 'blocked' ||
                    this.cellIsBlocked(cell, 'DOWN').state !== 'blocked' ||
                    this.cellIsBlocked(cell, 'RIGHT').state !== 'blocked' ||
                    this.cellIsBlocked(cell, 'LEFT').state !== 'blocked';
                if (canMove) {
                    return false;
                }
            }
        }
        this.gameOver = true;
        return true;
    }
    draw() {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                this.cells[y][x].draw();
            }
        }

        if (this.gameOver) {
            const text = 'GAME OVER';
            this.p5.fill(0);
            this.p5.textSize(50);
            this.p5.text(text, this.p5.width / 2 - this.p5.textWidth(text) / 2, this.p5.height / 2);
        }
    }

    print() {
        console.log(this.cells.map((l) => l.map((c) => c.value).join(' ')).join('\n'));
    }
}
