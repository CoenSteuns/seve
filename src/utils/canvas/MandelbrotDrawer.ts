import fragShader from '../../shaders/mandelbrot_frag.glsl'
import vertShader from '../../shaders/rect_vertex.glsl'
import type { IControlableDrawing } from './interface/IControlableDrawing';
import Vector2 from '../math/Vector2';
import MovableDrawing from './MovableDrawing';
import Rect from '../math/Rect';
import ShaderProgramSource from './webgl/ShaderProgramSource';


export default class MandelbrotDrawer extends MovableDrawing implements IControlableDrawing{

    constructor(canvas: HTMLCanvasElement){

        const drawingSize = new Rect(new Vector2(-1, 0), 3, 3);
        const glProgramSource = new ShaderProgramSource(vertShader, fragShader);

        super(canvas, drawingSize, glProgramSource);

        this._position = new Vector2(0.5, 0);
    }


}