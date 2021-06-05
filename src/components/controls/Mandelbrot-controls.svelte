<script lang="ts">
    import type { IControlableDrawing } from "../../utils/canvas/interface/IControlableDrawing";

    import MandelbrotDrawer from "../../utils/canvas/MandelbrotDrawer";
    import SetRenderer from "../content/SetRenderer.svelte";

    export let width = 300;
    export let height = 300;

    export let onPositionSelected: (x: number, y: number) => void;

    function onClickers(e: MouseEvent) : void{
        onPositionSelected(e.offsetX, e.offsetY)
    }

    function createMandelbrotDrawer(canvas: HTMLCanvasElement): IControlableDrawing {
        return new MandelbrotDrawer(canvas);
    }
</script>

<div style="--width: {width}px; --height: {height}px;">
    <SetRenderer drawerFactory={createMandelbrotDrawer} onClick={onClickers} />
</div>

<style>
    div{
        position: absolute;
        width: var(--width);
        height: var(--height);
        bottom: 10px;
        left: 10px;

        border: 1px black solid;
        -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.37);
        box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.37);

        background-color: white;
    }

</style>