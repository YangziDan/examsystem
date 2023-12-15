<template>
  <el-row class="tac">
    <el-col :span="12">
      <h4 class="title">儿童癫痫知识诊疗系统</h4>
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
      >
        <el-menu-item index="1" @click="handleTitle()">
          <el-icon><UserFilled /></el-icon>
          <span>个人中心</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><Management /></el-icon>
          <span>题库管理</span>
        </el-menu-item>
        <el-menu-item index="3" >
          <el-icon><PieChart /></el-icon>
          <span>学习用户进度</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><DataAnalysis /></el-icon>
          <span>考试数据</span>
        </el-menu-item>
        <el-menu-item >
          <el-icon><MoreFilled /></el-icon>
          <span>关于</span>
        </el-menu-item>

        <el-menu-item >
          <el-icon><setting /></el-icon>
          <span>设置</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";

const router=useRouter()
const parentUrl='/test'
function handleTitle(index){
  router.push({path:parentUrl+index})
}
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>


<style scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #2f6c9f;
  height: 7vw;
}
</style>
