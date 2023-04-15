<script>
    export let width = 400;
    export let margin = 80;
    export let fixed = false;
    export let alignLeft = false;
    export let opacity = 1;
    if(fixed) margin = 0;
</script>

<style>

    div{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .fixed{
        position: fixed;
        top: 0;
        height: 100px;
        opacity: .3;
        left: 0;
    }
    .alignLeft{
        justify-content: flex-start;
        padding-left: 40px;
    }
</style>

<div class:fixed class:alignLeft style="opacity: {opacity}">
    <img src="/logo.svg" alt="" style="max-width: {width}px; margin-bottom: {margin}px;" />
</div>
