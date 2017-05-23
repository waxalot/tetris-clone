import { Stone } from "../stone";
import { Blocks } from "../blocks";
import { StonePosition } from "../stonePosition";
import { Constants } from "../constants";

export class O extends Stone {

    public constructor() {
        super([new StonePosition(4, 0), new StonePosition(5, 0), new StonePosition(4, 1), new StonePosition(5, 1)], Blocks.o);
    }

    public drawBlock(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.fillStyle = "#000000";
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE, y * Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE, Constants.BLOCK_UNIT_SIZE);
        ctx.clearRect(x * Constants.BLOCK_UNIT_SIZE + 5, y * Constants.BLOCK_UNIT_SIZE + 5, Constants.BLOCK_UNIT_SIZE - 10, Constants.BLOCK_UNIT_SIZE - 10);
        ctx.fillRect(x * Constants.BLOCK_UNIT_SIZE + 9, y * Constants.BLOCK_UNIT_SIZE + 9, Constants.BLOCK_UNIT_SIZE - 18, Constants.BLOCK_UNIT_SIZE - 18);
    }

}