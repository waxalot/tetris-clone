import { Constants } from "./constants";
import { MainMenuScene } from "./scenes/mainMenuScene";
import { Engine } from "./engine/engine";

export class Game {

    private engine: Engine;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasExt.CanvasRenderingContext2DExt;

    /**
     * Creates an instance of Game.
     * @param {HTMLElement} containerElement 
     * 
     * @memberof Game
     */
    public constructor(containerElement: HTMLElement) {
        if (!containerElement) {
            throw new ReferenceError('Game.constructor(): The container element is null or undefined');
        }

        this.engine = new Engine();
        this.engine.start();

        this.canvas = this.createCanvas();
        this.ctx = <CanvasExt.CanvasRenderingContext2DExt>this.canvas.getContext('2d');
        containerElement.appendChild(this.canvas);

        this.initCanvasEventListeners(this.canvas);
    }

    /**
     * Creates a new canvas.
     * 
     * @private
     * @returns {HTMLCanvasElement} 
     * 
     * @memberof Game
     */
    private createCanvas(): HTMLCanvasElement {
        let canvas = document.createElement('canvas');
        canvas.width = Constants.CANVAS_WIDTH;
        canvas.height = Constants.CANVAS_HEIGHT;
        canvas.tabIndex = 1;

        return canvas;
    }

    /**
     * Initializes all required event listeners for the canvas.
     * 
     * @private
     * @param {HTMLCanvasElement} canvas 
     * 
     * @memberof Game
     */
    private initCanvasEventListeners(canvas: HTMLCanvasElement): void {
        if (!canvas) {
            throw new ReferenceError('Game.initCanvas(): The canvas element is null or undefined');
        }

        this.ctx.textBaseline = 'top';
        this.ctx.mouse = { x: 0, y: 0, clicked: false, down: false };

        canvas.addEventListener('mousemove', (e: MouseEvent) => {
            this.ctx.mouse.x = e.offsetX;
            this.ctx.mouse.y = e.offsetY;
            this.ctx.mouse.clicked = e.which === 1 && !this.ctx.mouse.down;
            this.ctx.mouse.down = (e.which === 1);
        });
        canvas.addEventListener('mousedown', (e: MouseEvent) => {
            this.ctx.mouse.clicked = !this.ctx.mouse.down;
            this.ctx.mouse.down = true;
        });
        canvas.addEventListener('mouseup', (e: MouseEvent) => {
            this.ctx.mouse.down = false;
            this.ctx.mouse.clicked = false;
        });
    }


    /**
     * Shows the main menu.
     * 
     * 
     * @memberof Game
     */
    public showMenu() {
        let mainMenuScene = new MainMenuScene(this.canvas, this.ctx);
        this.engine.loadScene(mainMenuScene);
    }

}