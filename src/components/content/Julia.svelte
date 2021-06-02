<script lang="ts">
    import JuliaDrawer from "../../utils/canvas/JuliaDrawer";
    import MoveControls2D from "../../utils/input/MoveControlls2D";
    import UIControls from "../Move-controls.svelte";
    import SetRenderer from "./SetRenderer.svelte";
    import ZoomInputcontrolls from "../../utils/input/ZoomInputcontrolls";
    import MandelbrotControls from "../controls/Mandelbrot-controls.svelte";
import Vector2 from "../../utils/math/Vector2";
import type { IControlableDrawing } from "../../utils/canvas/interface/IControlableDrawing";

    let mover: MoveControls2D;
    let zoomer: ZoomInputcontrolls;

    let julia: JuliaDrawer;

    const zoomspeed = 0.2;

    function createDrawer(elem: HTMLCanvasElement): IControlableDrawing {
        mover = new MoveControls2D(elem);
        zoomer = new ZoomInputcontrolls(elem);
        mover.onMove(move);
        zoomer.onZoom((y) => zoom(1 - zoomspeed * y));

        julia = new JuliaDrawer(elem);
        return julia;
    }


    function move(x: number, y: number): void {
        julia.move(new Vector2(x, y));
        julia.draw();
    }

    function zoom(amount: number) {
        julia.zoom(amount);
        julia.draw();
    }

    function selectConstant(x: number, y: number): void {
        let translatedX = 2 / 300 * x - 1.5;//.5 for the .5 position offset in the mandelbrot drawer
        let translatedY = -2 / 300 * y + 1;
        
        julia.setConst(translatedX, translatedY);
        julia.draw();
    }
</script>

<div>
    <SetRenderer drawerFactory={createDrawer} />
    <UIControls
        onUp={() => move(0, 50)}
        onDown={() => move(0, -50)}
        onLeft={() => move(50, 0)}
        onRight={() => move(-50, 0)}
        onZoomIn={() => zoom(1.2)}
        onZoomOut={() => zoom(0.8)}
    />

    <MandelbrotControls onPositionSelected={selectConstant} />
</div>

<style>
    div {
        position: absolute;
        left: 0;
        right: 0;
        height: 100vh;
    }
</style>
