<script>
    export let width = 400;
    export let margin = 80;
    export let fixed = false;

    if(fixed) margin = 0;
</script>

<style>
    .fixed{
        position: fixed;
        top: 50px;
        opacity: .3;
    }
</style>

<img src="./logo.svg" class:fixed alt="" style="max-width: {width}px; margin-bottom: {margin}px;" />