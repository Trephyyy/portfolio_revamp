<script setup>
import { Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { useScroll } from "@vueuse/core";

const { t } = useI18n();
</script>

<template>
    <div
        class="z-30 flex items-center justify-center w-full min-h-screen mx-auto text-left hero hero-content"
    >
        <div class="p-9 rounded-xl">
            <h1 class="text-5xl font-bold text-accent_2-900">Hi, I'm Trephy</h1>
            <p class="py-6 text-lg text-accent_2-800">
                A full-stack web developer, cybersecurity enthusiast and a quick
                adapter to new technology
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
</template>
