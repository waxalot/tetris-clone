export class StonePosition {
    public x: number;
    public y: number;
    public isPivot: boolean;

    public constructor(x: number, y: number, isPivot: boolean = false) {
        this.x = x;
        this.y = y;
        this.isPivot = isPivot;
    }
}