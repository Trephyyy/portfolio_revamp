<template>

    <div
        class="relative z-20 flex flex-col items-center justify-center min-h-screen md:flex-row bg-gradient-to-r from-primary-500 to-primary-300"
    >
 <div class="absolute w-full h-full ">
            <GridBackground />
 </div>
    <div class="z-10 w-full p-6 mx-10 md:w-1/2">
            <h1 class="mb-4 text-4xl font-bold">Contact Me</h1>
            <p class="mb-6 text-lg">
                Have any questions or want to work together? Send me a message
                and I'll get back to you as soon as possible. <div class="divider"></div>
                You can also find me on social media.
            </p>
            <div class="flex space-x-4">
                <a href="https://twitter.com" target="_blank" class="text-2xl">
                    <Icon icon="mdi:twitter" />
                </a>
                <a href="https://facebook.com" target="_blank" class="text-2xl">
                    <Icon icon="mdi:facebook" />
                </a>
                <a href="https://linkedin.com" target="_blank" class="text-2xl">
                    <Icon icon="mdi:linkedin" />
                </a>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    class="text-2xl"
                >
                    <Icon icon="mdi:instagram" />
                </a>
            </div>
        </div>
        <div class="z-10 w-full p-6 md:w-1/2">
            <form @submit.prevent="submitForm" class="space-y-4">
                <div>
                    <label for="name" class="block text-sm font-medium text-muted-200"
                        >Name</label
                    >
                    <input
                        type="text"
                        id="name"
                        v-model="form.name"
                        class="block w-full p-2 mt-1 text-black bg-white border border-gray-200 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium text-muted-200"
                        >Email</label
                    >
                    <input
                        type="email"
                        id="email"
                        v-model="form.email"
                        class="block w-full p-2 mt-1 text-black bg-white border border-gray-200 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label for="message" class="block text-sm font-medium text-muted-200"
                        >Message</label
                    >
                    <textarea
                        id="message"
                        v-model="form.message"
                        class="block w-full p-2 mt-1 text-black bg-white border border-gray-200 rounded-md"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    class="w-full px-4 py-2 font-semibold text-white rounded-md bg-secondary-500 hover:bg-secondary-600"
                >
                    Send Message
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue/dist/iconify.js";
import anime from "animejs";
import GridBackground from "./GridBackground.vue";

const form = ref({
    name: "",
    email: "",
    message: "",
});

const submitForm = () => {
    // Handle form submission
    console.log("Form submitted:", form.value);
    anime({
        targets: form.value,
        opacity: [0, 1],
        duration: 1000,
        easing: "easeInOutQuad",
    });
};
</script>

<style scoped>
/* Add any necessary styles */
</style>
