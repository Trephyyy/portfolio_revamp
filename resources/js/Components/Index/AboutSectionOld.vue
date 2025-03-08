<script setup>
import { ref } from "vue";

const selected = ref(0);
</script>
<template>
    <div class="flex flex-col items-center w-full gap-8">
        <div class="text-3xl font-bold divider">About</div>
        <div class="w-[80%] mx-auto bg-primary rounded-xl shadow-lg">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
                <!-- Squares on the left side -->
                <div class="flex flex-col col-span-1 space-y-2 transition-all">
                    <div
                        @click="selected = 1"
                        :class="{
                            'bg-accent-600': selected === 1,
                            'bg-primary': selected !== 1,
                        }"
                        class="flex items-center justify-center w-full h-20 cursor-pointer"
                    >
                        Humble Beginnings
                    </div>
                    <div
                        @click="selected = 2"
                        :class="{
                            'bg-accent-600': selected === 2,
                            'bg-primary': selected !== 2,
                        }"
                        class="flex items-center justify-center w-full h-20 cursor-pointer"
                    >
                        Framework Hell
                    </div>
                    <div
                        @click="selected = 3"
                        :class="{
                            'bg-accent-600': selected === 3,
                            'bg-primary': selected !== 3,
                        }"
                        class="flex items-center justify-center w-full h-20 cursor-pointer"
                    >
                        What is a Server?
                    </div>
                    <div
                        @click="selected = 4"
                        :class="{
                            'bg-accent-600': selected === 4,
                            'bg-primary': selected !== 4,
                        }"
                        class="flex items-center justify-center w-full h-20 cursor-pointer"
                    >
                        Mobile is Fun
                    </div>
                    <div
                        @click="selected = 5"
                        :class="{
                            'bg-accent-600': selected === 5,
                            'bg-primary': selected !== 5,
                        }"
                        class="flex items-center justify-center w-full h-20 cursor-pointer"
                    >
                        AI Sounds Interesting
                    </div>
                </div>
                <!-- Content on the right side -->
                <div class="col-span-3">
                    <div v-if="selected === 1">
                        <h3 class="text-xl font-bold">Humble Beginnings</h3>
                        <p>
                            I started learning the logic behind programming
                            around the age of 9 on Scratch. Its a platform for
                            building simple applications using blocks instead of
                            code. I developed my logistic thinking on Scratch
                            and the freedom it gave me as a kid is the reason I
                            still pursue this as a career .
                        </p>
                        <img src="/about/scratch.png" alt="" />
                    </div>
                    <div v-if="selected === 2">
                        <h3 class="text-xl font-bold">Framework Hell</h3>
                        <p>
                            After being done with block programming I started
                            doing web. Opened Youtube, found the first web
                            development video and started learning html. I
                            quickly became frustrated with how limited it was
                            and learnt css and js to expand my toolbox. Diving
                            deeper into the web community I found out about
                            javascript frameworks. I tried out EVERY SINGLE
                            popular framework and stuck with vuejs as it made
                            the most sense to me, im still capable of working
                            with any framework due to learning the logic behind
                            them initially.
                        </p>
                        <img src="/about/frameworks.png" alt="" />
                    </div>
                    <div v-if="selected === 3">
                        <h3 class="text-xl font-bold">What is a Server?</h3>
                        <p>Servers</p>
                    </div>
                    <div v-if="selected === 4">
                        <h3 class="text-xl font-bold">Mobile is Fun</h3>
                        <p>Mobile development</p>
                    </div>
                    <div v-if="selected === 5">
                        <h3 class="text-xl font-bold">AI Sounds Interesting</h3>
                        <p>AI development</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
