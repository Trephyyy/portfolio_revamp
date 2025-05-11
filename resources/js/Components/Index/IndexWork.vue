<template>
    <section id="work" class="relative w-screen h-screen py-10 overflow-hidden">
        <!-- Simplified Background Effect -->
        <div class="absolute inset-0 z-0">
            <!-- Gradient Base -->
            <div class="absolute inset-0 bg-gradient-to-tr from-accent_2-500 to-muted-800"></div>

            <!-- Reduced number of orbs with less blur -->
            <div class="absolute rounded-full pulsingOrb top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-xl"></div>
            <div class="absolute w-64 h-64 rounded-full pulsingOrb bottom-1/3 right-1/3 bg-accent_2-500/20 blur-xl"
                style="animation-delay: 2s;"></div>
        </div>

        <!-- Content Container -->
        <div class="relative z-10">
            <div class="my-12">
                <h1 class="text-5xl font-bold tracking-tight text-center text-white">
                    <span class="relative inline-block">
                        Projects
                        <span
                            class="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0"></span>
                    </span>
                </h1>
            </div>
            <div ref="carouselWrapperRef" class="w-full">
                <!-- Carousel -->
                <div class="relative mt-[5%] py-8 overflow-x-hidden">
                    <!-- Controls -->
                    <div aria-label="Carousel Controls"
                        class="absolute z-10 flex justify-between w-full px-4 -translate-y-1/2 pointer-events-none top-1/2 lg:px-8">
                        <button type="button" @click="scrollToPreviousSlide" title="Previous project slide"
                            aria-controls="project-carousel" :disabled="currentSlide === 0"
                            class="p-4 text-white transition duration-200 border rounded-full pointer-events-auto aspect-square h-fit border-white/30 bg-black/40 hover:bg-black/60 drop-shadow-md disabled:cursor-not-allowed disabled:opacity-50">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                class="size-5">
                                <path fill-rule="evenodd"
                                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                        <button type="button" @click="scrollToNextSlide" title="Next project slide"
                            aria-controls="project-carousel" :disabled="currentSlide === projects.length - 1"
                            class="p-4 text-white transition duration-200 border rounded-full pointer-events-auto aspect-square h-fit border-white/30 bg-black/40 hover:bg-black/60 drop-shadow-md disabled:cursor-not-allowed disabled:opacity-50">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                class="size-5">
                                <path fill-rule="evenodd"
                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <!-- Carousel Container -->
                    <div
                        class="h-[calc(clamp(18rem,42vmin,26rem)*3/2)] overflow-x-hidden touch-none select-none overflow-hidden">
                        <ul ref="carouselRef" id="project-carousel" aria-label="Project Carousel" @scroll="handleScroll"
                            @touchstart="handleTouchStart" @touchend="handleTouchEnd" @touchmove="handleTouchMove"
                            @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mouseleave="handleMouseUp"
                            @mousemove="handleMouseMove" :class="[
                                'grid auto-cols-min overflow-x-hidden grid-flow-col gap-x-6 pe-[calc(50vw-(clamp(18rem,42vmin,26rem)+1.5rem)/2)] ps-[calc(50vw-clamp(18rem,42vmin,26rem)/2-7px)]',
                                { 'cursor-grabbing': isDragging },
                            ]">
                            <!-- Project Slides -->
                            <li v-for="(project, index) in projects" :key="project._id" :ref="(el) => {
                                if (el) slideRefs[index] = el;
                            }" :aria-labelledby="`project-item-${project._id}-heading`" :data-item-index="index"
                                :aria-current="currentSlide === index"
                                :aria-hidden="!filteredProjects.includes(project)"
                                class="relative aspect-[2/3] w-[clamp(18rem,42vmin,26rem)] overflow-hidden rounded-xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                                <a :href="project.slug.outside
                                    ? project.slug.outside
                                    : `/project/${project.slug.current}`" :aria-label="!filteredProjects.includes(project)
                                        ? undefined
                                        : `Show ${project.name} project details`" data-astro-prefetch
                                    :aria-disabled="!filteredProjects.includes(project)" :class="[
                                        'group block h-full w-full rounded-xl border border-white/20',
                                        (!filteredProjects.includes(project) ||
                                            isDragging) &&
                                        'pointer-events-none',
                                    ]" :draggable="false">
                                    <article :class="[
                                        'absolute inset-0 flex flex-col items-center justify-center gap-y-3 bg-black/40 p-6 text-center transition-all duration-300',
                                        filteredProjects.includes(project) &&
                                        'md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100',
                                    ]" :style="{
                                        color: project.poster.asset.metadata
                                            .palette.dominant.foreground,
                                    }">
                                        <div class="overflow-hidden">
                                            <time :datetime="project.date"
                                                class="block text-xs font-medium tracking-wider uppercase transition-transform duration-300 text-white/90 group-hover:translate-y-0 group-focus-visible:translate-y-0 md:translate-y-full">
                                                {{ formatDate(project.date) }}
                                            </time>
                                        </div>
                                        <div class="overflow-hidden">
                                            <h3 :id="`project-item-${project._id}-heading`"
                                                class="text-2xl font-bold transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 md:translate-y-full lg:text-4xl">
                                                {{ project.name }}
                                            </h3>
                                        </div>
                                        <div v-if="project.tags" class="overflow-hidden">
                                            <p
                                                class="text-xs transition-transform duration-300 text-white/90 group-hover:translate-y-0 group-focus-visible:translate-y-0 md:translate-y-full lg:text-sm">
                                                {{ project.tags.join(", ") }}
                                            </p>
                                        </div>
                                        <div class="mt-2 overflow-hidden">
                                            <span
                                                class="inline-block py-1.5 px-3 rounded-full bg-white/20 text-xs text-white font-medium transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 md:translate-y-full">
                                                View Project
                                            </span>
                                        </div>
                                    </article>
                                    <img :alt="project.poster.alt" loading="lazy" decoding="async" v-bind="generateImageSizeProps({
                                        image: project.poster,
                                    })" :class="[
                                        'pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500',
                                        !filteredProjects.includes(project)
                                            ? 'opacity-20 grayscale'
                                            : 'group-hover:scale-105 group-focus-visible:scale-105',
                                    ]" :style="{
                                        objectPosition: isVisibleSlide(index) ? `${getImagePosition(index)}%` : '50%',
                                        backgroundColor: project.poster.asset.metadata.palette.dominant.background,
                                    }" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <p role="status" aria-live="polite" aria-atomic="true" class="sr-only">
                        Project {{ currentSlide + 1 }} of {{ projects.length }}
                    </p>
                </div>

                <!-- Progress Bar -->
                <div class="container mx-auto mb-8">
                    <div class="flex items-center justify-center gap-2">
                        <span class="text-xs text-white/70">{{ currentSlide + 1 }}</span>
                        <div class="w-48 h-1 overflow-hidden rounded-full bg-black/30">
                            <div ref="progressBarRef"
                                class="h-full rounded-full bg-gradient-to-r from-primary/70 via-primary to-primary/70"
                                style="width: 0%" />
                        </div>
                        <span class="text-xs text-white/70">{{ projects.length }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import anime from "animejs";

// Props
const props = defineProps({
    projects: {
        type: Array,
        required: true,
    },
});

// Constants
const CAROUSEL_SLIDES_GAP = 24;
const wildcardFilter = "Website";
const projectTagFilters = ["Website", "App", "UI/UX", "Mobile", "E-commerce"];

// Refs for DOM elements
const carouselWrapperRef = ref(null);
const carouselRef = ref(null);
const progressBarRef = ref(null);
const slideRefs = ref([]);

// State variables
const carouselWidth = ref(0);
const carouselSlideWidth = ref(0);
const maxScrollWidth = ref(0);
const scrollPosition = ref(0);
const currentSlide = ref(0);
const isDragging = ref(false);
const dragStart = ref(null);
const touchStart = ref(null);
const selectedFilters = ref(["Website"]);
const slidePositionData = ref([]);
const visibleSlideIndices = ref(new Set());
const isAnimating = ref(false);

// Computed properties
const filteredProjects = computed(() => {
    return props.projects.filter((project) => {
        const isAnyProjectTagFiltered = selectedFilters.value.some(
            (selectedFilter) => project.tags?.includes(selectedFilter)
        );
        if (isAnyProjectTagFiltered) return true;

        const isWildcardFilterEnabledAndNoProjectTagFiltered =
            selectedFilters.value.includes(wildcardFilter) &&
            !project.tags?.some((projectTag) =>
                projectTagFilters.includes(projectTag)
            );
        return isWildcardFilterEnabledAndNoProjectTagFiltered;
    });
});

// Helper functions
const clamp = (min, value, max) => Math.min(Math.max(min, value), max);

const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
    }).format(date);
};

const generateImageSizeProps = ({ image }) => {
    if (!image || !image.asset) return {};

    return {
        src: image.asset.url,
        width: image.asset.metadata.dimensions.width,
        height: image.asset.metadata.dimensions.height,
    };
};

// Visibility check - only calculate positions for visible slides
const isVisibleSlide = (index) => {
    return visibleSlideIndices.value.has(index);
};

const updateVisibleSlides = () => {
    if (!carouselRef.value || !slideRefs.value.length) return;

    const carouselLeft = carouselRef.value.scrollLeft;
    const viewportWidth = carouselRef.value.clientWidth;
    const buffer = carouselSlideWidth.value; // Add buffer for one slide on each side

    visibleSlideIndices.value = new Set();

    slidePositionData.value.forEach(slide => {
        const slideLeft = slide.offsetLeft;
        const slideRight = slideLeft + slide.width;

        // Is the slide visible (plus buffer on either side)?
        if ((slideRight >= carouselLeft - buffer) &&
            (slideLeft <= carouselLeft + viewportWidth + buffer)) {
            visibleSlideIndices.value.add(slide.index);
        }
    });
};

// Carousel control functions
const updateCarouselConstraints = () => {
    if (
        !carouselWrapperRef.value ||
        !carouselRef.value ||
        !carouselRef.value.firstElementChild
    )
        return;

    carouselWidth.value = carouselWrapperRef.value.offsetWidth;
    carouselSlideWidth.value = carouselRef.value.firstElementChild.offsetWidth;
    maxScrollWidth.value =
        carouselRef.value.scrollWidth - carouselRef.value.offsetWidth;

    // Update slide position data for parallax effect
    updateSlidePositions();
    updateVisibleSlides();
};

const updateSlidePositions = () => {
    slidePositionData.value = slideRefs.value.map((slideEl, index) => {
        if (!slideEl) return { index, offsetLeft: 0, width: 0 };
        return {
            index,
            offsetLeft: slideEl.offsetLeft,
            width: slideEl.offsetWidth,
        };
    });
};

const getImagePosition = (index) => {
    // Skip calculation for non-visible slides
    if (!isVisibleSlide(index)) return 50;

    const slideData = slidePositionData.value[index];
    if (!slideData) return 50;

    const min = slideData.offsetLeft + slideData.width;
    const max = slideData.offsetLeft - carouselWidth.value;
    const range = min - max;

    if (range === 0) return 50;

    const value = clamp(max, scrollPosition.value, min);
    return 100 * (1 - (value - max) / range);
};

const updateCurrentSlide = (latestScrollPosition) => {
    // Skip during animations for better performance
    if (isAnimating.value) return;

    currentSlide.value = clamp(
        0,
        Math.round(
            latestScrollPosition /
            (carouselSlideWidth.value + CAROUSEL_SLIDES_GAP)
        ),
        props.projects.length - 1
    );

    // Update progress bar with reduced animation
    if (progressBarRef.value) {
        const progressPercentage =
            maxScrollWidth.value > 0
                ? (latestScrollPosition / maxScrollWidth.value) * 100
                : 0;

        // Set directly without animation for better performance
        progressBarRef.value.style.width = `${progressPercentage}%`;
    }

    // Update which slides are visible
    updateVisibleSlides();
};

// Optimized scrolling with reduced animations
const scrollToSlide = (slideIndex) => {
    if (!carouselRef.value) return;

    isAnimating.value = true;
    const targetScrollLeft = slideIndex * (carouselSlideWidth.value + CAROUSEL_SLIDES_GAP);

    // Smooth scroll for all devices
    carouselRef.value.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
    });

    // Update state after scroll completes
    setTimeout(() => {
        scrollPosition.value = carouselRef.value.scrollLeft;
        updateCurrentSlide(scrollPosition.value);
        isAnimating.value = false;
    }, 500); // Adjust timeout to match scroll duration
};

const scrollToPreviousSlide = () => {
    if (isAnimating.value || currentSlide.value <= 0) return; // Prevent scrolling if already at the first slide
    scrollToSlide(currentSlide.value - 1);
};

const scrollToNextSlide = () => {
    if (isAnimating.value || currentSlide.value >= props.projects.length - 1) return; // Prevent scrolling if already at the last slide
    scrollToSlide(currentSlide.value + 1);
};

// Event handlers for carousel
const handleScroll = (event) => {
    // Throttle scroll events
    if (isAnimating.value) return;

    requestAnimationFrame(() => {
        scrollPosition.value = event.target.scrollLeft;
        updateCurrentSlide(scrollPosition.value);
    });
};

// Mouse event handlers
const handleMouseDown = (event) => {
    const isMainMouseButtonClicked = event.button === 0;

    if (isMainMouseButtonClicked) {
        dragStart.value = {
            scrollX: event.currentTarget.scrollLeft,
            pointerX: event.clientX,
        };
    }
};

const handleMouseUp = () => {
    isDragging.value = false;
    dragStart.value = null;
};

const handleMouseMove = (event) => {
    if (carouselRef.value && dragStart.value) {
        const distanceX = event.clientX - dragStart.value.pointerX;

        carouselRef.value.scrollTo({
            left: dragStart.value.scrollX - distanceX,
        });
        if (!isDragging.value) isDragging.value = true;
    }
};

// Touch event handlers - improved for mobile
const handleTouchStart = (event) => {
    if (event.touches.length === 1) {
        touchStart.value = {
            scrollX: event.currentTarget.scrollLeft,
            touchX: event.touches[0].clientX,
        };
    }
};

const handleTouchMove = (event) => {
    if (carouselRef.value && touchStart.value && event.touches.length === 1) {
        const distanceX = event.touches[0].clientX - touchStart.value.touchX;

        // Add resistance at the edges
        let newScrollPosition = touchStart.value.scrollX - distanceX;
        if (newScrollPosition < 0) {
            newScrollPosition = 0;
        } else if (newScrollPosition > maxScrollWidth.value) {
            newScrollPosition = maxScrollWidth.value;
        }

        carouselRef.value.scrollTo({
            left: newScrollPosition,
        });

        if (!isDragging.value) isDragging.value = true;

        // Prevent default only when actively dragging
        if (Math.abs(distanceX) > 5) {
            event.preventDefault();
        }
    }
};

const handleTouchEnd = () => {
    if (isDragging.value && touchStart.value) {
        // Snap to nearest slide
        const slideIndex = Math.round(
            carouselRef.value.scrollLeft / (carouselSlideWidth.value + CAROUSEL_SLIDES_GAP)
        );
        scrollToSlide(slideIndex);
    }

    isDragging.value = false;
    touchStart.value = null;
};

// Animate pulsing orbs with reduced animation complexity
const animatePulsingOrbs = () => {
    // Simplified animation for better performance
    anime({
        targets: '.pulsingOrb',
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.7, 0.5],
        easing: 'easeInOutSine',
        duration: 8000,
        loop: true,
    });
};

// Simplified animation for initial slide entrance
const animateInitialSlides = () => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        // Simple fade-in for mobile
        slideRefs.value.forEach((slide) => {
            if (slide) {
                slide.style.opacity = 0;
                setTimeout(() => {
                    slide.style.opacity = 1;
                    slide.style.transition = 'opacity 300ms ease-out';
                }, 100);
            }
        });
    } else {
        // More advanced animation for desktop
        anime({
            targets: slideRefs.value,
            translateY: [20, 0],
            opacity: [0, 1],
            delay: anime.stagger(50),
            easing: "easeOutQuad",
            duration: 400
        });
    }
};

// Debounce function for resize events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Lifecycle hooks
onMounted(() => {
    updateCarouselConstraints();

    // Use debounced resize handler
    const debouncedResize = debounce(() => {
        updateCarouselConstraints();
    }, 200);

    window.addEventListener("resize", debouncedResize);
    window.addEventListener("orientationchange", updateCarouselConstraints);

    // Initialize animations with a slight delay
    nextTick(() => {
        // Animate slides with simpler animation
        animateInitialSlides();

        // Start pulsing background animation (simplified)
        animatePulsingOrbs();
    });
});

onUnmounted(() => {
    window.removeEventListener("resize", updateCarouselConstraints);
    window.removeEventListener("orientationchange", updateCarouselConstraints);
});

// Watchers
watch(
    slideRefs,
    () => {
        updateSlidePositions();
        updateVisibleSlides();
    },
    { deep: true }
);

watch(selectedFilters, () => {
    // Simplified animation for filter changes
    nextTick(() => {
        const visibleSlides = slideRefs.value.filter((_, index) =>
            filteredProjects.value.includes(props.projects[index])
        );

        const hiddenSlides = slideRefs.value.filter(
            (_, index) =>
                !filteredProjects.value.includes(props.projects[index])
        );

        // Simple opacity transitions instead of complex animations
        visibleSlides.forEach(slide => {
            if (slide) {
                slide.style.opacity = "1";
                slide.style.transform = "scale(1)";
                slide.style.transition = "opacity 300ms ease-out, transform 300ms ease-out";
            }
        });

        hiddenSlides.forEach(slide => {
            if (slide) {
                slide.style.opacity = "0.2";
                slide.style.transform = "scale(0.9)";
                slide.style.transition = "opacity 300ms ease-out, transform 300ms ease-out";
            }
        });
    });
});
</script>

<style scoped>
@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

.pulsingOrb {
    animation: float 15s ease-in-out infinite;
}

/* Optimize CSS animations for hardware acceleration */
.group-hover\:scale-105,
.group-focus-visible\:scale-105,
.transition-transform {
    will-change: transform;
    backface-visibility: hidden;
}
</style>