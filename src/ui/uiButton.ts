import { UIObject } from "./uiObject";

export class UIButton extends UIObject {

    /**
     * The button's text.
     * 
     * @type {string}
     * @memberof UIButton
     */
    public text: string;

    /**
     * The font-size which should be used.
     * 
     * @type {number}
     * @memberof UIButton
     */
    public fontSize: number;

    /**
     * The name of the font, which should be used.
     * 
     * @type {string}
     * @memberof UIButton
     */
    public font: string;

    /**
     * The onClick callback.
     * 
     * @memberof UIButton
     */
    public click: () => void;

    /**
     * Creates an instance of UIButton.
     * 
     * @memberof UIButton
     */
    public constructor() {
        super();

        this.text = '';
        this.fontSize = 20;
        this.font = 'Arial';
    }

    /**
     * Updates the button state.
     * 
     * @param {CanvasExt.CanvasRenderingContext2DExt} ctx 
     * 
     * @memberof UIButton
     */
    public update(ctx: CanvasExt.CanvasRenderingContext2DExt): void {
        let wasNotClicked = !this.clicked;
        this.updateStats(ctx);

        if (this.clicked && wasNotClicked) {
            this.click();
        }
    };

    /**
     * Draws the button.
     * 
     * @param {CanvasExt.CanvasRenderingContext2DExt} ctx 
     * 
     * @memberof UIButton
     */
    public draw(ctx: CanvasExt.CanvasRenderingContext2DExt): void {

        // Draw border
        if (this.borderSize > 0) {
            ctx.fillStyle = this.borderColor;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        // set fill color
        if (this.hovered) {
            ctx.fillStyle = this.hoverBackgroundColor;
        } else {
            ctx.fillStyle = this.backgroundColor;
        }

        // draw button
        ctx.fillRect(this.x + this.borderSize, this.y + this.borderSize, this.width - this.borderSize * 2, this.height - this.borderSize * 2);

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
        let textX = this.x + (this.width * 0.5) - (textSize.width * 0.5);
        let textY = this.y + (this.height * 0.5) - (this.fontSize * 0.6);

        // draw the text
        ctx.fillText(this.text, textX, textY);
    }

}