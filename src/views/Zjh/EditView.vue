<script setup>
import IndividualHead from "@/components/Zjh/IndividualHead.vue";
import IndividualForm from "@/components/Zjh/IndividualForm.vue";
import HeaderView from "@/components/ljk/headerView.vue";
import Upload from "@/components/Zjh/Upload.vue";
</script>
<template>
  <header-view></header-view>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <IndividualHead></IndividualHead>
      </el-header>
      <el-main >
        <div >
          <upload class="upload"></upload>
          <IndividualForm></IndividualForm>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<style scoped>
.header{
  height: 18rem;
}
.upload{
  display: flex;
  margin-left: 7rem;
  margin-top: 0rem;
  margin-bottom: 1rem;
}
</style>