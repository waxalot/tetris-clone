export abstract class UIObject {

    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public hovered: boolean;
    public clicked: boolean;
    public color: string;
    public hoverColor: string;
    public backgroundColor: string;
    public hoverBackgroundColor: string;

    public constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.hovered = false;
        this.clicked = false;
        this.backgroundColor = '#ffffff';
        this.hoverBackgroundColor = '#555555';
        this.color = '#000000'
        this.hoverColor = '#ffffff';
    }

    public intersects = (obj: UIObject, mouse: CanvasExt.CanvasMouse) => {
        let xIntersect = mouse.x >= obj.x && mouse.x <= (obj.x + obj.width);
        let yIntersect = mouse.y >= obj.y && mouse.y <= (obj.y + obj.height);
        return xIntersect && yIntersect;
    }

    public updateStats = (ctx: CanvasExt.CanvasRenderingContext2DExt) => {
        if (!this.intersects(this, ctx.mouse)) {
            this.hovered = false;
        } else {
            this.hovered = true;
            if (ctx.mouse.clicked) {
                this.clicked = true;
            }
        }

        if (!ctx.mouse.down) {
            this.clicked = false;
        }
    }

    public abstract update(ctx: CanvasExt.CanvasRenderingContext2DExt): void;
    public abstract draw(ctx: CanvasExt.CanvasRenderingContext2DExt): void;
}