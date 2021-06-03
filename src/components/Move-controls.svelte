<script lang="ts">
    export let onUp: () => void;
    export let onDown: () => void;
    export let onLeft: () => void;
    export let onRight: () => void;

    export let onZoomIn: () => void;
    export let onZoomOut: () => void;
</script>
<div class="container">
    <div class="movement-container">
        <button class="up-button" on:click={onUp}> 
            <img src="/assets/icons/arrow.png" alt="Arrow for moving up">
        </button>
        <div class="side-buttons">
            <button class="left-button" on:click={onLeft}> 
                <img src="/assets/icons/arrow.png" alt="Arrow for moving up">
            </button>
            <button class="right-button" on:click={onRight}> 
                <img src="/assets/icons/arrow.png" alt="Arrow for moving up">
            </button>
        </div>
        <button class="down-button" on:click={onDown}> 
            <img src="/assets/icons/arrow.png" alt="Arrow for moving up">
        </button>
    </div>

    <div class="zooming-container">
        <button on:click={onZoomIn}> 
            <img src="/assets/icons/zoom_in.png" alt="Arrow for moving up">
        </button>
        <button on:click={onZoomOut}> 
            <img src="/assets/icons/zoom_out.png" alt="Arrow for moving up">
        </button>
    </div>
    
</div>
<style>
    .container{
        position:absolute;
        bottom: 15px;
        right: 15px;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .left-button{
        transform: rotate(270deg);
    }

    .down-button{
        transform: rotate(180deg);
    }

    .right-button{
        transform: rotate(90deg);
    }

    .movement-container{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .side-buttons{
        display: flex;
        flex-direction: row;
    }
    button{
        width: 50px;
        height: 50px;

        margin: 5px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    img{
        width: 35px;
        height: 35px;
    }
</style>