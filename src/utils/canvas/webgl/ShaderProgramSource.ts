export default class ShaderProgramSource{

    private _vertexShaderSource: string;
    private _fragmentShaderSource: string;

    constructor(vertexShaderSource: string, fragmentShaderSource: string){
        this._vertexShaderSource = vertexShaderSource;
        this._fragmentShaderSource = fragmentShaderSource;
    }

    public getVertexShaderSource(): string {
        return this._vertexShaderSource;
    }

    public getFragmentShaderSource(): string{
        return this._fragmentShaderSource;
    }

}