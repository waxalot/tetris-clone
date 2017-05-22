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
        ctx.fillStyle = "#000000";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE, y * Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE);
        ctx.fillStyle = "#AAAAAA";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE + 5, y * Constants.BLOCK_UNIT_SIZE + 5, Constants.BLOCK_UNIT_SIZE - 10, Constants.BLOCK_UNIT_SIZE - 10);
        ctx.fillStyle = "#444444";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE + 10, y * Constants.BLOCK_UNIT_SIZE + 10, Constants.BLOCK_UNIT_SIZE - 20, Constants.BLOCK_UNIT_SIZE - 20);
    }

}