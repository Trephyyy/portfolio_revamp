<template>
    <section id="contact"
        class="relative z-20 flex flex-col items-center justify-center min-h-screen md:flex-row bg-gradient-to-r from-primary-500 to-primary-300">
        <div class="absolute w-full h-full">
            <GridBackground />
        </div>
        <div class="z-10 w-full p-6 mx-10 md:w-1/2">
            <h1 class="mb-4 text-4xl font-bold">{{ t("contact.title") }}</h1>
            <p class="mb-6 text-lg">
                {{ t("contact.description") }}
            <div class="divider"></div>
            {{ t("contact.socialMedia") }}
            </p>
            <div class="flex space-x-4">
                <a v-for="social in socials" :href="social.link">
                    <Icon :icon="social.icon" class="text-2xl" />
                </a>

            </div>
        </div>
        <a rel="me" class="hidden" href="https://mastodon.social/@trephy">Mastodon</a>
        <div class="z-10 w-full p-6 md:w-1/2">
            <form @submit.prevent="submitForm" class="space-y-4">
                <div>
                    <label for="name" class="block text-sm font-medium text-muted-200">{{ t("contact.form.name")
                        }}</label>
                    <input type="text" id="name" v-model="form.name"
                        class="block w-full p-2 mt-1 text-black bg-white border border-gray-200 rounded-md" required />
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium text-muted-200">{{ t("contact.form.email")
                        }}</label>
                    <input type="email" id="email" v-model="form.email"
                        class="block w-full p-2 mt-1 text-black bg-white border border-gray-200 rounded-md" required />
                </div>
                <div>
                    <label for="message" class="block text-sm font-medium text-muted-200">{{ t("contact.form.message")
                        }}</label>
                    <textarea id="message" v-model="form.message"
                        class="block w-full p-2 mt-1 text-black bg-white border border-gray-200 rounded-md" rows="4"
                        required></textarea>
                </div>
                <button type="submit"
                    class="w-full px-4 py-2 font-semibold text-white rounded-md bg-secondary-500 hover:bg-secondary-600">
                    {{ t("contact.form.submit") }}
                </button>
            </form>
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue/dist/iconify.js";
import anime from "animejs";
import GridBackground from "./GridBackground.vue";
import axios from "axios";
import socials from "../../../json/socials.json";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const form = ref({
    name: "",
    email: "",
    message: "",
});

const submitForm = () => {
    axios.post("/contact", {
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
    })
        .then(response => {
            console.log("Message sent successfully:", response.data);
            form.value.name = "";
            form.value.email = "";
            form.value.message = "";
        })
        .catch(error => {
            console.error("Error sending message:", error);
            alert("There was an error sending your message. Please try again.");
        });

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
