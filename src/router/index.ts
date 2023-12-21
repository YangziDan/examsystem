import { createRouter, createWebHistory } from 'vue-router'
import StudentScore from "@/views/hjd/StudentScore.vue";
import WrongQuestionBook from "@/views/hjd/WrongQuestionBook.vue";
import LoginView from "../views/LoginView.vue"
import IndividualView from "@/views/Zjh/IndividualView.vue";
import EditView from "@/views/Zjh/EditView.vue";
import index from "@/components/ljk/headerView.vue"
import home from "@/views/HomeView.vue"
import WrongQuestionView from "@/views/hjd/WrongQuestionView.vue";
import FillQuestionView from "@/components/hjd/FillQuestionView.vue";
import JudgeQuestionView from "@/components/hjd/JudgeQuestionView.vue";
import MultiQuestionView from "@/components/hjd/MultiQuestionView.vue";
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
      component: () => import("../views/zzw/MyExam.vue")
    },
    {
      path:'/examMsg',
      name: "examMsg",
      component: () => import("../views/zzw/ExamMsg.vue")
    },
    {
      path: '/studentScore',
      name: "studentScore",
      component: () => import("../views/zzw/AnswerScore.vue")
    },
    {
      path:'/answer',
      name: 'answer',
      component: () => import("../views/zzw/Answer.vue")
    },
    {
      path:'/wrongQuestionView',
      name:"wrongQuestionView",
      component:WrongQuestionView,
      children:[
        {
          path:"fillQuestionView",
          name:"fillQuestionVIew",
          component:FillQuestionView
        },
        {
          path:"judgeQuestionView",
          name:"judgeQuestionView",
          component:JudgeQuestionView
        },
        {
          path:"multiQuestionView",
          name:"multiQuestionView",
          component:MultiQuestionView
        }
      ]
    }
  ]
})

export default router
