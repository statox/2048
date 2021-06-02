import P5 from 'p5';
export class Cell {
    p5: P5;
    value: number;
    merged: boolean;
    coord: P5.Vector;
    gridSize: number;

    constructor(p5: P5, coord: P5.Vector, value: number, gridSize: number) {
        this.p5 = p5;
        this.coord = coord;
        this.value = 0;
        this.merged = false;
        this.gridSize = gridSize;
    }

    draw() {
        const S = this.p5.width / 4;
        const rx = this.coord.x * S;
        const ry = this.coord.y * S;
        if (this.value === 0) {
            this.p5.fill(161, 143, 146);
        } else {
            const power = Math.log2(this.value);
            const G = this.p5.map(power, 1, 11, 220, 70);
            const B = this.p5.map(power, 1, 11, 220, 0);
            this.p5.fill(255, G, B);
        }
        this.p5.rect(rx, ry, S, S);

        const text = this.value || '';
        this.p5.fill(0);
        this.p5.textSize(20);
        this.p5.text(text, rx + S / 2 - this.p5.textWidth(text.toString()) / 2, ry + S / 2);
    }
}
