import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.vue",
    ],
    daisyui: {
        themes: ["light"],
    },
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#e0f2e9",
                    100: "#1b412e",
                    200: "#37835d",
                    300: "#5cbb8b",
                    400: "#9dd6ba",
                    500: "#e0f2e9",
                    600: "#e5f4ed",
                    700: "#ecf7f1",
                    800: "#f2faf6",
                    900: "#f9fcfa",
                },
                secondary: {
                    DEFAULT: "#393d3f",
                    100: "#0c0c0d",
                    200: "#17191a",
                    300: "#232527",
                    400: "#2f3233",
                    500: "#393d3f",
                    600: "#5f6669",
                    700: "#858d91",
                    800: "#aeb3b5",
                    900: "#d6d9da",
                },
                accent: {
                    DEFAULT: "#e63946",
                    100: "#33060a",
                    200: "#660d14",
                    300: "#99131e",
                    400: "#cb1928",
                    500: "#e63946",
                    600: "#eb5f6b",
                    700: "#f08790",
                    800: "#f5afb5",
                    900: "#fad7da",
                },
                accent_2: {
                    DEFAULT: "#9d8df1",
                    100: "#120844",
                    200: "#251188",
                    300: "#3719cc",
                    400: "#6449e9",
                    500: "#9d8df1",
                    600: "#b1a4f4",
                    700: "#c5bbf7",
                    800: "#d8d2f9",
                    900: "#ece8fc",
                },
                muted: {
                    DEFAULT: "#9590a8",
                    100: "#1d1b23",
                    200: "#3a3746",
                    300: "#575269",
                    400: "#746e8b",
                    500: "#9590a8",
                    600: "#aaa6b9",
                    700: "#bfbcca",
                    800: "#d5d2dc",
                    900: "#eae9ed",
                },
            },
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms, typography, daisyui],
};
