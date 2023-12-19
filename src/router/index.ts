import { createRouter, createWebHistory } from 'vue-router'
import StudentScore from "@/views/hjd/StudentScore.vue";
import WrongQuestionBook from "@/views/hjd/WrongQuestionBook.vue";
import LoginView from "../views/LoginView.vue"
import IndividualView from "@/views/Zjh/IndividualView.vue";
import EditView from "@/views/Zjh/EditView.vue";
import index from "@/components/ljk/headerView.vue"
import home from "@/views/HomeView.vue"
import WrongQuestionView from "@/views/hjd/WrongQuestionView.vue";
import FillQuestionView from "@/components/ljk/manager/FillQuestionView.vue";
import JudgeQuestionView from "@/components/ljk/manager/JudgeQuestionView.vue";
import MultiQuestionView from "@/components/ljk/manager/MultiQuestionView.vue";
import ScoreAnalysis from "@/views/hjd/ScoreAnalysis.vue";
import TestView from "@/views/testView.vue"
import manageView from "@/views/ljk/manageView.vue"
import questionManage from "@/components/ljk/manager/questionManage.vue"
import paperManage from "@/components/ljk/manager/paperManage.vue"
import examData from "@/components/ljk/manager/examData.vue"
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
    },
    {
      path:"/scoreAnalysis",
      name:"scoreAnalysis",
      component:ScoreAnalysis
    },
    {
      path:'/test',
      name:"test",
      component:TestView,
    },{
      path:'/manage',
      name:"manage",
      component:manageView,
      children:[
        {
          path:"questionManage/:id",
          name:"questionManage",
          component:questionManage,
        },
        {
          path:"paperManage",
          name:"paperManage",
          component:paperManage
        },
        {
          path:"examData",
          name:"examData",
          component:examData
        }
      ]
    }
  ]
})

export default router
