<script>
	import { viewStore } from '$lib/viewStore';
  import { popupStore } from './popupStore';

  function handleCancel() {
    sectionData = createNewSectionObject();
    popupStore.update(store => {
      store.show = false;
      return store;
    });
  }

  let sectionData = createNewSectionObject();

  function createNewSectionObject(){
    return {
      name: '',
      url: '',
      xPosition: 0,
      yPosition: 0,
      height: 0,
      width: 0,
      refreshInterval: null,
    }
  }

  $: sectionData = $viewStore?.find(view => view.id === $popupStore.view)?.sections?.find(section => section.id === $popupStore.section) ?? sectionData;

  function handleSave() {
    popupStore.update(store => {
      store.show = false;
      return store;
    });

    viewStore.update(store => {
      const view = store.find(view => view.id === $popupStore.view);
      const section = view.sections.find(section => section.id === $popupStore.section) ?? {};
      if (!section.id) {
        section.id = Math.random().toString(36).substr(2, 9);
        view.sections.push(section);
      }
      section.name = sectionData.name;
      section.url = sectionData.url;
      section.xPosition = sectionData.xPosition;
      section.yPosition = sectionData.yPosition;
      section.height = sectionData.height;
      section.width = sectionData.width;
      section.refreshInterval = sectionData.refreshInterval;
      return store;
    });

    sectionData = createNewSectionObject();

  }


</script>

<!-- Popup.svelte -->
{#if $popupStore.show}
<div class="popup">
    <div id="view-section-form">
      <h3>View Section Form</h3>
      <label for="section-name">Name:</label>
      <input type="text" id="section-name" name="section-name" bind:value={sectionData.name}><br>
      <label for="section-url">URL:</label>
      <input type="text" id="section-url" name="section-url" bind:value={sectionData.url}><br>
      <label for="section-position">Position X, Y, height, width:</label>
      <div style="display:flex; gap: 10px">
        <input type="number" id="section-xpos" name="section-position" min="0" max="100" step="1" bind:value={sectionData.xPosition}><br>
        <input type="number" id="section-ypos" name="section-position" min="0" max="100" step="1" bind:value={sectionData.yPosition}><br>
        <input type="number" id="section-width" name="section-width" min="0" max="100" step="1" bind:value={sectionData.width}><br>
        <input type="number" id="section-height" name="section-height" min="0" max="100" step="1" bind:value={sectionData.height}><br>
      </div>
      <label for="section-zoom">Zoom Level:</label>
      <input type="number" id="section-zoom" name="section-zoom" min="0" max="200" step="0.1" bind:value={sectionData.zoom}><br>
      <label for="section-refresh">Refresh Interval:</label>
      <input type="number" id="section-refresh" name="section-refresh" min="0" max="100" step="1" bind:value={sectionData.refreshInterval}><br>
      <div style="display:flex;gap:15px">
        <button on:click={handleSave} id="save-section-btn">Save</button>
        <button on:click={handleCancel} id="cancel-section-btn">Cancel</button>
      </div>
    </div>
  </div>
{/if}
  
  <style>
    .popup {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    #view-section-form {
      background-color: white;
      padding: 20px;
      border-radius: 5px;
    }
  
    #view-section-form input,
    #view-section-form button {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  </style>