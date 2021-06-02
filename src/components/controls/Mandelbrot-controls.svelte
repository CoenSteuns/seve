<script>
    import MandelbrotDrawer from "../../utils/canvas/MandelbrotDrawer";
    import SetRenderer from "../content/SetRenderer.svelte";

    export let onPositionSelected;

    function onClickers(e) {
        onPositionSelected(e)
    }
</script>

<div>
    <SetRenderer DrawerType={MandelbrotDrawer} onDrawerCreated={() => {}} onClick={onClickers} />
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