<script setup>
import {reactive, ref, toRefs} from "vue";
import {useUserinfoStore} from "@/stores/UserInfo";
const state = reactive({
  circleUrl:
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})
const userStore = useUserinfoStore()
const circleUrl = toRefs(state)
</script>

<template>
  <div>
    <el-avatar :size="40" :src="userStore.UserImg" />
  </div>
</template>

<style scoped>

</style>