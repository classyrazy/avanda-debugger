import { defineNuxtPlugin } from "#app";
import vueModallyV3 from "vue-modally-v3";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(vueModallyV3, {});
});