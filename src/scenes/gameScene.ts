import { Scene } from "./scene";
import { Constants } from "../constants";
import { Board } from "../board";
import { Key } from "../key";
import { GameOptions } from "../gameOptions";
import { StonePosition } from "../stonePosition";

export class GameScene extends Scene {

    private board: Board;
    private infoWidth: number;

    private isGameOver: boolean;
    private isPaused: boolean;

    private score: number;
    private level: number;
    private lines: number;

    private levelSpeedMS: number;
    private levelFrames: number[];
    private tickTimer: number;

    private readonly KEYBOARD_SCANNING_TIME_MS = 100;
    private keyHelper: Key;
    private keyboardScanningTimer: number;

    private gameOptions: GameOptions;

    private previewWidth = 140;
    private previewHeight = 90;
    private previewPosX: number;
    private previewPosY: number;

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasExt.CanvasRenderingContext2DExt, gameOptions: GameOptions) {
        super(canvas, ctx);

        this.gameOptions = gameOptions;

        this.initBoard();

        this.keyHelper = new Key();
        this.keyboardScanningTimer = this.KEYBOARD_SCANNING_TIME_MS;

        canvas.addEventListener('keyup', (e: KeyboardEvent) => { this.keyHelper.onKeyUp(e); }, false);
        canvas.addEventListener('keydown', (e: KeyboardEvent) => {

            if (this.isGameOver) {
                return;
            }

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
                    case Key.m: {
                        // Switch preview mode
                        this.gameOptions.showPreview = !this.gameOptions.showPreview;
                        break;
                    }
                    case Key.UP: {
                        // Instant down
                        this.board.instantDown();
                        break;
                    }
                    default: {
                        this.keyHelper.onKeyDown(e);
                        break;
                    }
                }
            }
        }, false);

        this.initLevelFrames();
        this.init();
    }

    private init() {
        this.score = 0;
        this.lines = 0;

        this.level = this.gameOptions.level;
        this.setLevel(this.level);
    }

    public update = (dt: number) => {

        if (this.isGameOver) {
            return;
        }

        if (!this.isPaused) {
            // Keyboard input
            this.keyboardScanningTimer -= dt;
            if (this.keyboardScanningTimer <= 0) {
                this.handleKeyDown();

                this.keyboardScanningTimer = this.KEYBOARD_SCANNING_TIME_MS;
            }

            // World tick
            this.tickTimer -= dt;
            if (this.tickTimer <= 0) {

                if (!this.keyHelper.isDown(Key.DOWN)) {
                    // A game step can be performed
                    this.performWorldStep();
                }

                this.tickTimer = this.levelSpeedMS;
            }
        }

    }

    public draw(): void {
        this.clearBoard();
        if (this.isPaused) {
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.font = "50px Arial";
            this.ctx.fillText(Constants.GAME_PAUSE, 80, 250);
        }
        else {
            this.board.draw(this.ctx);
        }

        this.clearInfo();
        this.drawText();
        this.drawStonePreview();
    }

    private performWorldStep = () => {
        this.board.moveStoneDown();
    }

    private onGameOver = () => {
        this.isGameOver = true;
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

        this.levelSpeedMS = (1000 / 60) * tempFrames;
        this.tickTimer = this.levelSpeedMS;
    }

    private drawText = () => {
        this.ctx.fillStyle = "#273d60";

        this.ctx.font = "30px Arial";
        this.ctx.fillText(Constants.GAME_SCORE, this.board.width + 20, 100);
        this.ctx.fillText(this.score.toString(), this.board.width + 20, 130);

        this.ctx.fillText(Constants.GAME_LEVEL, this.board.width + 20, 190);
        this.ctx.fillText(this.level.toString(), this.board.width + 20, 220);

        this.ctx.fillText(Constants.GAME_LINES, this.board.width + 20, 280);
        this.ctx.fillText(this.lines.toString(), this.board.width + 20, 310);
    }

    private drawStonePreview = () => {

        this.ctx.fillStyle = "#000000";
        this.ctx.strokeRect(this.previewPosX, this.previewPosY, this.previewWidth, this.previewHeight);
        if (this.gameOptions.showPreview) {
            let tempStone = this.board.getNextStone();
            if (tempStone) {
                let offsetPosition = new StonePosition(this.previewPosX / Constants.BLOCK_UNIT_SIZE - 2.5, this.previewPosY / Constants.BLOCK_UNIT_SIZE + 0.5);
                tempStone.draw(this.ctx, offsetPosition);
            }
        }
    }

    private clearBoard = () => {
        this.ctx.fillStyle = "#324487";
        this.ctx.fillRect(0, 0, this.board.width, this.canvas.height);
    }

    private clearInfo = () => {
        this.ctx.fillStyle = "#EEEEEE";
        this.ctx.fillRect(this.board.width, 0, this.infoWidth, this.canvas.height);
    }

    private initBoard() {
        this.infoWidth = 200;

        this.board = new Board();
        this.board.gameOverCallback = this.onGameOver;
        this.board.removeLinesCallback = this.onRemoveLines;

        this.previewPosX = this.board.width + this.infoWidth * 0.5 - this.previewWidth * 0.5;
        this.previewPosY = this.board.height - this.previewHeight - 40;
    }

    private pause = () => {
        this.isPaused = !this.isPaused;
    }

}