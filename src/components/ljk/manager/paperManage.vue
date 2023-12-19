<template>
  <div style="width: 71vw;margin: 2vw 0 0 0;height: 70vh" class="wrapper">
    <div>
      <el-table :data="filterTableData" height="65vh" style="width: 100%;">
        <el-table-column prop="id" label="试卷ID" width="120"/>
        <el-table-column prop="name" label="试卷名字" width="150"/>
        <el-table-column prop="description" label="试卷描述" width="480"/>
        <el-table-column prop="totalTime" label="试卷限时/min" width="180"/>
        <el-table-column align="right" width="300">
          <template #header>
            <el-input v-model="search" size="small" placeholder="Type to search"/>
          </template>
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >Edit
            </el-button>
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
    <div style="margin: 1vw 0 0 0 ">
      <el-row :gutter="30">
        <el-col :span="3">试卷Id
          <el-input v-model="paperId"></el-input>
        </el-col>
        <el-col :span="5">试卷名称
          <el-input v-model="paperName"></el-input>
        </el-col>
        <el-col :span="10">试卷描述
          <el-input v-model="paperDescription"></el-input>
        </el-col>
        <el-col :span="3">试卷限时
          <el-input v-model="paperTotalTime"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button class="comCol" style="margin-top: 2.8vh" type="success" @click="addPaper()">新增试卷</el-button>
        </el-col>

      </el-row>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import {useRouter} from "vue-router";
import axios from "axios";

let paperId=ref(123)
let paperName = ref('名称')
let paperDescription = ref('描述')
let paperTotalTime = ref(2023)

const search = ref('')
const router = useRouter()
let tableData = ref([])
function addPaper(){
  axios.post('http://localhost:8999/examManage/exam',{
    'paperId':paperId.value,
    'source':paperName.value,
    'description':paperDescription.value,
    'totalTime':paperTotalTime.value
  }).then(res=>{
  })
}
axios.get('http://localhost:8999/examManage/exams').then(res => {
  let data = res.data.data
  let l = data.length
  for (let i = 0; i < l; i++) {
    let temp = Object()
    temp.id = data[i].paperId
    temp.name = data[i].source
    temp.description = data[i].description
    temp.totalTime = data[i].totalTime
    tableData.value.push(temp)
  }
})
const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
const handleEdit = (index: number, row) => {
  let id = row.id
  router.push({path: '/manage/questionManage' + '/' + id+'/commonQuestion'})

}
const handleDelete = (index: number, row) => {
  axios.delete('http://localhost:8999/examManage/exam/paper/'+row.id)
}

// let tableData : paper[] = [
//   {
//     id: '2016-05-03',
//     name: 'Tom',
//     description: 'No. 189, Grove St, Los Angeles',
//   },
//   {
//     id: '2016-05-03',
//     name: 'tt',
//     description: 'No. 189, Grove St, Los Angeles',
//   },{
//     id: '2016-05-03',
//     name: 'test',
//     description: 'No. 189, Grove St, Los Angeles',
//   }
//
// ]
</script>
<style scoped>
.wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.comCol {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
