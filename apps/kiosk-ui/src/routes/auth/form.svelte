<script lang="ts">
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
    import { auth } from '@stores/firebase';
    import { db } from '@stores/firebase';
    import { doc, setDoc } from "firebase/firestore";

    let form
    let formError = ""

    async function handleLogin() {
      try {
        await signInWithEmailAndPassword(auth, form.email.value, form.password.value)
      } catch (error) {
        formError = error.message
      }
    }

    async function handleRegister() {
      try {
        await createUserWithEmailAndPassword(auth, form.email.value, form.password.value);
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          isUser: true
        })
      } catch (error) {
        formError = error.message
      }
    }

</script>

<style>
    .error{
        color: red;
        font-weight: bold;
    }
</style>

{#if formError != ""}
    <p class="error">
        {formError}
    </p>
{/if}
<form bind:this={form}>
    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required placeholder="example@volcano.nl">
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required placeholder="Password">
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