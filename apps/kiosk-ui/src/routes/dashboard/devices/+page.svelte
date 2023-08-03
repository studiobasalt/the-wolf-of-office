<script lang="ts">
    import { deviceStore, updateDevice } from '@stores/device';
    import { viewsStore } from '@stores/view';
    import ViewRow from './viewRow.svelte';
    import DeviceActions from './deviceActions.svelte';
    import { updateDefaultDevice, deviceEnvs, updateOrientation } from '@stores/local';

    let deviceSelect;
    let curretDeviceId = $deviceEnvs?.defaultDevice;
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

    function updateScreen(e) {
        updateOrientation(e.currentTarget.value as Orientation);
    }
</script>

<main>
    <h1>Device Settings</h1>
    <br />
    <div>
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
            {#if $deviceEnvs?.defaultDevice === curretDeviceId || curretDeviceId === null}
                {#if curretDeviceId !== null}
                    <span>Default Device</span>
                {/if}
            {:else}
                <button class="small" on:click={() => updateDefaultDevice(curretDeviceId)}> set as this device </button>
            {/if}
        {/if}
        <br />
        <br />
        <DeviceActions deviceId={curretDeviceId} />
    </div>

    <div>
        <h2>Configure screen orientation</h2>
        <select on:change={updateScreen} value={$deviceEnvs?.screenOrientation}>
            <option value="default">Default</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
        </select>
        <span> Local stored and only applied in kiosk play mode </span>
    </div>

    {#if curretDeviceId}
        <div>
            <h2>Configure Slides</h2>

            <select bind:this={viewSelect}>
                <option value={null}>Select Slide</option>
                {#each $viewsStore as view}
                    <option value={view.id}>{view.name}</option>
                {/each}
            </select>
            <button on:click={addViewToDevice}> Add Slide </button>

            {#if !currentDevice?.views || currentDevice.views.length === 0}
                <p>No views found</p>
            {:else}
                <table>
                    <thead>
                        <tr>
                            <th>Slide name</th>
                            <th>Slide Timeout (s)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each currentDevice.views as view, i}
                            <ViewRow deviceView={view} {i} {curretDeviceId} />
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
