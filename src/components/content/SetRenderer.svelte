<script>
    import { onMount, afterUpdate, tick } from "svelte";
    
    export let DrawerType;
    export let onDrawerCreated;

    let canvas;
    let container;

    let width = 500;
    let height = 500;

    let drawer = null;

    function resizeCanvas() {
        width = container.offsetWidth;
        height = container.offsetHeight;
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
