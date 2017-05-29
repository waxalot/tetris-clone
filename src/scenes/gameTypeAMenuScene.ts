import { UIObject } from "../ui/uiObject";
import { UILabel } from "../ui/uiLabel";
import { Constants } from "../constants";
import { UIButton } from "../ui/uiButton";
import { Scene } from "./scene";
import { GameScene } from "./gameScene";
import { Engine } from "../engine/engine";
import { GameOptions } from "../gameOptions";
import { GameTypes } from "../gameTypes";

export class GameTypeAMenuScene extends Scene {

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasExt.CanvasRenderingContext2DExt) {
        super(canvas, ctx);

        let gameTypeLabel = new UILabel();
        gameTypeLabel.text = Constants.MENU_GAMETYPE_A;
        gameTypeLabel.font = 'Verdana';
        gameTypeLabel.fontSize = 60;
        gameTypeLabel.color = '#ffffff'
        gameTypeLabel.x = Constants.CANVAS_WIDTH * 0.5 - gameTypeLabel.width * 0.5;
        gameTypeLabel.y = Constants.CANVAS_HEIGHT * 0.2 - gameTypeLabel.height * 0.5;
        this.uiObjects.push(gameTypeLabel);

        let levelLabel = new UILabel();
        levelLabel.text = Constants.GAME_LEVEL;
        levelLabel.font = 'Verdana';
        levelLabel.fontSize = 40;
        levelLabel.color = '#ffffff'
        levelLabel.x = Constants.CANVAS_WIDTH * 0.5 - levelLabel.width * 0.5;
        levelLabel.y = Constants.CANVAS_HEIGHT * 0.5 - levelLabel.height * 0.5;
        this.uiObjects.push(levelLabel);

        // Create level selection buttons
        let rowIndex = 0;
        let colIndex = 0;
        for (let i = 0; i <= 9; i++) {
            if (i % 5 === 0) {
                rowIndex++;
                colIndex = 0;
            }
            this.createLevelButton(i, Constants.CANVAS_WIDTH * (0.27 + colIndex * 0.1), Constants.CANVAS_HEIGHT * (0.55 + rowIndex * 0.1));
            colIndex++;
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
            this.onStart(level);
        }
        this.uiObjects.push(levelButton);
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

    private onStart = (level: number) => {
        let gameOptions = new GameOptions();
        gameOptions.gameType = GameTypes.A;
        gameOptions.level = level;
        gameOptions.showPreview = true;
        let gameScene = new GameScene(this.canvas, this.ctx, gameOptions);
        this.engine.loadScene(gameScene);
    }

}