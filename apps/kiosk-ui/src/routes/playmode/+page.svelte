<script lang="ts">
    import { deviceStore } from '@stores/device';
    import { viewsStore } from '@stores/view';
    import { deviceEnvs } from '@stores/local';
    import gsap from 'gsap';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import ScreenOrientationSetup from '@lib/screenOrientationSetup.svelte';

    let currentDevice: Device | undefined;
    $: currentDevice = $deviceStore.find((d) => d.id === $deviceEnvs?.defaultDevice);

    let slides: HTMLDivElement[] = [];
    let tl: gsap.core.Timeline | undefined;

    function parseSectionStyle(section: ViewSection) {
        return `top: ${section.y}%; left: ${section.x}%; width: ${section.width}%; height: ${section.height}%;`;
    }

    onMount(() => {
        window?.addEventListener('keydown', (e) => {
            if (e.key === 'q' || e.key === 'r') {
                goto('/');
            }
        });
    });

    // Animate slides when the device changes
    $: {
        $deviceStore
        animateSlides();
    }

    async function animateSlides() {
        tl?.kill();
        if (!browser) return;
        // Wait for the DOM to update
        await new Promise((r) => setTimeout(r, 200));
        // Cleanup any null slides
        slides = [...slides.filter((s) => s !== null)];

        if (!currentDevice) return;
        if (slides.length <= 1) return;

        let slideIndex = 0;

        tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

        // Hide all slides except the first one
        gsap.set([...slides].shift() ?? slides, {
            opacity: 0
        });

        // loop current device views and add in and out animations
        for (const view of currentDevice.views ?? []) {
            const timeout = view.timeout;
            const currentSlide = slides[slideIndex];

            // Make current slide visible
            tl.set(
                currentSlide,
                {
                    x: 0,
                    opacity: 1,
                    zIndex: 0
                },
                '<'
            );
            // Set current slide to be on top after timeout
            tl.set(
                currentSlide,
                {
                    zIndex: 1
                },
                `+=${timeout}`
            );
            // Animate out
            tl.to(currentSlide, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.inOut',
                x: window.innerWidth
            });
            // if this is the last item
            if (currentDevice.views && slideIndex === currentDevice.views.length - 1) {
                tl.set(
                    slides[0],
                    {
                        opacity: 1,
                        x: 0,
                        zIndex: 0
                    },
                    `<`
                );
            }
            slideIndex++;
        }
        tl.play();
    }
</script>

<ScreenOrientationSetup />

<main class="playWindow">
    {#each currentDevice?.views ?? [] as deviceView, i}
        <key i={deviceView.id}>
            <div class="slide" bind:this={slides[i]}>
                {#each $viewsStore.find((v) => v.id === deviceView?.id)?.sections ?? [] as section}
                    <div class="section" style={parseSectionStyle(section)}>
                        <iframe src={section.url} title="" />
                    </div>
                {/each}
            </div>
        </key>
    {/each}
</main>

<style lang="scss">
    main.playWindow {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        .slide {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            overflow: hidden;
            .section {
                position: absolute;
                iframe {
                    height: 100%;
                    width: 100%;
                    border: none;
                    background-color: #fff;
                }
            }
        }
    }
</style>
