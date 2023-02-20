import { defineNuxtPlugin } from "#app";
import VueJsonPretty from 'vue-json-pretty'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueJsonPretty, {});
});