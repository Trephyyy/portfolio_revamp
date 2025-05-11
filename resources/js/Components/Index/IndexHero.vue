<script setup>
import { Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { ref, onMounted, watch } from "vue";
import { motion } from "motion-v"
const { t, locale } = useI18n();
const verbs = ref([]);

// For animated background
const particles = ref([]);
const particleCount = 50;

onMounted(() => {
    // Load verbs from i18n
    for (let i = 0; i < Number(t("hero.verbSize")); i++) {
        verbs.value.push(t(`hero.verbs[${i}]`));
    }

    // Initialize animated background particles
    for (let i = 0; i < particleCount; i++) {
        particles.value.push({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 20 + 5,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 10,
        });
    }

    // Start typing animation
    typeWriter();
});

watch(locale, () => {
    verbs.value = [];
    for (let i = 0; i < Number(t("hero.verbSize")); i++) {
        verbs.value.push(t(`hero.verbs[${i}]`));
    }
    console.log("switched locale to", locale.value);
});

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

// Function to handle scrolling to section
const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};
</script>

<template>
    <section id="home"
        class="relative flex items-center justify-center w-full min-h-screen mx-auto overflow-hidden text-center">
        <!-- Animated background -->
        <div class="absolute inset-0 overflow-hidden bg-gradient-to-br from-gray-900 to-indigo-900">
        </div>
        <motion.div
            class="absolute inset-0 overflow-hidden pointer-events-none bg-gradient-to-br from-gray-900 to-indigo-900"
            :initial="{ opacity: 0.8, scale: 1 }" :animate="{ opacity: [0.8, 1, 0.8], scale: [1, 1.02, 1] }"
            :transition="{ duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }" />

        <!-- Main hero content -->
        <motion.div :initial="{ opacity: 0, y: 50 }" :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 1, delay: 0.5 }"
            class="z-30 px-6 py-12 bg-gray-900 bg-opacity-75 max-w-[90%] sm:max-w-2xl rounded-xl backdrop-blur-md">
            <motion.h1 :initial="{ opacity: 0, x: -50 }" :animate="{ opacity: 1, x: 0 }"
                :transition="{ duration: 1, delay: 0.8 }" class="text-4xl font-bold text-white md:text-5xl">
                {{ t("hero.greeting") }}
            </motion.h1>

            <motion.p :initial="{ opacity: 0, x: 50 }" :animate="{ opacity: 1, x: 0 }"
                :transition="{ duration: 1, delay: 1.2 }"
                class="py-6 text-lg font-medium text-white sm:whitespace-nowrap md:text-xl">
                {{ t("hero.description.part1") }}
                <span class="text-indigo-300">{{ currentVerb }}</span><span class="-ml-1 cursor">|</span>
                <br v-if="!$i18n.locale.startsWith('en')" />
                <span class="-ml-1">{{ t("hero.description.part2") }}</span>
            </motion.p>

            <motion.div :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 1, delay: 1.5 }"
                class="z-10 flex flex-col justify-center mt-8 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <button @click="scrollToSection('work')"
                    class="px-8 py-3 font-medium text-gray-900 transition-colors duration-300 bg-indigo-300 rounded-lg hover:bg-indigo-400">
                    {{ t("hero.button.work") }}
                </button>
                <button @click="scrollToSection('contact')"
                    class="px-8 py-3 font-medium text-white transition-colors duration-300 bg-transparent border-2 border-indigo-300 rounded-lg hover:bg-indigo-900">
                    {{ t("hero.button.contact") }}
                </button>
            </motion.div>
        </motion.div>
    </section>
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