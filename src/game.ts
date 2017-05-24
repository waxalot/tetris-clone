import { Stone } from "./stone";
import { StonePosition } from "./stonePosition";
import { Blocks } from "./blocks";
import { I, J, L, O, S, T, Z } from "./stones";
import { Constants } from "./constants";
import { Board } from "./board";
import { Key } from "./key";


export class Game {

    private static KEYBOARD_SCANNING_TIME_MS = 100;

    private static PAUSE = "Pause";
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
    private isPaused: boolean;

    private keyHelper: Key;
    private keyboardScanningTimer: number;

    public constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('board');
        this.ctx = this.canvas.getContext('2d');

        this.keyHelper = new Key();
        this.keyboardScanningTimer = Game.KEYBOARD_SCANNING_TIME_MS;


        let gameContainer = document.getElementById('gameContainer');

        gameContainer.addEventListener('keyup', (e: KeyboardEvent) => { this.keyHelper.onKeyUp(e); }, false);
        gameContainer.addEventListener('keydown', (e: KeyboardEvent) => {

            if (e.keyCode === Key.p) {
                this.pause();
            } else if (!this.isPaused) {
                switch (e.keyCode) {
                    case Key.LEFT: {
                        this.board.moveStoneLeft();
                        this.keyHelper.onKeyDown(e);
                        break;
                    }
                    case Key.RIGHT: {
                        this.board.moveStoneRight();
                        this.keyHelper.onKeyDown(e);
                        break;
                    }
                    case Key.a: {
                        // Rotate CW
                        this.board.tryRotateCW();
                        break;
                    }
                    case Key.d: {
                        // Rotate CCW
                        this.board.tryRotateCCW();
                        break;
                    }
                    default: {
                        this.keyHelper.onKeyDown(e);
                        break;
                    }
                }
            }
        }, false);

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

    private pause = () => {
        this.isPaused = !this.isPaused;
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

    private handleKeyDown = () => {
        if (this.isGameOver) {
            return;
        }

        if (this.keyHelper.isDown(Key.UP)) {
            this.board.instantDown();
        }
        if (this.keyHelper.isDown(Key.LEFT) > 200) {
            this.board.moveStoneLeft();
        }
        if (this.keyHelper.isDown(Key.RIGHT) > 200) {
            this.board.moveStoneRight();
        }
        if (this.keyHelper.isDown(Key.DOWN)) {
            this.board.moveStoneDown();
        }
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

        if (!this.isPaused) {
            // Keyboard input
            this.keyboardScanningTimer -= dt;
            if (this.keyboardScanningTimer <= 0) {
                this.handleKeyDown();

                this.keyboardScanningTimer = Game.KEYBOARD_SCANNING_TIME_MS;
            }

            // World tick
            this.tickTimer -= dt;
            if (this.tickTimer <= 0) {

                if (!this.keyHelper.isDown(Key.DOWN)) {
                    // A game step can be performed
                    //this.performWorldStep();
                }

                this.tickTimer = this.levelSpeedMS;
            }
        }

        this.lastUpdateTime = Date.now();
    }

    private performWorldStep = () => {
        this.board.moveStoneDown();
    }

    private clearBoard = () => {
        this.ctx.fillStyle = "#324487";
        this.ctx.fillRect(0, 0, this.boardWidth, this.canvas.height);
    }

    private clearInfo = () => {
        this.ctx.fillStyle = "#EEEEEE";
        this.ctx.fillRect(this.boardWidth, 0, this.infoWidth, this.canvas.height);
    }

    private draw = () => {

        this.clearBoard();
        if (this.isPaused) {
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.font = "50px Arial";
            this.ctx.fillText(Game.PAUSE, 80, 250);
        }
        else {
            this.board.draw(this.ctx);
        }

        this.clearInfo();
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