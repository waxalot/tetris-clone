import { Stone } from "../stone";
import { Blocks } from "../blocks";
import { StonePosition } from "../stonePosition";
import { Constants } from "../constants";

export class J extends Stone {

    public constructor() {
        super([new StonePosition(3, 0), new StonePosition(4, 0, true), new StonePosition(5, 0), new StonePosition(5, 1)], Blocks.j);
    }

    public drawBlock(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.fillStyle = "#000000";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE, y * Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE);
        ctx.fillStyle = "#6c00b7";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE + Constants.STONE_BORDER_SIZE, y * Constants.BLOCK_UNIT_SIZE + Constants.STONE_BORDER_SIZE, Constants.BLOCK_UNIT_SIZE - 6, Constants.BLOCK_UNIT_SIZE - 6);
        ctx.fillStyle = "#9800ff";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE + 7, y * Constants.BLOCK_UNIT_SIZE + 7, Constants.BLOCK_UNIT_SIZE - 14, Constants.BLOCK_UNIT_SIZE - 14);
    }

}