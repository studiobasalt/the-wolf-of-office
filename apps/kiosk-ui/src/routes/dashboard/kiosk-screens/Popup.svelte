<script lang="ts">
	export let submit: (section: ViewSection) => void;
  export let cancel: () => void;
  export let remove: () => void;

  export let sectionData: ViewSection

  $: sectionData = sectionData || {
    name: '',
    url: '',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    zoom: 100,
    refreshInterval: 0
  }
  
</script>

<div class="popup">
    <div id="view-section-form">
      <h3>View Section Form</h3>
      <label for="section-name">Name:</label>
      <input type="text" id="section-name" name="section-name" bind:value={sectionData.name}><br>
      <label for="section-url">URL:</label>
      <input type="text" id="section-url" name="section-url" bind:value={sectionData.url}>
      <br>
      <label for="section-position">Position X, Y, width, height: (in percentages of the screen)</label>
      <div style="display:flex; gap: 10px">
        <input type="number" id="section-xpos" name="section-position" min="0" max="100" step="1" bind:value={sectionData.x}><br>
        <input type="number" id="section-ypos" name="section-position" min="0" max="100" step="1" bind:value={sectionData.y}><br>
        <input type="number" id="section-width" name="section-width" min="0" max="100" step="1" bind:value={sectionData.width}><br>
        <input type="number" id="section-height" name="section-height" min="0" max="100" step="1" bind:value={sectionData.height}><br>
      </div>
      <label for="section-zoom">Zoom Level:</label>
      <input type="number" id="section-zoom" name="section-zoom" min="0" max="200" step="0.1" bind:value={sectionData.zoom}><br>
      <label for="section-refresh">Refresh Interval:</label>
      <input type="number" id="section-refresh" name="section-refresh" placeholder="none" min="0" max="100" step="1" bind:value={sectionData.refreshInterval}><br>
      <div style="display:flex;gap:15px">
        <button on:click={remove}>
          delete
        </button>
        <button on:click={cancel}>
          Cancel
        </button>
        <button on:click={() => submit(sectionData)}>
          save
        </button>
      </div>
    </div>
</div>
  
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
      z-index: 9999;
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