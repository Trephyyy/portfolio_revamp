<script setup>
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { onMounted, ref } from "vue";

const canvasRef = ref(null);
let models = [];

onMounted(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true, // Enable transparency
        canvas: canvasRef.value,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add ambient light with increased intensity
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light with increased intensity
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    const loader = new OBJLoader();
    const objFiles = [
        "/eye/model_0.obj",
        "/eye/model_1.obj",
        "/eye/model_2.obj",
        "/eye/model_3.obj",
        "/eye/model_4.obj",
        "/eye/model_5.obj",
        "/eye/model_6.obj",
    ];

    objFiles.forEach((file, index) => {
        loader.load(
            file,
            (obj) => {
                console.log("Model loaded:", obj);
                models.push(obj);
                scene.add(obj);
            },
            undefined,
            (error) => {
                console.error(
                    "An error occurred while loading the model:",
                    error
                );
            }
        );
    });

    camera.position.z = 5; // Move the camera further away

    const animate = function () {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    };

    animate();

    // Rotate the objects on scroll
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        models.forEach((model) => {
            model.rotation.y = scrollY * 0.01; // Adjust the rotation speed as needed
        });
    });

    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
});
</script>

<template>
    <div class="relative w-full h-screen">
        <canvas
            ref="canvasRef"
            class="absolute top-0 left-0 w-full h-full"
        ></canvas>
    </div>
</template>

<style scoped>
canvas {
    display: block;
    background: transparent; /* Ensure the background is transparent */
}
</style>
