<!--学生考试首页-->
<template>
  <div id="student">
    <el-row class="padding-50">
      <el-col :span="24">
        <ul class="list">
          <li class="logo"><i class="iconfont icon-kaoshi"></i><span>儿童癫痫知识诊疗系统</span></li>
          <li><a href="javascript:;" @click="exam()">我的试卷</a></li>
          <li><a href="javascript:;" @click="practice()">我的练习</a></li>
          <li><router-link to="/scoreTable">我的分数</router-link></li>
          <li><a href="javascript:;">关于</a></li>
          <li class="right" @mouseenter="flag = !flag" @mouseleave="flag = !flag">
            <a href="javascript:;"><i class="iconfont icon-Userselect icon"></i>{{user.userName}}</a>
            <div class="msg" v-if="flag">
              <p @click="manage()">管理中心</p>
              <p class="exit" @click="exit()">退出</p>
            </div>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import {ref} from "vue";
let user=ref({})
let flag=ref(false)
</script>

<style scoped>
.right .icon {
  margin-right: 6px;
}
#student{
  position: fixed;
  top: 0;
  width: 100vw;
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
.right .msg {
  text-align: center;
  position: absolute;
  top: 60px;
  left: 0px;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  border-bottom: 3px solid #0195ff;
  background-color: #fff;
}
.right .msg p {
  height: 40px;
  line-height: 40px;
  width: 105px;
}
.right .msg p:hover {
  background-color: #0195ff;
}
</style>
