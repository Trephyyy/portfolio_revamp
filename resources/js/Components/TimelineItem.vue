<script setup>
import { Link } from "@inertiajs/vue3";
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const itemRef = ref(null);

const { title, skillLevel, description, side, tags, technologies } =
    defineProps([
        "title",
        "skill-level",
        "description",
        "side",
        "tags",
        "technologies",
    ]);

function badgeColor() {
    const colors = ["primary", "secondary", "accent", "muted"];
    switch (t(skillLevel)) {
        case "EXPERT":
            return colors[0];
        case "Intermediate":
            return colors[1];
        case "Advanced":
            return colors[2];
        default:
            return colors[3];
    }
}

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && itemRef.value) {
                itemRef.value.classList.add("fade-in-up");
            }
        });
    });
    if (itemRef.value) observer.observe(itemRef.value);
});
</script>

<template>
    <li ref="itemRef" class="fade-in-up-inactive">
        <hr />
        <div
            class="flex flex-row"
            :class="side === 'right' ? 'timeline-end' : 'timeline-start'"
        >
            <div class="shadow-xl card w-[420px] mx-8 my-10 bg-base-100">
                <div class="card-body">
                    <div class="flex flex-row gap-x-2">
                        <div v-for="technology in technologies">
                            <Link :href="technology.link">
                                <img
                                    :src="
                                        '/technologies/' +
                                        technology.image +
                                        '.png'
                                    "
                                    :alt="technology.name"
                                    class="w-8 h-8"
                                />
                            </Link>
                        </div>
                    </div>
                    <h2 class="card-title">
                        {{ t(title) }}

                        <div class="badge" :class="`badge-${badgeColor()}`">
                            {{ t(skillLevel) }}
                        </div>
                    </h2>
                    <p>
                        {{ t(description) }}
                    </p>
                    <div class="flex justify-end my-4 card-actions">
                        <div v-for="tag in tags">
                            <div class="badge badge-outline">
                                {{ tag }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="timeline-middle">
            <svg
                width="20px"
                height="20px"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                fill="#000000"
                stroke="#000000"
            >
                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                    <title>plus-circle</title>
                    <desc>Created with Sketch Beta.</desc>
                    <defs></defs>
                    <g
                        id="Page-1"
                        stroke="none"
                        stroke-width="4"
                        fill="none"
                        fill-rule="evenodd"
                        sketch:type="MSPage"
                    >
                        <g
                            id="Icon-Set"
                            sketch:type="MSLayerGroup"
                            transform="translate(-464.000000, -1087.000000)"
                            fill="#746e8b"
                        >
                            <path
                                d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z"
                                id="plus-circle"
                                sketch:type="MSShapeGroup"
                            ></path>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
        <hr />
    </li>
</template>

<style scoped>
.fade-in-up-inactive {
    opacity: 0;
    transform: translateY(20px);
}

.fade-in-up {
    animation: fade-in-up 0.8s forwards ease-in;
}

@keyframes fade-in-up {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
