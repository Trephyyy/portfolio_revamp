<template>
    <div class="my-10">
        <div
            class="grid grid-cols-1 gap-8 px-8 mx-auto xl:px-24 xl:grid-cols-3"
        >
            <div
                class="relative sm:h-[300px] h-[550px] cursor-pointer perspective-1000"
                v-for="skill in skills"
                :key="skill.id"
                @mouseenter="flipCard($event, true)"
                @mouseleave="flipCard($event, false)"
            >
                <!-- The card-inner wrapper that will be animated -->
                <div class="p-8 border-2 border-gray-300 rounded-lg card-inner">
                    <!-- Front face: shown by default -->
                    <div
                        class="flex items-center justify-center card-face card-front"
                    >
                        <h1
                            class="text-xl font-bold text-center sm:text-2xl sm:font-bold"
                        >
                            {{ skill.title }}
                        </h1>
                    </div>
                    <!-- Back face: initially rotated 180° -->
                    <div class="card-face card-back bg-card">
                        <div
                            class="relative flex items-center justify-center w-full h-full p-8"
                        >
                            <div class="w-full max-w-md space-y-8">
                                <h1 class="text-2xl font-bold">
                                    {{ skill.title }}
                                </h1>
                                <p>{{ skill.description }}</p>
                                <ul
                                    class="flex flex-col pt-2 space-y-1 text-lg md:py-2 lg:flex-row gap-x-6"
                                >
                                    <li
                                        v-for="(
                                            technology, techKey
                                        ) in skill.technologies"
                                        :key="techKey"
                                        class="flex items-center space-x-2 sm:flex-row"
                                    >
                                        <Icon
                                            :icon="technology.icon"
                                            width="24"
                                            class="mt-[1px]"
                                        />
                                        <span>{{ technology.name }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import anime from "animejs/lib/anime.es.js";

// Mouse enter handler

const skills = {
    frontend: {
        id: 0,
        title: "Frontend Development",
        description:
            "I began my career by establishing a strong foundation in the areas of design and frontend development. Over time, I have gained considerable experience working with various frontend frameworks and remain committed to advancing my skills in this field.",
        technologies: [
            { name: "Vue", icon: "logos:vue" },
            { name: "React", icon: "logos:react" },
            { name: "Svelte", icon: "logos:svelte-icon" },
            { name: "Solid", icon: "logos:solidjs-icon" },
        ],
        showOnHover: true,
    },
    backend: {
        id: 1,
        title: "Backend Development",
        description:
            "This area of expertise resonated with me and I have since developed a strong proficiency in this domain. Through my work, I ensure that all projects I undertake are executed with optimal efficiency, security, and functionality in mind. You can rely on me to bring the functionality to your project.",
        technologies: [
            { name: "Laravel", icon: "logos:laravel" },
            { name: "Express", icon: "devicon:express" },
            { name: "Fiber", icon: "devicon:go" },
            { name: "Nest", icon: "logos:nestjs" },
        ],
        showOnHover: true,
    },
    application: {
        id: 2,
        title: "Application Development",
        description:
            "I use my expertise in the areas of UI/UX, front-end development, and back-end development to create desktop and mobile applications for your needs.",
        technologies: [
            { name: "Flutter", icon: "logos:flutter" },
            { name: "Tauri", icon: "devicon:tauri" },
            { name: "Electron", icon: "logos:electron" },
            { name: "Swift", icon: "vscode-icons:file-type-swift" },
        ],
        showOnHover: true,
    },
    databases: {
        id: 3,
        title: "Databases",
        description:
            "I spent a lot of my time to research and compare the best databases on the market and will ensure to use the most resource and cost efficient one for your project.",
        technologies: [
            { name: "MySQL", icon: "devicon:mysql" },
            { name: "PostgreSQL", icon: "devicon:postgresql" },
            { name: "Redis", icon: "logos:redis" },
        ],
        showOnHover: true,
    },
    packaging: {
        id: 4,
        title: "Packaging",
        description:
            "After your project has been completed you can rely on me to make it compatible with every environment. Using modern technologies your app will be optimised for all operating systems and work on all browsers used today.",
        technologies: [
            { name: "Docker", icon: "devicon:docker" },
            { name: "Kubernetes", icon: "logos:kubernetes" },
        ],
        showOnHover: true,
    },
    deployment: {
        id: 5,
        title: "Deployment",
        description:
            "On your request, I can handle the deployment of your project. Depending on your requirements and budget I can recommend you the most cost-effective solution.",
        technologies: [
            { name: "AWS", icon: "logos:aws" },
            { name: "GCP", icon: "skill-icons:gcp-light" },
            { name: "Vercel", icon: "logos:vercel-icon" },
        ],
        showOnHover: true,
    },
};

/**
 * Flip the card on hover.
 * @param event The mouse event.
 * @param flip  Whether to flip to the back (true) or revert to the front (false).
 */
const flipCard = (event: MouseEvent, flip: boolean) => {
    // Find the inner container that we want to animate.
    const cardInner = (event.currentTarget as HTMLElement).querySelector(
        ".card-inner"
    );
    if (!cardInner) return;

    anime({
        targets: cardInner,
        rotateY: flip ? 180 : 0,
        duration: 300,
        easing: "easeInOutQuad",
    });
};
</script>

<style lang="scss" scoped>
/* Apply perspective to the card container */
.perspective-1000 {
    perspective: 1000px;
}

/* General card styling */
.card {
    border-radius: 4px;
    height: 100%;
    /* Remove any default CSS hover effects since we use animejs */
}

/* The inner container to be animated */
.card-inner {
    position: relative;
    height: 100%;
    width: 100%;

    transform-style: preserve-3d;
    /* Optional: fallback transition for non-JS environments */
    transition: transform 0.3s;
}

/* Both faces of the card */
.card-face {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Front face (visible by default) */
.card-front {
    transform: rotateY(0deg);
}

/* Back face (rotated 180° initially so it is hidden) */
.card-back {
    transform: rotateY(180deg);
    background-color: #faf9f4;
    border-radius: 4px;
    height: 100%;
}

/* Basic typography */

ul {
    gap: 0 36px;
}
</style>
