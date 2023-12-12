
<script setup lang="ts">
import {useUserinfoStore} from "@/stores/UserInfo";
import cookies from "vue-cookies";
import {ref} from "vue";
import axios from "axios";
const store=useUserinfoStore()
const userId = ref(cookies.get('cid'))

axios({
  url:'http://localhost:8999/push',
  method:'post',
  data:{
    userId:userId.value
  }
}).then(res=>{
  store.UserName=res.data.userName
  store.UserSex=res.data.userSex
  store.UserPhone=res.data.userPhone
  store.UserSchool=res.data.userSchool
  store.UserImg=res.data.userImg
})
</script>
<template>

  <el-descriptions
      title="用户基本信息"
      :column="4"
      size="large"
      direction="vertical"
      :style="blockMargin"
  >
    <el-descriptions-item label=ID>{{userId}}</el-descriptions-item>
    <el-descriptions-item label="用户名">{{store.UserName}}</el-descriptions-item>
    <el-descriptions-item label="电话">{{store.UserPhone}}</el-descriptions-item>
    <el-descriptions-item label="年级" :span="2">{{store.UserGrade[0]}}</el-descriptions-item>
    <el-descriptions-item label="性别">
      <el-tag size="small">{{store.UserSex}}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="学校">{{store.UserSchool}}</el-descriptions-item>

  </el-descriptions>
</template>


<style scoped>

</style>
