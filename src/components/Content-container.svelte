<div class="container">
    <div class="content">
        <slot />
    </div>
</div>

<style>
    .container {
        position: absolute;
        left: 250px;
        right: 0px;
    }

    .content {
        position: relative;
    }
</style>
