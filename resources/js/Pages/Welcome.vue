<script setup>
import TimelineItem from "@/Components/TimelineItem.vue";
import MobileTimelineItem from "@/Components/MobileTimelineItem.vue";
import AppLayout from "@/Layouts/AppLayout.vue";
import { Head, Link } from "@inertiajs/vue3";
import AboutSection from "@/Components/Index/AboutSection.vue";
import IndexTimeline from "@/Components/Index/IndexTimeline.vue";
import IndexHero from "@/Components/Index/IndexHero.vue";
import IndexSourceCode from "@/Components/Index/IndexSourceCode.vue";
import GridBackground from "@/Components/Index/GridBackground.vue";
import IndexContact from "@/Components/Index/IndexContact.vue";
import projects from "../../json/projects.json";
import IndexWork from "@/Components/Index/IndexWork.vue";
</script>

<template>
    <Head title="Trephy Portfolio" />
    <AppLayout>
        <div
            class="bg-primary-500 text-secondary dark:bg-primary-600 dark:text-secondary"
        >
            <div
                class="relative flex min-h-screen flex-col selection:bg-[#FF2D20] selection:text-white"
                style="scroll-behavior: smooth"
            >
                <div class="relative w-full h-full overflow-hidden">
                    <main
                        class="relative flex flex-col w-full bg-gradient-to-r from-accent_2-500 to-accent_2-400"
                    >
                        <div
                            class="fixed z-10 w-screen h-screen bg-transparent"
                        >
                            <IndexHero />
                            <GridBackground />
                        </div>
                        <div class="z-20">
                            <div class="relative h-screen"></div>
                            <AboutSection />
                            <IndexTimeline />
                            <IndexWork :projects="projects" />
                            <IndexContact />
                            <div class="bg-[#060918] w-full h-full z-10">
                                <IndexSourceCode />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
