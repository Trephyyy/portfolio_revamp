<template>
    <div
        class="flex flex-col items-center justify-center min-h-screen p-6 md:flex-row bg-gradient-to-r from-primary-500 to-primary-300"
    >
        <div class="w-full p-6 md:w-1/2">
            <h1 class="mb-4 text-4xl font-bold">Contact Us</h1>
            <p class="mb-6 text-lg">
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
        <div class="w-full p-6 md:w-1/2">
            <form @submit.prevent="submitForm" class="space-y-4">
                <div>
                    <label for="name" class="block text-sm font-medium"
                        >Name</label
                    >
                    <input
                        type="text"
                        id="name"
                        v-model="form.name"
                        class="block w-full p-2 mt-1 border border-gray-300 rounded-md"
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
                        class="block w-full p-2 mt-1 border border-gray-300 rounded-md"
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
                        class="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    class="w-full px-4 py-2 font-semibold text-white rounded-md bg-primary-500 hover:bg-primary-600"
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
import axios from "axios";

const form = ref({
    name: "",
    email: "",
    message: "",
});

const submitForm = () => {
    axios
        .post("/contact", {
            name: form.value.name,
            email: form.value.email,
            message: form.value.message,
        })
        .then((response) => {
            console.log("Message sent successfully:", response.data);
            // Optionally, you can reset the form here
            form.value.name = "";
            form.value.email = "";
            form.value.message = "";
        })
        .catch((error) => {
            console.error("Error sending message:", error);
            // Optionally, you can show an error message to the user here
        });
};
</script>

<style scoped>
/* Add any necessary styles */
</style>
