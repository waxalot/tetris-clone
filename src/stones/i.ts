import { Stone } from "../stone";
import { Blocks } from "../blocks";
import { StonePosition } from "../stonePosition";
import { RotationDirections } from "../rotationDirections";
import { Constants } from "../constants";

export class I extends Stone {

    public constructor() {
        super([new StonePosition(3, 0), new StonePosition(4, 0, true), new StonePosition(5, 0), new StonePosition(6, 0)], Blocks.i);
    }

    public rotateCCW(): void {
        if (this.lastRotationDirection === RotationDirections.undefined || this.lastRotationDirection === RotationDirections.ccw) {
            super.rotateCW();
        } else {
            super.rotateCCW();
        }
    }

    public rotateCW(): void {
        this.rotateCCW();
    }

    public drawBlock(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.fillStyle = "#000000";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE, y * Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE);
        ctx.clearRect(x * Constants.BLOCK_UNIT_SIZE + 5, y * Constants.BLOCK_UNIT_SIZE + 5, Constants.BLOCK_UNIT_SIZE - 10, Constants.BLOCK_UNIT_SIZE - 10);
        ctx.strokeRect(x * Constants.BLOCK_UNIT_SIZE + 7, y * Constants.BLOCK_UNIT_SIZE + 7, Constants.BLOCK_UNIT_SIZE - 14, Constants.BLOCK_UNIT_SIZE - 14);
    }

}