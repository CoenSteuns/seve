import Point from "../math/Point";

export default class MoveControls2D {

    private _useMouseInput: boolean = false;
    private _elem: HTMLElement;
    private _previousMove: Point | null; 

    private _onMove: (x: number, y: number) => void | null = null;

    constructor(elem: HTMLElement) {

        this._elem = elem;
        this._onMove = null;

        this.registerCallbacks();
    }

    public onMove(callback: (x: number, y: number) => void): void{
        this._onMove = callback;
    }

    private registerCallbacks(): void {
        this.registerMouseCallback();
    }

    private registerMouseCallback(): void {
        this._previousMove = null;
        this._elem.addEventListener('mousedown', e => {
            this._useMouseInput = true;
        });

        window.addEventListener('mouseup', e => {
            this._useMouseInput = false;
            this._previousMove = null;
        });

        this._elem.addEventListener('mousemove', e => {
            if (this._onMove && this._useMouseInput) {
                if(this._previousMove == null){
                    this._previousMove = new Point(e.clientX, e.clientY);
                } else {
                    let newX = e.clientX - this._previousMove.x;
                    let newY = e.clientY - this._previousMove.y;
                    this._previousMove.setPoint(e.clientX, e.clientY);
                    this._onMove(newX, newY)
                    
                }
            }
        });
    }

}