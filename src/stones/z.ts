import { Stone } from "../stone";
import { Blocks } from "../blocks";
import { StonePosition } from "../stonePosition";
import { Constants } from "../constants";
import { RotationDirections } from "../rotationDirections";
import { Board } from "../board";

export class Z extends Stone {

    public constructor() {
        super([new StonePosition(3, 0), new StonePosition(4, 0, true), new StonePosition(4, 1), new StonePosition(5, 1)], Blocks.z);
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
        ctx.fillStyle = "#153a29";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE + 10, y * Constants.BLOCK_UNIT_SIZE + 10, Constants.BLOCK_UNIT_SIZE - 20, Constants.BLOCK_UNIT_SIZE - 20);
    }

}