<script>
  import AccountRow from "./accountRow.svelte";
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


{#if false }
<main>
    <AccountRow id="1" email="matthijs@volcano.nl" isAdmin={true} hasAccess={true} isSelf={true} saveChanges={() => {}} />
    <AccountRow id="2" email="test@volcano.nl" isAdmin={false} hasAccess={true} isSelf={false} saveChanges={() => {}} />
</main>

{:else}


<h2>Your not an admin</h2>


{/if}