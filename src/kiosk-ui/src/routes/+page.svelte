<script>
	import { userIsLoggedIn } from '$lib/auth';
  import Logo from "$lib/logo.svelte";
  import { onMount } from "svelte";

  // Count down to take redirect to next page
  let timeLeft = 5;
  onMount(() => {
    const interval = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft === 0) {
        clearInterval(interval);
        handleAction();
      }
    }, 1000);
  });

  function handleAction(){
    if(!$userIsLoggedIn) window.location.href = "/auth";
    else window.location.href = "/kiosk";
  }

</script>

<Logo />

<h1>Welcome to the Wolf of Office</h1>
<p>
    We are booting up... or your getting loggedin... or something like that.
</p>
<h3>
  action in {timeLeft} seconds
</h3>