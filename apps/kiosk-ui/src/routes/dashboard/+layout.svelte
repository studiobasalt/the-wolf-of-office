<script lang="ts">
    import Logo from "$lib/logo.svelte";
    import CenterContainer from "$lib/centerContainer.svelte";
    import { user } from "@stores/auth";
    import { auth } from "@stores/firebase";
    import { goto } from "$app/navigation";
    import Footer from "@lib/footer.svelte";

    function handleLogout() {
        auth.signOut();
        goto("/auth");
    }
</script>

<Logo fixed={true} width={100} opacity={1} alignLeft={true} />

<div>
    <a href="/dashboard">
        Dashboard
    </a>
    
    {#if $user}
        <a href=void:0 on:click={handleLogout}>
        Logout
        </a>
    {/if}
    
</div>

<CenterContainer>
    <slot />
</CenterContainer>

<Footer />

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
