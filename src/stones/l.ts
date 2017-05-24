import { Stone } from "../stone";
import { Blocks } from "../blocks";
import { StonePosition } from "../stonePosition";
import { Constants } from "../constants";

export class L extends Stone {

    public constructor() {
        super([new StonePosition(3, 0), new StonePosition(4, 0, true), new StonePosition(5, 0), new StonePosition(3, 1)], Blocks.l);
    }

    public drawBlock(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.fillStyle = "#000000";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE, y * Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE);
        ctx.fillStyle = "#fca002";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE + Constants.STONE_BORDER_SIZE, y * Constants.BLOCK_UNIT_SIZE + Constants.STONE_BORDER_SIZE, Constants.BLOCK_UNIT_SIZE - 6, Constants.BLOCK_UNIT_SIZE - 6);
        ctx.fillStyle = "#d84800";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE + 10, y * Constants.BLOCK_UNIT_SIZE + 10, Constants.BLOCK_UNIT_SIZE - 20, Constants.BLOCK_UNIT_SIZE - 20);
    }

}