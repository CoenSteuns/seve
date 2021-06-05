<script lang="ts">
    import JuliaDrawer from "../../utils/canvas/JuliaDrawer";
    import MoveControls2D from "../../utils/input/MoveControlls2D";
    import UIControls from "../Move-controls.svelte";
    import SetRenderer from "./SetRenderer.svelte";
    import ZoomInputcontrolls from "../../utils/input/ZoomInputcontrolls";
    import MandelbrotControls from "../controls/Mandelbrot-controls.svelte";
    import Vector2 from "../../utils/math/Vector2";
    import type { IDrawable } from "../../utils/canvas/interface/IDrawable";

    const MANDELBROT_CONTROL_SIZE = 300;
    const ZOOM_SPEED = 0.2;
    const UI_MOVE_SPEED = 50;

    let mover: MoveControls2D;
    let zoomer: ZoomInputcontrolls;

    let julia: JuliaDrawer;



    function createDrawer(elem: HTMLCanvasElement): IDrawable {
        mover = new MoveControls2D(elem);
        zoomer = new ZoomInputcontrolls(elem);
        mover.onMove(move);
        zoomer.onZoom((y) => zoom(1 - ZOOM_SPEED * y));

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
        let drawerSize = julia.getSize();
        
        let translatedX = drawerSize.width/2 / MANDELBROT_CONTROL_SIZE * x - drawerSize.width/4 - 0.5;//.5 for the .5 position offset in the mandelbrot drawer
        let translatedY = -drawerSize.height/2 / MANDELBROT_CONTROL_SIZE * y + drawerSize.height/4;
        
        julia.setConst(translatedX, translatedY);
        julia.draw();
    }
</script>

<div>
    <SetRenderer drawerFactory={createDrawer} />
    <UIControls
        onUp={() => move(0, ZOOM_SPEED)}
        onDown={() => move(0, -ZOOM_SPEED)}
        onLeft={() => move(ZOOM_SPEED, 0)}
        onRight={() => move(-ZOOM_SPEED, 0)}
        onZoomIn={() => zoom(1 + UI_MOVE_SPEED)}
        onZoomOut={() => zoom(1 - UI_MOVE_SPEED)}
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
