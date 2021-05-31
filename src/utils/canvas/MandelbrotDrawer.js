import fragShader from '../../shaders/mandelbrot_frag.glsl'
import vertShader from '../../shaders/rect_vertex.glsl'
import CoordinateRectDrawer from './CoordinateRectDrawer'
import {mat4} from '../../lib/gl-matrix-min';

export default class MandelbrotDrawer{

    constructor(canvas){
        this._canvas = canvas;
        this._drawer = new CoordinateRectDrawer(canvas, 1, -2, 1, -1);
        this._drawer.setFragmentShader(fragShader);
        this._drawer.setVertexShader(vertShader);
        
        this.position = [0.5,0,0];
        this.scale = [1, 1, 0];

        this._drawer.onSetUniform(this._setUniforms.bind(this))
    }



    _setUniforms(gl, program){
        const uniformLocations = {
            matrix: gl.getUniformLocation(program, `matrix`)
        }

        const matrix = mat4.create();
        
        const canvasRatio = this._canvas.width / this._canvas.height;
        
        if(canvasRatio < 1){
            mat4.scale(matrix, matrix, [1, 1*canvasRatio, 0])
        } else {
            mat4.scale(matrix, matrix, [1/canvasRatio, 1, 0])
        }
        mat4.scale(matrix, matrix, this.scale)
        mat4.translate(matrix, matrix, this.position)
        gl.uniformMatrix4fv(uniformLocations.matrix, false, matrix)
    }

    move(translate){
        this.position[0] += translate[0] / this.scale[0]
        this.position[1] += translate[1] / this.scale[1]
    }

    zoom(scaler){
        this.scale[0] *= scaler;
        this.scale[1] *= scaler;
    }

    draw(){
        this._drawer.draw();
    }

    resetViewport(){
        this._drawer.resetViewport();
    }

}