import { Scene } from "../scenes/scene";

export class Engine {

    private currentScene: Scene;
    private lastUpdateTime: number;
    private gameLoopIntervalId: any;


    /**
     * Starts the engine.
     * 
     * @memberof Engine
     */
    public start() {
        this.lastUpdateTime = Date.now();
        let fps = 60;

        this.gameLoopIntervalId = setInterval(this.run, 1000 / fps);
    }

    /**
     * Stops the engine.
     * 
     * @memberof Engine
     */
    public stop() {
        if (this.gameLoopIntervalId) {
            clearInterval(this.gameLoopIntervalId);
        }
    }

    /**
     * Loads the given scene as the current runing scene.
     * 
     * @param {Scene} scene 
     * @returns 
     * 
     * @memberof Engine
     */
    public loadScene(scene: Scene) {
        if (!scene) {
            return;
        }

        scene.setEngine(this);
        this.currentScene = scene;
    }

    /**
     * The main running method.
     * Calls update and drawing methods continuously.
     * 
     * @private
     * 
     * @memberof Engine
     */
    private run = () => {
        this.update();
        this.draw();
    }

    private update = (): void => {
        // Calculate delta time in milliseconds
        let dt = Date.now() - this.lastUpdateTime;

        if (this.currentScene) {
            this.currentScene.update(dt);
        }

        this.lastUpdateTime = Date.now();
    }

    private draw = (): void => {
        if (this.currentScene) {
            this.currentScene.draw();
        }
    }

}