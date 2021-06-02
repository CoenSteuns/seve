<script lang="ts">
    import MandelbrotDrawer from "../../utils/canvas/MandelbrotDrawer";
    import MoveControls2D from "../../utils/input/MoveControlls2D";
    import UIControls from "../Move-controls.svelte"
    import SetRenderer from "./SetRenderer.svelte";
    import ZoomInputcontrolls from "../../utils/input/ZoomInputcontrolls"

    const ZOOM_SPEED: number = 0.2;

    let mover: MoveControls2D | null = null;
    let zoomer: ZoomInputcontrolls | null = null;

    let mandelbrot;

    function initializeSet(drawer, elem: HTMLElement) {
        mover = new MoveControls2D(elem);
        zoomer = new ZoomInputcontrolls(elem);
        mover.onMove((x, y) => {
            drawer.movePixels([x, y])
            drawer.redraw();
        })
        zoomer.onZoom((y) => {
            zoom(1 - ZOOM_SPEED * y)
        })
        mandelbrot = drawer;
    }

    function move(x, y) {
        mandelbrot.move([x, y]);
        mandelbrot.redraw();
    }

    function zoom(amount) {
        mandelbrot.zoom(amount);
        mandelbrot.redraw();
    }

</script>

<div>
    <SetRenderer DrawerType={MandelbrotDrawer} onDrawerCreated={initializeSet}/>
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
    div{
        position: absolute;
        left: 0;
        right: 0;
        height: 100vh;
    }
</style>
