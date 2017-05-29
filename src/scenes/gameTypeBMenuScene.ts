import { UIObject } from "../ui/uiObject";
import { UILabel } from "../ui/uiLabel";
import { Constants } from "../constants";
import { UIButton } from "../ui/uiButton";
import { Scene } from "./scene";
import { GameScene } from "./gameScene";
import { Engine } from "../engine/engine";
import { GameOptions } from "../gameOptions";
import { GameTypes } from "../gameTypes";

export class GameTypeBMenuScene extends Scene {

    private gameOptions: GameOptions;

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasExt.CanvasRenderingContext2DExt) {
        super(canvas, ctx);

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
        levelLabel.x = Constants.CANVAS_WIDTH * 0.5 - levelLabel.width * 0.5;
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
            this.createLevelButton(i, Constants.CANVAS_WIDTH * (0.27 + colIndexLevel * 0.1), Constants.CANVAS_HEIGHT * (0.35 + rowIndexLevel * 0.1));
            colIndexLevel++;
        }


        let heightLabel = new UILabel();
        heightLabel.text = Constants.GAME_HEIGHT;
        heightLabel.font = 'Verdana';
        heightLabel.fontSize = 40;
        heightLabel.color = '#ffffff'
        heightLabel.x = Constants.CANVAS_WIDTH * 0.5 - heightLabel.width * 0.5;
        heightLabel.y = Constants.CANVAS_HEIGHT * 0.67 - heightLabel.height * 0.5;
        this.uiObjects.push(heightLabel);

        // Create height selection buttons
        let rowIndexHeight = 0;
        let colIndexHeight = 0;
        for (let i = 0; i <= 5; i++) {
            if (i % 3 === 0) {
                rowIndexHeight++;
                colIndexHeight = 0;
            }
            this.createLevelButton(i, Constants.CANVAS_WIDTH * (0.36 + colIndexHeight * 0.1), Constants.CANVAS_HEIGHT * (0.66 + rowIndexHeight * 0.1));
            colIndexHeight++;
        }
    }

    private createLevelButton(level: number, x: number, y: number) {
        let levelButton = new UIButton();
        levelButton.text = level.toString();
        levelButton.font = 'Verdana';
        levelButton.fontSize = 40;
        levelButton.width = 40;
        levelButton.height = 40;
        levelButton.x = x;
        levelButton.y = y;
        levelButton.click = () => {
            this.gameOptions.level = level;
        }
        this.uiObjects.push(levelButton);
    }

    private createHeightButton(height: number, x: number, y: number) {
        let heightButton = new UIButton();
        heightButton.text = height.toString();
        heightButton.font = 'Verdana';
        heightButton.fontSize = 40;
        heightButton.width = 40;
        heightButton.height = 40;
        heightButton.x = x;
        heightButton.y = y;
        heightButton.click = () => {
            this.gameOptions.height = height;
        }
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