export default class Vector2{
    public x: number;
    public y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    public add(other: Vector2): Vector2 {
        return new Vector2(
            this.x + other.x,
            this.y + other.y
        )
    }

    public scale(scaler: number): Vector2 {
        return new Vector2(
            this.x * scaler,
            this.y * scaler
        )
    }

    public toArray(): number[] {
        return [this.x, this.y];
    }

}