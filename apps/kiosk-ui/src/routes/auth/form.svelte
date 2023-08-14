<script lang="ts">
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
    import { auth } from '@stores/firebase';
    import { db } from '@stores/firebase';
    import { doc, setDoc } from "firebase/firestore";

    let form: HTMLFormElement
    export let formError = ""

    async function handleLogin() {
      try {
        await signInWithEmailAndPassword(auth, form.email.value, form.password.value)
      } catch (error:any) {
        formError = error?.message ?? "Something went wrong"
      }
    }

    async function handleRegister() {
      try {
        await createUserWithEmailAndPassword(auth, form.email.value, form.password.value);
        try {
          if (!auth.currentUser) throw new Error("User correctly created")
          await setDoc(doc(db, "users", auth.currentUser.uid), {
            isUser: true,
            email: form.email.value,
          })
        } catch (error: any) {
          alert(error.message)
        }
      } catch (error:any) {
        formError = error?.message ?? "Something went wrong"
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
        {@html formError}
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