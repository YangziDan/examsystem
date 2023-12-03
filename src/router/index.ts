import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"
import IndividualView from "@/views/Individual/IndividualView.vue";
import EditView from "@/views/Individual/EditView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/individual',
      name: 'individual',
      component:IndividualView
    },
    {
      path:'/edit',
      name:'edit',
      component:EditView
    }
  ]
})

export default router
