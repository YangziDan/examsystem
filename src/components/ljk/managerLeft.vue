<template>
  <el-row style="margin: 0 0 0 0">
    <el-col >
      <h4 class="title" @click="()=>{router.push({path:'/'})}">儿童癫痫知识诊疗系统</h4>
      <el-menu
          default-active="2"

          @open="handleOpen"
          @close="handleClose"
      >

        <el-menu-item  @click="handleTitle('/paperManage')">
          <el-icon><Document /></el-icon>
          <span>试卷管理</span>
        </el-menu-item>

        <el-menu-item  @click="handleTitle('/examData')">
          <el-icon><DataAnalysis /></el-icon>
          <span>考试数据</span>
        </el-menu-item>
        <el-menu-item @click="handleTitle('/manageIndividual')">
          <el-icon><UserFilled /></el-icon>
          <span>个人中心</span>
        </el-menu-item>
        <el-menu-item >
          <el-icon><PieChart /></el-icon>
          <span>学习用户数据</span>
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
import {push} from "echarts/types/src/component/dataZoom/history";
import {DataAnalysis, Document, MoreFilled, PieChart, Setting, UserFilled} from "@element-plus/icons-vue";

const router=useRouter()
const parentUrl='/manage'
function handleTitle(index){
  router.push({path:parentUrl+index})
}


const handleOpen = (key: string, keyPath: string[]) => {
}
const handleClose = (key: string, keyPath: string[]) => {
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
