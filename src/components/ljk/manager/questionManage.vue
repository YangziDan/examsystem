<template>
  <div>
    <el-table :data="filterTableData" height="70vh" style="width: 100%;margin: 1vw 0 0 0">
      <el-table-column prop="id" label="问题ID" width="180"/>
      <el-table-column prop="type" label="问题类型" width="180"/>
      <el-table-column prop="subject" label="问题主题" width="180"/>
      <el-table-column prop="question" label="问题描述" width="180"/>
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search"/>
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit
          </el-button
          >
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
    questions.value.push(temp)
  }
  cur=data[2]
  for (let i = 0; i < cur.length; i++) {
    let temp=Object()
    temp.type='填空题'
    temp.id=cur[i].questionId
    temp.subject=cur[i].subject
    temp.question=cur[i].question
    questions.value.push(temp)
  }
  cur=data[3]
  for (let i = 0; i < cur.length; i++) {
    let temp=Object()
    temp.type='判断题'
    temp.id=cur[i].questionId
    temp.subject=cur[i].subject
    temp.question=cur[i].question
    questions.value.push(temp)
  }
  console.log("questions is "+questions.value)
})
const filterTableData = computed(() =>
    questions.value.filter(
        (questions) =>
            !search.value ||
            questions.question.toLowerCase().includes(search.value.toLowerCase())
    )
)
</script>

<style scoped>

</style>
