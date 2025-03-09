<script setup>
import { Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
    <header
        class="z-50 px-10 w-[95%] fixed top-0 ml-[2.5%] my-3 bg-[#ffffff80] rounded-xl navbar text-secondary-100"
    >
        <div class="flex-1">
            <Link href="/" class="text-3xl font-black btn btn-ghost">
                {{ t("layout.header.brand") }}
            </Link>
        </div>
        <div class="flex-none">
            <ul class="p-0 text-xl font-semibold menu menu-horizontal">
                <li>
                    <a href="#" class="scroll-smooth">{{
                        t("layout.header.nav.home")
                    }}</a>
                </li>
                <li>
                    <a href="#about" class="scroll-smooth">{{
                        t("layout.header.nav.about")
                    }}</a>
                </li>
                <li>
                    <a href="#work" class="scroll-smooth">{{
                        t("layout.header.nav.work")
                    }}</a>
                </li>
                <li>
                    <a href="#contact" class="scroll-smooth">{{
                        t("layout.header.nav.contact")
                    }}</a>
                </li>
            </ul>
        </div>
    </header>
</template>

<style scoped>
.scroll-smooth {
    scroll-behavior: smooth;
}
</style>
