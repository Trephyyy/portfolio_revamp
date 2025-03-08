<script setup>
import { Link } from "@inertiajs/vue3";
</script>

<template>
    <div class="relative py-12 bg-purple-950 text-secondary-900">
        <div class="container mx-auto text-center">
            <div class="text-3xl font-bold divider">Explore My Work</div>
            <p class="my-8 text-lg">
                Discover the projects I've worked on and see how I can help you
                achieve your goals.
            </p>
            <Link
                href="/work"
                class="px-6 py-3 font-semibold rounded-lg btn bg-primary-500 hover:bg-primary-400 text-secondary-100"
            >
                View My Projects
            </Link>
        </div>
    </div>
</template>
