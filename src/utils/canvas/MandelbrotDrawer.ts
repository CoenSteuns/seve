import fragShader from '../../shaders/mandelbrot_frag.glsl'
import vertShader from '../../shaders/rect_vertex.glsl'
import CoordinateRectDrawer from './CoordinateRectDrawer'
import {mat4} from 'gl-matrix';
import type { IControlableDrawing } from './interface/IControlableDrawing';
import Vector2 from '../math/Vector2';

const MATRIX_UNIFORM_KEY = "matrix"

export default class MandelbrotDrawer implements IControlableDrawing{

    private _canvas: HTMLCanvasElement;
    private _drawer: CoordinateRectDrawer;

    private _position: Vector2;
    private _scale: Vector2;

    private _uniformLocations: {[name: string]: WebGLUniformLocation}

    constructor(canvas: HTMLCanvasElement){
        this._canvas = canvas;
        this._drawer = new CoordinateRectDrawer(canvas, 1, -2, 1, -1);
        this._drawer.setFragmentShader(fragShader);
        this._drawer.setVertexShader(vertShader);
        
        this._position = new Vector2(0.5, 0);
        this._scale = new Vector2(1, 1);

        this._drawer.onSetUniformKey(this.setUniformsKey.bind(this))
        this._drawer.onSetUniform(this.setUniforms.bind(this))
    }

    private setUniformsKey(gl: WebGLRenderingContext, program: WebGLProgram){
        this._uniformLocations = {
            [MATRIX_UNIFORM_KEY]: gl.getUniformLocation(program, MATRIX_UNIFORM_KEY)
        }
    }

    private setUniforms(gl: WebGLRenderingContext){
        const matrix = mat4.create();
        
        const canvasRatio = this._canvas.width / this._canvas.height;
        
        if(canvasRatio < 1){
            mat4.scale(matrix, matrix, [1, 1*canvasRatio, 0])
        } else {
            mat4.scale(matrix, matrix, [1/canvasRatio, 1, 0])
        }
        mat4.scale(matrix, matrix, this._scale.toFloatArray(1))
        mat4.translate(matrix, matrix, this._position.toFloatArray(1))
        
        gl.uniformMatrix4fv(this._uniformLocations[MATRIX_UNIFORM_KEY] , false, matrix)
    }

    move(translate: Vector2): void{
        const movement = new Vector2(
            (2/this._scale.x / this._canvas.width * translate.x),
            (-2/this._scale.y / this._canvas.height * translate.y)
        );
        this._position = this._position.add(movement);
    }

    zoom(scaler: number): void{
        this._scale = this._scale.scale(scaler);
    }

    draw(): void{
        this._drawer.draw();
    }

    resetViewport(): void{
        this._drawer.resetViewport();
    }

}