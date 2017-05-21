import { Stone } from "../stone";
import { Blocks } from "../blocks";
import { StonePosition } from "../stonePosition";

export class J extends Stone {

    public constructor() {
        super([new StonePosition(3, 0), new StonePosition(4, 0, true), new StonePosition(5, 0), new StonePosition(5, 1)], Blocks.j);
    }

}