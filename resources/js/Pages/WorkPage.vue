<script setup>
import ProjectBig from "@/Components/WorkPage/ProjectBig.vue";
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
