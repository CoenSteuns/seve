import Vector2 from "./Vector2";

export default class Rect{

    public center: Vector2;
    public width: number;
    public height: number;

    constructor(center: Vector2, width: number, height: number){
        this.center = center;
        this.width = width;
        this.height = height;
    }

    public getMinPoint(): Vector2 {
        return new Vector2(
            this.center.x - this.width / 2,
            this.center.y - this.height / 2,
        )
    }

    public getMaxPoint(): Vector2 {
        return new Vector2(
            this.center.x + this.width / 2,
            this.center.y + this.height / 2,
        )
    }


}