<template>
  <el-descriptions
      title="用户基本信息"
      :column="4"
      size="large"
      direction="vertical"
      :style="blockMargin"
  >
    <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
    <el-descriptions-item label="电话">18100000000</el-descriptions-item>
    <el-descriptions-item label="年级" :span="2">大三</el-descriptions-item>
    <el-descriptions-item label="性别">
      <el-tag size="small">男</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="学校"
    >云南大学
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">



</script>

<style scoped>

</style>
