<script setup>
import LayoutFooter from "@/Components/layout/LayoutFooter.vue";
import LayoutHeader from "@/Components/layout/LayoutHeader.vue";
import { Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
    <div class="flex flex-col min-h-screen bg-primary-500 text-secondary">
        <!-- DaisyUI Header -->
        <LayoutHeader />

        <!-- Main content slot -->
        <main class="flex-grow">
            <slot />
        </main>

        <!-- DaisyUI Footer -->
        <LayoutFooter />
    </div>
</template>
