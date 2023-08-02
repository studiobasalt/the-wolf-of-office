<script lang="ts">
    import { deviceStore, updateDevice } from '@stores/device';
    import { viewsStore } from '@stores/view';
    import ViewRow from './viewRow.svelte';
    import DeviceActions from './deviceActions.svelte';
    import { updateDefaultDevice, defaultDeviceStore } from '@stores/local';

    let deviceSelect;
    let curretDeviceId = $defaultDeviceStore;
    $: currentDevice = $deviceStore.find((device) => device.id === curretDeviceId);
    let viewSelect;

    function addViewToDevice() {
        let device = $deviceStore.find((device) => device.id === curretDeviceId);
        let viewId = viewSelect.value;
        if (!viewId) return;
        if (!device.views) device.views = [];
        device.views.push({
            id: viewId
        });
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
            {#if $defaultDeviceStore === curretDeviceId || curretDeviceId === null}
                {#if curretDeviceId !== null}
                    <span>Default Device</span>
                {/if}
            {:else}
                <button class="small" on:click={() => updateDefaultDevice(curretDeviceId)}>
                    set as device default
                </button>
            {/if}
        {/if}
        <br />
        <br />
        <DeviceActions deviceId={curretDeviceId} />
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
                            <th>SlideShow Timeout (ms)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each currentDevice.views as view, i}
                            <ViewRow deviceView={view} i={i} curretDeviceId={curretDeviceId} />
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
