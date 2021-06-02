export default class ZoomInputcontrolls {
    constructor(elem) {

        this._elem = elem;
        this._onZoom = null;

        this._registerCallbacks();
    }

    onZoom(callback) {
        this._onZoom = callback;
    }

    _registerCallbacks() {
        this._registerMousweelCallback()
    }

    _registerMousweelCallback() {
        this._elem.addEventListener("wheel", e => {
            if(this._onZoom){
                this._onZoom(e.deltaY/100)
            }
        });
    }


}