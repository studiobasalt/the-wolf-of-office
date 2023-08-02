<script lang="ts">
    import { viewsStore } from "@stores/view";
    export let selectedViewId
    export let editSectionOnView: (index: number) => void;
    let currentView: View
    $: currentView = $viewsStore.find(view => view.id === selectedViewId);
</script>

<section class="preview">
    {#if currentView?.sections && currentView.sections.length > 0}
        {#each currentView.sections as section, index}
            <div 
                class="section" style={`width: ${section.width}%; height: ${section.height}%; left: ${section.x}%; top: ${section.y}%`}
                on:keydown={() => editSectionOnView(index)}
                on:click={() => editSectionOnView(index)}
                role="button"
                aria-roledescription="slide preview"
                tabindex="0"
            >
                <div style="text-align: center">
                    Slide: {section.name}
                    <div class="pencil"></div>
                </div>
            </div>
        {/each}
    {:else}
        <h2>No slides found</h2>
    {/if}
</section>

<style lang="scss">
    section.preview{
        width: 100%;
        aspect-ratio: 1/1;
        background: #80808054;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .section{
            position: absolute;
            background: hsla(0, 0%, 50%, 0.797);
            border: 1px solid #80808054;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            &:hover{
                background-color: gray;
                cursor: pointer;
            }
            .pencil{
                background-image: url('/pencil.svg');
                height: 20px;
                width: 20px;
                background-repeat: no-repeat;
                background-size: contain;
                position: absolute;
                top: 10px;
                right: 10px;
                opacity: .5;
            }
        }
    }
</style>