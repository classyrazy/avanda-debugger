// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
    css: ["~/assets/css/main.css", 'vue-json-pretty/lib/styles.css'],
    plugins: [
        '@/plugins/vueJsonPretty'
    ],
    piniaPersistedstate: {
        cookieOptions: {
            sameSite: 'strict',
        },
        storage: 'cookies'
    },
    app: {
        head: {
            title: 'Avanda Debugger - A debugger for the Avanda framework',
            htmlAttrs: { lang: 'en' },
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'title',
                    content: 'Avanda Debugger - A debugger for the Avanda framework'
                },
            ]
        }
    }

})
