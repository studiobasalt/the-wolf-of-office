<script>
  import Footer from "$lib/footer.svelte";
  import { goto } from '$app/navigation';
  import { auth } from "@stores/firebase";

  auth.onAuthStateChanged((user) => {
    if (user) return;
    if(window.location.pathname === '/auth') return;
    goto('/auth');
  });

  
</script>

<style lang="scss">
  :global {
    @import "../global.scss";
  }

  main {
    padding-top: 20vh;
    padding-bottom: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
  }
</style>

<main>
  <slot></slot>
</main>


<Footer />