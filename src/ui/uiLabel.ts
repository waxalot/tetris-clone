import { UIObject } from "./uiObject";

export class UILabel extends UIObject {

    /**
     * The label's text.
     * 
     * @type {string}
     * @memberof UILabel
     */
    public text: string;

    /**
     * The font-size which should be used.
     * 
     * @type {number}
     * @memberof UILabel
     */
    public fontSize: number;

    /**
     * The name of the font, which should be used.
     * 
     * @type {string}
     * @memberof UILabel
     */
    public font: string;

    /**
     * Creates an instance of UILabel.
     * 
     * @memberof UILabel
     */
    public constructor() {
        super();

        this.text = '';
        this.fontSize = 20;
        this.font = 'Arial';
    }

    /**
     * Updates the label state.
     * 
     * @param {CanvasExt.CanvasRenderingContext2DExt} ctx 
     * 
     * @memberof UILabel
     */
    public update(ctx: CanvasExt.CanvasRenderingContext2DExt): void { };

    /**
     * Draws the label.
     * 
     * @param {CanvasExt.CanvasRenderingContext2DExt} ctx 
     * 
     * @memberof UILabel
     */
    public draw(ctx: CanvasExt.CanvasRenderingContext2DExt): void {
        // text options
        let fontSize = this.fontSize;
        if (this.hovered) {
            ctx.fillStyle = this.hoverColor;
        }
        else {
            ctx.fillStyle = this.color;
        }
        ctx.font = this.fontSize + 'px ' + this.font;

        // text position
        let textSize = ctx.measureText(this.text);
        let textX = this.x - textSize.width * 0.5;
        let textY = this.y - this.fontSize * 0.35;

        // draw the text
        ctx.fillText(this.text, textX, textY);
    }

}