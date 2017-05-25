/// <reference path="./canvasRenderingContext2D.d.ts" />

import { Stone } from "./stone";
import { StonePosition } from "./stonePosition";
import { Blocks } from "./blocks";
import { I, J, L, O, S, T, Z } from "./stones";
import { Constants } from "./constants";
import { Board } from "./board";
import { Key } from "./key";
import { GameStates } from "./gameStates";
import { UIObject } from "./ui/uiObject";
import { UIButton } from "./ui/uiButton";
import { UILabel } from "./ui/uiLabel";


export class Game {

    private static KEYBOARD_SCANNING_TIME_MS = 100;

    private currentGameState: GameStates;

    private score: number;
    private level: number;
    private lines: number;

    private levelSpeedMS: number;
    private levelFrames: number[];
    private tickTimer: number;
    private lastUpdateTime: number;

    private gameLoopIntervalId: any;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasExt.CanvasRenderingContext2DExt;

    private board: Board;
    private boardWidth: number;
    private infoWidth: number;

    private isGameOver: boolean;
    private isPaused: boolean;

    private keyHelper: Key;
    private keyboardScanningTimer: number;

    private uiObjects: Array<UIObject>;

    public constructor() {
        this.uiObjects = new Array<UIObject>();

        this.initCanvas();

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

        this.init();
    }

    private init = () => {
        this.initGameLoop();
        this.initMenuUI();
        this.showMenu();
    }

    private initMenuUI = () => {

        let titleLabel = new UILabel();
        titleLabel.text = Constants.TITLE;
        titleLabel.font = 'Verdana';
        titleLabel.fontSize = 60;
        titleLabel.color = '#ffffff'
        titleLabel.x = Constants.CANVAS_WIDTH * 0.5 - titleLabel.width * 0.5;
        titleLabel.y = Constants.CANVAS_HEIGHT * 0.2 - titleLabel.height * 0.5;
        this.uiObjects.push(titleLabel);

        let startButton = new UIButton();
        startButton.text = Constants.MENU_START;
        startButton.font = 'Verdana';
        startButton.fontSize = 40;
        startButton.width = 200;
        startButton.height = 40;
        startButton.x = Constants.CANVAS_WIDTH * 0.5 - startButton.width * 0.5;
        startButton.y = Constants.CANVAS_HEIGHT * 0.5 - startButton.height * 0.5;
        startButton.click = this.start;
        this.uiObjects.push(startButton);

    }

    private showMenu() {
        this.currentGameState = GameStates.menu;
    }

    private start = (): void => {
        this.currentGameState = GameStates.gameRunning;

        this.initLevelFrames();
        this.initBoard();

        this.isGameOver = false;
        this.score = 0;
        this.level = 0;
        this.lines = 0;

        this.setLevel(this.level);
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
        this.init();
    }


    private initBoard() {
        this.boardWidth = Constants.BOARD_WIDTH * Constants.BLOCK_UNIT_SIZE;
        this.infoWidth = 200;

        this.board = new Board();
        this.board.gameOverCallback = this.onGameOver;
        this.board.removeLinesCallback = this.onRemoveLines;
    }

    private initCanvas() {
        this.canvas = <HTMLCanvasElement>document.getElementById('board');
        this.ctx = <CanvasExt.CanvasRenderingContext2DExt>this.canvas.getContext('2d');
        this.ctx.textBaseline = 'top';
        this.ctx.mouse = { x: 0, y: 0, clicked: false, down: false };

        this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
            this.ctx.mouse.x = e.offsetX;
            this.ctx.mouse.y = e.offsetY;
            this.ctx.mouse.clicked = e.which === 1 && !this.ctx.mouse.down;
            this.ctx.mouse.down = (e.which === 1);
        });
        this.canvas.addEventListener('mousedown', (e: MouseEvent) => {
            this.ctx.mouse.clicked = !this.ctx.mouse.down;
            this.ctx.mouse.down = true;
        });
        this.canvas.addEventListener('mouseup', (e: MouseEvent) => {
            this.ctx.mouse.down = false;
            this.ctx.mouse.clicked = false;
        });

        this.canvas.width = Constants.CANVAS_WIDTH;
        this.canvas.height = Constants.CANVAS_HEIGHT;
    }

    private run = () => {
        this.update();
        this.draw();
    }

    private update = () => {

        // Calculate delta time in milliseconds
        let dt = Date.now() - this.lastUpdateTime;

        if (this.currentGameState === GameStates.menu) {
            this.uiObjects.forEach((uiObject: UIObject) => {
                uiObject.update(this.ctx);
            });
        } else if (this.currentGameState === GameStates.gameRunning) {

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
                        this.performWorldStep();
                    }

                    this.tickTimer = this.levelSpeedMS;
                }
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

        if (this.currentGameState === GameStates.menu) {
            this.drawMenu();
        } else if (this.currentGameState === GameStates.gameRunning) {
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
        }
    }

    private drawText = () => {
        this.ctx.fillStyle = "#273d60";

        this.ctx.font = "30px Arial";
        this.ctx.fillText(Constants.GAME_SCORE, this.boardWidth + 20, 100);
        this.ctx.fillText(this.score.toString(), this.boardWidth + 20, 130);

        this.ctx.fillText(Constants.GAME_LEVEL, this.boardWidth + 20, 190);
        this.ctx.fillText(this.level.toString(), this.boardWidth + 20, 220);

        this.ctx.fillText(Constants.GAME_LINES, this.boardWidth + 20, 280);
        this.ctx.fillText(this.lines.toString(), this.boardWidth + 20, 310);
    }

    private drawMenu = () => {

        // draw background
        this.ctx.fillStyle = "#273d60";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // draw all UI objects (buttons, etc...);
        this.uiObjects.forEach((uiObject: UIObject) => {
            uiObject.draw(this.ctx);
        });

    }

}