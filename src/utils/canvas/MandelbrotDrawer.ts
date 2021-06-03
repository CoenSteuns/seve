import fragShader from '../../shaders/mandelbrot_frag.glsl'
import vertShader from '../../shaders/rect_vertex.glsl'
import CoordinateRectDrawer from './CoordinateRectDrawer'
import type { IControlableDrawing } from './interface/IControlableDrawing';
import Vector2 from '../math/Vector2';
import Matrix4 from '../math/Matrix4';
import RatioScaler from '../scaling/RatioScaler';

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

    public removeContext(): void {
        this._drawer.removeContext();
    }

    private setUniformsKey(gl: WebGLRenderingContext, program: WebGLProgram){
        this._uniformLocations = {
            [MATRIX_UNIFORM_KEY]: gl.getUniformLocation(program, MATRIX_UNIFORM_KEY)
        }
    }

    private setUniforms(gl: WebGLRenderingContext){
        const matrix = new Matrix4()
        const canvasScale = new RatioScaler(this._canvas.width, this._canvas.height).getVector2Scaler();
        matrix.scale(canvasScale.toGlVec3());
        matrix.scale(this._scale.toGlVec3(1));
        matrix.translate(this._position.toGlVec3(0))
        gl.uniformMatrix4fv(this._uniformLocations[MATRIX_UNIFORM_KEY] , false, matrix.getGLmatrix())
    }

    move(translate: Vector2): void{
        const movement = new Vector2(
            (2/this._scale.x / this._canvas.width * translate.x),
            (-2/this._scale.y / this._canvas.height * translate.y)
        );
        this._position.add(movement);
    }

    zoom(scaler: number): void{
        this._scale.scale(scaler);
    }

    draw(): void{
        this._drawer.draw();
    }

    resetViewport(): void{
        this._drawer.resetViewport();
    }

}