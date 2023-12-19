<template>
  <div>
    <el-button-group>
      <el-button type="primary" :icon="ArrowLeft" @click="goToByName('commonQuestion')">填空题/判断题
      </el-button>
      <el-button type="primary" @click="goToByName('multiQuestion')">
        选择题
        <el-icon class="el-icon--right">
          <ArrowRight/>
        </el-icon>
      </el-button>
    </el-button-group>
    <router-view></router-view>

  </div>

</template>

<script setup>
import {useRouter} from "vue-router";

let router = useRouter();
function goToByName(name){
  router.push({name:name})
}
</script>

<style scoped>

.comCol {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
