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

    <Head title="Home" />
    <AppLayout>
        <div class="bg-primary-500 text-secondary dark:bg-primary-600 dark:text-secondary">
            <div class="relative flex min-h-screen flex-col selection:bg-[#FF2D20] selection:text-white animate-fade-in"
                style="scroll-behavior: smooth">
                <div class="relative w-full h-full overflow-hidden">
                    <main class="relative flex flex-col w-full bg-gradient-to-r from-accent_2-500 to-accent_2-400">
                        <div class="relative z-10 w-screen ">
                            <IndexHero />
                            <GridBackground class="fixed" />
                        </div>
                        <div class="z-20 mt-[-100vh]">
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

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.animate-fade-in {
    animation: fade-in 1s ease-in-out;
}
</style>
