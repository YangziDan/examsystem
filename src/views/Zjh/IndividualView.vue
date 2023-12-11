<script setup>
import IndividualHead from "@/components/Zjh/IndividualHead.vue";
import InfoList from "@/components/Zjh/InfoList.vue";
import {onMounted} from "vue";
import cookies from "vue-cookies"
import router from "@/router";
import HeaderView from "@/components/ljk/headerView.vue";
onMounted(()=>{
  if(cookies.get('cid')==null|cookies.get('cid')==''){
    router.push({
      path:'/login'
    })
  }
})
</script>

<template>
  <header-view></header-view>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <IndividualHead></IndividualHead>
      </el-header>
      <el-main >
        <div class="info">
          <InfoList></InfoList>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.header{
  height: 18rem;
}
.info{
  margin-left: 7rem;
}
</style>