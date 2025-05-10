<script setup>
import MobileTimelineItem from "../MobileTimelineItem.vue";
import TimelineItem from "../TimelineItem.vue";
import timelineItems from "/public/data/timelineItems.json";
import { useI18n } from "vue-i18n";
import { ref, onMounted, onUnmounted, watch } from "vue";
import anime from "animejs/lib/anime.es.js";

const { t } = useI18n();

// Refs for the animated background
const backgroundRef = ref(null);
const particles = ref([]);
const mousePosition = ref({ x: 0, y: 0 });
const isMouseMoving = ref(false);
const mouseTimeout = ref(null);
const animationInterval = ref(null);
const particleCount = 70; // Increased number of particles for more visual impact

// Create particle objects
const createParticles = () => {
    if (!backgroundRef.value) return;

    const container = backgroundRef.value;
    const containerRect = container.getBoundingClientRect();

    // Clear existing particles
    particles.value.forEach(particle => {
        if (particle.el && particle.el.parentNode) {
            particle.el.parentNode.removeChild(particle.el);
        }
    });

    particles.value = Array.from({ length: particleCount }, () => {
        // More varied particle sizes
        const size = Math.random() * 8 + 2;
        // Assign different types of particles
        const particleType = Math.random() > 0.7 ? 'star' : 'circle';

        return {
            x: Math.random() * containerRect.width,
            y: Math.random() * containerRect.height,
            size: size,
            speedX: (Math.random() - 0.5) * 1.2, // Faster movement
            speedY: (Math.random() - 0.5) * 1.2,
            opacity: Math.random() * 0.7 + 0.3, // Higher base opacity
            el: document.createElement("div"),
            type: particleType,
            pulseSpeed: Math.random() * 0.02 + 0.01, // For pulsing effect
            pulseDirection: 1,
            pulseValue: 0
        };
    });

    // Initialize particle elements
    particles.value.forEach(particle => {
        if (particle.type === 'star') {
            // Create star-shaped particles
            particle.el.className = "absolute star-particle";
            particle.el.innerHTML = `
        <svg width="${particle.size * 2}" height="${particle.size * 2}" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                fill="rgba(252, 211, 77, ${particle.opacity})" />
        </svg>
      `;
        } else {
            // Create circle particles with varied colors
            const colorOptions = [
                'bg-accent_2-300', // Original color
                'bg-accent_2-400',
                'bg-blue-300',
                'bg-indigo-300'
            ];
            const colorClass = colorOptions[Math.floor(Math.random() * colorOptions.length)];
            particle.el.className = `absolute rounded-full ${colorClass} glow-effect`;
        }

        particle.el.style.width = `${particle.size}px`;
        particle.el.style.height = `${particle.size}px`;
        particle.el.style.opacity = particle.opacity;
        particle.el.style.left = `${particle.x}px`;
        particle.el.style.top = `${particle.y}px`;

        container.appendChild(particle.el);
    });
};

// Animation function using AnimeJS
const animateParticles = () => {
    if (particles.value.length === 0) return;

    const containerRect = backgroundRef.value.getBoundingClientRect();

    // Update particles
    particles.value.forEach((particle, i) => {
        // Add base animation
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Pulsing effect
        particle.pulseValue += particle.pulseSpeed * particle.pulseDirection;
        if (particle.pulseValue > 1) {
            particle.pulseDirection = -1;
        } else if (particle.pulseValue < 0) {
            particle.pulseDirection = 1;
        }

        // Add stronger influence from mouse when mouse is moving
        if (isMouseMoving.value) {
            const dx = mousePosition.value.x - particle.x;
            const dy = mousePosition.value.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 200; // Increased interaction range

            if (distance < maxDistance) {
                const factor = 1 - distance / maxDistance;
                // More pronounced movement
                particle.x += dx * factor * 0.05;
                particle.y += dy * factor * 0.05;

                // Add some rotation for star particles
                if (particle.type === 'star') {
                    anime.set(particle.el, {
                        rotate: factor * 360
                    });
                }
            }
        }

        // Boundary checking with slight bounce effect
        if (particle.x < 0) {
            particle.x = 0;
            particle.speedX = Math.abs(particle.speedX) * 1.1;
        } else if (particle.x > containerRect.width) {
            particle.x = containerRect.width;
            particle.speedX = -Math.abs(particle.speedX) * 1.1;
        }

        if (particle.y < 0) {
            particle.y = 0;
            particle.speedY = Math.abs(particle.speedY) * 1.1;
        } else if (particle.y > containerRect.height) {
            particle.y = containerRect.height;
            particle.speedY = -Math.abs(particle.speedY) * 1.1;
        }

        // Gradually return to normal speed
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;

        // Apply scaling pulse effect
        const scale = 1 + (particle.pulseValue * 0.3);

        // Apply position and effects
        anime.set(particle.el, {
            translateX: particle.x,
            translateY: particle.y,
            scale: scale,
            opacity: isMouseMoving.value ?
                particle.opacity * 2 : // Much more visible when mouse moves
                particle.opacity + (particle.pulseValue * 0.2) // Subtle pulse when idle
        });
    });

    requestAnimationFrame(animateParticles);
};

// Handle mouse movements
const handleMouseMove = (e) => {
    const containerRect = backgroundRef.value.getBoundingClientRect();
    mousePosition.value = {
        x: e.clientX - containerRect.left,
        y: e.clientY - containerRect.top
    };

    // Create ripple effect on mouse click
    if (e.type === 'click') {
        createRippleEffect(mousePosition.value.x, mousePosition.value.y);
    }

    isMouseMoving.value = true;

    // Reset the timeout
    clearTimeout(mouseTimeout.value);
    mouseTimeout.value = setTimeout(() => {
        isMouseMoving.value = false;
    }, 2000);
};

// Create a visual ripple effect on click
const createRippleEffect = (x, y) => {
    if (!backgroundRef.value) return;

    const ripple = document.createElement('div');
    ripple.className = 'absolute rounded-full bg-accent_2-400/30';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    backgroundRef.value.appendChild(ripple);

    // Animate ripple with AnimeJS
    anime({
        targets: ripple,
        scale: [0, 15],
        opacity: [1, 0],
        duration: 1500,
        easing: 'easeOutCubic',
        complete: () => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }
    });

    // Also make nearby particles "explode" outward
    particles.value.forEach(particle => {
        const dx = x - particle.x;
        const dy = y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
            // Push particles away from click point
            const angle = Math.atan2(dy, dx);
            const force = (1 - distance / 150) * 10;

            particle.speedX -= Math.cos(angle) * force;
            particle.speedY -= Math.sin(angle) * force;
        }
    });
};

// Lifecycle hooks
onMounted(() => {
    if (backgroundRef.value) {
        // Initial setup
        createParticles();
        animateParticles();

        // Create an initial "burst" effect
        setTimeout(() => {
            const centerX = backgroundRef.value.clientWidth / 2;
            const centerY = backgroundRef.value.clientHeight / 2;
            createRippleEffect(centerX, centerY);
        }, 500);

        // Event listeners
        window.addEventListener("resize", createParticles);
        backgroundRef.value.addEventListener("mousemove", handleMouseMove);
        backgroundRef.value.addEventListener("click", handleMouseMove);

        // Add periodic animations for more dynamic feel
        animationInterval.value = setInterval(() => {
            // Random particle boost
            const randomIndex = Math.floor(Math.random() * particles.value.length);
            if (particles.value[randomIndex]) {
                particles.value[randomIndex].speedX *= 2;
                particles.value[randomIndex].speedY *= 2;
            }
        }, 3000);
    }
});

onUnmounted(() => {
    window.removeEventListener("resize", createParticles);
    if (backgroundRef.value) {
        backgroundRef.value.removeEventListener("mousemove", handleMouseMove);
        backgroundRef.value.removeEventListener("click", handleMouseMove);
    }
    clearTimeout(mouseTimeout.value);
    clearInterval(animationInterval);
});
</script>

<template>
    <div ref="backgroundRef"
        class="relative flex flex-col items-center w-full gap-8 py-16 overflow-hidden bg-[#060918] text-muted-900">
        <!-- Background glow effect -->
        <div
            class="absolute inset-0 bg-gradient-radial from-accent_2-900/30 to-transparent opacity-70 animate-pulse-slow">
        </div>
        <!-- Additional background elements for more visual interest -->
        <div class="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
        <div class="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-indigo-500/10 to-transparent"></div>

        <!-- Title -->
        <div
            class="relative z-10 px-6 py-1.5 mt-16 font-bold border-2 text-accent_2-800 rounded-2xl bg-accent_2-300 max-w-fit text-4xl label border-accent_2-200">
            {{ t("skills.title") }}
        </div>

        <!-- Desktop Timeline -->
        <ul class="relative z-10 hidden my-12 text-muted-100 md:block timeline timeline-vertical">
            <TimelineItem v-for="(item, index) in timelineItems" :key="index" :technologies="item.technologies"
                :title="item.title" :skillLevel="item.skillLevel" :tags="item.tags"
                :side="index % 2 === 0 ? 'left' : 'right'" :description="item.description" />
        </ul>

        <!-- Mobile Timeline -->
        <ul class="my-12 -left-[40%] z-20 text-red-900 md:hidden timeline timeline-vertical">
            <MobileTimelineItem v-for="(item, index) in timelineItems" :key="index" :technologies="item.technologies"
                :title="item.title" :skillLevel="item.skillLevel" :tags="item.tags" :description="item.description" />
        </ul>
    </div>
</template>

<style scoped>
/* Particle animation fade-in effect */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

/* Add custom gradient - using standard Tailwind utilities */
.bg-gradient-radial {
    background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
}

/* Slow pulse animation for background */
@keyframes pulse-slow {

    0%,
    100% {
        opacity: 0.6;
    }

    50% {
        opacity: 0.9;
    }
}

.animate-pulse-slow {
    animation: pulse-slow 8s infinite ease-in-out;
}

/* Glow effect for particles */
.glow-effect {
    box-shadow: 0 0 10px currentColor;
    filter: brightness(1.5);
}

/* Star particle animation */
.star-particle {
    filter: drop-shadow(0 0 5px rgba(252, 211, 77, 0.8));
    will-change: transform;
    transition: transform 0.2s ease-out;
}

.star-particle:hover {
    transform: scale(1.5) rotate(45deg);
    filter: drop-shadow(0 0 8px rgba(252, 211, 77, 1));
}
</style>