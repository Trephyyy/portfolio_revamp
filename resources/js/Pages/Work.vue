<script setup>
import ProjectBig from "@/Components/Work/ProjectBig.vue";
import AppLayout from "@/Layouts/AppLayout.vue";
import { Head, Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
    <Head title="My Work" />
    <AppLayout>
        <div class="bg-primary-500 text-secondary">
            <div
                class="relative flex min-h-screen flex-col selection:bg-[#FF2D20] selection:text-white"
            >
                <div class="relative w-full">
                    <main
                        class="min-h-screen bg-gradient-to-r from-accent-800 to-accent-600"
                    >
                        <h1
                            class="text-4xl font-bold text-center flex items-end justify-center h-[200px]"
                        >
                            My Work
                        </h1>
                        <div
                            class="project-container space-y-12 py-24 w-[80%] container bg-muted-900 rounded-xl mt-24 mx-auto flex flex-col relative"
                        >
                            <ProjectBig image="flashlearn" title="Flashlearn" />
                            <ProjectBig />
                            <ProjectBig />
                            <ProjectBig />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<style scoped>
.project-container {
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
    overflow-y: auto;
    position: relative;
}

body {
    overflow: hidden;
}

body::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #fbb13c, #e63946);
    z-index: -1;
}
</style>
