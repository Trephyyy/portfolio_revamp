<script setup>
const { title, image, description, tags } = defineProps([
    "title",
    "image",
    "description",
    "tags",
]);
</script>

<template>
    <div class="shadow-xl card w-[80%] mx-auto bg-base-100">
        <figure>
            <img :src="'/projects/' + image + '.png'" alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">
                {{ title }}
                <div class="badge badge-secondary">NEW</div>
            </h2>
            <p>{{ description }}</p>
            <div class="justify-end card-actions" v-for="tag in tags">
                <div class="badge badge-outline">{{ tag }}</div>
            </div>
        </div>
    </div>
</template>
