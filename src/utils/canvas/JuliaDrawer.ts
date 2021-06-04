import fragShader from '../../shaders/julia_frag.glsl'
import vertShader from '../../shaders/rect_julia_vert.glsl'
import Vector2 from '../math/Vector2';
import type { IControlableDrawing } from './interface/IControlableDrawing';
import MovableDrawing from './MovableDrawing';
import Rect from '../math/Rect';
import ShaderProgramSource from './webgl/ShaderProgramSource';

const CONST_NUM_UNIFORM_KEY = "constNum"

export default class JuliaDrawer extends MovableDrawing implements IControlableDrawing{

    private _constNum: number[];

    private _juliaUniformLocations: {[name: string]: WebGLUniformLocation}

    constructor(canvas: HTMLCanvasElement){
        const drawingSize = new Rect(new Vector2(0, 0), 4, 4);
        const glProgramSource = new ShaderProgramSource(vertShader, fragShader);
        super(canvas, drawingSize, glProgramSource);
        this._constNum=[0, 0]
        this._scale.scale(0.8);
    }


    setUniformsKey(gl: WebGLRenderingContext, program: WebGLProgram): void{
        super.setUniformsKey(gl, program)

        this._juliaUniformLocations = {
            [CONST_NUM_UNIFORM_KEY]: gl.getUniformLocation(program, CONST_NUM_UNIFORM_KEY),
        }
    }

    setUniforms(gl: WebGLRenderingContext): void{
        super.setUniforms(gl)              
        gl.uniform2fv(this._juliaUniformLocations[CONST_NUM_UNIFORM_KEY], this._constNum)
    }


    setConst(x: number, y: number): void{
        this._constNum[0] = x;
        this._constNum[1] = y;
        super.draw();
    }



}