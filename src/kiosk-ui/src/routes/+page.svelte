<script>
  import Logo from "$lib/logo.svelte";
  import { onMount } from "svelte";
  import { goto } from '$app/navigation';
  import CenterContainer from '../lib/centerContainer.svelte';

  // Count down to take redirect to next page
  let timeLeft = 5;
  onMount(() => {
    const interval = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft === 0) {
        clearInterval(interval);
      }
    }, 1000);
  });

</script>

<CenterContainer>

  <Logo />

  <h1>Welcome to the Wolf of Office</h1>

  {#if false}
  <h3>
    kiosk screen starts in {timeLeft} seconds
  </h3>
  {:else}
  <h3>
    No kiosk screen found, please contact your administrator
  </h3>
  {/if}
  
  <button on:click={() => goto('/dashboard')}>
    Open Dashboard
  </button>

</CenterContainer>