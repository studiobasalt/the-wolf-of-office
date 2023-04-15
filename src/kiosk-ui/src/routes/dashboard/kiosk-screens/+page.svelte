<script>
  import { viewStore, deleteSection, deleteView, editName, createView } from '$lib/viewStore';
  import Popup from "./Popup.svelte";
  import {popupStore} from './popupStore';

  let selectedView = null
  $: selectedView = selectedView && $viewStore?.find(view => view.id === selectedView) ? selectedView : $viewStore?.[0]?.id;
  let currentView = null;
  $: currentView = $viewStore?.find(view => view.id === selectedView);

  $: popupStore.update(store => {
    store.view = selectedView;
    return store;
  });

</script>

<style lang="scss">
  main {
    width: 100%;
    max-width: 900px;
  }
  #sidebar li {
    cursor: pointer;
    &.selected {
      background-color: #eee;
    }
  }
</style>

<Popup />

<h1>Kiosk Screens</h1>

<main>

<div id="sidebar">
  <h2>View</h2>
  <ul>
    {#each $viewStore ?? [] as view}
      <li data-id={view.id} class:selected={selectedView === view.id} on:click={() => selectedView = view.id}>
        {view.name}
      </li>
    {/each}
    {#if $viewStore === null}
      <span>No views</span>
    {/if}
  </ul>
  <button on:click={() => createView(prompt('Enter new name'))}>
    Create view
  </button>
</div>

<div id="content">
  {#if selectedView}
    <h2>{currentView?.name}</h2>
    <div style="display:flex;gap:15px">
      <button on:click={() => editName(currentView?.id, prompt('Enter new name'))}>
        Edit name
      </button>
      <button on:click={() => deleteView(currentView?.id)}>
        Delete
      </button>
      <button on:click={() => {
        popupStore.update(store => {
          store.show = true;
          store.section = null;
          return store;
        }); 
      }}>
        Create section
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Section</th>
          <th>URL</th>
          <th>Refresh Timeout</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each currentView.sections as section}
          <tr>
            <td>{section.name}</td>
            <td>{section.url}</td>
            <td>{section.refreshInterval ?? 'none'}</td>
            <td>
              <button on:click={() => {
                popupStore.update(store => {
                  store.show = true;
                  store.section = section.id;
                  return store;
                });
              } }>
                Edit
              </button>
              <button on:click={() => deleteSection(currentView?.id, section.id)}>
                x
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <span>Select a view</span>
  {/if}
</div>

</main>