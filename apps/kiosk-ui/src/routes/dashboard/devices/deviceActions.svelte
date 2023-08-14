<script lang="ts">
    import { userData } from '@stores/auth';
    import { deviceStore, addDevice, removeDevice, updateDevice } from '@stores/device';

    export let deviceId: string | undefined;

    function add() {
        addDevice({
            name: prompt('Enter device name') || 'New Device',
        });
    }

    function remove() {
        const name = $deviceStore.find((device) => device.id === deviceId)?.name;
        const sure = window.confirm(`Are you sure you want to delete: ${name}?`);
        if (!sure) return;
        removeDevice(deviceId);
    }

    function rename() {
        const newName = prompt(`Enter new name for ${$deviceStore.find((device) => device.id === deviceId)?.name}`);
        if (!newName) return;
        let device = $deviceStore.find((device) => device.id === deviceId);
        if (!device) return;
        device.name = newName;
        updateDevice(device);
    }
</script>

<div style="display:flex;gap:15px">
    {#if $userData.isAdmin}
        <button on:click={add}> Add new Device </button>
        <button on:click={remove}> Delete Device </button>
    {/if}
    <button on:click={rename}> Rename Device </button>
</div>
