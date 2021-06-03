import { mat4, vec3 } from "gl-matrix";
import Vector3 from "./Vector3";

export default class Matrix4{

    private mat: mat4;

    constructor(){
        this.mat = mat4.create();
    }

    public setAt(x: number, y: number, value: number): void{
        const arrayPosition = this.getArrayPosition(x, y);
        this.mat[arrayPosition] = value;
    }

    public getAt(x: number, y: number): number{
        const arrayPosition = this.getArrayPosition(x, y);
        return this.mat[arrayPosition];
    }

    private getArrayPosition(x: number, y: number): number {
        return y*4 + x%4;
    }

    public scale(scaler: vec3 | Vector3): void{
        const glScaler = this.getGlVector(scaler);
        mat4.scale(this.mat, this.mat, glScaler);
    }

    public translate(vector: vec3 | Vector3): void{
        const glScaler = this.getGlVector(vector);
        mat4.translate(this.mat, this.mat, glScaler);
    }


    private getGlVector(vector: vec3 | Vector3): vec3{
        if(vector instanceof Vector3){
            return vector.toGlVec3();
        }else {
            return vector;
        }
    }

    public getGLmatrix(): mat4{
        return this.mat;
    }

}