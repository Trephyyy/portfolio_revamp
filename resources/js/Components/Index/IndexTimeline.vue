<script setup>
import MobileTimelineItem from "../MobileTimelineItem.vue";
import TimelineItem from "../TimelineItem.vue";
import timelineItems from "/public/data/timelineItems.json";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
    <div
        class="relative flex flex-col items-center w-full gap-8 bg-[#060918] text-muted-900"
    >
        <div
            class="px-6 py-1.5 mt-16 font-bold border-2 text-accent_2-800 rounded-2xl bg-accent_2-300 max-w-fit text-4xl label border-accent_2-200"
        >
            {{ t("skills.title") }}
        </div>
        <ul
            class="hidden my-12 text-muted-100 md:block timeline timeline-vertical"
        >
            <TimelineItem
                v-for="(item, index) in timelineItems"
                :key="index"
                :technologies="item.technologies"
                :title="item.title"
                :skillLevel="item.skillLevel"
                :tags="item.tags"
                :side="index % 2 === 0 ? 'left' : 'right'"
                :description="item.description"
            />
        </ul>
        <ul
            class="my-12 -left-[40%] text-red-900 md:hidden timeline timeline-vertical"
        >
            <MobileTimelineItem
                v-for="(item, index) in timelineItems"
                :key="index"
                :technologies="item.technologies"
                :title="item.title"
                :skillLevel="item.skillLevel"
                :tags="item.tags"
                :description="item.description"
            />
        </ul>
    </div>
</template>
