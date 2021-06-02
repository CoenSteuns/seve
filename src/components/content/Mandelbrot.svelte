<script lang="ts">
    import MandelbrotDrawer from "../../utils/canvas/MandelbrotDrawer";
    import MoveControls2D from "../../utils/input/MoveControlls2D";
    import UIControls from "../Move-controls.svelte"
    import SetRenderer from "./SetRenderer.svelte";
    import ZoomInputcontrolls from "../../utils/input/ZoomInputcontrolls"
    import Vector2 from "../../utils/math/Vector2";
    import type { IControlableDrawing } from "../../utils/canvas/interface/IControlableDrawing";

    const ZOOM_SPEED: number = 0.2;

    let mover: MoveControls2D | null = null;
    let zoomer: ZoomInputcontrolls | null = null;

    let mandelbrot: MandelbrotDrawer;

    function createMandelbrotDrawer(canvas: HTMLCanvasElement): IControlableDrawing {
        mover = new MoveControls2D(canvas);
        zoomer = new ZoomInputcontrolls(canvas);
        mover.onMove(move)
        zoomer.onZoom((y) => zoom(1 - ZOOM_SPEED * y))

        mandelbrot = new MandelbrotDrawer(canvas);
        return mandelbrot;
    }
    

    function move(x: number, y: number): void {
        mandelbrot.move(new Vector2(x, y));
        mandelbrot.draw();
    }

    function zoom(amount: number): void {
        mandelbrot.zoom(amount);
        mandelbrot.draw();
    }

</script>

<div>
    <SetRenderer
        drawerFactory={createMandelbrotDrawer}
    />
    <UIControls
        onUp={() => move(0, 50)}
        onDown={() => move(0, -50)}
        onLeft={() => move(50, 0)}
        onRight={() => move(-50, 0)}
        onZoomIn={() => zoom(1.2)}
        onZoomOut={() => zoom(0.8)}
    />
</div>

<style>
    div {
        position: absolute;
        left: 0;
        right: 0;
        height: 100vh;
    }
</style>
