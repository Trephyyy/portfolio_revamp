<template>
    <div
        aria-hidden
        class="pointer-events-none absolute inset-0 overflow-hidden bg-[size:129%_129%] bg-no-repeat object-fill"
        :style="backgroundStyle"
    ></div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useMouse } from "@vueuse/core";
import anime from "animejs";
import futureGridImage from "../../../../public/images/future-grid.webp";
import IndexHero from "./IndexHero.vue";

const springConfig = {
    duration: 500,
    easing: "easeOutQuad", // More natural easing
};

const { x: mouseX, y: mouseY } = useMouse();
const screenMiddleX = ref(window.innerWidth / 2);
const screenMiddleY = ref(window.innerHeight / 2);

const screenMouseX = computed(
    () => (mouseX.value - screenMiddleX.value) / screenMiddleX.value
);
const screenMouseY = computed(
    () => (mouseY.value - screenMiddleY.value) / screenMiddleY.value
);

const backgroundX = ref(0);
const backgroundY = ref(0);

const backgroundStyle = computed(() => ({
    backgroundImage: `url(${futureGridImage})`,
    backgroundPosition: `calc(50% + ${backgroundX.value}px) calc(50% + ${backgroundY.value}px)`,
}));

watch([screenMouseX, screenMouseY], ([newX, newY]) => {
    anime({
        targets: {},
        duration: springConfig.duration,
        easing: springConfig.easing,
        update: () => {
            backgroundX.value = newX * 15; // Moves up to ±15px
            backgroundY.value = newY * 15;
        },
    });
});
</script>

<style scoped>
/* Additional styles if needed */
</style>
