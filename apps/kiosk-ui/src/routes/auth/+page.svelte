<script>
  import Logo from "$lib/logo.svelte";
  import Form from "./form.svelte";
  import CenterContainer from "$lib/centerContainer.svelte";
  import { user, userData } from "@stores/auth";
  import { goto } from "$app/navigation";

  $: if ($user && $userData.hasAccess) {
    goto("/dashboard");
  }
</script>


<CenterContainer>

  <Logo width={150} margin={80} fixed={true} />

  <h1>Login / Register</h1>
  <br>
  <br>

  <Form formError={$userData.hasAccess === false ? "You dont have permissions. <br> Ask the admin for access...." : ""} />

</CenterContainer>