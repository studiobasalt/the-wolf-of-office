<script>
    import Logo from "$lib/logo.svelte";
</script>

<style>
    .block{
        width: 50%;
        background-color: #ccc;
        height: 30px;
    }
    p{
        max-width: 500px;
    }
</style>

<Logo width=150 margin=80 fixed=true />

<h1>Login / Register</h1>
<br>
<br>
<form>
    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required placeholder="example@volcano.nl">
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required placeholder="Password">
    </div>
    <div class="row">
        <button type="button" id="register-btn">Register</button>
        <button type="button" id="login-btn">Login</button>
    </div>
</form>