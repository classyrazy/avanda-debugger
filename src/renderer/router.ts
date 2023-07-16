import { createRouter, createWebHistory } from 'vue-router'
import Index from "./views/Index.vue"
export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Index,
    },
  ],
})
