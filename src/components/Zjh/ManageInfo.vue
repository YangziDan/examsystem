
<script setup lang="ts">
import {useUserinfoStore} from "@/stores/UserInfo";
import cookies from "vue-cookies";
import {ref} from "vue";
import axios from "axios";
const store=useUserinfoStore()
const userId = ref(cookies.get('cid'))

axios({
  url:'http://localhost:8999/pushManageInfo',
  method:'post',
  data:{
    adminId:userId.value
  }
}).then(res=>{
  store.ManageName=res.data.adminName
  store.ManageSex=res.data.sex
  store.ManagePhone=res.data.tel
  store.ManageEmail=res.data.email
  store.ManageCard=res.data.cardId
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
    <el-descriptions-item label=管理员ID>{{userId}}</el-descriptions-item>
    <el-descriptions-item label="管理员用户名">{{store.ManageName}}</el-descriptions-item>
    <el-descriptions-item label="电话">{{store.ManagePhone}}</el-descriptions-item>
    <el-descriptions-item label="性别">{{store.ManageSex}}</el-descriptions-item>
    <el-descriptions-item label="邮箱" :span="2">{{store.ManageEmail}}</el-descriptions-item>
    <el-descriptions-item label="卡号">{{store.ManageCard}}</el-descriptions-item>

  </el-descriptions>
</template>


<style scoped>

</style>
