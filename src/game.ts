import { Stone } from "./stone";
import { StonePosition } from "./stonePosition";
import { Blocks } from "./blocks";
import { I, J, L, O, S, T, Z } from "./stones";
import { Constants } from "./constants";
import { Board } from "./board";


export class Game {

    private static TITLE = "Tetris";
    private static SCORE = "Score";
    private static LEVEL = "Level";
    private static LINES = "Lines";

    private score: number;
    private level: number;
    private lines: number;

    private levelSpeedMS: number;
    private levelFrames: number[];
    private tickTimer: number;
    private lastUpdateTime: number;

    private gameLoopIntervalId: any;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private board: Board;
    private boardWidth: number;
    private infoWidth: number;
    private isGameOver: boolean;

    public constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('board');
        this.ctx = this.canvas.getContext('2d');

        let gameContainer = document.getElementById('gameContainer');
        gameContainer.addEventListener("keydown", this.handleKeyDown);

        this.init();
        this.start();
    }

    private init = () => {
        this.initLevelFrames();
        this.initBoard();
        this.initCanvas();
    }

    private start = () => {
        this.isGameOver = false;
        this.score = 0;
        this.level = 0;
        this.lines = 0;
        this.initGameLoop();
    }

    private onGameOver = () => {
        this.isGameOver = true;
        console.log("game over");

        // Stop the game loop
        clearInterval(this.gameLoopIntervalId);

        this.draw();
    }

    private onRemoveLines = (numberOfLines: number) => {
        this.lines += numberOfLines;

        let newLevel = Math.floor(this.lines / 10);
        if (newLevel > this.level) {
            this.increaseLevel();
        }

        this.score += this.getScore(numberOfLines);
    }

    private increaseLevel() {
        this.level++;
        this.setLevel(this.level);
    }

    private getScore(numberOfLines: number): number {
        let result: number = 0;

        switch (numberOfLines) {
            case 1: {
                result = 40 * (this.level + 1);
                break;
            }
            case 2: {
                result = 100 * (this.level + 1);
                break;
            }
            case 3: {
                result = 300 * (this.level + 1);
                break;
            }
            case 4: {
                result = 1200 * (this.level + 1);
                break;
            }
        }

        return result;
    }

    private handleKeyDown = (e: KeyboardEvent) => {
        if (this.isGameOver) {
            return;
        }

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
        this.setLevel(this.level);

        let fps = 60;
        // Start the game loop
        this.gameLoopIntervalId = setInterval(this.run, 1000 / fps);
    }

    private initLevelFrames() {
        this.levelFrames = new Array<number>();
        this.levelFrames.push(53);
        this.levelFrames.push(49);
        this.levelFrames.push(45);
        this.levelFrames.push(41);
        this.levelFrames.push(37);
        this.levelFrames.push(33);
        this.levelFrames.push(28);
        this.levelFrames.push(22);
        this.levelFrames.push(17);
        this.levelFrames.push(11);
        this.levelFrames.push(10);
        this.levelFrames.push(9);
        this.levelFrames.push(8);
        this.levelFrames.push(7);
        this.levelFrames.push(6);
        this.levelFrames.push(6);
        this.levelFrames.push(5);
        this.levelFrames.push(5);
        this.levelFrames.push(4);
        this.levelFrames.push(4);
        this.levelFrames.push(3);
    }

    private setLevel(level: number): void {

        let tempFrames: number;
        if (level < this.levelFrames.length) {
            tempFrames = this.levelFrames[level];
        } else {
            tempFrames = this.levelFrames[this.levelFrames.length - 1];
        }
        console.log(tempFrames);

        this.levelSpeedMS = (1000 / 60) * tempFrames;
        this.tickTimer = this.levelSpeedMS;
    }

    public reset() {
        clearInterval(this.gameLoopIntervalId);
        this.clearBoard();
        this.clearInfo();
        this.init();
        this.start();
    }


    private initBoard() {
        this.board = new Board();
        this.board.gameOverCallback = this.onGameOver;
        this.board.removeLinesCallback = this.onRemoveLines;
    }

    private initCanvas() {
        // Init Canvas
        this.boardWidth = Constants.BOARD_WIDTH * Constants.BLOCK_UNIT_SIZE;
        this.infoWidth = 200;
        this.canvas.width = this.boardWidth + this.infoWidth;
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

    private clearBoard = () => {
        this.ctx.fillStyle = "#DADADA";
        this.ctx.fillRect(0, 0, this.boardWidth, this.canvas.height);
    }

    private clearInfo = () => {
        this.ctx.fillStyle = "#EEEEEE";
        this.ctx.fillRect(this.boardWidth, 0, this.infoWidth, this.canvas.height);
    }

    private draw = () => {
        this.clearBoard();
        this.clearInfo();
        this.board.draw(this.ctx);
        this.drawText();
    }

    private drawText = () => {
        this.ctx.fillStyle = "#273d60";

        this.ctx.font = "30px Arial";
        this.ctx.fillText(Game.SCORE, this.boardWidth + 20, 100);
        this.ctx.fillText(this.score.toString(), this.boardWidth + 20, 130);

        this.ctx.fillText(Game.LEVEL, this.boardWidth + 20, 190);
        this.ctx.fillText(this.level.toString(), this.boardWidth + 20, 220);

        this.ctx.fillText(Game.LINES, this.boardWidth + 20, 280);
        this.ctx.fillText(this.lines.toString(), this.boardWidth + 20, 310);
    }

}