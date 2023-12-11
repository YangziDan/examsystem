<script setup>

import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";
import {ElMessage} from "element-plus";
import qs from "qs";
import cookies from "vue-cookies";

const router=useRouter()

const question=ref({});
let choose=ref();
const type=ref();
let answer=ref("");
let isShowResult=ref(false);

const ok = () => {
  ElMessage({
    message: '回答正确!',
    type: 'success',
  })
}

const err = () => {
  ElMessage({
    message: '回答错误!',
    type: 'error',
  })
}


onMounted(()=>{
  let questionId=router.currentRoute.value.query.questionId
  type.value=router.currentRoute.value.query.type
  getQuestion(questionId)
})

async function getQuestion(questionId) {
  const response = await axios.get("http://localhost:8999/judgeQuestion/getJudgeQuestion",{params:{questionId}})
  question.value=response.data
}

function handleClick(){
  isShowResult.value=true;
  if (choose.value==question.value.answer){
    ok();
    setStatus();
  }else{
    err();
  }
}

async function setStatus() {
  const requestData={
    type:type.value,
    questionId:question.value.questionId,
    studentId:cookies.get("cid"),
    status:1
  }

  await axios.post("http://localhost:8999/wrongQuestion/setStatus",qs.stringify(requestData), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res=>{
    console.log(res)
  }).catch(err=>{
    console.log(err);
  })
}
</script>

<template>
  <el-card class="box-card">
    <div class="quesion-view">
      <div class="description">
        <div style="margin-bottom: 10px">选择题:</div>
        <div>{{question.question}}</div>
      </div>

      <div class="answer">
        <el-radio-group v-model="choose">
          <el-radio label="T">正确</el-radio>
          <el-radio label="F">错误</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="result" v-show="isShowResult">
      正确答案:{{question.answer}}
    </div>
    <div class="button">
      <el-button type="success" @click="handleClick">确认</el-button>
    </div>
  </el-card>
</template>

<style scoped>
.box-card{
  width: 70%;
  margin: 10px auto;
}
.box-card .quesion-view .description{
  padding: 10px;
}
.box-card .quesion-view .answer{
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  display: flex;
  margin-right: 5px;
  width: 50%;
}

.box-card .quesion-view .answer .input{

  width: 200px;
}

.box-card  .button{
  float: right;
  padding: 10px;
}

.box-card .result{
  margin-left: 50px;
}
</style>