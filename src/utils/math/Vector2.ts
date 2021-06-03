import { vec2, vec3 } from "gl-matrix";

export default class Vector2{

    private _vec: vec2;

    public get x(): number {
        return this._vec[0];
    }

    public set x(x: number) {
        this._vec[0] = x;
    }

    public get y(): number {
        return this._vec[1];
    }

    public set y(y: number) {
        this._vec[1] = y;
    }

    constructor(x: number, y: number){
        this._vec = vec2.fromValues(x, y);
    }

    public add(other: Vector2): void {
        vec2.add(this._vec, this._vec, other._vec);
    }

    public scale(scaler: number): void{
        vec2.scale(this._vec, this._vec, scaler);
    }

    public toGlVec2(): vec2{
        return vec2.clone(this._vec);
    }

    public toGlVec3(z = 0): vec3{
        return vec3.fromValues(this.x, this.y, z);
    }

    public static fromGlVec2(vec: vec2): Vector2{
        const vector = new Vector2(0, 0);
        vector._vec = vec;
        return vector;
    }
    
}