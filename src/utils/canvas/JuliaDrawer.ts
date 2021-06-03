import fragShader from '../../shaders/julia_frag.glsl'
import vertShader from '../../shaders/rect_julia_vert.glsl'
import CoordinateRectDrawer from './CoordinateRectDrawer';
import Vector2 from '../math/Vector2';
import type { IControlableDrawing } from './interface/IControlableDrawing';
import Matrix4 from '../math/Matrix4';
import RatioScaler from '../scaling/RatioScaler';

const MATRIX_UNIFORM_KEY = "matrix"
const CONST_NUM_UNIFORM_KEY = "constNum"

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

    _setUniformsKey(gl: WebGLRenderingContext, program: WebGLProgram): void{
        this._uniformLocations = {
            [MATRIX_UNIFORM_KEY]: gl.getUniformLocation(program, MATRIX_UNIFORM_KEY),
            [CONST_NUM_UNIFORM_KEY]: gl.getUniformLocation(program, CONST_NUM_UNIFORM_KEY),
        }
    }

    _setUniforms(gl: WebGLRenderingContext): void{              
        gl.uniform2fv(this._uniformLocations[CONST_NUM_UNIFORM_KEY], this._constNum)
        
        const matrix = new Matrix4();
        const canvasScale = new RatioScaler(this._canvas.width, this._canvas.height).getVector2Scaler();
        matrix.scale(canvasScale.toGlVec3());
        matrix.scale(this._scale.toGlVec3());
        matrix.translate(this._position.toGlVec3())
        gl.uniformMatrix4fv(this._uniformLocations[MATRIX_UNIFORM_KEY], false, matrix.getGLmatrix())
    }

    move(translate: Vector2): void{        
        const movement = new Vector2(
            (2/this._scale.x / this._canvas.width * translate.x),
            (-2/this._scale.y / this._canvas.height * translate.y)
        );
        this._position.add(movement);        
    }

    setConst(x: number, y: number): void{
        this._constNum[0] = x;
        this._constNum[1] = y;
    }

    zoom(scaler:number): void{
        this._scale.scale(scaler);
    }

    draw(): void{
        
        this._drawer.draw();
    }

    resetViewport(): void{
        this._drawer.resetViewport();
    }

}