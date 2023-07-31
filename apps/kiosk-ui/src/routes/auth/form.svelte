<script>
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
    import { auth } from '@stores/firebase';

    let form
    let formData = {}
    async function handleLogin(email, password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.log(error);
      }
    }

    async function handleRegister(email, password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.log(error);
      }
    }

</script>

<style>
    .error{
        color: red;
        font-weight: bold;
    }
</style>

{#if false}
    <p class="error">
        ERROR
    </p>
{/if}
<form bind:this={form}>
    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required placeholder="example@volcano.nl" bind:value={formData.email}>
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required placeholder="Password" bind:value={formData.password}>
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