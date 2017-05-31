import { UIObject } from "../ui/uiObject";
import { UILabel } from "../ui/uiLabel";
import { Constants } from "../constants";
import { UIButton } from "../ui/uiButton";
import { Scene } from "./scene";
import { GameScene } from "./gameScene";
import { Engine } from "../engine/engine";
import { GameOptions } from "../gameOptions";
import { GameTypes } from "../gameTypes";
import { GameTypeMenuScene } from "./gameTypeMenuScene";

export class GameTypeBMenuScene extends Scene {

    private gameOptions: GameOptions;
    private levelButtons: Array<UIObject>;
    private heightButtons: Array<UIObject>;


    /**
     * Creates an instance of GameTypeBMenuScene.
     * @param {HTMLCanvasElement} canvas 
     * @param {CanvasExt.CanvasRenderingContext2DExt} ctx 
     * 
     * @memberof GameTypeBMenuScene
     */
    public constructor(canvas: HTMLCanvasElement, ctx: CanvasExt.CanvasRenderingContext2DExt) {
        super(canvas, ctx);

        this.levelButtons = new Array<UIObject>();
        this.heightButtons = new Array<UIObject>();

        this.gameOptions = new GameOptions();
        this.gameOptions.gameType = GameTypes.B;
        this.gameOptions.level = 0;
        this.gameOptions.height = 0;
        this.gameOptions.showPreview = true;

        let gameTypeLabel = new UILabel();
        gameTypeLabel.text = Constants.MENU_GAMETYPE_B;
        gameTypeLabel.font = 'Verdana';
        gameTypeLabel.fontSize = 60;
        gameTypeLabel.color = '#ffffff'
        gameTypeLabel.x = Constants.CANVAS_WIDTH * 0.5 - gameTypeLabel.width * 0.5;
        gameTypeLabel.y = Constants.CANVAS_HEIGHT * 0.15 - gameTypeLabel.height * 0.5;
        this.uiObjects.push(gameTypeLabel);

        let levelLabel = new UILabel();
        levelLabel.text = Constants.GAME_LEVEL;
        levelLabel.font = 'Verdana';
        levelLabel.fontSize = 40;
        levelLabel.color = '#ffffff'
        levelLabel.x = Constants.CANVAS_WIDTH * 0.31 - levelLabel.width * 0.5;
        levelLabel.y = Constants.CANVAS_HEIGHT * 0.35 - levelLabel.height * 0.5;
        this.uiObjects.push(levelLabel);

        // Create level selection buttons
        let rowIndexLevel = 0;
        let colIndexLevel = 0;
        for (let i = 0; i <= 9; i++) {
            if (i % 5 === 0) {
                rowIndexLevel++;
                colIndexLevel = 0;
            }
            this.createLevelButton(i, Constants.CANVAS_WIDTH * (0.07 + colIndexLevel * 0.1), Constants.CANVAS_HEIGHT * (0.35 + rowIndexLevel * 0.1));
            colIndexLevel++;
        }

        let heightLabel = new UILabel();
        heightLabel.text = Constants.GAME_HEIGHT;
        heightLabel.font = 'Verdana';
        heightLabel.fontSize = 40;
        heightLabel.color = '#ffffff'
        heightLabel.x = Constants.CANVAS_WIDTH * 0.79 - heightLabel.width * 0.5;
        heightLabel.y = Constants.CANVAS_HEIGHT * 0.35 - heightLabel.height * 0.5;
        this.uiObjects.push(heightLabel);

        // Create height selection buttons
        let rowIndexHeight = 0;
        let colIndexHeight = 0;
        for (let i = 0; i <= 5; i++) {
            if (i % 3 === 0) {
                rowIndexHeight++;
                colIndexHeight = 0;
            }
            this.createHeightButton(i, Constants.CANVAS_WIDTH * (0.66 + colIndexHeight * 0.1), Constants.CANVAS_HEIGHT * (0.35 + rowIndexHeight * 0.1));
            colIndexHeight++;
        }

        this.createNavigationButtons();
    }

    private createNavigationButtons() {
        // Back button
        let backButton = new UIButton();
        backButton.text = Constants.MENU_BACK;
        backButton.backgroundColor = '#bef441';
        backButton.font = 'Verdana';
        backButton.fontSize = 40;
        backButton.width = 170;
        backButton.height = 50;
        backButton.x = Constants.CANVAS_WIDTH * 0.19 - backButton.width * 0.5;
        backButton.y = Constants.CANVAS_HEIGHT * 0.88;
        backButton.click = () => {
            let gameTypeMenuScene = new GameTypeMenuScene(this.canvas, this.ctx);
            this.engine.loadScene(gameTypeMenuScene);
        }
        this.uiObjects.push(backButton);

        // Play button
        let playButton = new UIButton();
        playButton.text = Constants.MENU_PLAY;
        playButton.backgroundColor = '#bef441';
        playButton.font = 'Verdana';
        playButton.fontSize = 40;
        playButton.width = 170;
        playButton.height = 50;
        playButton.x = Constants.CANVAS_WIDTH * 0.81 - playButton.width * 0.5;
        playButton.y = Constants.CANVAS_HEIGHT * 0.88;
        playButton.click = () => {
            let gameScene = new GameScene(this.canvas, this.ctx, this.gameOptions);
            this.engine.loadScene(gameScene);
        }
        this.uiObjects.push(playButton);
    }

    private createLevelButton(level: number, x: number, y: number) {
        let levelButton = new UIButton();
        if (this.gameOptions.level === this.levelButtons.length) {
            levelButton.borderSize = 2;
        }
        levelButton.borderColor = '#ff0000';
        levelButton.text = level.toString();
        levelButton.font = 'Verdana';
        levelButton.fontSize = 40;
        levelButton.width = 40;
        levelButton.height = 40;
        levelButton.x = x;
        levelButton.y = y;
        levelButton.click = () => {
            this.levelButtons.forEach((tempLevelButton: UIButton) => {
                tempLevelButton.borderSize = 0;
            });
            levelButton.borderSize = 2;
            this.gameOptions.level = level;
        }
        this.levelButtons.push(levelButton);
        this.uiObjects.push(levelButton);
    }

    private createHeightButton(height: number, x: number, y: number) {
        let heightButton = new UIButton();
        if (this.gameOptions.height === this.heightButtons.length) {
            heightButton.borderSize = 2;
        }
        heightButton.borderColor = '#ff0000';
        heightButton.text = height.toString();
        heightButton.font = 'Verdana';
        heightButton.fontSize = 40;
        heightButton.width = 40;
        heightButton.height = 40;
        heightButton.x = x;
        heightButton.y = y;
        heightButton.click = () => {
            this.heightButtons.forEach((tempHeightButton: UIButton) => {
                tempHeightButton.borderSize = 0;
            });
            heightButton.borderSize = 2;
            this.gameOptions.height = height;
        }
        this.heightButtons.push(heightButton);
        this.uiObjects.push(heightButton);
    }

    /**
     * Draws the scene.
     * 
     * @memberof MainMenuScene
     */
    public draw(): void {

        // draw background
        this.ctx.fillStyle = "#273d60";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // draw all UI objects (buttons, etc...);
        this.uiObjects.forEach((uiObject: UIObject) => {
            uiObject.draw(this.ctx);
        });
    }

    private onStart = () => {
        let gameScene = new GameScene(this.canvas, this.ctx, this.gameOptions);
        this.engine.loadScene(gameScene);
    }

}