<script lang="ts">
    import Logo from '$lib/logo.svelte';
    import { onMount, onDestroy } from 'svelte';
    import { goto } from '$app/navigation';
    import CenterContainer from '$lib/centerContainer.svelte';
    import Footer from '@lib/footer.svelte';
    import { deviceEnvs } from '@stores/local';
    import ScreenOrientationSetup from '@lib/screenOrientationSetup.svelte';

    // Count down to take redirect to next page
    let timeLeft = 10;
    let timer: NodeJS.Timeout | undefined
    onMount(() => {
        timer = setInterval(() => {
            timeLeft -= 1;
            if (timeLeft === 0) {
                goto('/playmode');
                clearInterval(timer);
            }
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(timer);
    });
</script>

<ScreenOrientationSetup />

<CenterContainer>
    <Logo />

    <h1 style="text-align: center">Welcome to the Wolf of Office</h1>

    {#if $deviceEnvs?.defaultDevice}
        <h3>
            kiosk mode starts in {timeLeft} seconds.
        </h3>
        <p>Press <b>Q</b> or <b>R</b> to exit the kiosk mode</p>
        <br />
    {:else}
        <h3>No device is set, open device management to set a device</h3>
    {/if}

    <button on:click={() => goto('/dashboard')}> Open Dashboard </button>
</CenterContainer>

<Footer />
