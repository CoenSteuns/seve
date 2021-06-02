<script lang="ts">
    import type { IControlableDrawing } from "../../utils/canvas/interface/IControlableDrawing";

    import MandelbrotDrawer from "../../utils/canvas/MandelbrotDrawer";
    import SetRenderer from "../content/SetRenderer.svelte";

    export let onPositionSelected: (x: number, y: number) => void;

    function onClickers(e: MouseEvent) {
        
        onPositionSelected(e.offsetX, e.offsetY)
    }

    function createMandelbrotDrawer(canvas: HTMLCanvasElement): IControlableDrawing {
        return new MandelbrotDrawer(canvas);
    }
</script>

<div>
    <SetRenderer DrawerFactory={createMandelbrotDrawer} onDrawerCreated={() => {}} onClick={onClickers} />
</div>

<style>
    div{
        position: absolute;
        width: 300px;
        height: 300px;
        bottom: 10px;
        left: 10px;

        border: 1px black solid;
        -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.37);
        box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.37);

        background-color: white;
    }

</style>