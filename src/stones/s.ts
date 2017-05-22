import { Stone } from "../stone";
import { Blocks } from "../blocks";
import { StonePosition } from "../stonePosition";
import { Constants } from "../constants";
import { RotationDirections } from "../rotationDirections";

export class S extends Stone {

    public constructor() {
        super([new StonePosition(4, 0, true), new StonePosition(5, 0), new StonePosition(3, 1), new StonePosition(4, 1)], Blocks.s);
    }

    public rotateCCW(): void {
        if (this.lastRotationDirection === RotationDirections.undefined || this.lastRotationDirection === RotationDirections.cw) {
            super.rotateCCW();
        } else if (this.lastRotationDirection === RotationDirections.ccw) {
            super.rotateCW();
        }
    }

    public rotateCW(): void {
        this.rotateCCW();
    }

    public drawBlock(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.fillStyle = "#000000";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE, y * Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE);
        ctx.fillStyle = "#666666";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE + 5, y * Constants.BLOCK_UNIT_SIZE + 5, Constants.BLOCK_UNIT_SIZE - 10, Constants.BLOCK_UNIT_SIZE - 10);
        ctx.fillStyle = "#999999";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE + 9, y * Constants.BLOCK_UNIT_SIZE + 9, Constants.BLOCK_UNIT_SIZE - 18, Constants.BLOCK_UNIT_SIZE - 18);
    }

}