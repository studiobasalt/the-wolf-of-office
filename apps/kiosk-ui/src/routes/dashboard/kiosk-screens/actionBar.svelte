<script lang="ts">
    import { deleteView, renameView } from "@stores/view";

    export let selectedViewId: string;
    export let selectedView: View | undefined
    export let createSectionOnView: () => void;

    function deleteCurrentView() {
        const sure = confirm(`Are you sure you want to delete view ${selectedView?.name}?`);
        if (!sure) return;
        deleteView(selectedViewId);
    }
</script>

{#if selectedViewId}
    <div style="display:flex;gap:15px;flex-direction:column">
        <button on:click={() => renameView(selectedViewId, prompt(`Rename view ${selectedView?.name} to`))}>
           Edit name
        </button>
        <button on:click={deleteCurrentView}>
          Delete slide
        </button>
        <button on:click={createSectionOnView}>
          Create new section
        </button>
  </div>
{/if}