<script setup>
import IndividualHead from "@/components/Zjh/IndividualHead.vue";
import IndividualForm from "@/components/Zjh/IndividualForm.vue";
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <IndividualHead></IndividualHead>
      </el-header>
      <el-main >
        <div >
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

</style>