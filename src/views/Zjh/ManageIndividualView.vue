<script setup>
import IndividualHead from "@/components/Zjh/IndividualHead.vue";
import InfoList from "@/components/Zjh/InfoList.vue";
import {onMounted} from "vue";
import {useLoginStore} from "@/stores/UserInfo";
import HeaderView from "@/components/ljk/headerView.vue";
import ManageInfo from "@/components/Zjh/ManageInfo.vue";
import ManageHead from "@/components/Zjh/ManageHead.vue";
onMounted(()=>{
  let login=useLoginStore();
  login.checkLogin()
})
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <ManageHead></ManageHead>
      </el-header>
      <el-main >
        <div class="info">
          <ManageInfo></ManageInfo>
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