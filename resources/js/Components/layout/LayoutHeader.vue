<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { Icon } from "@iconify/vue";

const { t, locale } = useI18n();
const isOpen = ref(false);
const isScrolled = ref(false);

const changeLanguage = () => {
    locale.value = locale.value === "en" ? "bg" : "en";
};

// Handle scroll events
const handleScroll = () => {
    // Change header style when page is scrolled more than 20px
    isScrolled.value = window.scrollY > 20;
};

// Add scroll event listener when component is mounted
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

// Remove event listener when component is unmounted
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>

    <header :class="[
        'z-30  flex fixed top-0  navbar text-secondary-100 transition-all duration-300 animate-slide-down',
        isScrolled ? 'rounded-none shadow-md w-screen bg-[#cacaca] mx-0 my-0' : 'rounded-xl bg-[#ffffff80] my-3  mx-[5%] w-[90%]'
    ]">
        <div class="relative flex items-center justify-between w-full px-10">
            <Link href="/" class="text-2xl font-black md:text-3xl btn btn-ghost">
            {{ t("header.brand") }}
            </Link>
            <div :class="{ block: isOpen, hidden: !isOpen }"
                class="w-full text-right transition-all duration-300 md:flex md:items-center md:justify-end md:w-auto">
                <ul class="flex flex-col p-0 text-lg font-semibold md:text-xl menu menu-horizontal md:flex-row">
                    <li>
                        <a href="#" class="scroll-smooth">{{
                            t("header.nav.home")
                        }}</a>
                    </li>
                    <li>
                        <a href="#about" class="scroll-smooth">{{
                            t("header.nav.about")
                        }}</a>
                    </li>
                    <li>
                        <a href="#work" class="scroll-smooth">{{
                            t("header.nav.work")
                        }}</a>
                    </li>
                    <li>
                        <a href="#contact" class="scroll-smooth">{{
                            t("header.nav.contact")
                        }}</a>
                    </li>
                </ul>
                <button @click="changeLanguage" class="ml-4 text-lg font-semibold text-secondary-100">
                    {{ locale === "en" ? "🇧🇬" : "🇬🇧" }}
                </button>
            </div>
            <button
                class="relative left-0 block ml-auto text-3xl transition-transform duration-300 md:hidden focus:outline-none"
                @click="isOpen = !isOpen">
                <Icon :icon="isOpen ? 'bi:x' : 'bi:justify'" class="text-secondary-100" />
            </button>
        </div>
    </header>
</template>

<style scoped>
.scroll-smooth {
    scroll-behavior: smooth;
}

@keyframes slide-down {
    from {
        transform: translateY(-20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.animate-slide-down {
    animation: slide-down 1s ease-in-out;
}
</style>