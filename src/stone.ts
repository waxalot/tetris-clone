import { Blocks } from "./blocks";
import { StonePosition } from "./stonePosition";
import { RotationDirections } from "./rotationDirections";
import { Constants } from "./constants";
import { I, J, L, O, S, T, Z } from "./stones";
import { Board } from "./board";

export abstract class Stone {

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

    public tryRotateCCW(board: Board): void {
        this.tryRotate(RotationDirections.ccw, board);
    }

    public tryRotateCW(board: Board): void {
        this.tryRotate(RotationDirections.cw, board);
    }

    public draw = (ctx: CanvasRenderingContext2D) => {
        this.positions.forEach((position) => {
            this.drawBlock(ctx, position.x, position.y);
        });
    }

    public abstract drawBlock(ctx: CanvasRenderingContext2D, x: number, y: number): void;

    private tryRotate(direction: RotationDirections, board: Board): void {
        if (!this.positions || this.positions.length === 0 || !this.pivotPosition || direction === RotationDirections.undefined) {
            return;
        }

        let newPositions = new Array<StonePosition>(this.positionsCount);

        // Calculate temporary new positions, which will be checked later for validity.
        for (let i = 0; i < this.positionsCount; i++) {
            // Calculate relative offset from the current position to the pivot position.
            let vRelX = this.positions[i].x - this.pivotPosition.x;
            let vRelY = this.positions[i].y - this.pivotPosition.y;

            let vTransformedX: number;
            let vTransformedY: number;
            if (direction === RotationDirections.cw) {
                // Multiply the relative vector with the rotation matrix.
                // [ 0  1 ]
                // [-1  0 ]
                vTransformedX = vRelY;
                vTransformedY = vRelX * (-1);
            }
            else {
                // Multiply the relative vector with the rotation matrix.
                // [ 0 -1 ]
                // [ 1  0 ]
                vTransformedX = vRelY * (-1);
                vTransformedY = vRelX;
            }

            // Now calculate the new final position
            newPositions[i] = new StonePosition(this.pivotPosition.x + vTransformedX, this.pivotPosition.y + vTransformedY);
        }

        // Now check if all new positions are valid positions.
        let canRotate = true;
        for (let i = 0; i < this.positionsCount; i++) {
            if (newPositions[i].x < 0 || newPositions[i].x >= Constants.BOARD_WIDTH ||
                newPositions[i].y < 0 ||
                board.doesPositionCollide(newPositions[i].x, newPositions[i].y)) {
                canRotate = false;
                break;
            }
        }

        // If all positions are valid, then update the old positions with the new found ones.
        if (canRotate) {
            for (let i = 0; i < this.positionsCount; i++) {
                this.positions[i].x = newPositions[i].x;
                this.positions[i].y = newPositions[i].y;
            }

            if (direction === RotationDirections.cw) {
                this.lastRotationDirection = RotationDirections.cw;
            } else if (direction === RotationDirections.ccw) {
                this.lastRotationDirection = RotationDirections.ccw;
            } else {
                this.lastRotationDirection = RotationDirections.undefined;
            }
        }
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