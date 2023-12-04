import { createRouter, createWebHistory } from 'vue-router'
import StudentScore from "@/views/StudentScore.vue";
import WrongQuestionBook from "@/views/WrongQuestionBook.vue";
import HomeView from "../views/HomeView.vue"
import IndividualView from "@/views/Zjh/IndividualView.vue";
import EditView from "@/views/Zjh/EditView.vue";
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
    },
    {
      path:'/studentScore',
      name:"studentScore",
      component:StudentScore
    },
    {
      path:'/wrongQuestionBook',
      name:"wrongQuestionBook",
      component:WrongQuestionBook
    }
  ]
})

export default router
