import { Stone } from "../stone";
import { Blocks } from "../blocks";
import { StonePosition } from "../stonePosition";
import { Constants } from "../constants";
import { RotationDirections } from "../rotationDirections";

export class Z extends Stone {

    public constructor() {
        super([new StonePosition(3, 0), new StonePosition(4, 0, true), new StonePosition(4, 1), new StonePosition(5, 1)], Blocks.z);
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
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE, y * Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE);
    }

}