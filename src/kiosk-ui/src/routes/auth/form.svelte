<script>
	import { authErrors, registerUser, loginUser } from '$lib/auth.js';
    import { onMount } from "svelte";

    let email = '';
    let password = '';
    let form;

    function handleRegister(){
        if(!form.checkValidity()) return;
        registerUser(email, password);
    }

    function handleLogin(){
        if(!form.checkValidity()) return;
        loginUser(email, password);
    }

    onMount(() => {
        form.addEventListener('click', (e) => {
            authErrors.set(null);
        });
    });
</script>

<style>
    .error{
        color: red;
        font-weight: bold;
    }
</style>

{#if $authErrors}
    <p class="error">
        {$authErrors}
    </p>
{/if}
<form bind:this={form}>
    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required placeholder="example@volcano.nl" bind:value={email}>
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required placeholder="Password" bind:value={password}>
    </div>
    <div class="row">
        <button type="button" id="register-btn" on:click={handleLogin}>
            Login
        </button>
        <button type="button" id="login-btn" on:click={handleRegister}>
            Register
        </button>
    </div>
</form>