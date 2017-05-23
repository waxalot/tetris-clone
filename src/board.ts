import { Constants } from "./constants";
import { Blocks } from "./blocks";
import { Stone } from "./stone";
import { I, J, L, O, S, T, Z } from "./stones";


export class Board {

    private board: number[][];
    private fullLineIndices: number[];
    private drawFullLine: boolean;
    private stoneHelpers: Stone[];
    private currentStone: Stone;

    public constructor() {
        // Init model
        this.board = [];
        for (let i = 0; i < Constants.BOARD_WIDTH; i++) {
            this.board[i] = [];
            for (let j = 0; j < Constants.BOARD_HEIGHT; j++) {
                this.board[i][j] = Blocks.undefined;
            }
        }

        this.fullLineIndices = new Array<number>();
        this.drawFullLine = true;
        this.initStonesMap();

        this.createStone();
    }

    public getStoneTypeAt(x: number, y: number): Blocks {
        return this.board[x][y];
    }

    public doesPositionCollide = (x: number, y: number): boolean => {
        return this.board[x][y] != Blocks.undefined;
    }

    public checkForFullLines = () => {
        for (let j = 0; j < Constants.BOARD_HEIGHT; j++) {
            let isFullLine = true;
            for (let i = 0; i < Constants.BOARD_WIDTH; i++) {
                if (this.board[i][j] === Blocks.undefined) {
                    isFullLine = false;
                    break;
                }
            }
            if (isFullLine) {
                this.fullLineIndices.push(j);
            }
        }

        if (this.fullLineIndices.length > 0) {
            this.enableFullLineBlinking(() => {
                this.removeLines();
                this.createStone();
            });
        } else {
            this.createStone();
        }
    }

    public moveStoneLeft() {
        if (!this.currentStone) {
            return;
        }

        // Check if the stone can be moved left
        for (let i = 0; i < this.currentStone.positions.length; i++) {
            if (this.currentStone.positions[i].x - 1 < 0 || this.doesPositionCollide(this.currentStone.positions[i].x - 1, this.currentStone.positions[i].y)) {
                return;
            }
        }
        // Move the stone left
        for (let i = 0; i < this.currentStone.positions.length; i++) {
            this.currentStone.positions[i].x--;
        }
    }

    public moveStoneRight() {
        if (!this.currentStone) {
            return;
        }

        // Check if the stone can be moved right
        for (let i = 0; i < this.currentStone.positions.length; i++) {
            if (this.currentStone.positions[i].x + 1 >= Constants.BOARD_WIDTH || this.doesPositionCollide(this.currentStone.positions[i].x + 1, this.currentStone.positions[i].y)) {
                return;
            }
        }
        // Move the stone left
        for (let i = 0; i < this.currentStone.positions.length; i++) {
            this.currentStone.positions[i].x++;
        }
    }

    public moveStoneDown() {
        if (!this.currentStone) {
            return;
        }

        // Check if the stone can be moved down
        for (let i = 0; i < this.currentStone.positions.length; i++) {
            if (this.currentStone.positions[i].y + 1 >= Constants.BOARD_HEIGHT || this.doesPositionCollide(this.currentStone.positions[i].x, this.currentStone.positions[i].y + 1)) {
                this.freezeStone();
                return;
            }
        }
        // Move the stone down
        for (let i = 0; i < this.currentStone.positions.length; i++) {
            this.currentStone.positions[i].y++;
        }
    }

    public instantDown = () => {
        console.log("instant down");
    }

    private createStone() {
        let newStoneType: Blocks;
        newStoneType = Math.floor(Math.random() * 7) + 1;

        switch (newStoneType) {
            case Blocks.i: {
                this.currentStone = new I();
                break;
            }
            case Blocks.j: {
                this.currentStone = new J();
                break;
            }
            case Blocks.l: {
                this.currentStone = new L();
                break;
            }
            case Blocks.o: {
                this.currentStone = new O();
                break;
            }
            case Blocks.s: {
                this.currentStone = new S();
                break;
            }
            case Blocks.t: {
                this.currentStone = new T();
                break;
            }
            case Blocks.z: {
                this.currentStone = new Z();
                break;
            }
        }
    }

    public tryRotateCCW() {
        if (this.currentStone) {
            this.currentStone.tryRotateCCW(this);
        }
    }

    public tryRotateCW() {
        if (this.currentStone) {
            this.currentStone.tryRotateCW(this);
        }
    }

    private enableFullLineBlinking(doneCallback: () => void) {
        let blinkCount = 10;
        let blinkIntervalID = setInterval(() => {
            this.drawFullLine = !this.drawFullLine;

            if (--blinkCount === 0) {
                clearInterval(blinkIntervalID);
                doneCallback();
            }
        }, 200);
    }

    private freezeStone = () => {
        for (let i = 0; i < this.currentStone.positions.length; i++) {
            this.board[this.currentStone.positions[i].x][this.currentStone.positions[i].y] = this.currentStone.stoneType;
        }

        this.currentStone = null;
        this.checkForFullLines();
    }

    public draw = (ctx: CanvasRenderingContext2D) => {
        if (this.currentStone) {
            this.currentStone.draw(ctx);
        }

        for (let i = 0; i < Constants.BOARD_WIDTH; i++) {
            for (let j = 0; j < Constants.BOARD_HEIGHT; j++) {
                if (!this.drawFullLine && this.fullLineIndices.indexOf(j) !== -1) {
                    continue;
                }
                let stoneType: Blocks = this.getStoneTypeAt(i, j);
                if (stoneType !== Blocks.undefined) {
                    let tempHelperStone = this.stoneHelpers[stoneType];
                    tempHelperStone.drawBlock(ctx, i, j);
                }
            }
        }
    }

    private initStonesMap() {
        this.stoneHelpers = new Array<Stone>();
        this.stoneHelpers[Blocks.i] = new I();
        this.stoneHelpers[Blocks.j] = new J();
        this.stoneHelpers[Blocks.l] = new L();
        this.stoneHelpers[Blocks.o] = new O();
        this.stoneHelpers[Blocks.s] = new S();
        this.stoneHelpers[Blocks.t] = new T();
        this.stoneHelpers[Blocks.z] = new Z();
    }

    private drawBlock = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE, y * Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE);
    }

    private removeLines = () => {
        if (!this.fullLineIndices || this.fullLineIndices.length === 0) {
            return;
        }

        // Two pointers, to select the source and target lines for copying values.
        let targetIndex: number;
        let sourceIndex: number;
        let offset = 1;

        // Remove lines by overwrite lines which should be removed with valid lines.
        // Start at the last line which should be deleted and go up from there...
        for (targetIndex = this.fullLineIndices[this.fullLineIndices.length - 1]; targetIndex >= 0; targetIndex--) {
            // Target line should be removed
            for (sourceIndex = targetIndex - offset; sourceIndex >= 0; sourceIndex--) {
                if (this.fullLineIndices.indexOf(sourceIndex) === -1) {
                    // A valid source line was found.
                    this.copyLine(sourceIndex, targetIndex);
                    break;
                } else {
                    offset++;
                }
            }
        }

        this.fullLineIndices = new Array<number>();
        this.drawFullLine = true;
    }

    private copyLine = (sourceIndex: number, targetIndex: number) => {
        for (let i = 0; i < Constants.BOARD_WIDTH; i++) {
            this.board[i][targetIndex] = this.board[i][sourceIndex];
        }
    }
}