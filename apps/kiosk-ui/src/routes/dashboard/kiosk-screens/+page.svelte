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
    let selectedView: View | undefined;
    $: selectedView = $viewsStore.find((view) => view.id === selectedViewId);

    let handlePopupSubmit: (section: ViewSection) => void;
    let handleDelete: () => void;
    let showPopup = false;
    let popupSectionData: ViewSection | undefined

    function createSectionOnView() {
        showPopup = true;
        handlePopupSubmit = (section: ViewSection) => {
            createSection(selectedViewId, section);
            showPopup = false;
        };
        handleDelete = () => {
            showPopup = false;
            popupSectionData = undefined;
        };
    }

    function editSectionOnView(index: number) {
        showPopup = true;
        popupSectionData = selectedView?.sections?.[index];
        if (popupSectionData) popupSectionData.index = index;
        handlePopupSubmit = (section: ViewSection) => {
            updateSection(selectedViewId, index, section);
            showPopup = false;
            popupSectionData = undefined;
        };
        handleDelete = () => {
            removeSection(selectedViewId, index);
            showPopup = false;
            popupSectionData = undefined;
        };
    }

    function cancelPopup() {
        showPopup = false;
        popupSectionData = undefined;
    }
</script>

{#if showPopup}
    <Popup submit={handlePopupSubmit} cancel={cancelPopup} sectionData={popupSectionData || {}} remove={handleDelete}  />
{/if}

<h1>Kiosk Slides</h1>
<br />

<main>
    <div id="sidebar">
        <h2>Select a slide</h2>
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
