<script>
  import Logo from "$lib/logo.svelte";
  import Form from "./form.svelte";
  import { user } from "@stores/auth";
  import CenterContainer from "$lib/centerContainer.svelte";

  user.subscribe((value) => {
    if (value) window.location.href = "/dashboard";
  });
</script>


<CenterContainer>

  <Logo width={150} margin={80} fixed={true} />

  <h1>Login / Register</h1>
  <br>
  <br>

  <Form />

</CenterContainer>