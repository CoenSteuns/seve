import Matrix4 from "../math/Matrix4";
import Rect from "../math/Rect";
import Vector2 from "../math/Vector2";
import RatioScaler from "../scaling/RatioScaler";
import CoordinateRectDrawer from "./CoordinateRectDrawer";
import type { IControlableDrawing } from "./interface/IControlableDrawing";
import type ShaderProgramSource from "./webgl/ShaderProgramSource";

const MATRIX_UNIFORM_KEY = "matrix"

export default class MovableDrawing implements IControlableDrawing {
    private _canvas: HTMLCanvasElement;
    private _drawer: CoordinateRectDrawer;

    protected _position: Vector2;
    protected _scale: Vector2;

    private _size: Rect;

    private _uniformLocations: {[name: string]: WebGLUniformLocation}

    constructor(canvas: HTMLCanvasElement, size: Rect, src: ShaderProgramSource){
        this._canvas = canvas;
        this._size = size
        const minPoint = size.getMinPoint();
        const maxPoint = size.getMaxPoint();
        
        this._drawer = new CoordinateRectDrawer(canvas, maxPoint.x, minPoint.x, maxPoint.y, minPoint.y);
        this._drawer.setFragmentShader(src.getFragmentShaderSource());
        this._drawer.setVertexShader(src.getVertexShaderSource());
        
        this._position = new Vector2(0, 0);
        this._scale = new Vector2(1, 1);

        this._drawer.onSetUniformKey(this.setUniformsKey.bind(this))
        this._drawer.onSetUniform(this.setUniforms.bind(this))
    }

    public getSize(): Rect{
        return Object.assign(new Rect(new Vector2(0, 0), 0 ,0), this._size)
    }

    protected setUniformsKey(gl: WebGLRenderingContext, program: WebGLProgram): void{
        this._uniformLocations = {
            [MATRIX_UNIFORM_KEY]: gl.getUniformLocation(program, MATRIX_UNIFORM_KEY)
        }
    }

    protected setUniforms(gl: WebGLRenderingContext): void{
        const matrix = new Matrix4()
        const canvasScale = new RatioScaler(this._canvas.width, this._canvas.height).getVector2Scaler();
        
        matrix.scale(canvasScale.toGlVec3());
        matrix.scale(this._scale.toGlVec3(1));
        matrix.translate(this._position.toGlVec3(0))
        gl.uniformMatrix4fv(this._uniformLocations[MATRIX_UNIFORM_KEY] , false, matrix.getGLmatrix())
    }

    public move(translate: Vector2): void{
        const canvasScale = new RatioScaler(this._canvas.width, this._canvas.height).getVector2Scaler();
        const movement = new Vector2(
            (2/this._scale.x / this._canvas.width * translate.x) * (1- canvasScale.x + 1),
            (-2/this._scale.y / this._canvas.height * translate.y)  * (1 - canvasScale.y + 1)
        );
        this._position.add(movement);
    }

    public zoom(scaler: number): void{
        this._scale.scale(scaler);
    }

    public draw(): void{
        this._drawer.draw();
    }

    public resetViewport(): void{
        this._drawer.resetViewport();
    }

    public removeContext(): void {
        this._drawer.removeContext();
    }
}