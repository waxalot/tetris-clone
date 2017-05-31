import { UIObject } from "../ui/uiObject";
import { UILabel } from "../ui/uiLabel";
import { Constants } from "../constants";
import { UIButton } from "../ui/uiButton";
import { Scene } from "./scene";
import { GameScene } from "./gameScene";
import { Engine } from "../engine/engine";
import { GameOptions } from "../gameOptions";
import { GameTypes } from "../gameTypes";
import { GameTypeAMenuScene } from "./gameTypeAMenuScene";
import { GameTypeBMenuScene } from "./gameTypeBMenuScene";
import { MainMenuScene } from "./mainMenuScene";

export class GameTypeMenuScene extends Scene {

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasExt.CanvasRenderingContext2DExt) {
        super(canvas, ctx);

        let gameTypeLabel = new UILabel();
        gameTypeLabel.text = Constants.MENU_GAMETYPE;
        gameTypeLabel.font = 'Verdana';
        gameTypeLabel.fontSize = 60;
        gameTypeLabel.color = '#ffffff'
        gameTypeLabel.x = Constants.CANVAS_WIDTH * 0.5 - gameTypeLabel.width * 0.5;
        gameTypeLabel.y = Constants.CANVAS_HEIGHT * 0.2 - gameTypeLabel.height * 0.5;
        this.uiObjects.push(gameTypeLabel);

        let typeAButton = new UIButton();
        typeAButton.text = Constants.MENU_GAMETYPE_A;
        typeAButton.font = 'Verdana';
        typeAButton.fontSize = 40;
        typeAButton.width = 190;
        typeAButton.height = 50;
        typeAButton.x = Constants.CANVAS_WIDTH * 0.25 - typeAButton.width * 0.5;
        typeAButton.y = Constants.CANVAS_HEIGHT * 0.5 - typeAButton.height * 0.5;
        typeAButton.click = this.onStartTypeA;
        this.uiObjects.push(typeAButton);

        let typeBButton = new UIButton();
        typeBButton.text = Constants.MENU_GAMETYPE_B;
        typeBButton.font = 'Verdana';
        typeBButton.fontSize = 40;
        typeBButton.width = 190;
        typeBButton.height = 50;
        typeBButton.x = Constants.CANVAS_WIDTH * 0.75 - typeBButton.width * 0.5;
        typeBButton.y = Constants.CANVAS_HEIGHT * 0.5 - typeBButton.height * 0.5;
        typeBButton.click = this.onStartTypeB;
        this.uiObjects.push(typeBButton);

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
            let mainMenuScene = new MainMenuScene(this.canvas, this.ctx);
            this.engine.loadScene(mainMenuScene);
        }
        this.uiObjects.push(backButton);
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

    private onStartTypeA = () => {
        let gameTypeAMenuScene = new GameTypeAMenuScene(this.canvas, this.ctx);
        this.engine.loadScene(gameTypeAMenuScene);
    }

    private onStartTypeB = () => {
        let gameTypeBMenuScene = new GameTypeBMenuScene(this.canvas, this.ctx);
        this.engine.loadScene(gameTypeBMenuScene);
    }
}