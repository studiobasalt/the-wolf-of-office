<script>
  import Footer from "$lib/footer.svelte";
  import { onMount } from "svelte";
  import { appWindow } from "$lib/stores";
  import { userIsLoggedIn } from '$lib/auth';
  import { goto } from '$app/navigation';

  onMount(() => {
    if (typeof window === 'undefined') return;
    appWindow.set(window);

    redirectAuth();
  });

  function redirectAuth(){
    // if current route is already auth, don't redirect
    if(window.location.pathname === '/auth') return;
    if(!$userIsLoggedIn) goto('/auth');
  }
</script>

<style lang="scss">
  :global {
    @import "../global.scss";
  }
</style>

<main>
  <slot></slot>
</main>


<Footer />