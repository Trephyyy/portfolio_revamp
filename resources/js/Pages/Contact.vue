<template>
    <div
        class="flex flex-col md:flex-row min-h-screen items-center justify-center p-6 bg-gradient-to-r from-primary-500 to-primary-300"
    >
        <div class="w-full md:w-1/2 p-6">
            <h1 class="text-4xl font-bold mb-4">Contact Us</h1>
            <p class="text-lg mb-6">
                We'd love to hear from you! Please fill out the form below or
                reach out to us on social media.
            </p>
            <div class="flex space-x-4">
                <a href="https://twitter.com" target="_blank" class="text-2xl">
                    <span class="iconify" data-icon="mdi:twitter"></span>
                </a>
                <a href="https://facebook.com" target="_blank" class="text-2xl">
                    <span class="iconify" data-icon="mdi:facebook"></span>
                </a>
                <a href="https://linkedin.com" target="_blank" class="text-2xl">
                    <span class="iconify" data-icon="mdi:linkedin"></span>
                </a>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    class="text-2xl"
                >
                    <span class="iconify" data-icon="mdi:instagram"></span>
                </a>
            </div>
        </div>
        <div class="w-full md:w-1/2 p-6">
            <form @submit.prevent="submitForm" class="space-y-4">
                <div>
                    <label for="name" class="block text-sm font-medium"
                        >Name</label
                    >
                    <input
                        type="text"
                        id="name"
                        v-model="form.name"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium"
                        >Email</label
                    >
                    <input
                        type="email"
                        id="email"
                        v-model="form.email"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label for="message" class="block text-sm font-medium"
                        >Message</label
                    >
                    <textarea
                        id="message"
                        v-model="form.message"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    class="w-full py-2 px-4 bg-primary-500 text-white font-semibold rounded-md hover:bg-primary-600"
                >
                    Send Message
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import anime from "animejs";

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
