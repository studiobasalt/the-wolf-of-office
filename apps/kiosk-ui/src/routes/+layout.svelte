<script>
  import Footer from "$lib/footer.svelte";
  import { onMount } from "svelte";
  import { goto } from '$app/navigation';
  import { user } from "@stores/auth";

  onMount(() => {
    if (typeof window === 'undefined') return;
    redirectAuth();
  });

  function redirectAuth(){
    // if current route is already auth, don't redirect
    if(window.location.pathname === '/auth') return;
    if(!$user) goto('/auth');
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