<script lang="ts">
    import { deviceEnvs } from '@stores/local';
    import { browser } from '$app/environment';
    import { onDestroy } from 'svelte';

    $: if ($deviceEnvs?.screenOrientation && browser) {
        const classList = document.body.classList;
        if ($deviceEnvs?.screenOrientation === 'left') {
            classList.add('left');
            classList.remove('right');
            classList.add('default');
        } else if ($deviceEnvs?.screenOrientation === 'right') {
            classList.add('right');
            classList.remove('left');
            classList.add('default');
        } else {
            classList.remove('left');
            classList.remove('right');
            classList.add('default');
        }
    }

    onDestroy(() => {
        if (!browser) return;
        document.body.classList.remove('left');
        document.body.classList.remove('right');
        document.body.classList.remove('default');
    });
</script>

<style lang="scss" global>
    :global(html) {
        body {
            &.default {
                padding: 0 !important;
                margin: 0 !important;
                overflow: hidden !important;
                > main {
                    margin: 0 !important;
                    padding: 0 !important;
                }
            }
            &.right {
                position: absolute;
                transform: rotate(90deg);
                transform-origin: bottom left;
                width: 100svh;
                height: 100svw;
                top: -100svw;
            }
            &.left {
                position: absolute;
                transform: rotate(-90deg);
                transform-origin: top left;
                width: 100svh;
                height: 100svw;
                top: 100svh;
            }
        }
    }
</style>
