import { Stone } from "./stone";
import { StonePosition } from "./stonePosition";
import { Blocks } from "./blocks";
import { I, J, L, O, S, T, Z } from "./stones";
import { Constants } from "./constants";
import { Board } from "./board";


export class Game {

    private levelSpeedMS = 1000;  // Smaller is faster is harder
    private tickTimer: number;
    private lastUpdateTime: number;

    private gameLoopIntervalId: any;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private board: Board;
    private currentStone: Stone;

    public constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('board');
        this.ctx = this.canvas.getContext('2d');

        let gameContainer = document.getElementById('gameContainer');
        gameContainer.addEventListener("keydown", this.handleKeyDown);

        this.initBoard();
        this.initCanvas();

        this.createStone();

        this.initGameLoop();
    }

    private handleKeyDown = (e: KeyboardEvent) => {
        switch (e.keyCode) {
            case 37: {
                // Left
                this.moveStoneLeft(this.currentStone);
                break;
            }
            case 38: {
                // Up
                this.instantDown(this.currentStone);
                break;
            }
            case 39: {
                // Right
                this.moveStoneRight(this.currentStone);
                break;
            }
            case 40: {
                // Down
                this.moveStoneDown(this.currentStone);
                break;
            }
            case 65: {
                // Rotate CW
                if (this.currentStone) {
                    this.currentStone.tryRotateCCW(this.board);
                }
                break;
            }
            case 68: {
                // Rotate CCW
                if (this.currentStone) {
                    this.currentStone.tryRotateCW(this.board);
                }
                break;
            }
        }

        e.preventDefault();
        e.stopPropagation();
    }

    private initGameLoop() {
        this.lastUpdateTime = Date.now();
        this.tickTimer = this.levelSpeedMS;

        let fps = 60;
        // Start the game loop
        this.gameLoopIntervalId = setInterval(this.run, 1000 / fps);
    }

    public stop() {
        this.levelSpeedMS = 10000000;
        //clearInterval(this.gameLoopIntervalId);

        //this.clear();
    }

    private instantDown = (stone: Stone) => {
        // TODO
    }

    private createStone() {
        let newStoneType: Blocks;
        newStoneType = Math.floor(Math.random() * 7) + 1;

        switch (newStoneType) {
            case Blocks.i: {
                this.currentStone = new I();
                break;
            }
            case Blocks.j: {
                this.currentStone = new J();
                break;
            }
            case Blocks.l: {
                this.currentStone = new L();
                break;
            }
            case Blocks.o: {
                this.currentStone = new O();
                break;
            }
            case Blocks.s: {
                this.currentStone = new S();
                break;
            }
            case Blocks.t: {
                this.currentStone = new T();
                break;
            }
            case Blocks.z: {
                this.currentStone = new Z();
                break;
            }
        }
    }

    public moveStoneLeft(stone: Stone) {
        if (!stone) {
            return;
        }

        // Check if the stone can be moved left
        for (let i = 0; i < stone.positions.length; i++) {
            if (stone.positions[i].x - 1 < 0 || this.board.doesPositionCollide(stone.positions[i].x - 1, stone.positions[i].y)) {
                return;
            }
        }
        // Move the stone left
        for (let i = 0; i < stone.positions.length; i++) {
            stone.positions[i].x--;
        }
    }

    private moveStoneRight(stone: Stone) {
        if (!stone) {
            return;
        }

        // Check if the stone can be moved right
        for (let i = 0; i < stone.positions.length; i++) {
            if (stone.positions[i].x + 1 >= Constants.BOARD_WIDTH || this.board.doesPositionCollide(stone.positions[i].x + 1, stone.positions[i].y)) {
                return;
            }
        }
        // Move the stone left
        for (let i = 0; i < stone.positions.length; i++) {
            stone.positions[i].x++;
        }
    }

    private moveStoneDown(stone: Stone) {
        if (!stone) {
            return;
        }

        // Check if the stone can be moved down
        for (let i = 0; i < stone.positions.length; i++) {
            if (stone.positions[i].y + 1 >= Constants.BOARD_HEIGHT || this.board.doesPositionCollide(stone.positions[i].x, stone.positions[i].y + 1)) {
                this.freezeStone();
                return;
            }
        }
        // Move the stone down
        for (let i = 0; i < stone.positions.length; i++) {
            stone.positions[i].y++;
        }
    }

    private initBoard() {
        this.board = new Board();
    }

    private initCanvas() {
        // Init Canvas
        this.canvas.width = Constants.BOARD_WIDTH * Constants.BLOCK_UNIT_SIZE;
        this.canvas.height = Constants.BOARD_HEIGHT * Constants.BLOCK_UNIT_SIZE;
    }

    private run = () => {
        this.update();
        this.draw();
    }

    private update = () => {
        // Calculate delta time in milliseconds
        let dt = Date.now() - this.lastUpdateTime;
        this.tickTimer -= dt;
        if (this.tickTimer <= 0) {

            // A game step can be performed
            this.performWorldStep();

            this.tickTimer = this.levelSpeedMS;
        }

        this.lastUpdateTime = Date.now();
    }

    private performWorldStep = () => {
        this.moveStoneDown(this.currentStone);
    }

    private clear = () => {
        this.ctx.fillStyle = "#DADADA";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private freezeStone = () => {
        this.board.freezeStone(this.currentStone);
        this.board.checkForFullLines();
        this.createStone();
    }

    private draw = () => {
        this.clear();
        this.board.draw(this.ctx);
        if (this.currentStone) {
            this.currentStone.draw(this.ctx);
        }
    }

}