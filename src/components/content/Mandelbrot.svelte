<script>
    import { onMount, afterUpdate, tick } from "svelte";
    import MandelbrotDrawer from "../../utils/canvas/MandelbrotDrawer";
    import MoveControls2D from "../../utils/input/MoveControlls2D"
    import ZoomInputcontrolls from "../../utils/input/ZoomInputcontrolls"
    import UIControls from "../Move-controls.svelte"

    let canvas;
    let container;

    const zoomspeed = 0.2;

    let width = 500;
    let height = 500;

    let mandelbrot = null;

    let mover;
    let zoomer;

    function resizeCanvas() {
        width = container.offsetWidth;
        height = container.offsetHeight;
    }
    window.addEventListener("resize", resizeCanvas);

    afterUpdate(() => {
        mandelbrot.resetViewport();
        mandelbrot.draw();
    });

    onMount(async () => {
        mandelbrot = new MandelbrotDrawer(canvas);
        resizeCanvas();
        await tick();
        mandelbrot.resetViewport();
        mandelbrot.draw();
        mover = new MoveControls2D(canvas);
        zoomer = new ZoomInputcontrolls(canvas);
        mover.onMove((x, y) => {
            mandelbrot.movePixels([x, y])
            mandelbrot.redraw();
        })
        zoomer.onZoom((y) => {
            zoom(1 - zoomspeed * y)
        })
    });

    function move(x, y) {
        mandelbrot.move([x, y]);
        mandelbrot.draw();
    }

    function zoom(amount) {
        mandelbrot.zoom(amount);
        mandelbrot.draw();
    }

</script>


<div class="canvas-container" bind:this={container}>
    <canvas {width} {height} bind:this={canvas} />
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
    .canvas-container {
        width: 100%;
        height: 100vh;  
        
    }

</style>
