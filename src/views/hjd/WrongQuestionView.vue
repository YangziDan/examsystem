<script setup lang="ts">

import HeaderView from "@/components/ljk/headerView.vue";
</script>

<template>
  <header-view></header-view>

  <el-card class="box-card">
    <div>错题重做</div>
  </el-card>
  <router-view/>
</template>

<style scoped>
.box-card{
  width: 70%;
  margin: 10px auto;
}
</style>