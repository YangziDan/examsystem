<!--学生考试首页-->
<template>
  <div class="bigWrapper">
    <el-row class="wrapper" style="width: 100vw">
      <el-col :span="24" style="width: 100vw">
        <ul class="list" style="width: 100vw">
          <li class="logo"><i class="iconfont icon-kaoshi"></i><span>儿童癫痫知识诊疗系统</span></li>
          <li><router-link to="/" >首页</router-link></li>
          <li><router-link to="/myexam" @click="exam()">我的试卷</router-link></li>
<!--          <li><a href="javascript:;" @click="practice()">我的练习</a></li>-->
          <li><router-link to="/studentScore" @click="login.checkLogin()">我的分数</router-link></li>
          <li><router-link to="/wrongQuestionBook" @click="login.checkLogin()">错题本</router-link></li>
          <li><router-link to="/scoreAnalysis" @click="login.checkLogin()">成绩分析</router-link></li>
          <li style="width: 30vw" class="none"></li>
          <li class="avatar"><avatar></avatar></li>
          <li style="right: 0.1vw;position: relative;"><router-link to="/individual" @click="login.checkLogin()">个人中心</router-link></li>
          <li style="right: 0.1vw;position: relative;"><router-link to="/" @click="login.logOut()">退出登录</router-link></li>

<!--          <li class="right" @mouseenter="flag = !flag" @mouseleave="flag = !flag">-->
<!--            <a href="javascript:;">-->
<!--              <i class="iconfont icon-Userselect icon"></i>-->
<!--              {{user.userName}}-->
<!--            </a>-->
<!--            <div class="msg" v-if="flag">-->
<!--              <p @click="manage()">管理中心</p>-->
<!--              <p class="exit" @click="exit()">退出</p>-->
<!--            </div>-->
<!--          </li>-->
        </ul>
      </el-col>
    </el-row>
  </div>
</template>


<style scoped>
.none{}
 .bigWrapper{
  top: 0;
  width: 100vw;
  margin: 1vw 0 1vw 0;
}
 .bigWrapper .wrapper {
  margin: 0 auto;
  padding: 0 0 0 0;
  box-shadow: 0 0 10px 4px rgba(1,149,255,0.1);
  background-color: #fff;
}
.list a {
  text-decoration: none;
  color: #334046;

}
li {
  list-style: none;
  height: 4.5vw;
  line-height: 3vw;
}
 .bigWrapper .list{
  display: flex;
  width: 100vw;
}
 .bigWrapper .list li {
  padding: 0 0.5vw 0 0.5vw;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2vw;
}
 .bigWrapper .list li:hover {
  background-color: #0195ff;
  transition: all 2s ease;
}
 .bigWrapper .list li:hover a {
  color: #fff;
}
 .bigWrapper .list .right {
  margin-left: auto;
  position: relative;
}
 .bigWrapper .list li.right :hover a {
  color: #000;
}
 .bigWrapper .list .logo {
  display: flex;
  font-weight: bold;
  color: #2f6c9f;
}
 .bigWrapper .list .logo i {
  font-size: 2vw;
}

.right .msg p {

}
.right .msg p:hover {
  background-color: #0195ff;
}
.avatar{
  display: flex;
  margin-top: 0.6rem;
}
</style>
<script setup>
import {useLoginStore} from "@/stores/UserInfo";
let login=useLoginStore();
import {ref} from "vue";
import Avatar from "@/components/Zjh/Avatar.vue";
let user=ref({})
let flag=ref(false)
function userInfo() {
  let studentName = this.$cookies.get("cname")
  let studentId = this.$cookies.get("cid")
  console.log(`studentId${studentId}`)
  console.log(`studentName ${studentName}`)
  this.user.userName = studentName
  this.user.studentId = studentId
}
function exam() { //跳转考试模式
  login.checkLogin()
  let isPractice = false
  this.$store.commit("practice", isPractice)
  this.$router.push({path:'/student'})
}
</script>
