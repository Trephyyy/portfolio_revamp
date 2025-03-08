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
                    <Link href="/">{{ t("layout.header.nav.home") }}</Link>
                </li>
                <li>
                    <Link href="/blog">{{ t("layout.header.nav.blog") }}</Link>
                </li>
                <li>
                    <Link href="/work">{{ t("layout.header.nav.work") }}</Link>
                </li>
                <li>
                    <Link href="/contact">{{
                        t("layout.header.nav.contact")
                    }}</Link>
                </li>
            </ul>
        </div>
    </header>
</template>
