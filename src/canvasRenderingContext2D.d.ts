declare module CanvasExt {
    export interface CanvasRenderingContext2DExt extends CanvasRenderingContext2D {
        mouse: CanvasMouse;
    }

    export interface CanvasMouse {
        x: number;
        y: number;
        clicked: boolean;
        down: boolean;
    }
}