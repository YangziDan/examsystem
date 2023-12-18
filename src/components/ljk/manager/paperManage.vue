<template>
  <div>
    <el-table :data="filterTableData" height="70vh" style="width: 100%;margin: 1vw 0 0 0">
      <el-table-column prop="id" label="试卷ID" width="180"/>
      <el-table-column prop="name" label="试卷名字" width="180"/>
      <el-table-column prop="description" label="试卷描述" width="180"/>
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
  <div>
    <el-row :gutter="30">
      <el-col :span="3">试卷名字<el-input></el-input></el-col>
      <el-col :span="7">试卷描述<el-input></el-input></el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import {useRouter} from "vue-router";
import axios from "axios";
const search = ref('')
const router = useRouter()
let tableData = ref([])
axios.get('http://localhost:8999/examManage/exams').then(res => {
  let data = res.data.data
  let l = data.length
  for (let i = 0; i < l; i++) {
    let temp = Object()
    temp.id = data[i].paperId
    temp.name = data[i].source
    temp.description = data[i].description
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
  let id=row.id
  router.push({path: '/manage/questionManage'+'/'+id})
  // console.log(index, row)

}
const handleDelete = (index: number, row) => {
  // console.log(index, row)
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

</style>
