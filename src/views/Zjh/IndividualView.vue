<script setup>
import IndividualHead from "@/components/Zjh/IndividualHead.vue";
import InfoList from "@/components/Zjh/InfoList.vue";
import {onMounted} from "vue";
import {useLoginStore} from "@/stores/UserInfo";
import HeaderView from "@/components/ljk/headerView.vue";
onMounted(()=>{
  let login=useLoginStore();
  login.checkLogin()
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