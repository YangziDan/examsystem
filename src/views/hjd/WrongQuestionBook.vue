// 我的考试页面
<script setup>
import {computed, onMounted, ref} from 'vue';
import HeaderView from "@/components/ljk/headerView.vue";
import axios from "axios";
import cookies from "vue-cookies";
import {EditPen} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";

const router=useRouter();
const loading = ref(false);
const key = ref(null); // 搜索关键字
const allExam = ref(null); // 所有考试信息
const wrongQuestionList=ref([])
const pagination = ref({ // 分页后的考试信息
  current: 1, // 当前页
  total: 0, // 记录条数
  size: 6 // 每页条数
});
let pagedWrongQuestionList=computed(()=>{
  const startIndex = (pagination.value.current - 1) * pagination.value.size;
  const endIndex = startIndex + pagination.value.size;
  let list=wrongQuestionList.value.slice(startIndex, endIndex);
  // console.log(list)
  return list
})

let notRedone=computed(()=>{
  let num=wrongQuestionList.value.filter(question => question.status === 0).length;
  return num
})




onMounted(()=>{
  getWrongQuestionList()
  loading.value=true;
})

const getWrongQuestionList = async () => {
  const studentId=cookies.get("cid")
  loading.value = true;

    await axios.get("http://localhost:8999/wrongQuestion/getWrongQuestion", {params: {studentId}}).then(res => {
      wrongQuestionList.value = res.data;
      pagination.value.total = res.data.length
    }).catch(err => {
      console.log(err);

    }).finally(() => {
      loading.value = false;
    })


};

const handleSizeChange = (val) => {
  pagination.value.size = val;
  // getWrongQuestionList();
};

const handleCurrentChange = (val) => {
  pagination.value.current = val;
  // getWrongQuestionList();
};
function handleClick(row){
  const type=row.type;
  if(type==1){
    router.push({
      path:"/wrongQuestionView/fillQuestionView",
      query:{questionId:row.questionId,type:1}
    })
  }else if(type==2){
    router.push({
      path:"/wrongQuestionView/judgeQuestionView",
      query:{questionId:row.questionId,type:2}
    })
  }else if(type==3){
    router.push({
      path:"/wrongQuestionView/multiQuestionView",
      query:{questionId:row.questionId,type:3}
    })
  }
}

</script>

<template>
  <header-view></header-view>
  <div id="myExam">
    <div class="title">我的错题</div>
    <div class="wrapper">
      <ul class="top">
        <li class="order">
          <el-badge :value="pagination.total" class="item" type="primary">
            <span>全部</span>
          </el-badge>
        </li>
        <li class="order">
          <el-badge :value="pagination.total-notRedone" class="item" type="primary">
            <span>已重做</span>
          </el-badge>
        </li>
        <li class="order">
          <el-badge :value="notRedone" class="item" >
            <span>未重做</span>
          </el-badge>
        </li>

      </ul>

      <el-table :data="pagedWrongQuestionList" stripe style="width: 100%">
        <el-table-column prop="question.subject" label="试卷名称" width="120" ></el-table-column>
        <el-table-column prop="question.question" label="题目" width="500"></el-table-column>
        <el-table-column label="重做情况" width="150">
          <template v-slot:default="scope">
            <el-tag :type="scope.row.status==1 ? 'success' : 'danger'">{{scope.row.status==1  ? "已重做" : "未重做"}}</el-tag>
          </template>
        </el-table-column>


        <!--操作-->
              <el-table-column label="操作">
                <template v-slot:default="scope">
                  <el-button  type="primary" @click="handleClick(scope.row)"><el-icon><EditPen /></el-icon>做题</el-button>

                </template>
              </el-table-column>
      </el-table>
      <div class="pagination">
<!--        <el-pagination-->
<!--            @size-change="handleSizeChange"-->
<!--            @current-change="handleCurrentChange"-->
<!--            :current-page="pagination.current"-->
<!--            :page-sizes="[1,6, 10, 20, 40]"-->
<!--            :page-size="pagination.size"-->
<!--            layout="total, sizes, prev, pager, next, jumper"-->
<!--            :total="pagination.total">-->
<!--        </el-pagination>-->
        <el-pagination
            v-model:current-page="pagination.current"
            v-model:page-size="pagination.size"
            :page-sizes="[1,6, 10, 20, 40]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
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
