<script setup>
import { Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";

const { t } = useI18n();
const verbs = ref(["design", "code", "deploy", "create", "build"]);
const currentVerb = ref("");
let index = 0;
let charIndex = 0;
let isDeleting = false;

const typeWriter = () => {
    if (!isDeleting && charIndex < verbs.value[index].length) {
        currentVerb.value += verbs.value[index].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    } else if (isDeleting && charIndex > 0) {
        currentVerb.value = currentVerb.value.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeWriter, 50);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            index = (index + 1) % verbs.value.length;
        }
        setTimeout(typeWriter, 1000);
    }
};

onMounted(() => {
    typeWriter();
});
</script>

<template>
    <div
        class="z-30 flex items-center justify-center w-full min-h-screen mx-auto text-center bg-center bg-cover hero hero-content"
    >
        <div class="bg-gray-900 bg-opacity-75 p-9 rounded-xl">
            <h1 class="text-6xl font-bold text-white">Hello, I'm Trephy</h1>
            <p class="py-6 text-2xl text-white">
                A developer who loves to
                <span class="text-accent_2-800">{{ currentVerb }}</span
                ><span class="-ml-1 cursor">|</span>
                <span class="-ml-1"> breathtaking digital experiences. </span>
            </p>
            <!--   <div class="space-x-4">
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
            </div> -->
        </div>
    </div>
</template>

<style scoped>
.cursor {
    display: inline-block;
    width: 1ch;
    animation: blink 1s steps(2, start) infinite;
}

@keyframes blink {
    to {
        visibility: hidden;
    }
}
</style>
