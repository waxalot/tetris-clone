import { Stone } from "../stone";
import { Blocks } from "../blocks";
import { StonePosition } from "../stonePosition";
import { Constants } from "../constants";

export class T extends Stone {

    public constructor() {
        super([new StonePosition(3, 0), new StonePosition(4, 0, true), new StonePosition(5, 0), new StonePosition(4, 1)], Blocks.t);
    }

    public drawBlock(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.fillStyle = "#000000";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE, y * Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE);
        ctx.clearRect(x * Constants.BLOCK_UNIT_SIZE + 5, y * Constants.BLOCK_UNIT_SIZE + 5, Constants.BLOCK_UNIT_SIZE - 10, Constants.BLOCK_UNIT_SIZE - 10);
        ctx.fillStyle = "#888888";
        ctx.beginPath();
        ctx.arc((x * Constants.BLOCK_UNIT_SIZE) + Constants.BLOCK_UNIT_SIZE * 0.5, (y * Constants.BLOCK_UNIT_SIZE) + Constants.BLOCK_UNIT_SIZE * 0.5, 5, 0, 360);
        ctx.fill();
    }

}