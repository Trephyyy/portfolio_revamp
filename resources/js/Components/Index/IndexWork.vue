<template>
    <section
        id="work"
        class="relative w-screen h-screen py-10 bg-gradient-to-tr bg-from-accent_2-700 bg-to-muted-900"
    >
        <div>
            <h1 class="text-5xl text-center text-white">Projects</h1>
        </div>
        <div ref="carouselWrapperRef" class="w-full">
            <!-- Filters -->
            <div class="container mx-auto">
                <div class="flex items-center justify-center">
                    <div
                        v-if="projectTagFilters.length > 1"
                        class="group relative min-w-[20rem]"
                    >
                        <div
                            @click="toggleFilterDropdown"
                            class="flex items-center justify-between w-full px-4 py-2 text-sm border rounded-sm cursor-pointer border-neutrals-600 bg-gradient-radial from-white/10 to-transparent text-neutrals-100"
                        >
                            {{
                                selectedFilters
                                    .sort(
                                        (a, b) =>
                                            projectTagFilters.indexOf(a) -
                                            projectTagFilters.indexOf(b)
                                    )
                                    .join(", ")
                            }}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                class="transition-transform duration-200 size-4"
                                :class="{
                                    '-scale-y-100': isFilterDropdownOpen,
                                }"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                        <transition
                            enter-active-class="transition duration-200 ease-out"
                            enter-from-class="-translate-y-2 opacity-0"
                            enter-to-class="translate-y-0 opacity-100"
                            leave-active-class="transition duration-200 ease-in"
                            leave-from-class="translate-y-0 opacity-100"
                            leave-to-class="-translate-y-2 opacity-0"
                        >
                            <ul
                                v-if="isFilterDropdownOpen"
                                ref="filterDropdownRef"
                                class="absolute z-10 w-full px-2 py-2 mt-2 border rounded-sm border-neutrals-600 bg-neutrals-900/90 drop-shadow-lg backdrop-blur-sm"
                            >
                                <li
                                    v-for="filter in projectTagFilters"
                                    :key="filter"
                                    @click="toggleFilter(filter)"
                                    class="p-2 text-sm transition-all rounded-sm cursor-pointer text-neutrals-300"
                                    :class="[
                                        selectedFilters.includes(filter)
                                            ? 'text-neutrals-50'
                                            : '',
                                        hoveredFilter === filter
                                            ? 'bg-primary text-neutrals-50'
                                            : '',
                                    ]"
                                    @mouseenter="hoveredFilter = filter"
                                    @mouseleave="hoveredFilter = null"
                                >
                                    {{ filter }}
                                </li>
                            </ul>
                        </transition>
                    </div>
                </div>
            </div>

            <!-- Carousel -->
            <div class="relative mt-[10%] md:mt-[5%] py-8 overflow-x-hidden">
                <!-- Controls -->
                <div
                    aria-label="Carousel Controls"
                    class="absolute z-10 flex justify-between w-full px-4 -translate-y-1/2 pointer-events-none top-1/2 lg:px-8"
                >
                    <button
                        type="button"
                        @click="scrollToPreviousSlide"
                        title="Previous project slide"
                        aria-controls="project-carousel"
                        :disabled="currentSlide === 0"
                        class="pointer-events-auto aspect-square h-fit rounded-full border border-neutrals-600 bg-neutrals-900/90 p-4 text-neutrals-100 drop-shadow-md backdrop-blur-sm disabled:cursor-not-allowed disabled:opacity-50 supports-[backdrop-filter]:bg-neutrals-900/60"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="size-5"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>
                    <button
                        type="button"
                        @click="scrollToNextSlide"
                        title="Next project slide"
                        aria-controls="project-carousel"
                        :disabled="currentSlide === projects.length - 1"
                        class="pointer-events-auto aspect-square h-fit rounded-full border border-neutrals-600 bg-neutrals-900/90 p-4 text-neutrals-100 drop-shadow-md backdrop-blur-sm disabled:cursor-not-allowed disabled:opacity-50 supports-[backdrop-filter]:bg-neutrals-900/60"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="size-5"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                <!-- Carousel Container -->
                <div
                    class="h-[calc(clamp(18rem,42vmin,26rem)*3/2)] overflow-x-hidden touch-none select-none overflow-hidden"
                >
                    <ul
                        ref="carouselRef"
                        id="project-carousel"
                        aria-label="Project Carousel"
                        @scroll="handleScroll"
                        @mousedown="handleMouseDown"
                        @mouseup="handleMouseUp"
                        @mouseleave="handleMouseUp"
                        @mousemove="handleMouseMove"
                        :class="[
                            'grid auto-cols-min overflow-x-hidden grid-flow-col gap-x-6 pe-[calc(50vw-(clamp(18rem,42vmin,26rem)+1.5rem)/2)] ps-[calc(50vw-clamp(18rem,42vmin,26rem)/2-7px)]',
                            { 'cursor-grabbing': isDragging },
                        ]"
                    >
                        <!-- Project Slides -->
                        <li
                            v-for="(project, index) in projects"
                            :key="project._id"
                            :ref="
                                (el) => {
                                    if (el) slideRefs[index] = el;
                                }
                            "
                            :aria-labelledby="`project-item-${project._id}-heading`"
                            :data-item-index="index"
                            :aria-current="currentSlide === index"
                            :aria-hidden="!filteredProjects.includes(project)"
                            class="relative aspect-[2/3] w-[clamp(18rem,42vmin,26rem)] overflow-hidden rounded-md"
                        >
                            <a
                                :href="
                                    project.slug.outside
                                        ? project.slug.outside
                                        : `/project/${project.slug.current}`
                                "
                                :aria-label="
                                    !filteredProjects.includes(project)
                                        ? undefined
                                        : `Show ${project.name} project details`
                                "
                                data-astro-prefetch
                                :aria-disabled="
                                    !filteredProjects.includes(project)
                                "
                                :class="[
                                    'group block h-full w-full rounded-md border border-neutrals-50/30',
                                    (!filteredProjects.includes(project) ||
                                        isDragging) &&
                                        'pointer-events-none',
                                ]"
                                :draggable="false"
                            >
                                <article
                                    :class="[
                                        'absolute inset-0 flex flex-col items-center justify-center gap-y-2 bg-neutrals-900/60 p-4 text-center transition-opacity duration-300 md:opacity-0 md:backdrop-blur-sm',
                                        filteredProjects.includes(project) &&
                                            'group-hover:opacity-100 group-focus-visible:opacity-100',
                                    ]"
                                    :style="{
                                        color: project.poster.asset.metadata
                                            .palette.dominant.foreground,
                                    }"
                                >
                                    <div class="overflow-hidden">
                                        <time
                                            :datetime="project.date"
                                            class="block text-xs uppercase transition-transform duration-300 text-neutrals-50/90 group-hover:translate-y-0 group-focus-visible:translate-y-0 md:translate-y-full"
                                        >
                                            {{ formatDate(project.date) }}
                                        </time>
                                    </div>
                                    <div class="overflow-hidden">
                                        <h3
                                            :id="`project-item-${project._id}-heading`"
                                            class="text-2xl font-bold transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 md:translate-y-full lg:text-4xl"
                                        >
                                            {{ project.name }}
                                        </h3>
                                    </div>
                                    <div
                                        v-if="project.tags"
                                        class="overflow-hidden"
                                    >
                                        <p
                                            class="text-xs transition-transform duration-300 text-neutrals-50/90 group-hover:translate-y-0 group-focus-visible:translate-y-0 md:translate-y-full lg:text-sm"
                                        >
                                            {{ project.tags.join(", ") }}
                                        </p>
                                    </div>
                                </article>
                                <img
                                    :alt="project.poster.alt"
                                    loading="lazy"
                                    decoding="async"
                                    v-bind="
                                        generateImageSizeProps({
                                            image: project.poster,
                                        })
                                    "
                                    :class="[
                                        'pointer-events-none absolute brightness-50 sm:brightness-100 inset-0 -z-10 h-full w-full object-cover transition-[transform,opacity,filter] duration-700',
                                        !filteredProjects.includes(project)
                                            ? 'opacity-20 grayscale'
                                            : 'group-hover:scale-105 group-focus-visible:scale-105',
                                    ]"
                                    :style="{
                                        objectPosition: `${getImagePosition(
                                            index
                                        )}%`,
                                        backgroundColor:
                                            project.poster.asset.metadata
                                                .palette.dominant.background,
                                    }"
                                />
                            </a>
                        </li>
                    </ul>
                </div>
                <p
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    class="sr-only"
                >
                    Project {{ currentSlide + 1 }} of {{ projects.length }}
                </p>
            </div>

            <!-- Progress Bar -->
            <div class="container mx-auto">
                <div
                    class="w-full h-px bg-gradient-to-r from-neutrals-600/60 via-neutrals-600 to-neutrals-600/60"
                >
                    <div
                        ref="progressBarRef"
                        class="h-full bg-gradient-to-r from-neutrals-100/30 via-neutrals-100 to-neutrals-100/30"
                        style="width: 0%"
                    />
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
const projectTagFilters = ["Website"];

// Refs for DOM elements
const carouselWrapperRef = ref(null);
const carouselRef = ref(null);
const progressBarRef = ref(null);
const filterDropdownRef = ref(null);
const slideRefs = ref([]);

// State variables
const carouselWidth = ref(0);
const carouselSlideWidth = ref(0);
const maxScrollWidth = ref(0);
const scrollPosition = ref(0);
const currentSlide = ref(0);
const isDragging = ref(false);
const dragStart = ref(null);
const selectedFilters = ref(["Website"]);
const isFilterDropdownOpen = ref(false);
const hoveredFilter = ref(null);
const slidePositionData = ref([]);

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

// Event handlers for filter dropdown
const toggleFilterDropdown = () => {
    isFilterDropdownOpen.value = !isFilterDropdownOpen.value;
};

const toggleFilter = (filter) => {
    const index = selectedFilters.value.indexOf(filter);
    if (index === -1) {
        selectedFilters.value.push(filter);
    } else if (selectedFilters.value.length > 1) {
        selectedFilters.value.splice(index, 1);
    }
};

// Click outside to close dropdown
const handleClickOutside = (event) => {
    if (
        isFilterDropdownOpen.value &&
        filterDropdownRef.value &&
        !filterDropdownRef.value.contains(event.target) &&
        event.target.closest(".group") === null
    ) {
        isFilterDropdownOpen.value = false;
    }
};

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
    if (slidePositionData.value.length <= index) return 0;

    const slideData = slidePositionData.value[index];
    if (!slideData) return 0;

    const min = slideData.offsetLeft + slideData.width;
    const max = slideData.offsetLeft - carouselWidth.value;
    const range = min - max;

    if (range === 0) return 0;

    const value = clamp(max, scrollPosition.value, min);
    return 100 * (1 - (value - max) / range);
};

const updateCurrentSlide = (latestScrollPosition) => {
    currentSlide.value = clamp(
        0,
        Math.round(
            latestScrollPosition /
                (carouselSlideWidth.value + CAROUSEL_SLIDES_GAP)
        ),
        props.projects.length - 1
    );

    // Update progress bar with animation
    if (progressBarRef.value) {
        const progressPercentage =
            maxScrollWidth.value > 0
                ? (latestScrollPosition / maxScrollWidth.value) * 100
                : 0;

        anime({
            targets: progressBarRef.value,
            width: `${progressPercentage}%`,
            duration: 300,
            easing: "easeOutQuad",
        });
    }
};

const scrollToSlide = (slideIndex) => {
    if (!carouselRef.value) return;

    const targetScrollLeft =
        slideIndex * (carouselSlideWidth.value + CAROUSEL_SLIDES_GAP);

    anime({
        targets: carouselRef.value,
        scrollLeft: targetScrollLeft,
        duration: 500,
        easing: "easeOutQuad",
    });
};

const scrollToPreviousSlide = () => {
    scrollToSlide(currentSlide.value - 1);
};

const scrollToNextSlide = () => {
    scrollToSlide(currentSlide.value + 1);
};

// Event handlers for carousel
const handleScroll = (event) => {
    scrollPosition.value = event.target.scrollLeft;
    updateCurrentSlide(scrollPosition.value);
};

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

// Lifecycle hooks
onMounted(() => {
    updateCarouselConstraints();
    window.addEventListener("resize", updateCarouselConstraints);
    window.addEventListener("orientationchange", updateCarouselConstraints);
    window.addEventListener("click", handleClickOutside);

    // Initialize with animation
    nextTick(() => {
        if (slideRefs.value.length > 0) {
            anime({
                targets: slideRefs.value,
                translateY: [20, 0],
                opacity: [0, 1],
                delay: anime.stagger(100),
                easing: "easeOutQuad",
            });
        }
    });
});

onUnmounted(() => {
    window.removeEventListener("resize", updateCarouselConstraints);
    window.removeEventListener("orientationchange", updateCarouselConstraints);
    window.removeEventListener("click", handleClickOutside);
});

// Watchers
watch(
    slideRefs,
    () => {
        updateSlidePositions();
    },
    { deep: true }
);

watch(selectedFilters, () => {
    // Animate filtered results
    nextTick(() => {
        const visibleSlides = slideRefs.value.filter((_, index) =>
            filteredProjects.value.includes(props.projects[index])
        );

        const hiddenSlides = slideRefs.value.filter(
            (_, index) =>
                !filteredProjects.value.includes(props.projects[index])
        );

        if (visibleSlides.length > 0) {
            anime({
                targets: visibleSlides,
                scale: [0.9, 1],
                opacity: [0.5, 1],
                delay: anime.stagger(50),
                easing: "easeOutElastic(1, .6)",
            });
        }

        if (hiddenSlides.length > 0) {
            anime({
                targets: hiddenSlides,
                scale: [1, 0.9],
                opacity: [1, 0.2],
                easing: "easeOutQuad",
            });
        }
    });
});
</script>
