<template>
  <el-table :data="filterTableData" height="62vh" style="width: 100%;margin-top: 2vh">
    <el-table-column prop="id" label="问题ID" width="70"/>
    <el-table-column prop="subject" label="问题主题" width="100"/>
    <el-table-column prop="question" label="问题描述" width="200"/>
    <el-table-column prop="answerA" label="选项A" width="130"/>
    <el-table-column prop="answerB" label="选项B" width="130"/>
    <el-table-column prop="answerC" label="选项C" width="130"/>
    <el-table-column prop="answerD" label="选项D" width="130"/>
    <el-table-column prop="rightAnswer" label="答案" width="60"/>

    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search"/>
      </template>
      <template #default="scope">
        <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
        >Delete
        </el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <div style="margin: 1vw 0 0 0 ">
    <el-row :gutter="30">
      <el-col :span="3">问题Id
        <el-input v-model="questionId"></el-input>
      </el-col>
      <el-col :span="5">问题类型
        <el-input v-model="questionType"></el-input>
      </el-col>
      <el-col :span="5">问题主题
        <el-input v-model="questionSubject"></el-input>
      </el-col>
      <el-col :span="8">问题描述
        <el-input v-model="questionDescription"></el-input>
      </el-col>
      <el-col :span="3">
        <el-button class="comCol" style="margin-top: 2.8vh" type="success" @click="addQuestion()">新增问题</el-button>
      </el-col>

    </el-row>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import axios from "axios";
import {computed, ref} from "vue";

const route = useRoute()
let id=route.params.id
const search = ref('')
let questions=ref([])

let questionId=ref(123)
let questionType = ref('选择题')
let questionSubject = ref('主题')
let questionDescription = ref('描述')
let questionChoice = ref('选择')
function addQuestion(){
  axios.post('http://localhost:8999/examManage/exam',{
    'paperId':paperId.value,
    'source':paperName.value,
    'description':paperDescription.value,
    'totalTime':paperTotalTime.value
  }).then(res=>{
    console.log('addPaper post response is '+res.data)
  })
}
axios.get('http://localhost:8999/paperManage/paper/'+id).then(res => {
  let data = res.data
  let temp=Object()
  console.log(data)
  let cur=data[1]
  for (let i = 0; i < cur.length; i++) {
    let temp=Object()
    temp.type='选择题'
    temp.id=cur[i].questionId
    temp.subject=cur[i].subject
    temp.question=cur[i].question
    temp.answerA=cur[i].answerA
    temp.answerB=cur[i].answerB
    temp.answerC=cur[i].answerC
    temp.answerD=cur[i].answerD
    temp.rightAnswer=cur[i].rightAnswer
    questions.value.push(temp)
  }
})
const filterTableData = computed(() =>
    questions.value.filter(
        (questions) =>
            !search.value ||
            questions.question.toLowerCase().includes(search.value.toLowerCase())
    )
)
function handleDelete(index, row){
  row.id
}
</script>

<style scoped>

</style>
