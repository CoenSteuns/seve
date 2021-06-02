<script>
    import { onMount, afterUpdate, tick } from "svelte";

    export let DrawerType;
    export let onDrawerCreated;

    export let onClick = () => {};

    let canvas;

    let width = 500;
    let height = 500;

    let drawer = null;

    function resizeCanvas() {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
    }
    window.addEventListener("resize", resizeCanvas);

    afterUpdate(() => {
        drawer.resetViewport();
        drawer.draw();
    });

    onMount(async () => {
        drawer = new DrawerType(canvas);
        resizeCanvas();
        await tick();
        onDrawerCreated(drawer, canvas);
        drawer.resetViewport();
        drawer.draw();
        canvas.addEventListener('click', onClick);
    });
</script>

<canvas {width} {height} bind:this={canvas} />

<style>
    canvas {
        width: 100%;
        height: 100%;
    }
</style>
