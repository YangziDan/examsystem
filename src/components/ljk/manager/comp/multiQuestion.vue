<template>
  <el-table :data="filterTableData" height="58vh" style="width: 100%;margin-top: 2vh">
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
  <div style="margin: 2vh 0 0 0 ;height: 8vh;width: 70vw;">
    <el-row :gutter="10">
      <el-col :span="2">问题Id
        <el-input v-model="questionId"></el-input>
      </el-col>
      <el-col :span="5">问题描述
        <el-input v-model="questionDescription"></el-input>
      </el-col>
      <el-col :span="3">答案A
        <el-input v-model="answerA"></el-input>
      </el-col>
      <el-col :span="3">答案B
        <el-input v-model="answerB"></el-input>
      </el-col>
      <el-col :span="3">答案C
        <el-input v-model="answerC"></el-input>
      </el-col>
      <el-col :span="3">答案D
        <el-input v-model="answerD"></el-input>
      </el-col>
      <el-col :span="3" style="position: relative">
        正确选项
        <el-select v-model="rightAnswer" size="default" >
          <el-option label="A" value="A" />
          <el-option label="B " value="B" />
          <el-option label="C " value="C" />
          <el-option label="D " value="D" />
        </el-select>
<!--        <el-dropdown class="dropdown">-->
<!--    <span class="el-dropdown-link">-->
<!--      正确选项-->
<!--      <el-icon size="1.3vw">-->
<!--        <arrow-up />-->
<!--      </el-icon>-->
<!--    </span>-->
<!--          <template #dropdown>-->
<!--            <el-dropdown-menu>-->
<!--              <el-dropdown-item>A</el-dropdown-item>-->
<!--              <el-dropdown-item>B</el-dropdown-item>-->
<!--              <el-dropdown-item>C</el-dropdown-item>-->
<!--              <el-dropdown-item>D</el-dropdown-item>-->
<!--            </el-dropdown-menu>-->
<!--          </template>-->
<!--        </el-dropdown>-->
      </el-col>
      <el-col :span="2">
        <el-button class="comCol" style="margin-top: 2.8vh" type="success" @click="addQuestion()">新增问题</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import axios from "axios";
import {computed, ref} from "vue";
import {ArrowUp, ArrowUpBold} from "@element-plus/icons-vue";

const route = useRoute()
let id=route.params.id
const search = ref('')
let questions=ref([])

let questionId=ref(123)
let questionSubject = ref('癫痫病基础')
let questionDescription = ref('描述')
let answerA=ref('选项')
let answerB=ref('选项')
let answerC=ref('选项')
let answerD=ref('选项')
let rightAnswer=ref('A')
function addQuestion(){
  axios.post('http://localhost:8999/multiQuestion/addMultiQuestion',{
    'questionId':questionId.value,
    'question':questionDescription.value,
    'subject':questionSubject.value,
    'answerA':answerA.value,
    'answerB':answerB.value,
    'answerC':answerC.value,
    'answerD':answerD.value,
    'rightAnswer':rightAnswer.value,
  }).then(res=>{
    let data = res.data
    console.log('addPaper post response is '+res.data)
    axios.post('http://localhost:8999/paperManage/paperManage',{
      'questionId':questionId.value,
      'paperId':id,
      'questionType':1
    }).then(res2=>{

    })

  })

}
axios.get('http://localhost:8999/paperManage/paper/'+id).then(res => {
  let data = res.data
  let temp=Object()
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
  axios.post('http://localhost:8999/multiQuestion/delMultiQuestion',{
    'questionId':row.id
  }).then(res=>{
    axios.post('http://localhost:8999/paperManage/del',{
      'questionType':1,
      'paperId':id,
      'questionId':row.id
    })
  })
}
</script>

<style scoped>
.el-dropdown-link {
  /*cursor: pointer;*/
  color: deepskyblue;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dropdown{

}
</style>
