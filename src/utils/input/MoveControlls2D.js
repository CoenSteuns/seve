export default class MoveControls2D {
    constructor(elem) {

        
        this._useMouseInput = false;

        this._elem = elem;
        this._onMove = null;

        this._registerCallbacks();
    }

    onMove(callback){
        this._onMove = callback;
    }

    _registerCallbacks() {
        this._registerMouseCallback();
    }

    _registerMouseCallback() {
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
                    this._previousMove = {x: e.clientX, y: e.clientY}
                } else {
                    let newX = e.clientX - this._previousMove.x;
                    let newY = e.clientY - this._previousMove.y;
                    this._previousMove = {x: e.clientX, y: e.clientY}
                    this._onMove(newX, newY)
                    
                }
            }
        });
    }

}