import { vec2, vec3 } from "gl-matrix";


export default class Vector3{

    private _vec: vec3;

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

    public get z(): number {
        return this._vec[2];
    }

    public set z(z: number) {
        this._vec[2] = this.z;
    }

    constructor(x: number, y: number, z: number){
        this._vec = vec3.fromValues(x, y, z);
    }

    public add(other: Vector3): void {
        vec3.add(this._vec, this._vec, other._vec);
    }

    public scale(scaler: number): void{
        vec3.scale(this._vec, this._vec, scaler);
    }

    public toGlVec2(): vec2{
        return vec2.fromValues(this._vec[0], this._vec[1]);
    }

    public toGlVec3(): vec3{
        return vec3.clone(this._vec);
    }

    public static fromGlVec3(vec: vec3): Vector3{
        const vector = new Vector3(0, 0, 0);
        vector._vec = vec;
        return vector;
    }
    
}