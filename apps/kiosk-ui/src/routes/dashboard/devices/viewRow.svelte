<script lang="ts">
    import { deviceStore, updateDevice } from '@stores/device';
    import { viewsStore } from '@stores/view';

    export let deviceView: _deviceView;
    export let i: number;
    export let curretDeviceId: string;

    let view: View | undefined;
    $: view = $viewsStore.find((view) => view.id === deviceView.id);

    function moveViewPosition(index: number, direction: 'up' | 'down') {
        let device = $deviceStore.find((device) => device.id === curretDeviceId);
        if (!device) return;
        let views = device.views ?? [];
        let view = views[index];
        views.splice(index, 1);
        views.splice(direction === 'up' ? index - 1 : index + 1, 0, view);
        device.views = views;
        updateDevice(device);
    }

    function removeViewFromDevice(viewId: string | undefined) {
        let device = $deviceStore.find((device) => device.id === curretDeviceId);
        if (!device) return;
        let views = device.views ?? [];
        let index = views.findIndex((view) => view.id === viewId);
        views.splice(index, 1);
        device.views = views;
        updateDevice(device);
    }

    function updateViewTimeout(index: number, timeout: string | number) {
        timeout = Number(timeout);

        let device = $deviceStore.find((device) => device.id === curretDeviceId);
        if (!device) return;
        let views = device.views ?? [];

        views[index].timeout = timeout;
        device.views = views;
        updateDevice(device);
    }
</script>

<tr>
    <td>
        {view?.name}
    </td>
    <td>
        <input
            type="number"
            placeholder="none"
            name="timeout"
            value={deviceView.timeout ?? ''}
            on:change={({ currentTarget }) => updateViewTimeout(i, currentTarget.value)}
        />
    </td>
    <td style="display: flex; max-width: 200px; gap: 5px">
        {#if i !== 0}
            <button on:click={() => moveViewPosition(i, 'up')}> up </button>
        {/if}
        {#if i !== ($deviceStore.find((device) => device.id === curretDeviceId)?.views?.length ?? 0) - 1}
            <button on:click={() => moveViewPosition(i, 'down')}> down </button>
        {/if}
        <button style="background: red" on:click={() => removeViewFromDevice(view?.id)}> x </button>
    </td>
</tr>
