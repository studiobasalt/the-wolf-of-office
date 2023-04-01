<script>
  import Footer from "$lib/footer.svelte";
  import { onMount } from "svelte";
  import { appWindow } from "$lib/stores";

  onMount(() => {
    if (typeof window === 'undefined') return;
    appWindow.set(window);
  });
</script>

<style lang="scss">
  @import "/node_modules/normalize.css/normalize.css";
  @import "../global.scss";


  main{
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>

<main>
  <slot></slot>
</main>


<Footer />