<script>
    export let id = "";
    export let email = "";
    export let isAdmin = false;
    export let hasAccess = false;
    export let isSelf = false;
    export let saveChanges = () => {};

    function inputChange() {
        saveChanges(id, isAdmin, hasAccess);
    }
</script>

<style lang="scss">
    .account-row {
      padding: 20px 30px;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      background-color: #f2f2f2;
      border-radius: 10px;
      height: 60px;
      width: 100%;
      gap: 30px;
      text-decoration: none;
      color: #333;
      transition: all 0.2s ease-in-out;
    }
</style>

<div class="account-row">
    <p class="email">
        {email}
    </p>
    <div>
        <label for="admin">Is Admin</label>
        <input type="checkbox" id="admin" name="admin" bind:checked={isAdmin} disabled={isSelf} on:change={inputChange}>
    </div>
    <div>
        <label for="hasAccess">Has access</label>
        <input type="checkbox" id="hasAccess" name="admin" bind:checked={hasAccess} disabled={isSelf} on:change={inputChange}>
    </div>
</div>