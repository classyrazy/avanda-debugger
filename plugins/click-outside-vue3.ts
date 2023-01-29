import { defineNuxtPlugin } from "#app";
import vClickOutside from "click-outside-vue3"

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(vClickOutside, {});
});