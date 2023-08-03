<script lang="ts">
    import { deviceStore } from '@stores/device';
    import { viewsStore } from '@stores/view';
    import { deviceEnvs } from '@stores/local';
    import gsap from 'gsap';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import ScreenOrientationSetup from '@lib/screenOrientationSetup.svelte';

    let currentDevice: Device;
    $: currentDevice = $deviceStore.find((d) => d.id === $deviceEnvs?.defaultDevice);

    let slides = [];
    let tl;

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

    function animateSlides() {
        if (!browser) return;
        if (!currentDevice) return;
        if (slides.length <= 1) return;

        tl?.kill();

        let slideIndex = 0;

        tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

        gsap.set(slides, {
            opacity: 0
        });

        // loop current device views and add in and out animations
        for (const view of currentDevice.views) {
            const timeout = view.timeout;
            const currentSlide = slides[slideIndex];

            tl.set(
                currentSlide,
                {
                    x: 0,
                    opacity: 1,
                    zIndex: 0
                },
                '<'
            );
            tl.set(
                currentSlide,
                {
                    zIndex: 1
                },
                `+=${timeout}`
            );
            tl.to(currentSlide, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.inOut',
                x: window.innerWidth
            });
            // if this is the last item
            if (slideIndex === currentDevice.views.length - 1) {
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
        {@const runAnimation = animateSlides()}
        {@const currentView = $viewsStore.find((v) => v.id === deviceView?.id)}
        <div class="slide" bind:this={slides[i]}>
            {#each currentView?.sections ?? [] as section, i}
                <div class="section" style={parseSectionStyle(section)}>
                    <iframe src={section.url} title="" />
                </div>
            {/each}
        </div>
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
