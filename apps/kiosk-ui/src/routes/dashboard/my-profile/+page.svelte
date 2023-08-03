<script lang="ts">
    import { userData, user } from '@stores/auth';
    import { globalsStore } from '@stores/globals';
</script>

<h1>My account</h1>
<p>Manage your account settings and set e-mail preferences.</p>
<br>
<br>
<form>
    <p>
        Is admin account: <b>{$userData?.isAdmin ? 'Yes' : 'No'}</b> <br>
        Validated email: <b>{$user?.emailVerified ? 'Yes' : 'No'}</b> <br>
        Creation date: <b>{new Date(parseInt($user?.metadata["createdAt"])).toLocaleDateString()}</b> <br>
        UI version: <b>{$globalsStore?.version}</b> <br>
    </p>
    <div>
        <label for="email">Your email:</label>
        <input type="email" placeholder="Email" disabled value={$user?.email} />
    </div>
</form>