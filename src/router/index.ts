import { createRouter, createWebHistory } from 'vue-router'
import StudentScore from "@/views/StudentScore.vue";
import WrongQuestionBook from "@/views/WrongQuestionBook.vue";
import LoginView from "../views/LoginView.vue"
import IndividualView from "@/views/Zjh/IndividualView.vue";
import EditView from "@/views/Zjh/EditView.vue";
import MyExam from  "@/views/MyExam.vue"
import ExamMsg from "@/views/ExamMsg.vue"
import index from "@/views/headerView.vue"
import home from "@/views/HomeView.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/index',
      name: 'index',
      component: index
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
    },
    {
      path:'/myExam',
      name: "myExam",
      component: MyExam
    },
    {
      path:'/examMsg',
      name: "examMsg",
      component: ExamMsg
    },
  ]
})

export default router
