export default class CoordinateRectDrawer {

    constructor(canvas, maxX, minX, maxY, minY) {
        this.gl = canvas.getContext('webgl')
        const gl = this.gl;
        


        this._createVertices(maxX, minX, maxY, minY);
        this._createVertexData();

        this._positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._vertexData), gl.STATIC_DRAW);

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
            ...topLeft,
            ...topRight,
            ...bottomRight,
            ...topLeft,
            ...bottomLeft,
            ...bottomRight,
        ];
    }

    setVertexShader(shader){
        const {gl} = this;
        this._vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(this._vertexShader, shader);
        gl.compileShader(this._vertexShader);
    }

    setFragmentShader(shader){
        const {gl} = this;
        this._fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(this._fragmentShader, shader);
        gl.compileShader(this._fragmentShader);
    }

    onSetUniform (callback){
        this.onUniform = callback
    }

    draw(){
        const {gl, _fragmentShader, _vertexShader, _positionBuffer} = this;
        const program = gl.createProgram();
        gl.attachShader(program, _vertexShader);
        gl.attachShader(program, _fragmentShader);
        gl.linkProgram(program);

        const positionLocation = gl.getAttribLocation(program, `position`);
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, _positionBuffer);
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

        gl.useProgram(program);

        if(this.onUniform)
            this.onUniform(gl, program)
        
        gl.drawArrays(gl.TRIANGLES, 0, this._vertexData.length/3);

        
        
    }

    resetViewport = () =>{
        
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }

}