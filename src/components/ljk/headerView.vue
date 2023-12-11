<!--学生考试首页-->
<template>

  <div id="student">
    <el-row class="padding-50">
      <el-col :span="24">
        <ul class="list">
          <li class="logo"><i class="iconfont icon-kaoshi"></i><span>儿童癫痫知识诊疗系统</span></li>
          <li><a href="/" >首页</a></li>
          <li><a href="/myexam" @click="exam()">我的试卷</a></li>
<!--          <li><a href="javascript:;" @click="practice()">我的练习</a></li>-->
          <li><a href="/studentScore">我的分数</a></li>
          <li><a href="/wrongQuestionBook">错题本</a></li>
          <li style="right: 5vw;position: fixed;"><a href="/individual">个人中心</a></li>

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
.right .icon {
  margin-right: 6px;
}
#student{
  top: 0;
  width: 100vw;
  margin: 0 0 1vw 0;
}
#student .padding-50 {
  margin: 0 auto;
  padding: 0 50px;
  box-shadow: 0 0 10px 4px rgba(1,149,255,0.1);
  background-color: #fff;
}
.list a {
  text-decoration: none;
  color: #334046;
}
li {
  list-style: none;
  height: 60px;
  line-height: 60px;
}
#student .list{
  display: flex;
}
#student .list li {
  padding: 0 20px;
  cursor: pointer;
}
#student .list li:hover {
  background-color: #0195ff;
  transition: all 2s ease;
}
#student .list li:hover a {
  color: #fff;
}
#student .list .right {
  margin-left: auto;
  position: relative;
}
#student .list li.right :hover a {
  color: #000;
}
#student .list .logo {
  display: flex;
  font-weight: bold;
  color: #2f6c9f;
}
#student .list .logo i {
  font-size: 50px;
}
.right{
  position: fixed;
  top: 0.6vw;
  right: 3vw;
}
.right .msg {
  width: 6vw;
  text-align: center;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  border-bottom: 3px solid #0195ff;
  background-color: #fff;
}
.right .msg p {

}
.right .msg p:hover {
  background-color: #0195ff;
}
</style>
<script setup>
import {ref} from "vue";
let user=ref({})
let flag=ref(false)
function exit() {  //退出登录
  this.$router.push({path:"/"}) //跳转到登录页面
  this.$cookies.remove("cname") //清除cookie
  this.$cookies.remove("cid")
}
function manage() {  //跳转到修改密码页面
  this.$router.push({path: '/manager'})
}
function userInfo() {
  let studentName = this.$cookies.get("cname")
  let studentId = this.$cookies.get("cid")
  console.log(`studentId${studentId}`)
  console.log(`studentName ${studentName}`)
  this.user.userName = studentName
  this.user.studentId = studentId
}
function practice() { //跳转练习模式
  let isPractice = true
  this.$store.commit("practice", isPractice)
  this.$router.push({path:'/startExam'})
}
function exam() { //跳转考试模式
  let isPractice = false
  this.$store.commit("practice", isPractice)
  this.$router.push({path:'/student'})
}
</script>