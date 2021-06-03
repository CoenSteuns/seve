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

    public toFloatArray(extraSize = 0): Float32Array {
        const array = [this.x, this.y];
        for (let i = 0; i < extraSize; i++) {
            array.push(0);
        }
        return new Float32Array(array);

    }

    
}