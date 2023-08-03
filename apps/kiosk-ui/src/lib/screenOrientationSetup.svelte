<script lang="ts">
    import { deviceEnvs } from '@stores/local';
    import { browser } from '$app/environment';
    import { onDestroy } from 'svelte';

    $: if ($deviceEnvs?.screenOrientation && browser) {
        const classList = document.body.classList;
        if ($deviceEnvs?.screenOrientation === 'left') {
            classList.add('left');
            classList.remove('right');
        } else if ($deviceEnvs?.screenOrientation === 'right') {
            classList.add('right');
            classList.remove('left');
        } else {
            classList.remove('left');
            classList.remove('right');
        }
    }

    onDestroy(() => {
        document.body.classList.remove('left');
        document.body.classList.remove('right');
    });
</script>

<style lang="scss" global>
    :global(html) {
        body {
            &.right {
                position: absolute;
                transform: rotate(90deg);
                transform-origin: bottom left;
                width: 100vh;
                height: 100vw;
                top: -100vw;
            }
            &.left {
                position: absolute;
                transform: rotate(-90deg);
                transform-origin: top left;
                width: 100vh;
                height: 100vw;
                top: 100vh;
            }
        }
    }
</style>
