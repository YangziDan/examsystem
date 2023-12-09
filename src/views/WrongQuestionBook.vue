// 我的考试页面
<script setup>
import { ref } from 'vue';
import HeaderView from "@/components/ljk/headerView.vue";
const loading = ref(false);
const key = ref(null); // 搜索关键字
const allExam = ref(null); // 所有考试信息
const pagination = ref({ // 分页后的考试信息
  current: 1, // 当前页
  total: null, // 记录条数
  size: 6 // 每页条数
});

const getExamInfo = async () => {
  loading.value = true;
  try {
    const res = await this.$axios(`/api/exams/${pagination.value.current}/${pagination.value.size}`);
    pagination.value = res.data.data;
    loading.value = false;
    console.log(pagination.value);
  } catch (error) {
    console.log(error);
  }
};

const handleSizeChange = (val) => {
  pagination.value.size = val;
  getExamInfo();
};

const handleCurrentChange = (val) => {
  pagination.value.current = val;
  getExamInfo();
};

const search = async () => {
  try {
    const res = await this.$axios('/api/exams');
    if (res.data.code === 200) {
      const newPage = res.data.data.filter(item => item.source.includes(key.value));
      pagination.value.records = newPage;
    }
  } catch (error) {
    console.log(error);
  }
};

const toExamMsg = (examCode) => {
  this.$router.push({ path: '/examMsg', query: { examCode: examCode } });
  console.log(examCode);
};
</script>

<template>
  <header-view></header-view>
  <div id="myExam">
    <div class="title">我的错题</div>
    <div class="wrapper">
      <ul class="top">
        <li class="order">
          <el-badge :value="12" class="item" type="primary">
            <span>全部</span>
          </el-badge>
        </li>
        <li class="order">
          <el-badge :value="1" class="item" type="primary">
            <span>已重做</span>
          </el-badge>
        </li>
        <li class="order">
          <el-badge :value="2" class="item" >
            <span>未重做</span>
          </el-badge>
        </li>
<!--        <li class="order">-->
<!--          <el-badge :value="1" class="item">-->
<!--            <span>已过期</span>-->
<!--          </el-badge>-->
<!--        </li>-->
        <li class="search-li"><div class="icon"><input type="text" placeholder="试卷名称" class="search" v-model="key"><i class="el-icon-search"></i></div></li>
        <li><el-button type="primary" @click="search()">搜索试卷</el-button></li>
      </ul>
      <ul class="paper" v-loading="loading">
        <li class="item" v-for="(item,index) in pagination.records" :key="index">
          <h4 @click="toExamMsg(item.examCode)">{{item.source}}</h4>
          <p class="name">{{item.source}}-{{item.description}}</p>
          <div class="info">
            <i class="el-icon-loading"></i><span>{{item.examDate.substr(0,10)}}</span>
            <i class="iconfont icon-icon-time"></i><span v-if="item.totalTime != null">限时{{item.totalTime}}分钟</span>
            <i class="iconfont icon-fenshu"></i><span>满分{{item.totalScore}}分</span>
          </div>
        </li>
      </ul>
      <div class="pagination">
<!--        <el-pagination-->
<!--            @size-change="handleSizeChange"-->
<!--            @current-change="handleCurrentChange"-->
<!--            :current-page="pagination.current"-->
<!--            :page-sizes="[6, 10, 20, 40]"-->
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

      </div>
    </div>
  </div>
</template>

<!--region Description-->
<!--<script>-->
<!--export default {-->
<!--  // name: 'myExam'-->
<!--  data() {-->
<!--    return {-->
<!--      loading: false,-->
<!--      key: null, //搜索关键字-->
<!--      allExam: null, //所有考试信息-->
<!--      pagination: { //分页后的考试信息-->
<!--        current: 1, //当前页-->
<!--        total: null, //记录条数-->
<!--        size: 6 //每页条数-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    this.getExamInfo()-->
<!--    this.loading = true-->
<!--  },-->
<!--  // watch: {-->

<!--  // },-->
<!--  methods: {-->
<!--    //获取当前所有考试信息-->
<!--    getExamInfo() {-->
<!--      this.$axios(`/api/exams/${this.pagination.current}/${this.pagination.size}`).then(res => {-->
<!--        this.pagination = res.data.data-->
<!--        this.loading = false-->
<!--        console.log(this.pagination)-->
<!--      }).catch(error => {-->
<!--        console.log(error)-->
<!--      })-->
<!--    },-->
<!--    //改变当前记录条数-->
<!--    handleSizeChange(val) {-->
<!--      this.pagination.size = val-->
<!--      this.getExamInfo()-->
<!--    },-->
<!--    //改变当前页码，重新发送请求-->
<!--    handleCurrentChange(val) {-->
<!--      this.pagination.current = val-->
<!--      this.getExamInfo()-->
<!--    },-->
<!--    //搜索试卷-->
<!--    search() {-->
<!--      this.$axios('/api/exams').then(res => {-->
<!--        if(res.data.code == 200) {-->
<!--          let allExam = res.data.data-->
<!--          let newPage = allExam.filter(item => {-->
<!--            return item.source.includes(this.key)-->
<!--          })-->
<!--          this.pagination.records = newPage-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    //跳转到试卷详情页-->
<!--    toExamMsg(examCode) {-->
<!--      this.$router.push({path: '/examMsg', query: {examCode: examCode}})-->
<!--      console.log(examCode)-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--endregion-->


<style scoped>
.pagination {
  padding: 20px 0px 30px 0px;
}

.pagination .el-pagination {
  display: flex;
  justify-content: center;
}

.paper h4 {
  cursor: pointer;
}

.paper .item a {
  color: #000;
}
.wrapper{
  border: 1px solid #ddd; /* Add border style here */
  border-radius: 5px; /* Optional: Add border-radius for rounded corners */
  margin-bottom: 20px; /* Optional: Adjust margin as needed */
  overflow: hidden; /* Optional: Ensure border is visible even if child elements overflow */
}


.wrapper .top .order {
  cursor: pointer;
}

.wrapper .top .order:hover {
  color: #0195ff;
  border-bottom: 2px solid #0195ff;
}

.wrapper .top .order:visited {
  color: #0195ff;
  border-bottom: 2px solid #0195ff;
}

.item .info i {
  margin-right: 5px;
  color: #0195ff;
}

.item .info span {
  margin-right: 14px;
}

.paper .item {
  width: 380px;
  border-radius: 4px;
  padding: 20px 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 4px 2px rgba(217, 222, 234, 0.3);
  transition: all 0.6s ease;
}

.paper .item:hover {
  box-shadow: 0 0 4px 2px rgba(140, 193, 248, 0.45);
  transform: scale(1.03);
}

.paper .item .info {
  font-size: 14px;
  color: #88949b;
}

.paper .item .name {
  font-size: 14px;
  color: #88949b;
}

.paper * {
  margin: 20px 0;
}

.wrapper .paper {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.top .el-icon-search {
  position: absolute;
  right: 10px;
  top: 10px;
}

.top .icon {
  position: relative;
}

.wrapper .top {
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

#myExam .search-li {
  margin-left: auto;
}

.top .search-li {
  margin-left: auto;
}

.top li {
  display: flex;
  align-items: center;
}

.top .search {
  margin-left: auto;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #eee;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.top .search:hover {
  color: #0195ff;
  border-color: #0195ff;
}

.wrapper .top {
  display: flex;
}

.wrapper .top li {
  margin: 20px;
}

#myExam {
  width: 980px;
  margin: 0 auto;
}

#myExam .title {
  margin: 20px;
}

#myExam .wrapper {
  background-color: #fff;
}

</style>
