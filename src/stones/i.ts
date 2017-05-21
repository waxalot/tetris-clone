import { Stone } from "../stone";
import { Blocks } from "../blocks";
import { StonePosition } from "../stonePosition";
import { RotationDirections } from "../rotationDirections";

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
        if (this.lastRotationDirection === RotationDirections.undefined || this.lastRotationDirection === RotationDirections.ccw) {
            super.rotateCW();
        } else {
            super.rotateCCW();
        }

    }

}