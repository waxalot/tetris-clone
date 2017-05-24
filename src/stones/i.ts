import { Stone } from "../stone";
import { Blocks } from "../blocks";
import { StonePosition } from "../stonePosition";
import { RotationDirections } from "../rotationDirections";
import { Constants } from "../constants";
import { Board } from "../board";

export class I extends Stone {

    public constructor() {
        super([new StonePosition(3, 0), new StonePosition(4, 0, true), new StonePosition(5, 0), new StonePosition(6, 0)], Blocks.i);
    }

    public tryRotateCCW(board: Board): void {
        if (this.lastRotationDirection === RotationDirections.undefined || this.lastRotationDirection === RotationDirections.ccw) {
            super.tryRotateCW(board);
        } else {
            super.tryRotateCCW(board);
        }
    }

    public tryRotateCW(board: Board): void {
        this.tryRotateCCW(board);
    }

    public drawBlock(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.fillStyle = "#000000";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE, y * Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE);
        ctx.fillStyle = "#00ff0c";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE + Constants.STONE_BORDER_SIZE, y * Constants.BLOCK_UNIT_SIZE + Constants.STONE_BORDER_SIZE, Constants.BLOCK_UNIT_SIZE - 6, Constants.BLOCK_UNIT_SIZE - 6);
        ctx.strokeRect(x * Constants.BLOCK_UNIT_SIZE + 7, y * Constants.BLOCK_UNIT_SIZE + 7, Constants.BLOCK_UNIT_SIZE - 14, Constants.BLOCK_UNIT_SIZE - 14);
    }

}