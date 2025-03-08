<template>
    <canvas
        ref="matrixCanvasRef"
        aria-label="Matrix background"
        class="absolute inset-0 z-10 w-full h-full opacity-100"
    />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const TEXT_COLOR = "#7b107d60"; // theme('colors.accent')
const BACKGROUND_COLOR = "#060918"; // theme('colors.primary')
const ALPHA_BACKGROUND_COLOR = "#06091820"; // theme('colors.primary.600')
const FONT = "15pt monospace";
const TEXT_COLUMN_WIDTH = 20;
const FPS = 20;

const matrixCanvasRef = ref(null);
let animationFrame;

function getPseudoRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const initializeMatrixCanvas = () => {
    if (!matrixCanvasRef.value) return;

    const parentElement = matrixCanvasRef.value.parentElement;
    matrixCanvasRef.value.width =
        parentElement?.offsetWidth || window.innerWidth;
    matrixCanvasRef.value.height =
        parentElement?.offsetHeight || window.innerHeight;

    const canvasContext = matrixCanvasRef.value.getContext("2d");
    if (!canvasContext) return;

    canvasContext.fillStyle = BACKGROUND_COLOR;
    canvasContext.fillRect(
        0,
        0,
        matrixCanvasRef.value.width,
        matrixCanvasRef.value.height
    );

    const numberOfColumns =
        Math.floor(matrixCanvasRef.value.width / TEXT_COLUMN_WIDTH) + 1;
    return Array(numberOfColumns).fill(0);
};

const drawMatrix = (yPositions) => {
    if (!matrixCanvasRef.value) return;

    const canvasContext = matrixCanvasRef.value.getContext("2d");
    if (!canvasContext) return;

    canvasContext.fillStyle = ALPHA_BACKGROUND_COLOR;
    canvasContext.fillRect(
        0,
        0,
        matrixCanvasRef.value.width,
        matrixCanvasRef.value.height
    );

    canvasContext.fillStyle = TEXT_COLOR;
    canvasContext.font = FONT;

    const newYPositions = yPositions.map((y, index) => {
        const char = String.fromCharCode(getPseudoRandomInRange(33, 126));
        const x = index * TEXT_COLUMN_WIDTH;

        canvasContext.fillText(char, x, y);

        return y > 100 + Math.random() * 10000 ? 0 : y + 20;
    });

    return newYPositions;
};

const animate = (yPositions) => {
    if (!yPositions) return;
    const newYPositions = drawMatrix(yPositions);
    animationFrame = setTimeout(() => animate(newYPositions), 1000 / FPS);
};

onMounted(() => {
    let defaultYPositions = initializeMatrixCanvas();
    animate(defaultYPositions);

    window.addEventListener("resize", () => {
        defaultYPositions = initializeMatrixCanvas();
    });

    window.addEventListener("orientationchange", () => {
        defaultYPositions = initializeMatrixCanvas();
    });
});

onUnmounted(() => {
    clearTimeout(animationFrame);
    window.removeEventListener("resize", initializeMatrixCanvas);
    window.removeEventListener("orientationchange", initializeMatrixCanvas);
});
</script>

<style scoped>
/* Add any necessary styles */
</style>
