export default class ZoomInputcontrolls {

    private _elem: HTMLElement;
    private _onZoom: (y: number) => void | null;

    constructor(elem: HTMLElement) {

        this._elem = elem;
        this._onZoom = null;

        this.registerCallbacks();
    }

    public onZoom(callback: (y: number) => void | null) {
        this._onZoom = callback;
    }

    private registerCallbacks() {
        this.registerMousweelCallback()
    }

    private registerMousweelCallback() {
        this._elem.addEventListener("wheel", e => {
            if(this._onZoom){
                this._onZoom(e.deltaY/100)
            }
        });
    }


}