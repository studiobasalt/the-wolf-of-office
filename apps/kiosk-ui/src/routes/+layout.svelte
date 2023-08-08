<script>
    import { goto } from '$app/navigation';
    import { auth } from '@stores/firebase';
    import { browser } from '$app/environment';
    import { deviceStoreInit } from '@stores/device';
    import { viewStoreInit } from '@stores/view';
    import { globalsStoreInit } from '@stores/globals';
    import { onMount } from 'svelte';

    onMount(() => {
        deviceStoreInit();
        viewStoreInit();
        globalsStoreInit();
    });

    auth.onAuthStateChanged((user) => {
        if (!browser) return;
        if (user) return;
        if (window?.location.pathname === '/auth') return;
        goto('/auth');
    });
</script>

<main>
    <slot />
</main>

<style lang="scss">
    :global {
        @import '../global.scss';
    }

    main {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        padding-top: 150px;
        padding-bottom: 150px;
    }
</style>
