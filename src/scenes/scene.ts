import { UIObject } from "../ui/uiObject";
import { Engine } from "../engine/engine";

/**
 * The abstract base class for all scenes.
 * 
 * @export
 * @abstract
 * @class Scene
 */
export abstract class Scene {

    protected engine: Engine;
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasExt.CanvasRenderingContext2DExt;
    protected uiObjects: Array<UIObject>;

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasExt.CanvasRenderingContext2DExt) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.uiObjects = new Array<UIObject>();
    }

    /**
     * The engine.
     * 
     * @param {Engine} engine 
     * 
     * @memberof Scene
     */
    public setEngine(engine: Engine) {
        this.engine = engine;
    }

    /**
     * Draws the scene.
     * 
     * @abstract
     * 
     * @memberof Scene
     */
    public abstract draw(): void;

    /**
     * Updates the scene.
     * 
     * @abstract
     * @param {number} dt 
     * 
     * @memberof Scene
     */
    public update = (dt: number) => {
        if (this.uiObjects) {
            this.uiObjects.forEach((uiObject: UIObject) => {
                uiObject.update(this.ctx);
            });
        }
    };

}