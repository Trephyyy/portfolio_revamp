<script setup>
import { useI18n } from "vue-i18n";
import "iconify-icon"
const { t } = useI18n();
</script>

<template>
    <section id="about" class="relative w-full sm:h-screen text-secondary dark:text-secondary">
        <div class="w-full min-h-screen bg-gradient-to-r from-secondary-300 to-secondary-200">
            <div class="grid items-center justify-center w-full min-h-full grid-cols-1 md:grid-cols-2">
                <!-- Desktop grid view (left side) -->
                <div class="hidden sm:block">
                    <div class="relative">
                        <!-- Grid of images -->
                        <div class="grid grid-cols-2 gap-1">
                            <!-- Image 1 -->
                            <div class="overflow-hidden aspect-square">
                                <img class="object-cover w-full h-full" src="/projects/pcrevive1.png" alt="Project 1" />
                            </div>
                            <!-- Image 2 -->
                            <div class="overflow-hidden aspect-square">
                                <img class="object-cover w-full h-full" src="/projects/flashlearn.png"
                                    alt="Project 2" />
                            </div>
                            <!-- Image 3 -->
                            <div class="overflow-hidden aspect-square">
                                <img class="object-cover w-full h-full" src="/projects/appartify-front.png"
                                    alt="Project 3" />
                            </div>
                            <!-- Image 4 -->
                            <div class="overflow-hidden aspect-square">
                                <img class="object-cover w-full h-full" src="/projects/barber-example-front.png"
                                    alt="Project 4" />
                            </div>
                        </div>
                        <!-- Overlay with text that covers the entire grid -->
                        <a href="#work"
                            class="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-black bg-opacity-70 group hover:bg-opacity-90">
                            <p
                                class="text-2xl font-medium text-white transition-transform duration-300 transform scale-100 group-hover:scale-110">
                                <span>View Work</span> <span>
                                    <iconify-icon icon="ph:arrow-right-bold" class="text-xl"></iconify-icon>
                                </span>
                            </p>
                        </a>
                    </div>
                </div>

                <div class="p-8 min-h-fit sm:ml-[10%] text-muted-700">
                    <div
                        class="px-6 py-1.5 my-8 font-bold border-2 text-accent_2-800 rounded-2xl bg-accent_2-300 max-w-fit label border-accent_2-200">
                        {{ t("about.title") }}
                    </div>
                    <h2 class="py-2 text-5xl text-muted-900">
                        {{ t("about.greeting") }}
                    </h2>
                    <p class="mb-4 text-lg">
                        {{ t("about.intro.part1") }}
                        <span class="text-accent_2-900">{{
                            t("about.intro.part2")
                            }}</span>
                    </p>
                    <p class="text-lg">
                        {{ t("about.description") }}
                    </p>
                </div>

                <!-- Mobile grid view (bottom) -->
                <div class="block m-4 sm:hidden">
                    <!-- Grid container with a relative wrapper for center text overlay -->
                    <div class="relative max-w-md mx-auto mb-12">
                        <!-- Grid of images -->
                        <div class="grid grid-cols-2 gap-1">
                            <!-- Image 1 -->
                            <div class="overflow-hidden aspect-square">
                                <img class="object-cover w-full h-full" src="/projects/pcrevive.png" alt="Project 1" />
                            </div>
                            <!-- Image 2 -->
                            <div class="overflow-hidden aspect-square">
                                <img class="object-cover w-full h-full" src="/projects/flashlearn.png"
                                    alt="Project 2" />
                            </div>
                            <!-- Image 3 -->
                            <div class="overflow-hidden aspect-square">
                                <img class="object-cover w-full h-full" src="/projects/appartify-front.png"
                                    alt="Project 3" />
                            </div>
                            <!-- Image 4 -->
                            <div class="overflow-hidden aspect-square">
                                <img class="object-cover w-full h-full" src="/projects/barber-example-front.png"
                                    alt="Project 4" />
                            </div>
                        </div>
                        <!-- Overlay with text that covers the entire grid -->
                        <a href="#work"
                            class="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-black group bg-opacity-40 hover:bg-opacity-70">
                            <p
                                class="text-xl font-medium text-white transition-transform duration-300 transform scale-100 group-hover:scale-110">
                                <span>View Work</span> <span>
                                    <iconify-icon icon="ph:arrow-right-bold" class="text-lg"></iconify-icon>
                                </span>
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
