<template>
  <div class="score">
    <div class="title">
      <p class="name">{{examData.source}}</p>
      <p class="description">(总分：100分,限时：100分钟)</p>
      <p class="description">学生：{{ userInfo.name }}</p>
    </div>
    <div class="total">
      <div class="look">
        本次考试成绩
      </div>
      <div class="show">
        <div class="img1" :class="{'img1Transform': imgShow}">
          <img src="@/assets/img/cry1.gif" alt="哭了" v-if="score < 60">
          <img src="@/assets/img/good2.gif" alt="过了" v-if="score >= 60">
        </div>
        <div class="number" :class="{'border': isTransition}">
          <span>{{score}}</span>
          <span>分数</span>
        </div>
        <div class="img2" :class="{'img2Transform': imgShow}">
          <img src="@/assets/img/cry2.jpg" alt="哭了" v-if="score < 60">
          <img src="@/assets/img/good1.jpg" alt="过了" v-if="score >= 60">
        </div>
      </div>
      <ul class="time">
        <li class="start"><span>开始时间</span> <span>{{startTime}}</span></li>
        <li class="end"><span>结束时间</span> <span>{{endTime}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import route from "@/router";
import axios from "axios";
import {useRouter} from "vue-router";
import {ElNotification} from "element-plus";

const isTransition = ref(false); // 是否渲染完成
const score = ref(0); // 总分
const imgShow = ref(false); // 不及格图片显示
const examData = ref({}); // 考试信息
const userInfo = ref({ name: null, id: null }); // 用户信息
const startTime = ref(null); // 考试开始时间
const endTime = ref(null); // 考试结束时间
const router=useRouter()
onMounted(() => {
    getCookies();
    getExamData();
    transiton();
    getScore();
    setTimeout(() => router.push({path: '/'}), 7000)
  ElNotification({
    title: '考试完毕！',
    type: 'info',
  })
});

const getExamData = () => {
    // console.log(route.query.examCode)
    // const examCode = route.query.examCode;
    const examCode = JSON.parse(sessionStorage.getItem("answerToScore")).examCode;
    console.log(examCode);
    axios(`http://localhost:8999/examManage/exam/${examCode}`).then((res) => {
        res.data.data.examDate = res.data.data.examDate.substr(0, 10);
        examData.value = { ...res.data.data }; // 获取考试详情
        console.log(examData.value);
    });
};

const getCookies = () => {
    userInfo.value.name = $cookies.get('cname');
    userInfo.value.id = $cookies.get('cid');
};

const transiton = () => {
    setTimeout(() => {
        isTransition.value = true;
        imgShow.value = true;
    }, 1000);
};

const getScore = () => {
    // const scoreValue = route.query.score;
    // const startTimeValue = route.query.startTime;
    // const endTimeValue = route.query.endTime;
    const scoreValue = JSON.parse(sessionStorage.getItem("answerToScore")).score;
    const startTimeValue = JSON.parse(sessionStorage.getItem("answerToScore")).startTime;
    const endTimeValue = JSON.parse(sessionStorage.getItem("answerToScore")).endTime;
    score.value = scoreValue;
    startTime.value = startTimeValue;
    endTime.value = endTimeValue;
};
</script>

<style scoped>
.show {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 160px;
    height: 160px;
  }
  .img1Transform {
    opacity: 1 !important;
    transform: translateX(30px) !important;
    transition: all 0.6s ease !important;
  }
  .img2Transform {
    opacity: 1 !important;
    transform: translateX(-30px) !important;
    transition: all 0.6s ease !important;
  }
  .img1 {
    margin-top: 70px;
    opacity: 0;
    transform: translateX(0px);
    transition: all 0.6s ease;
  }
  .img2 {
    margin-top: 30px;
    opacity: 0;
    transform: translateX(0px);
    transition: all 0.6s ease;
  }
}
.time {
  padding: 0px 70px;
  li {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    margin: 20px 0px;
  }
  li:nth-child(1) {
    background-color: #fcf8e3;
  }
  li:nth-child(2) {
    background-color: #e9f5e9;
  }
}
.border {
  border: 6px solid #36aafd !important;
  transition: all 2s ease;
  width: 160px !important;
  height: 160px !important;
  transform: rotate(360deg) !important;
  opacity: 1 !important;
}
.score {
  max-width: 800px;
  margin: 0 auto;
  .title {
    margin: 60px 0px 30px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .name {
      font-size: 26px;
      color: inherit;
      font-weight: 500;
    }
    .description {
      font-size: 14px;
      color: #888;
    }
  }
  .total {
    border: 1px solid #dbdbdb;
    background-color: #fff;
    padding: 40px;
    .look {
      border-bottom: 1px solid #dbdbdb;
      padding: 0px 0px 14px 14px;
      color: #36aafd;
    }
    .number {
      opacity: 0;
      border: 6px solid #fff;
      transform: rotate(0deg);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      width: 160px;
      height: 160px;
      border-radius: 50%;
      margin-top: 80px;
      margin-bottom: 20px;
      transition: all 1s ease;

      span:nth-child(1) {
        font-size: 36px;
        font-weight: 600;
      }
      span:nth-child(2) {
        font-size: 14px;
      }
    }
  }
}
</style>

