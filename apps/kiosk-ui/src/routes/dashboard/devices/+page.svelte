<script lang="ts">
    import {
        deviceStore,
        subscribeDevices,
        unsubscribeDevices,
        addDevice,
        removeDevice,
        updateDevice
    } from '@stores/device';
    import { subscribeViews, unsubscribeViews, viewsStore, getView } from '@stores/view';
    import { onMount, onDestroy } from 'svelte';

    let deviceSelect;
    let curretDeviceId;
    $: currentDevice = $deviceStore.find((device) => device.id === curretDeviceId);
    let viewSelect;

    onMount(() => {
        subscribeDevices();
        subscribeViews();
    });

    onDestroy(() => {
        unsubscribeDevices();
        unsubscribeViews();
    });

    function add() {
        addDevice({
            name: prompt('Enter device name')
        });
    }

    function remove() {
        const name = $deviceStore.find((device) => device.id === deviceSelect.value)?.name;
        const sure = window.confirm(`Are you sure you want to delete: ${name}? ${deviceSelect.value}`);
        if (!sure) return;
        removeDevice(deviceSelect.value);
    }

    function rename() {
        const newName = prompt(`Enter new name for ${currentDevice?.name}`);
        if (!newName) return;
        let device = $deviceStore.find((device) => device.id === deviceSelect.value);
        device.name = newName;
        updateDevice(device);
    }

    function addViewToDevice() {
        let device = $deviceStore.find((device) => device.id === curretDeviceId);
        let viewId = viewSelect.value;
        if (!device.views) device.views = [];
        device.views.push({
            id: viewId
        });
        updateDevice(device);
    }

    function moveViewPosition(index, direction: 'up' | 'down') {
        let device = $deviceStore.find((device) => device.id === curretDeviceId);
        let views = device.views;
        let view = views[index];
        views.splice(index, 1);
        views.splice(direction === 'up' ? index - 1 : index + 1, 0, view);
        device.views = views;
        updateDevice(device);
    }

    function removeViewFromDevice(viewId) {
        let device = $deviceStore.find((device) => device.id === curretDeviceId);
        let views = device.views;
        let index = views.findIndex((view) => view.id === viewId);
        views.splice(index, 1);
        device.views = views;
        updateDevice(device);
    }

    function updateViewTimeout(index: number, timeout: string|number) {
        timeout = Number(timeout);
        let device = $deviceStore.find((device) => device.id === curretDeviceId);
        let views = device.views;
        views[index].timeout = timeout;
        device.views = views;
        updateDevice(device);
    }
</script>

<main>
    <h1>Device Views</h1>

    <div>
        <h2>Select Device</h2>
        {#if $deviceStore.length === 0}
            <p>No devices found</p>
        {:else}
            <select bind:this={deviceSelect} bind:value={curretDeviceId}>
                <option value={null}>Select Device</option>
                {#each $deviceStore as device}
                    <option value={device.id}>
                        {device.name}
                    </option>
                {/each}
            </select>
        {/if}
        <br />
        <br />
        <div style="display:flex;gap:15px">
            <button on:click={add}> Add new Device </button>
            <button on:click={remove}> Delete Device </button>
            <button on:click={rename}> Rename Device </button>
        </div>
    </div>

    {#if curretDeviceId}
        <div>
            <h2>Views</h2>

            <select bind:this={viewSelect}>
                <option value={null}>Select View</option>
                {#each $viewsStore as view}
                    <option value={view.id}>{view.name}</option>
                {/each}
            </select>
            <button on:click={addViewToDevice}> Add View </button>

            {#if !currentDevice?.views || currentDevice.views.length === 0}
                <p>No views found</p>
            {:else}
                <table>
                    <thead>
                        <tr>
                            <th>View name</th>
                            <th>Refresh Timeout</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each currentDevice.views as view, i}
                            <tr>
                                <td>
                                  {getView(view.id).name}
                                </td>
                                <td>
                                    <input 
                                      type="number" 
                                      placeholder="none" 
                                      name="timeout" 
                                      value={view.timeout ?? ''} 
                                      on:change={({currentTarget}) => updateViewTimeout(i, currentTarget.value)}
                                    />
                                </td>
                                <td style="display: flex">
                                   {#if i !== 0}
                                      <button on:click={() => moveViewPosition(i, 'up')}>
                                        up 
                                      </button>
                                    {/if}
                                    {#if i !== currentDevice.views.length - 1}
                                      <button on:click={() => moveViewPosition(i, 'down')}>
                                        down 
                                      </button>
                                    {/if}
                                    <button style="background: red" on:click={() => removeViewFromDevice(view.id)}>
                                      x 
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            {/if}
        </div>
    {:else}
        <br />
        <br />
        <p>Select a device to see its kiosk views</p>
    {/if}
</main>
