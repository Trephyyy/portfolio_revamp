<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { Icon } from "@iconify/vue";
import { animate, stagger, inView } from 'motion-v';

const { t, locale } = useI18n();
const isOpen = ref(false);
const isScrolled = ref(false);
const headerRef = ref(null);
const mobileMenuRef = ref(null);

// Computed class for the header
const headerClasses = computed(() => {
    return [
        'z-30 fixed   transition-all flex self-center duration-300',
        isScrolled.value
            ? 'bg-white/90 w-full top-0 backdrop-blur-sm shadow-lg py-2'
            : 'bg-white/50 w-[90vw] rounded-xl top-5 py-4'
    ];
});

// Handle language toggle
const changeLanguage = () => {
    locale.value = locale.value === "en" ? "bg" : "en";
};

// Handle scroll events
const handleScroll = () => {
    isScrolled.value = window.scrollY > 20;
};

// Close mobile menu when clicking outside
const handleClickOutside = (event) => {
    if (isOpen.value && mobileMenuRef.value && !mobileMenuRef.value.contains(event.target) && !event.target.closest('button')) {
        isOpen.value = false;
    }
};

// Close mobile menu when screen resizes to desktop
const handleResize = () => {
    if (window.innerWidth >= 768 && isOpen.value) {
        isOpen.value = false;
    }
};

// Handle mobile menu toggle
const toggleMobileMenu = () => {
    isOpen.value = !isOpen.value;

    if (isOpen.value) {
        // Animate mobile menu items when opened
        animate('.nav-item',
            {
                opacity: [0, 1],
                y: [-20, 0]
            },
            {
                delay: stagger(0.1),
                duration: 0.4,
                easing: 'ease-out'
            }
        );
    }
};

// Handle smooth scrolling for navigation links
const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        isOpen.value = false;
    }
};

// Add event listeners when component is mounted
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', handleResize);

    // Initial header animation
    animate(headerRef.value,
        {
            y: [-20, 0],
            opacity: [0, 1]
        },
        {
            duration: 0.6,
            easing: 'ease-out'
        }
    );

    // Set up in-view animations for nav items
    inView('.desktop-nav-item', ({ target }) => {
        animate(target,
            {
                opacity: [0, 1],
                y: [-10, 0]
            },
            {
                delay: stagger(0.1),
                duration: 0.5
            }
        );
        return false; // Run only once
    });
});

// Remove event listeners when component is unmounted
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('click', handleClickOutside);
    window.removeEventListener('resize', handleResize);
});
</script>

<template>
    <header ref="headerRef" :class="headerClasses">
        <div class="container px-4 mx-auto md:px-6">
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <Link href="/" class="relative z-20 text-2xl font-black text-gray-800 md:text-3xl">
                {{ t('header.brand') }}
                </Link>

                <!-- Desktop Navigation -->
                <nav class="hidden md:block">
                    <ul class="flex items-center space-x-8">
                        <li v-for="(item, index) in ['home', 'about', 'work', 'contact']" :key="index"
                            class="desktop-nav-item">
                            <a :href="`#${item}`"
                                @click="(e) => scrollToSection(e, item === 'home' ? '#hero' : `#${item}`)"
                                class="font-medium text-gray-800 transition-colors duration-200 hover:text-gray-600">
                                {{ t(`header.nav.${item}`) }}
                            </a>
                        </li>

                        <!-- Language Toggle -->
                        <li class="desktop-nav-item">
                            <button @click="changeLanguage"
                                class="p-2 ml-2 transition-colors duration-200 rounded-full hover:bg-gray-100"
                                aria-label="Change language">
                                <span class="text-lg">{{ locale === "en" ? "🇧🇬" : "🇬🇧" }}</span>
                            </button>
                        </li>
                    </ul>
                </nav>

                <!-- Mobile Menu Button -->
                <button class="relative z-20 p-2 md:hidden focus:outline-none" @click="toggleMobileMenu"
                    aria-label="Toggle menu">
                    <div class="w-6 flex flex-col items-end justify-center gap-1.5 transition-all duration-300">
                        <span :class="[
                            'block h-0.5 bg-gray-800 rounded-full transition-all duration-300',
                            isOpen ? 'w-6 -rotate-45 translate-y-2' : 'w-6'
                        ]"></span>
                        <span :class="[
                            'block h-0.5 bg-gray-800 rounded-full transition-all duration-300',
                            isOpen ? 'opacity-0' : 'w-4'
                        ]"></span>
                        <span :class="[
                            'block h-0.5 bg-gray-800 rounded-full transition-all duration-300',
                            isOpen ? 'w-6 rotate-45 -translate-y-2' : 'w-5'
                        ]"></span>
                    </div>
                </button>
            </div>
        </div>

        <!-- Mobile Navigation -->
        <div ref="mobileMenuRef" :class="[
            'absolute inset-0 h-screen bg-white z-10 pt-24 px-6 transition-all duration-300 md:hidden overflow-y-auto',
            isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        ]">
            <nav>
                <ul class="flex flex-col space-y-6">
                    <li v-for="(item, index) in ['home', 'about', 'work', 'contact']" :key="index" class="nav-item">
                        <a :href="item === 'home' ? '#' : `#${item}`"
                            @click="(e) => scrollToSection(e, item === 'home' ? '#hero' : `#${item}`)"
                            class="block py-2 text-xl font-medium text-gray-800 transition-colors duration-200 hover:text-gray-600">
                            {{ t(`header.nav.${item}`) }}
                        </a>
                    </li>

                    <!-- Mobile Language Toggle -->
                    <li class="mt-8 nav-item">
                        <button @click="changeLanguage" class="flex items-center font-medium text-gray-800">
                            <span class="mr-2 text-xl">{{ locale === "en" ? "🇧🇬" : "🇬🇧" }}</span>
                            <span>{{ locale === "en" ? "Change to Bulgarian" : "Change to English" }}</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>