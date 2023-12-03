<script setup>
import IndividualHead from "@/components/Individual/IndividualHead.vue";
import IndividualForm from "@/components/Individual/IndividualForm.vue";
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