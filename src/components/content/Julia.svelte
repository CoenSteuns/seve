<script>
    import JuliaDrawer from "../../utils/canvas/JuliaDrawer";
    import MoveControls2D from "../../utils/input/MoveControlls2D";
    import UIControls from "../Move-controls.svelte"
    import SetRenderer from "./SetRenderer.svelte";
    import ZoomInputcontrolls from "../../utils/input/ZoomInputcontrolls"

    let mover;
    let zoomer;

    let julia;

    const zoomspeed = 0.2;

    function initializeSet(drawer, elem) {
        mover = new MoveControls2D(elem);
        zoomer = new ZoomInputcontrolls(elem);
        mover.onMove((x, y) => {
            drawer.movePixels([x, y])
            drawer.redraw();
        })
        zoomer.onZoom((y) => {
            zoom(1 - zoomspeed * y)
        })
        julia = drawer;
    }

    function move(x, y) {
        julia.move([x, y]);
        julia.redraw();
    }

    function zoom(amount) {
        julia.zoom(amount);
        julia.redraw();
    }

</script>

<div>
    <SetRenderer DrawerType={JuliaDrawer} onDrawerCreated={initializeSet}/>
    <UIControls 
        onUp={() => move(0, -0.2)}
        onDown={() => move(0, 0.2)}
        onLeft={() => move(0.2, 0)}
        onRight={() => move(-0.2, 0)}
        onZoomIn={() => zoom(1.2)}
        onZoomOut={() => zoom(0.8)}
    />
</div>

<style>
</style>
