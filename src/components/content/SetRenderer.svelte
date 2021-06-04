<script lang="ts">
    import { onMount, afterUpdate, tick, onDestroy } from "svelte";
    import type { IControlableDrawing } from "../../utils/canvas/interface/IControlableDrawing";
import type { IDrawable } from "../../utils/canvas/interface/IDrawable";

    export let drawerFactory: (canvas: HTMLCanvasElement) => IDrawable;
    export let onClick: (e: MouseEvent) => void | null = null;

    let canvas: HTMLCanvasElement;

    let width = 500;
    let height = 500;

    let drawer: IDrawable = null;

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
        if(onClick)
            canvas.addEventListener('click', onClick);
    });

    onDestroy(() => {
        drawer.removeContext();
    })
</script>

<canvas {width} {height} bind:this={canvas} />

<style>
    canvas {
        width: 100%;
        height: 100%;
    }
</style>
