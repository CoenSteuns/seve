<script>
    import { onMount, afterUpdate, tick } from "svelte";
    import MandelbrotDrawer from "../../utils/canvas/MandelbrotDrawer";

    let canvas;
    let container;

    let width = 500;
    let height = 500;

    let mandelbrot = null;

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
    });
</script>

<div class="canvas-container" bind:this={container}>
    <canvas {width} {height} bind:this={canvas} />
</div>

<style>
    .canvas-container {
        width: 100%;
        height: 100vh;
        
    }
</style>
