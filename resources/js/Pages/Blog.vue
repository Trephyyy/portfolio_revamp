<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import { Head, Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
    <Head title="Work in Progress" />
    <AppLayout>
        <div
            class="bg-primary-500 text-secondary dark:bg-primary-600 dark:text-secondary"
        >
            <div
                class="relative flex min-h-screen flex-col selection:bg-[#FF2D20] selection:text-white"
            >
                <div class="relative w-full">
                    <main
                        class="relative flex flex-col w-full bg-gradient-to-r from-accent_2-800 to-accent_2"
                    >
                        <div
                            class="flex items-center justify-center w-full min-h-screen mx-auto text-left hero hero-content"
                        >
                            <div class="bg-yellow-200 p-9 rounded-xl">
                                <h1 class="text-5xl font-bold text-secondary">
                                    Blog is still in progress
                                </h1>
                                <p class="py-6 text-lg text-muted-400">
                                    Check out the other pages or come back later
                                    when the blog is ready
                                </p>
                                <div class="space-x-4">
                                    <Link
                                        href="/work"
                                        class="border-none btn bg-accent hover:bg-accent-600 text-primary"
                                    >
                                        {{ t("welcome.hero.button.work") }}
                                    </Link>
                                    <Link
                                        href="/contact"
                                        class="border-none btn bg-secondary hover:bg-secondary-600 text-primary"
                                    >
                                        {{ t("welcome.hero.button.contact") }}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
