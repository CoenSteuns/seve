type UniformCallback = (gl: WebGLRenderingContext, program: WebGLProgram) => void;

export default class CoordinateRectDrawer {
    private _gl :WebGLRenderingContext;
    private _positionBuffer: WebGLBuffer;

    private _needsSetup: boolean = false;

    private _vertices: { [name: string]: number[] };
    private _vertexData: number[];

    private _vertexShader: WebGLShader;
    private _fragmentShader: WebGLShader;

    private _onUniforms: UniformCallback | null;
    private _onUniformKeys: UniformCallback | null;

    private _program: WebGLProgram;

    constructor(canvas: HTMLCanvasElement, maxX: number, minX: number, maxY: number, minY: number) {
        const _gl = canvas.getContext('webgl');
        this._gl = _gl;

        this._createVertices(maxX, minX, maxY, minY);
        this._createVertexData();

        this._positionBuffer = _gl.createBuffer();
        _gl.bindBuffer(_gl.ARRAY_BUFFER, this._positionBuffer);
        _gl.bufferData(_gl.ARRAY_BUFFER, new Float32Array(this._vertexData), _gl.STATIC_DRAW);

        this._vertexShader = null;
        this._fragmentShader = null;


    }

    _createVertices(maxX, minX, maxY, minY) {
        this._vertices = {
            topLeft: [minX, maxY, 0],
            topRight: [maxX, maxY, 0],
            bottomRight: [maxX, minY, 0],
            bottomLeft: [minX, minY, 0],
        }
    }

    _createVertexData() {
        const {topLeft, topRight, bottomRight, bottomLeft} = this._vertices;
        
        this._vertexData = [
            ...topLeft, ...topRight, ...bottomRight,
            ...topLeft, ...bottomLeft, ...bottomRight,
        ];
    }

    setVertexShader(shaderSrc: string){
        const {_gl} = this;
        this._vertexShader = _gl.createShader(_gl.VERTEX_SHADER);
        _gl.shaderSource(this._vertexShader, shaderSrc);
        _gl.compileShader(this._vertexShader);
    }

    setFragmentShader(shaderSrc: string){
        const {_gl} = this;
        this._fragmentShader = _gl.createShader(_gl.FRAGMENT_SHADER);
        _gl.shaderSource(this._fragmentShader, shaderSrc);
        _gl.compileShader(this._fragmentShader);
    }

    onSetUniform (callback: UniformCallback){
        this._onUniforms = callback
    }

    onSetUniformKey(callback: UniformCallback){
        this._onUniformKeys = callback
    }

    draw(){

        if(this._needsSetup){
            this.redraw();
            return
        }

        
        this._needsSetup = true;

        const {_gl, _fragmentShader, _vertexShader, _positionBuffer} = this;
        const program = _gl.createProgram();
        _gl.attachShader(program, _vertexShader);
        _gl.attachShader(program, _fragmentShader);
        _gl.linkProgram(program);

        const positionLocation = _gl.getAttribLocation(program, `position`);
        _gl.enableVertexAttribArray(positionLocation);
        _gl.bindBuffer(_gl.ARRAY_BUFFER, _positionBuffer);
        _gl.vertexAttribPointer(positionLocation, 3, _gl.FLOAT, false, 0, 0);

        _gl.useProgram(program);
        this._program = program;
        if(this._onUniformKeys){
            this._onUniformKeys(_gl, program);
        }

        if(this._onUniforms)
            this._onUniforms(_gl, program);    
        
        _gl.drawArrays(_gl.TRIANGLES, 0, this._vertexData.length/3);
    }

    redraw(){
        if(this._onUniforms)
            this._onUniforms(this._gl, this._program); 

        this._gl.drawArrays(this._gl.TRIANGLES, 0, this._vertexData.length/3);
    }

    resetViewport = () =>{
        this._needsSetup = false;
        this._gl.viewport(0, 0, this._gl.canvas.width, this._gl.canvas.height);
    }

}