<script>
    import Logo from "../lib/logo.svelte";
</script>

<Logo />

<h1>No screens active</h1>


<form>
    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
    </div>
    <div class="row">
        <button type="button" id="register-btn">Register</button>
        <button type="button" id="login-btn">Login</button>
    </div>
</form>