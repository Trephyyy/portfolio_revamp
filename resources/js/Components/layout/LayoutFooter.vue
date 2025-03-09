<script setup>
import { Icon } from "@iconify/vue";
import { Link } from "@inertiajs/vue3";
import socials from "../../../json/socials.json";

import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
    <footer
        class="relative z-50 flex flex-col items-center justify-center h-screen py-6 text-sm bg-muted-800 text-secondary dark:text-secondary-100"
    >
        <div
            class="absolute inset-0 flex items-end justify-center overflow-hidden"
        >
            <h1
                class="sm:text-[32rem] text-[12em] z-0 -mb-8 sm:-mb-32 font-black text-secondary-200 opacity-30 leading-none"
            >
                TREPHY
            </h1>
        </div>
        <div class="relative z-10 flex flex-col items-center w-full h-[70%]">
            <div class="flex flex-col items-center justify-center mb-8">
                <h1 class="text-2xl font-bold">Made with ❤️ by Trephy</h1>
            </div>
            <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
                <div class="flex flex-col items-center">
                    <h1 class="text-xl font-semibold">Navigation</h1>
                    <ul class="mt-4 space-y-2">
                        <li>
                            <Link href="#">{{
                                t("layout.header.nav.home")
                            }}</Link>
                        </li>
                        <li>
                            <Link href="#about">{{
                                t("layout.header.nav.about")
                            }}</Link>
                        </li>
                        <li>
                            <Link href="#work">{{
                                t("layout.header.nav.work")
                            }}</Link>
                        </li>
                        <li>
                            <Link href="#contact">{{
                                t("layout.header.nav.contact")
                            }}</Link>
                        </li>
                    </ul>
                </div>
                <div class="flex flex-col items-center">
                    <h1 class="text-xl font-semibold">Socials</h1>
                    <div class="flex mt-4 space-x-4">
                        <a
                            v-for="social in socials"
                            :href="social.link"
                            target="_blank"
                            class="z-10 flex items-center space-x-2"
                        >
                            <Icon :icon="social.icon" class="text-2xl" />
                            <span>{{ social.name }}</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="mt-8">
                <p>
                    &copy; 2025 Trephy | Web Developer & Cybersecurity
                    Enthusiast
                </p>
            </div>
        </div>
    </footer>
</template>
