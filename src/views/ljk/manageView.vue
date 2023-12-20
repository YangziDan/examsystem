<template>
  <div class="wrapper">
    <el-container>
      <el-aside >
        <manager-left style="width: 15vw"></manager-left>
      </el-aside>
      <el-container>
        <el-header>
          <p class="title">
            管理员后台界面
          </p>
        </el-header>
        <el-main >
          <router-view style="padding-top: 6vh;height: 50vh"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>

import ManagerLeft from "@/components/ljk/managerLeft.vue";
</script>


<style scoped>
.wrapper {
  width: 94vw;
  height: 94vh;
  display: flex;
  justify-content: center;
  /*align-items: center;*/
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #2f6c9f;
  height: 7vw;
  font-size: 1.3vw;
}


.com {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>

