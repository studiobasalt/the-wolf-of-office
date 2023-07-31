<script lang="ts">
  import AccountRow from "./accountRow.svelte";
  import { userData } from "@stores/auth";
  import { onDestroy } from "svelte";
  
  export let data;

  let users = data.users

  onDestroy(() => {
    data?.unsubscribe();
  });
</script>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>

<h1>Accounts management</h1>
<p>Manage accounts and their permissions.</p>

<br>
<br>


{#if $userData.isAdmin }

<main>
      {#each $users as user}
        <AccountRow user={user} dataStore={users} />
      {/each}
</main>

{:else}


<h2>Your not an admin</h2>


{/if}