import { Constants } from "./constants";
import { Blocks } from "./blocks";
import { Stone } from "./stone";


export class Board {

    private board: number[][];

    public constructor() {
        // Init model
        this.board = [];
        for (let i = 0; i < Constants.BOARD_WIDTH; i++) {
            this.board[i] = [];
            for (let j = 0; j < Constants.BOARD_HEIGHT; j++) {
                this.board[i][j] = Blocks.undefined;
            }
        }
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
        let fullLinesIndices = new Array<number>();
        for (let j = 0; j < Constants.BOARD_HEIGHT; j++) {
            let isFullLine = true;
            for (let i = 0; i < Constants.BOARD_WIDTH; i++) {
                if (this.board[i][j] === Blocks.undefined) {
                    isFullLine = false;
                    break;
                }
            }
            if (isFullLine) {
                fullLinesIndices.push(j);
            }
        }

        this.removeLines(fullLinesIndices);
    }

    private removeLines = (indices: Array<number>) => {
        if (!indices || indices.length === 0) {
            return;
        }

        // Two pointers, to select the source and target lines for copying values.
        let targetIndex: number;
        let sourceIndex: number;
        let offset = 1;

        // Remove lines by overwrite lines which should be removed with valid lines.
        // Start at the last line which should be deleted and go up from there...
        for (targetIndex = indices[indices.length - 1]; targetIndex >= 0; targetIndex--) {
            // Target line should be removed
            for (sourceIndex = targetIndex - offset; sourceIndex >= 0; sourceIndex--) {
                if (indices.indexOf(sourceIndex) === -1) {
                    // A valid source line was found.
                    this.copyLine(sourceIndex, targetIndex);
                    break;
                } else {
                    offset++;
                }
            }
        }

    }

    private copyLine = (sourceIndex: number, targetIndex: number) => {
        for (let i = 0; i < Constants.BOARD_WIDTH; i++) {
            this.board[i][targetIndex] = this.board[i][sourceIndex];
        }
    }
}