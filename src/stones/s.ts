import { Stone } from "../stone";
import { Blocks } from "../blocks";
import { StonePosition } from "../stonePosition";
import { Constants } from "../constants";
import { RotationDirections } from "../rotationDirections";
import { Board } from "../board";

export class S extends Stone {

    public constructor() {
        super([new StonePosition(4, 0, true), new StonePosition(5, 0), new StonePosition(3, 1), new StonePosition(4, 1)], Blocks.s);
    }

    public tryRotateCCW(board: Board): void {
        if (this.lastRotationDirection === RotationDirections.undefined || this.lastRotationDirection === RotationDirections.cw) {
            super.tryRotateCCW(board);
        } else if (this.lastRotationDirection === RotationDirections.ccw) {
            super.tryRotateCW(board);
        }
    }

    public tryRotateCW(board: Board): void {
        this.tryRotateCCW(board);
    }

    public drawBlock(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.fillStyle = "#000000";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE, y * Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE);
        ctx.fillStyle = "#d4ff00";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE + Constants.STONE_BORDER_SIZE, y * Constants.BLOCK_UNIT_SIZE + Constants.STONE_BORDER_SIZE, Constants.BLOCK_UNIT_SIZE - 6, Constants.BLOCK_UNIT_SIZE - 6);
        ctx.fillStyle = "#e5273a";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE + 9, y * Constants.BLOCK_UNIT_SIZE + 9, Constants.BLOCK_UNIT_SIZE - 18, Constants.BLOCK_UNIT_SIZE - 18);
    }

}