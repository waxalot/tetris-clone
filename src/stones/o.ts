import { Stone } from "../stone";
import { Blocks } from "../blocks";
import { StonePosition } from "../stonePosition";

export class O extends Stone {

    public constructor() {
        super([new StonePosition(4, 0), new StonePosition(5, 0), new StonePosition(4, 1), new StonePosition(5, 1)], Blocks.o);
    }

}