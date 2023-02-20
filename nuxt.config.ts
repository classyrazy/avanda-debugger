// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
    css: ["~/assets/css/main.css", 'vue-json-pretty/lib/styles.css'],
    plugins: [
        '@/plugins/vueJsonPretty'
    ]
})
