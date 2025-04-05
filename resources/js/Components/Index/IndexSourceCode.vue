<script setup>
import { Link } from "@inertiajs/vue3";
import MatrixEffect from "./MatrixEffect.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
    <div
        class="relative z-30 flex items-center justify-center w-full h-screen"
        style="
            background-color: #060918; /* Background color behind the mask */
            -webkit-mask-image: radial-gradient(
                circle,
                rgba(6, 9, 24, 1) 30%,
                rgba(6, 9, 24, 0) 80%
            );
            mask-image: radial-gradient(
                circle,
                rgba(6, 9, 24, 1) 30%,
                rgba(6, 9, 24, 0) 80%
            );
            mask-composite: exclude;
            -webkit-mask-composite: exclude; /* For Safari */
        "
    >
        <div
            class="container z-30 flex flex-col items-center justify-center max-w-2xl text-center gap-y-4"
        >
            <div
                class="px-4 py-1 font-bold border-2 text-accent_2-200 rounded-2xl bg-accent_2-500 max-w-fit label border-accent_2-400"
            >
                {{ t("sourceCode.title") }}
            </div>
            <h2 class="mt-2 text-5xl font-semibold text-muted-900">
                {{ t("sourceCode.subtitle") }}
            </h2>
            <p class="max-w-sm text-lg sm:max-w-fit text-muted-400">
                {{ t("sourceCode.description.part1") }}
                <span class="text-muted-700">{{
                    t("sourceCode.description.bluePill")
                }}</span>
                {{ t("sourceCode.description.part2") }}
                <span class="text-muted-700">{{
                    t("sourceCode.description.redPill")
                }}</span>
                {{ t("sourceCode.description.part3") }}
            </p>

            <a
                href="https://github.com/Trephyyy/portfolio_revamp"
                class="py-3 mt-2 text-lg font-bold px-7 button text-muted-800 bg-accent-500"
            >
                {{ t("sourceCode.button") }}
            </a>
        </div>
        <MatrixEffect />
    </div>
</template>
