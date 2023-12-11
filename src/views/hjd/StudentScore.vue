
<script setup>
import {ref, onMounted, computed} from 'vue';
import HeaderView from "@/components/ljk/headerView.vue";
import axios from "axios";
import cookies from "vue-cookies";
const pagination = ref({
  current: 1,
  total: null,
  size: 1,
});

const loading = ref(false);

// const filter = ref(null);
const scoreList=ref([]);
let pagedScoreList=computed(()=>{
  const startIndex = (pagination.value.current - 1) * pagination.value.size;
  const endIndex = startIndex + pagination.value.size;
  let list=scoreList.value.slice(startIndex, endIndex);
  // console.log(list)
  return list
})

onMounted(() => {
  getScore();
  loading.value = true;
});

const getScore = async () => {
  const studentId = cookies.get("cid")

  await axios.get("http://localhost:8999/score/getScore", {params: {studentId}}).then(res=>{
    // console.log(res)
    scoreList.value=res.data;
    pagination.value.total=res.data.length

  }).catch(err=>{
    console.log(err);

  }).finally(()=>{
    loading.value=false;
  })


};

const handleSizeChange = (val) => {
  pagination.value.size = val;
  getScore();
};

const handleCurrentChange = (val) => {
  pagination.value.current = val;
  getScore();
};

const formatter = (row, column) => {
  return row.address;
};

const filterTag = (value, row) => {
  return row.tag === value;
};

const filterHandler = (value, row, column) => {
  const property = column.property;
  return row[property] === value;
};
</script>

<template>
  <header-view></header-view>
  <div class="table">
    <p class="title">我的分数</p>
    <section class="content-el">
      <el-table ref="filterTable" :data="pagedScoreList" v-loading="loading">
        <el-table-column
            prop="answerDate"
            label="考试日期"
            sortable
            width="300"
            column-key="answerDate"
            >
        </el-table-column>
        <el-table-column
            prop="subject"
            label="课程名称"
            width="300"
            filter-placement="bottom-end">
          <template v-slot:default="scope">
            <el-tag>{{scope.row.subject}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="etScore" label="考试分数" width="200"></el-table-column>
        <el-table-column label="是否及格" width="100">
          <template v-slot:default="scope">
            <el-tag :type="scope.row.etScore>= 60 ? 'success' : 'danger'">{{scope.row.etScore >= 60 ? "及格" : "不及格"}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" align="middle" class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.current"
            :page-sizes="[1,4,6,8,10]"
            :page-size="pagination.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
        </el-pagination>

      </el-row>
    </section>
  </div>
</template>



<style  scoped>
.pagination {
  padding-top: 20px;
}

.table {
  width: 980px;
  margin: 0 auto;
  border: 1px solid #ddd; /* Add border style here */
  border-radius: 5px; /* Optional: Add border-radius for rounded corners */
}

.table .title {
  margin: 20px;
}

.table .content-el {
  background-color: #fff;
  padding: 20px;
}


</style>
