<script>
    let email = 'matthijs@volcano.nl'
    let isAdmin = false
</script>

<h1>My account</h1>
<p>Manage your account settings and set e-mail preferences.</p>
<br>
<br>
<form>
    <p>
        Is admin account: <b>{isAdmin ? 'Yes' : 'No'}</b> <br>
        Validated email: <b>{false ? 'Yes' : 'No'}</b> <br>
        Creation date: <b>2021-05-12</b> <br>
    </p>
    <h2>Reset password</h2>
    <div>
        <label for="email">Email</label>
        <input type="email" placeholder="Email" disabled value={email} />
    </div>
    <div>
        <label for="password">Password</label>
        <input type="password" placeholder="Password" />
    </div>
    <div>
        <label for="password">Confirm password</label>
        <input type="password" placeholder="Confirm password" />
    </div>
    <button type="submit">Reset password</button>
</form>
