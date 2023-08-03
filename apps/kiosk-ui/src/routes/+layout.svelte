<script>
    import { goto } from '$app/navigation';
    import { auth } from '@stores/firebase';
    import { browser } from '$app/environment';
    import { deviceStoreInit } from '@stores/device';
    import { viewStoreInit } from '@stores/view';
    import { onMount } from 'svelte';

    onMount(() => {
        deviceStoreInit();
        viewStoreInit();
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
        padding-top: 20%;
        padding-bottom: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 60%;
    }
</style>
