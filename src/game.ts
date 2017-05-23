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

    public constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('board');
        this.ctx = this.canvas.getContext('2d');

        let gameContainer = document.getElementById('gameContainer');
        gameContainer.addEventListener("keydown", this.handleKeyDown);

        this.init();
        this.start();
    }

    private init = () => {
        this.initBoard();
        this.initCanvas();
    }

    private start = () => {
        this.initGameLoop();
    }

    private handleKeyDown = (e: KeyboardEvent) => {
        switch (e.keyCode) {
            case 37: {
                // Left
                this.board.moveStoneLeft();
                break;
            }
            case 38: {
                // Up
                this.board.instantDown();
                break;
            }
            case 39: {
                // Right
                this.board.moveStoneRight();
                break;
            }
            case 40: {
                // Down
                this.board.moveStoneDown();
                break;
            }
            case 65: {
                // Rotate CW
                this.board.tryRotateCW();
                break;
            }
            case 68: {
                // Rotate CCW
                this.board.tryRotateCCW();
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

    public reset() {
        clearInterval(this.gameLoopIntervalId);
        this.clear();
        this.init();
        this.start();
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
        this.board.moveStoneDown();
    }

    private clear = () => {
        this.ctx.fillStyle = "#DADADA";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private draw = () => {
        this.clear();
        this.board.draw(this.ctx);
    }

}