import { createI18n } from "vue-i18n";
import en from "../../lang/en.json";
// import other language files here
import bg from "../../lang/bg.json"; // example for French

const i18n = createI18n({
    locale: "en", // set locale
    fallbackLocale: "en", // set fallback locale
    messages: {
        en: en,
        bg: bg, // add other languages here
    }, // set locale messages
    // If you need to support other Locales, you can set other locale messages here
});

export default i18n;
