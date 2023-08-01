<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { 
    viewsStore, 
    subscribeViews, 
    unsubscribeViews, 
    createView, 
    renameView, 
    getView, 
    deleteView, 
    createSection, 
    updateSection,
    removeSection
  } from '@stores/view';
  import Popup from './Popup.svelte';

  let selectedViewId
  let selectedView:View
  $: selectedView = $viewsStore.find(view => view.id === selectedViewId);

  let handlePopupSubmit: (section: ViewSection) => void;
  let showPopup = false
  let popupSectionData

  onMount(() => {
    subscribeViews();
  });
  onDestroy(() => {
    unsubscribeViews();
  });

  function deleteCurrentView() {
    const sure = confirm(`Are you sure you want to delete view ${selectedView.name}?`);
    if (!sure) return;
    deleteView(selectedViewId);
  }

  function createSectionOnView(){
    showPopup = true;
    handlePopupSubmit = (section: ViewSection) => {
      createSection(selectedViewId, section);
      showPopup = false;
    }
  }

  function editSectionOnView(index: number){
    showPopup = true;
    popupSectionData = selectedView.sections[index];
    handlePopupSubmit = (section: ViewSection) => {
      updateSection(selectedViewId, index, section);
      showPopup = false;
    }
  }

  function cancelPopup() {
    showPopup = false;
    popupSectionData = null;
  }

</script>

{#if showPopup}
  <Popup submit={handlePopupSubmit} cancel={cancelPopup} sectionData={popupSectionData} />
{/if}

<h1>Kiosk Screens</h1>

<main>

<div id="sidebar">
  <h2>View</h2>
  {#if $viewsStore}
    <select bind:value={selectedViewId}>
      <option value="">Select view</option>
      {#each $viewsStore as view}
        <option value={view.id}>
          {view.name}
        </option>
      {/each}
    </select>
  {:else}
    <p>No views found</p>
  {/if}
  <br>
  <br>
  <button on:click={() => createView(prompt('Name of view'))}>
    Create view
  </button>
</div>


{#if selectedViewId}
  <div id="content">
      <h2>View: sprint dash</h2>
      <div style="display:flex;gap:15px">
        <button on:click={() => renameView(selectedViewId, prompt(`Rename view ${selectedView.name} to`))}>
          Edit name
        </button>
        <button on:click={deleteCurrentView}>
          Delete view
        </button>
        <button on:click={createSectionOnView}>
          Create section
        </button>
      </div>

      <h3>Screen sections</h3>
      {#if selectedView?.sections?.length > 0}
        <table>
          <thead>
            <tr>
              <th>Section</th>
              <th>URL</th>
              <th>Refresh Timeout (ms)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each selectedView?.sections as section, i}
              <tr>
                <td>{section.name}</td>
                <td>{section.url}</td>
                <td>{section.refreshInterval ?? 'none'}</td>
                <td style="display:flex">
                  <button on:click={() => editSectionOnView(i)}>
                    Edit
                  </button>
                  <button style="background: red" on:click={() => removeSection(selectedViewId, i)}>
                    x
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:else}
        <p>No sections found</p>
      {/if}
  </div>
{:else}
  <br>
  <p>Select a view</p>
{/if}
</main>

<style lang="scss">
  main {
    width: 100%;
    max-width: 900px;
  }
</style>
