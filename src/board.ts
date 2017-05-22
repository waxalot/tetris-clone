import { Constants } from "./constants";
import { Blocks } from "./blocks";
import { Stone } from "./stone";
import { I, J, L, O, S, T, Z } from "./stones";


export class Board {

    private board: number[][];
    private fullLineIndices: number[];
    private stoneHelpers: Stone[];

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
        this.initStonesMap();
    }

    public getStoneTypeAt(x: number, y: number): Blocks {
        return this.board[x][y];
    }

    public doesPositionCollide = (x: number, y: number): boolean => {
        return this.board[x][y] != Blocks.undefined;
    }

    public freezeStone = (stone: Stone) => {
        for (let i = 0; i < stone.positions.length; i++) {
            this.board[stone.positions[i].x][stone.positions[i].y] = stone.stoneType;
        }
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

        this.removeLines();
    }

    public draw = (ctx: CanvasRenderingContext2D) => {
        for (let i = 0; i < Constants.BOARD_WIDTH; i++) {
            for (let j = 0; j < Constants.BOARD_HEIGHT; j++) {

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
    }

    private copyLine = (sourceIndex: number, targetIndex: number) => {
        for (let i = 0; i < Constants.BOARD_WIDTH; i++) {
            this.board[i][targetIndex] = this.board[i][sourceIndex];
        }
    }
}