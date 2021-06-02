import fragShader from '../../shaders/julia_frag.glsl'
import vertShader from '../../shaders/rect_julia_vert.glsl'
import CoordinateRectDrawer from './CoordinateRectDrawer'
import {mat4, vec2} from '../../lib/gl-matrix-min';

export default class JuliaDrawer{

    constructor(canvas){
        this._canvas = canvas;
        this._drawer = new CoordinateRectDrawer(canvas, 2, -2, 2, -2);
        this._drawer.setFragmentShader(fragShader);
        this._drawer.setVertexShader(vertShader);
        
        this.position = [0,0,0];
        this.scale = [0.8, 0.8, 0];
        this.constNum = [0, 0];

        this._drawer.onSetUniformKey(this._setUniformsKey.bind(this))
        this._drawer.onSetUniform(this._setUniforms.bind(this))
    }

    _setUniformsKey(gl, program){
        this.uniformLocations = {
            matrix: gl.getUniformLocation(program, `matrix`),
            const: gl.getUniformLocation(program, `constNum`),
        }
    }

    _setUniforms(gl, program){
        gl.uniform2fv(this.uniformLocations.const, this.constNum)
        
        const matrix = mat4.create();
        
        const canvasRatio = this._canvas.width / this._canvas.height;
        
        if(canvasRatio < 1){
            mat4.scale(matrix, matrix, [1, 1*canvasRatio, 0])
        } else {
            mat4.scale(matrix, matrix, [1/canvasRatio, 1, 0])
        }
        mat4.scale(matrix, matrix, this.scale)
        mat4.translate(matrix, matrix, this.position)

        gl.uniformMatrix4fv(this.uniformLocations.matrix, false, matrix)
    }

    move(translate){
        this.position[0] += translate[0] / this.scale[0]
        this.position[1] += translate[1] / this.scale[1]
    }

    movePixels(translate){
        this.position[0] += (2/this.scale[0] / this._canvas.width * translate[0]);
        this.position[1] += (-2/this.scale[1] / this._canvas.height * translate[1]);
    }

    setConst(x, y){
        this.constNum[0] = x;
        this.constNum[1] = y;
    }

    zoom(scaler){
        this.scale[0] *= scaler;
        this.scale[1] *= scaler;
    }

    draw(){
        this._drawer.draw();
    }

    redraw(){
        this._drawer.redraw();
    }

    resetViewport(){
        this._drawer.resetViewport();
    }

}