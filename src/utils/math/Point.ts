export default class Point{

    public x: number;
    public y: number;

    constructor(x: number, y: number){
            this.setPoint(x, y);
    }

    public setPoint(x: number, y: number): void{
        this.x = x;
        this.y = y;
    }
}