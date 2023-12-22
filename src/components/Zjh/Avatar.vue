<script setup>
import {onMounted, reactive, ref, toRefs} from "vue";
import {useUserinfoStore} from "@/stores/UserInfo";
import cookies from "vue-cookies";
import axios from "axios";
const userId = ref(cookies.get('cid'))




const userStore = useUserinfoStore()
const imgUrl = ref("src/assets/img/"+userStore.UserImg)
onMounted(()=>{
  console.log(userStore.UserImg)
  console.log(imgUrl.value)
})
</script>

<template>
  <div>
    <el-avatar :size="40" :src="imgUrl" />
  </div>
</template>

<style scoped>

</style>