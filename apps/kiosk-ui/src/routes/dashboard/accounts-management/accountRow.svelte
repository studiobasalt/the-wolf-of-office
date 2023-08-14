<script lang="ts">
    import type { UserData } from "@stores/auth";
    import { writable } from "svelte/store";

    export let user: UserData;
    export let dataStore = writable<UserData[]>();

    let form: HTMLFormElement;

    function inputChange() {
        dataStore.update((users) => {
            const index = users.findIndex((u) => u.id === user.id);
            user.isAdmin = form.admin.checked;
            user.hasAccess = form.hasAccess.checked;
            users[index] = user;
            return users;
        });
    }
</script>

<form class="account-row" bind:this={form}>
    <p class="email">
        {user.email}
    </p>
    <div>
        <label for="admin">Is Admin</label>
        <input type="checkbox" id="admin" name="admin" checked={user.isAdmin} disabled={user.isSelf} on:change={inputChange}>
    </div>
    <div>
        <label for="hasAccess">Has access</label>
        <input type="checkbox" id="hasAccess" name="hasAccess" checked={user.hasAccess} disabled={user.isSelf} on:change={inputChange}>
    </div>
</form>

<style lang="scss">
    .account-row {
      flex-direction: row;
      max-width: auto;
      padding: 20px 30px;
      display: flex;
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