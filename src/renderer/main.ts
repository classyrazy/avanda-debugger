import { createApp } from 'vue'
import "./assets/css/main.css"
import App from './App.vue'
import vClickOutside from "click-outside-vue3"
import router from './router'

const app = createApp(App);

app.use(router).use(vClickOutside).mount('#app');
