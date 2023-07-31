<script>
    // import { deviceStore, currentDeviceId, registerDevice, removeViewFromDevice, removeDevice } from '$lib/deviceStore';
    // import { viewStore } from '$lib/viewStore';

    let deviceData = null
    $: deviceData = $deviceStore?.find(device => device.id === $currentDeviceId);

    let addView = false;

  </script>
  
  <main>
    <h1>Device Views</h1>
  
    <div>
      <h2>Select Device</h2>
      <p>
        Current Device: {$currentDeviceId}
      </p>
      <select bind:value={$currentDeviceId}>
        {#each $deviceStore as device}
          <option value={device.id}>{device.name}</option>
        {/each}
      </select>
      <br>
      <div style="display:flex;gap:15px">
        <button on:click={registerDevice}>Register Device</button>
        <button on:click={() => removeDevice($currentDeviceId)}>
          Delete Device
        </button>
      </div>
    </div>
  
    <div>
      <h2>Views</h2>
      <select bind:value={addView}>
        <option value={false}>Select View</option>
        {#each $viewStore.filter(v => !deviceData?.views?.find(view => view.id === v.id)) as view}
          <option value={view.id}>{view.name}</option>
        {/each}
      </select>
      <button on:click={() => {
        if (addView) {
          deviceStore.update(store => {
            store.find(device => device.id === $currentDeviceId).views.push({
              id: addView,
              duration: 0
            });
            return store;
          });
          addView = false;
        }
      }}>
        Add View
      </button>
      <ul>
        {#each deviceData?.views ?? [] as view}
          <li>
            {$viewStore.find(v => v.id === view.id)?.name}
              <input
                type="number"
                bind:value={view.duration}
              />
              <button on:click={() => removeViewFromDevice($currentDeviceId, view.id)}>
                Delete
              </button>
          </li>
        {/each}
      </ul>
    </div>
  </main>