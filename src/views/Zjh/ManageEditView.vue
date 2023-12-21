<script setup>
import HeaderView from "@/components/ljk/headerView.vue";
import ManageHead from "@/components/Zjh/ManageHead.vue";
import ManageForm from "@/components/Zjh/ManageForm.vue";
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
     <ManageHead></ManageHead>
      </el-header>
      <el-main >
        <div >
          <ManageForm></ManageForm>
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