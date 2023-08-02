<script lang="ts">
    import {
        viewsStore,
        createView,
        createSection,
        updateSection,
        removeSection
    } from '@stores/view';
    import Popup from './Popup.svelte';
    import ActionBar from './actionBar.svelte';
    import SlidePreview from './slidePreview.svelte';

    let selectedViewId = '';
    let selectedView: View;
    $: selectedView = $viewsStore.find((view) => view.id === selectedViewId);

    let handlePopupSubmit: (section: ViewSection) => void;
    let handleDelete: () => void;
    let showPopup = false;
    let popupSectionData;

    function createSectionOnView() {
        showPopup = true;
        handlePopupSubmit = (section: ViewSection) => {
            createSection(selectedViewId, section);
            showPopup = false;
        };
        handleDelete = () => {
            showPopup = false;
            popupSectionData = null;
        };
    }

    function editSectionOnView(index: number) {
        showPopup = true;
        popupSectionData = selectedView.sections[index];
        popupSectionData.index = index;
        handlePopupSubmit = (section: ViewSection) => {
            updateSection(selectedViewId, index, section);
            showPopup = false;
            popupSectionData = null;
        };
        handleDelete = () => {
            removeSection(selectedViewId, index);
            showPopup = false;
            popupSectionData = null;
        };
    }

    function cancelPopup() {
        showPopup = false;
        popupSectionData = null;
    }
</script>

{#if showPopup}
    <Popup submit={handlePopupSubmit} cancel={cancelPopup} sectionData={popupSectionData} remove={handleDelete}  />
{/if}

<h1>Kiosk Slides</h1>
<br />

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
            <p>No slides found</p>
        {/if}
        <button class="small" on:click={() => createView(prompt('Name of view'))}> New slide </button>
        <br />
        <br />
        <ActionBar {selectedViewId} {selectedView} {createSectionOnView} />
    </div>
    <div id="content">
        <SlidePreview {selectedViewId} {editSectionOnView} />
    </div>
</main>

<style lang="scss">
    main {
        width: 100%;
        max-width: 900px;
        display: flex;
        #content {
            width: 100%;
        }
        #sidebar {
            width: 400px;
        }
    }
</style>
