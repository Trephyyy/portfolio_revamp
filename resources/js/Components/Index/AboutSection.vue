<script setup></script>

<template>
    <div class="relative w-full sm:h-screen text-secondary dark:text-secondary">
        <div
            class="w-full min-h-screen bg-gradient-to-r from-secondary-300 to-secondary-200"
        >
            <div
                class="grid items-center justify-center w-full min-h-full grid-cols-1 md:grid-cols-2"
            >
                <div class="">
                    <img
                        class="max-h-screen"
                        src="http://place-hold.it/1080x1110"
                        alt=""
                    />
                </div>
                <div class="p-8 min-h-fit text-muted-700">
                    <div
                        class="px-6 py-1.5 my-8 font-bold border-2 text-accent_2-800 rounded-2xl bg-accent_2-300 max-w-fit label border-accent_2-200"
                    >
                        ABOUT
                    </div>
                    <h2 class="py-2 text-5xl text-muted-900">Hi, I'm Trephy</h2>
                    <p class="mb-4 text-lg">
                        a passionate
                        <span class="text-accent_2-900"
                            >web developer and cybersecurity enthusiast.</span
                        >
                    </p>
                    <p class="text-lg">
                        Drawing on extensive experience with a variety of
                        technologies and frameworks, I specialize in creating
                        digital experiences that are both seamless and
                        user-friendly. I take pride in designing intuitive,
                        visually engaging interfaces and developing robust
                        applications with meticulous attention to detail. My
                        focus is on delivering polished, professional solutions
                        that consistently exceed expectations.
                    </p>
                </div>
                <!-- <div class="flex items-center justify-center">
                    <img
                        src="/path/to/your/image.jpg"
                        alt="About Image"
                        class="rounded-lg shadow-lg"
                    />
                </div> -->
            </div>
        </div>
    </div>
</template>
