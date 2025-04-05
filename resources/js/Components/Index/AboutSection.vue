<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
    <section
        id="about"
        class="relative w-full sm:h-screen text-secondary dark:text-secondary"
    >
        <div
            class="w-full min-h-screen bg-gradient-to-r from-secondary-300 to-secondary-200"
        >
            <div
                class="grid items-center justify-center w-full min-h-full grid-cols-1 md:grid-cols-2"
            >
                <div class="hidden sm:block">
                    <img class="" src="/images/placeholder.png" alt="" />
                </div>
                <div class="p-8 min-h-fit sm:ml-[10%] text-muted-700">
                    <div
                        class="px-6 py-1.5 my-8 font-bold border-2 text-accent_2-800 rounded-2xl bg-accent_2-300 max-w-fit label border-accent_2-200"
                    >
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
                <div class="block sm:hidden">
                    <img
                        class="max-h-[40vh] mb-12 mx-auto"
                        src="/images/placeholder.png"
                        alt=""
                    />
                </div>
            </div>
        </div>
    </section>
</template>
