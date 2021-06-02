<script lang="ts">
    import { onMount, afterUpdate, tick } from "svelte";
    import type { IControlableDrawing } from "../../utils/canvas/interface/IControlableDrawing";

    export let drawerFactory: (canvas: HTMLCanvasElement) => IControlableDrawing;

    export let onClick: (e: MouseEvent) => void = (e) => {};

    let canvas: HTMLCanvasElement;

    let width: number = 500;
    let height: number = 500;

    let drawer: IControlableDrawing = null;

    function resizeCanvas(): void{
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
    }
    window.addEventListener("resize", resizeCanvas);

    afterUpdate(() => {
        drawer.resetViewport();
        drawer.draw();
    });

    onMount(async () => {        
        drawer = drawerFactory(canvas);
        
        resizeCanvas();
        await tick();
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
