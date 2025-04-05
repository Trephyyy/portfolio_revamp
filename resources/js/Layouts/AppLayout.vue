<script setup>
import LayoutFooter from "@/Components/layout/LayoutFooter.vue";
import LayoutHeader from "@/Components/layout/LayoutHeader.vue";
import { ref, onMounted } from "vue";
import { Link } from "@inertiajs/vue3";
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
    }, 200); // Delay for the outline cursor
};

const handleMouseDown = () => {
    isClicking.value = true;
    setTimeout(() => {
        isClicking.value = false;
    }, 300); // Duration of the animation
};

onMounted(() => {
    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mousedown", handleMouseDown);
});
</script>

<template>
    <div class="flex flex-col min-h-screen bg-primary-500 text-secondary">
        <!-- DaisyUI Header -->
        <LayoutHeader />

        <!-- Main content slot -->
        <main class="flex-grow animate-fade-in">
            <slot />
        </main>

        <!-- DaisyUI Footer -->
        <LayoutFooter />

        <!-- Filled Cursor Circle -->
        <div
            :style="{ left: cursorX + 'px', top: cursorY + 'px' }"
            :class="{ 'cursor-clicking': isClicking }"
            class="fixed z-50 hidden w-4 h-4 transition-transform duration-100 transform -translate-x-1/2 -translate-y-1/2 bg-purple-500 rounded-full pointer-events-none sm:block animate-cursor-move"
        ></div>

        <!-- Outline Cursor Circle -->
        <div
            :style="{ left: outlineCursorX + 'px', top: outlineCursorY + 'px' }"
            class="fixed z-40 hidden w-10 h-10 transition-transform duration-500 transform -translate-x-1/2 -translate-y-1/2 border-2 border-purple-500 rounded-full pointer-events-none sm:block animate-cursor-move"
        ></div>
    </div>
</template>

<style scoped>
.cursor-clicking {
    width: 8px;
    height: 8px;
    background-color: purple;
    transition: width 0.3s, height 0.3s, background-color 0.3s;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes cursor-move {
    from {
        transform: translate(-50%, -50%) scale(0.8);
    }
    to {
        transform: translate(-50%, -50%) scale(1);
    }
}

.animate-fade-in {
    animation: fade-in 1s ease-in-out;
}

.animate-cursor-move {
    animation: cursor-move 0.3s ease-in-out;
}
</style>
