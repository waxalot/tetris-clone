import { UIObject } from "../ui/uiObject";
import { UILabel } from "../ui/uiLabel";
import { Constants } from "../constants";
import { UIButton } from "../ui/uiButton";
import { Scene } from "./scene";
import { GameScene } from "./gameScene";
import { Engine } from "../engine/engine";
import { GameOptions } from "../gameOptions";
import { GameTypeMenuScene } from "./gameTypeMenuScene";

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

        this.createNavigationButtons();
    }

    private createNavigationButtons() {
        // Start button
        let start1PlayerButton = new UIButton();
        start1PlayerButton.backgroundColor = '#bef441';
        start1PlayerButton.text = Constants.MENU_1PLAYER;
        start1PlayerButton.font = 'Verdana';
        start1PlayerButton.fontSize = 40;
        start1PlayerButton.width = 180;
        start1PlayerButton.height = 50;
        start1PlayerButton.x = Constants.CANVAS_WIDTH * 0.5 - start1PlayerButton.width * 0.5;
        start1PlayerButton.y = Constants.CANVAS_HEIGHT * 0.5 - start1PlayerButton.height * 0.5;
        start1PlayerButton.click = this.onStart1Player;
        this.uiObjects.push(start1PlayerButton);
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

    private onStart1Player = () => {
        let gameTypeMenuScene = new GameTypeMenuScene(this.canvas, this.ctx);
        this.engine.loadScene(gameTypeMenuScene);
    }
}