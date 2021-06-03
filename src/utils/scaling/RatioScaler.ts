import Vector2 from "../math/Vector2";

export default class RatioScaler{

    private _width: number;
    private _height: number;

    constructor(width: number, height: number){
        this._width = width;
        this._height = height;
    }

    public getRatio(): number{
        return this._width / this._height;
    }

    public getVector2Scaler(): Vector2{
        const canvasRatio = this.getRatio();
        let canvasScale: Vector2;
        if(canvasRatio < 1){
            canvasScale = new Vector2(1, 1*canvasRatio);
        } else {
            canvasScale = new Vector2(1/canvasRatio, 1);
        }
        return canvasScale;
    }

} 