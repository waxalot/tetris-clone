import { UIObject } from "../ui/uiObject";
import { UILabel } from "../ui/uiLabel";
import { Constants } from "../constants";
import { UIButton } from "../ui/uiButton";
import { Scene } from "./scene";
import { GameScene } from "./gameScene";
import { Engine } from "../engine/engine";
import { GameOptions } from "../gameOptions";

export class MainMenuScene extends Scene {

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasExt.CanvasRenderingContext2DExt) {
        super(canvas, ctx);

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
        startButton.click = this.onStart;
        this.uiObjects.push(startButton);
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
        let gameOptions = new GameOptions();
        gameOptions.level = 0;
        gameOptions.showPreview = true;
        let gameScene = new GameScene(this.canvas, this.ctx, gameOptions);
        this.engine.loadScene(gameScene);
    }
}