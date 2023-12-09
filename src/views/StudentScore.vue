<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      pagination: { //分页后的留言列表-->
<!--        current: 1, //当前页-->
<!--        total: null, //记录条数-->
<!--        size: 10 //每页条数-->
<!--      },-->
<!--      loading: false, //加载标识符-->
<!--      score: [], //学生成绩-->
<!--      filter: null //过滤参数-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    this.getScore()-->
<!--    this.loading = true //数据加载则遮罩表格-->
<!--  },-->
<!--  methods: {-->
<!--    getScore() {-->
<!--      let studentId = this.$cookies.get("cid")-->
<!--      this.$axios(`/api/score/${this.pagination.current}/${this.pagination.size}/${studentId}`).then(res => {-->
<!--        if(res.data.code == 200) {-->
<!--          this.loading = false //数据加载完成去掉遮罩-->
<!--          this.score = res.data.data.records-->
<!--          this.pagination = {...res.data.data}-->
<!--          let mapVal = this.score.map((element,index) => { //通过map得到 filter:[{text,value}]形式的数组对象-->
<!--            let newVal = {}-->
<!--            newVal.text = element.answerDate-->
<!--            newVal.value = element.answerDate-->
<!--            return newVal-->
<!--          })-->
<!--          let hash = []-->
<!--          const newArr = mapVal.reduce((item, next) => { //对新对象进行去重操作-->
<!--            hash[next.text] ? '' : hash[next.text] = true && item.push(next);-->
<!--            return item-->
<!--          }, []);-->
<!--          this.filter = newArr-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    //改变当前记录条数-->
<!--    handleSizeChange(val) {-->
<!--      this.pagination.size = val-->
<!--      this.getScore()-->
<!--    },-->
<!--    //改变当前页码，重新发送请求-->
<!--    handleCurrentChange(val) {-->
<!--      this.pagination.current = val-->
<!--      this.getScore()-->
<!--    },-->
<!--    formatter(row, column) {-->
<!--      return row.address;-->
<!--    },-->
<!--    filterTag(value, row) {-->
<!--      return row.tag === value;-->
<!--    },-->
<!--    filterHandler(value, row, column) {-->
<!--      const property = column["property"];-->
<!--      return row[property] === value;-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->
<script setup>
import { ref, onMounted } from 'vue';
import HeaderView from "@/views/headerView.vue";
const pagination = ref({
  current: 1,
  total: null,
  size: 10,
});

const loading = ref(false);
const score = ref([]);
const filter = ref(null);

onMounted(() => {
  // getScore();
  // loading.value = true;
});

const getScore = () => {
  const studentId = this.$cookies.get("cid");

  this.$axios(`/api/score/${pagination.value.current}/${pagination.value.size}/${studentId}`).then(res => {
    if (res.data.code === 200) {
      loading.value = false;
      score.value = res.data.data.records;
      pagination.value = { ...res.data.data };

      const mapVal = score.value.map((element, index) => {
        const newVal = {};
        newVal.text = element.answerDate;
        newVal.value = element.answerDate;
        return newVal;
      });

      const hash = [];
      const newArr = mapVal.reduce((item, next) => {
        hash[next.text] ? '' : (hash[next.text] = true && item.push(next));
        return item;
      }, []);

      filter.value = newArr;
    }
  });
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
      <el-table ref="filterTable" :data="score" v-loading="loading">
        <el-table-column
            prop="answerDate"
            label="考试日期"
            sortable
            width="300"
            column-key="answerDate"
            :filters="filter"
            :filter-method="filterHandler">
        </el-table-column>
        <el-table-column
            prop="subject"
            label="课程名称"
            width="300"
            filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag>{{scope.row.subject}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="etScore" label="考试分数" width="200"></el-table-column>
        <el-table-column label="是否及格" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.etScore>= 60 ? 'success' : 'danger'">{{scope.row.etScore >= 60 ? "及格" : "不及格"}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" align="middle" class="pagination">
<!--        <el-pagination-->
<!--            @size-change="handleSizeChange"-->
<!--            @current-change="handleCurrentChange"-->
<!--            :current-page="pagination.current"-->
<!--            :page-sizes="[4,6,8,10]"-->
<!--            :page-size="pagination.size"-->
<!--            layout="total, sizes, prev, pager, next, jumper"-->
<!--            :total="pagination.total">-->
<!--        </el-pagination>-->
        <el-pagination
            v-model:current-page="currentPage4"
            v-model:page-size="pageSize4"
            :page-sizes="[4,6,8,10]"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
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
