import fragShader from '../../shaders/julia_frag.glsl'
import vertShader from '../../shaders/rect_julia_vert.glsl'
import CoordinateRectDrawer from './CoordinateRectDrawer'
import {mat4, vec2} from '../../lib/gl-matrix-min';
import Vector2 from '../math/Vector2';
import type { IControlableDrawing } from './interface/IControlableDrawing';

const MATRIX_UNIFORM_KEY: string = "matrix"
const CONST_NUM_UNIFORM_KEY: string = "constNum"

export default class JuliaDrawer implements IControlableDrawing{

    private _canvas: HTMLCanvasElement;
    private _drawer: CoordinateRectDrawer;

    private _position: Vector2;
    private _scale: Vector2;
    private _constNum: number[];

    private _uniformLocations: {[name: string]: WebGLUniformLocation}

    constructor(canvas: HTMLCanvasElement){
        this._canvas = canvas;
        this._drawer = new CoordinateRectDrawer(canvas, 2, -2, 2, -2);
        this._drawer.setFragmentShader(fragShader);
        this._drawer.setVertexShader(vertShader);
        
        this._position = new Vector2(0, 0);
        this._scale = new Vector2(0.8, 0.8);
        this._constNum = [0, 0];

        this._drawer.onSetUniformKey(this._setUniformsKey.bind(this))
        this._drawer.onSetUniform(this._setUniforms.bind(this))
    }

    _setUniformsKey(gl: WebGLRenderingContext, program: WebGLProgram){
        this._uniformLocations = {
            [MATRIX_UNIFORM_KEY]: gl.getUniformLocation(program, MATRIX_UNIFORM_KEY),
            [CONST_NUM_UNIFORM_KEY]: gl.getUniformLocation(program, CONST_NUM_UNIFORM_KEY),
        }
    }

    _setUniforms(gl: WebGLRenderingContext, program: WebGLProgram){
        console.log(this._uniformLocations[CONST_NUM_UNIFORM_KEY]);
              
        gl.uniform2fv(this._uniformLocations[CONST_NUM_UNIFORM_KEY], this._constNum)
        
        const matrix = mat4.create();
        
        const canvasRatio = this._canvas.width / this._canvas.height;
        
        if(canvasRatio < 1){
            mat4.scale(matrix, matrix, [1, 1*canvasRatio, 0])
        } else {
            mat4.scale(matrix, matrix, [1/canvasRatio, 1, 0])
        }
        mat4.scale(matrix, matrix, [...this._scale.toArray(), 0])
        mat4.translate(matrix, matrix, [...this._position.toArray(), 0])

        gl.uniformMatrix4fv(this._uniformLocations[MATRIX_UNIFORM_KEY], false, matrix)
    }

    move(translate: Vector2){        
        let movement = new Vector2(
            (2/this._scale.x / this._canvas.width * translate.x),
            (-2/this._scale.y / this._canvas.height * translate.y)
        );
        this._position = this._position.add(movement);        
    }

    setConst(x: number, y: number){
        this._constNum[0] = x;
        this._constNum[1] = y;
    }

    zoom(scaler:number){
        this._scale = this._scale.scale(scaler);
    }

    draw(){
        
        this._drawer.draw();
    }

    resetViewport(){
        this._drawer.resetViewport();
    }

}