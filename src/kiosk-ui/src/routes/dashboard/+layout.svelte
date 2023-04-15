<script>
    import Logo from "$lib/logo.svelte";
    import CenterContainer from "$lib/centerContainer.svelte";
    import { userIsLoggedIn, logoutUser } from '$lib/auth';

    function logout(){
        logoutUser();
        goto('/auth');
    }

</script>

<style lang="scss">
    div {
        position: fixed;
        top: 35px;
        right: 30px;
        display: flex;
        gap: 10px;
    }
    a {
        text-align: center;
        font-size: 11px;
        color: hsla(0, 0%, 100%, 0.615);
        background-color: #30189b;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        transition: all .5s;
        &:hover {
            background-color: #30189b;
            opacity: .8;
        }
    }
</style>

<Logo fixed=true width=100 opacity=1 alignLeft=true />


<div>
    <a href="/dashboard">
        Dashboard
    </a>
    
    {#if $userIsLoggedIn}
        <a href=void:0 on:click={logout}>
        Logout
        </a>
    {/if}
    
</div>

<CenterContainer>
    <slot />
</CenterContainer>