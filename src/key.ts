/**
 * A keyboard input helper class.
 * 
 * @export
 * @class Key
 */
export class Key {

    public static LEFT = 37;
    public static UP = 38;
    public static RIGHT = 39;
    public static DOWN = 40;
    public static a = 65;
    public static d = 68;
    public static m = 77;
    public static p = 80;

    private pressed: any = {};

    public isDown = (keyCode: number): number => {
        if (this.pressed[keyCode]) {
            return Date.now() - this.pressed[keyCode];
        } else {
            return 0;
        }
    }

    public onKeyDown = (e: KeyboardEvent) => {
        this.pressed[e.keyCode] = Date.now();
    }

    public onKeyUp = (e: KeyboardEvent) => {
        delete this.pressed[e.keyCode];
    }

}