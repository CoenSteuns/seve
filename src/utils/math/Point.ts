export default class Point{

    private _x: number;
    private _y: number;

    public get x(){
        return this._x;
    }

    public get y(){
        return this._y;
    }

    constructor(x: number, y: number){
            this.setPoint(x, y);
    }

    public setPoint(x: number, y: number){
        this._x = x;
        this._y = y;
    }
}