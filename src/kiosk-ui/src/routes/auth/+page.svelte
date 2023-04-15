<script>
  import Logo from "$lib/logo.svelte";
  import Form from "./form.svelte";
  import { userIsLoggedIn } from "$lib/auth";
  import CenterContainer from "../../lib/centerContainer.svelte";

  userIsLoggedIn.subscribe((value) => {
    if (value) window.location.href = "/dashboard";
  });
</script>


<CenterContainer>

  <Logo width=150 margin=80 fixed=true />

  <h1>Login / Register</h1>
  <br>
  <br>

  <Form />

</CenterContainer>