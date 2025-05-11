<script setup>
import LayoutFooter from "@/Components/layout/LayoutFooter.vue";
import LayoutHeader from "@/Components/layout/LayoutHeader.vue";
import { ref, onMounted } from "vue";
import { motion } from "motion-v";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const cursorX = ref(0);
const cursorY = ref(0);
const outlineCursorX = ref(0);
const outlineCursorY = ref(0);
const isClicking = ref(false);

const updateCursor = (e) => {
    cursorX.value = e.clientX;
    cursorY.value = e.clientY;

    setTimeout(() => {
        outlineCursorX.value = e.clientX;
        outlineCursorY.value = e.clientY;
    }, 100);
};

const handleMouseDown = () => {
    isClicking.value = true;
    setTimeout(() => {
        isClicking.value = false;
    }, 200);
};

onMounted(() => {
    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mousedown", handleMouseDown);
});
</script>

<template>
    <div class="flex flex-col min-h-screen bg-primary-500 text-secondary">
        <LayoutHeader />
        <main class="flex-grow animate-fade-in">
            <slot />
        </main>
        <LayoutFooter />

        <!-- Motion Cursor -->
        <motion.div :initial="false" :animate="{ x: cursorX, y: cursorY, scale: isClicking ? 0.6 : 1 }"
            class="fixed z-50 hidden w-4 h-4 -mt-2 -ml-2 bg-purple-500 rounded-full pointer-events-none sm:block"
            style="translate: -50% -50%" />
        <motion.div :initial="false" :animate="{ x: outlineCursorX, y: outlineCursorY, scale: isClicking ? 1.2 : 1 }"
            :transition="{ type: 'spring', stiffness: 200, damping: 20 }"
            class="fixed z-40 hidden w-10 h-10 -mt-5 -ml-5 border-2 border-purple-500 rounded-full pointer-events-none sm:block"
            style="translate: -50% -50%" />
    </div>
</template>
