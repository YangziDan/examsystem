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
import ScoreAnalysis from "@/views/hjd/ScoreAnalysis.vue";
import TestView from "@/views/testView.vue"
import manageView from "@/views/ljk/manageView.vue"
import questionManage from "@/components/ljk/manager/questionManage.vue"
import paperManage from "@/components/ljk/manager/paperManage.vue"
import examData from "@/components/ljk/manager/examData.vue"
import multiQuestion from "@/components/ljk/manager/comp/multiQuestion.vue"
import commonQuestion from "@/components/ljk/manager/comp/commonQuestion.vue"
import ManageIndividualView from "@/views/Zjh/ManageIndividualView.vue";
import ManageEditView from "@/views/Zjh/ManageEditView.vue";
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
      path: '/scoreTable',
      name: 'scoreTable',
      component: () => import("../views/zzw/scoreTable.vue")
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
          children:[
            {
              path:"multiQuestion",
              name:"multiQuestion",
              component:multiQuestion,
            },
            {
              path:"commonQuestion",
              name:"commonQuestion",
              component:commonQuestion,
            }
          ]
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
        },
        {
          path: "manageIndividual",
          name: "manageIndividual",
          component: ManageIndividualView
        },
        {
          path:"manageEdit",
          name:"manageEdit",
          component: ManageEditView
        }

      ]
    }

  ]
})

export default router
