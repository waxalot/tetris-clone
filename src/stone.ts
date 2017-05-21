import { Blocks } from "./blocks";
import { StonePosition } from "./stonePosition";
import { RotationDirections } from "./rotationDirections";

export class Stone {
    public positions: Array<StonePosition>;
    public stoneType: Blocks;

    protected lastRotationDirection: RotationDirections;

    private positionsCount: number;
    private pivotPosition: StonePosition;

    public constructor(positions: Array<StonePosition>, stoneType: Blocks) {
        this.positions = positions;
        this.stoneType = stoneType;
        this.positionsCount = this.positions.length;
        this.pivotPosition = this.getPivotPosition();
        this.lastRotationDirection = RotationDirections.undefined;
    }

    public rotateCCW(): void {
        if (!this.positions || this.positions.length === 0 || !this.pivotPosition) {
            return;
        }

        for (let i = 0; i < this.positionsCount; i++) {
            // Calculate relative offset from the current position to the pivot position.
            let vRelX = this.positions[i].x - this.pivotPosition.x;
            let vRelY = this.positions[i].y - this.pivotPosition.y;

            // Multiply the relative vector with the rotation matrix.
            // [ 0 -1 ]
            // [ 1  0 ]
            let vTransformedX = vRelY * (-1);
            let vTransformedY = vRelX;

            // Now update the position with the newly calculated position info.
            this.positions[i].x = this.pivotPosition.x + vTransformedX;
            this.positions[i].y = this.pivotPosition.y + vTransformedY;
        }

        this.lastRotationDirection = RotationDirections.ccw;
    }

    public rotateCW(): void {
        if (!this.positions || this.positions.length === 0 || !this.pivotPosition) {
            return;
        }

        for (let i = 0; i < this.positionsCount; i++) {
            // Calculate relative offset from the current position to the pivot position.
            let vRelX = this.positions[i].x - this.pivotPosition.x;
            let vRelY = this.positions[i].y - this.pivotPosition.y;

            // Multiply the relative vector with the rotation matrix.
            // [ 0  1 ]
            // [-1  0 ]
            let vTransformedX = vRelY;
            let vTransformedY = vRelX * (-1);

            // Now update the position with the newly calculated position info.
            this.positions[i].x = this.pivotPosition.x + vTransformedX;
            this.positions[i].y = this.pivotPosition.y + vTransformedY;
        }

        this.lastRotationDirection = RotationDirections.cw;
    }

    private getPivotPosition(): StonePosition | null {
        let possiblePivotPositions = this.positions.filter((stonePosition: StonePosition) => {
            return stonePosition.isPivot;
        });
        if (possiblePivotPositions && possiblePivotPositions.length > 0) {
            return possiblePivotPositions[0];
        }

        return null;
    }

}