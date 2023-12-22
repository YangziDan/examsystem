<template>
  <headerView></headerView>
  <home-main-view></home-main-view>
  <home-main-footer></home-main-footer>
</template>

<script setup>

import HeaderView from "@/components/ljk/headerView.vue";
import HomeMainView from "@/components/ljk/homeMainView.vue";
import HomeMainFooter from "@/components/ljk/homeMainFooter.vue";
import axios from "axios";
import {useUserinfoStore} from "@/stores/UserInfo";
import {onMounted, ref} from "vue";
import cookies from "vue-cookies";
const store = useUserinfoStore()

const userId = ref(cookies.get('cid'))
onMounted(()=>{
  axios({
    url:'http://localhost:8999/push',
    method:'post',
    data:{
      userId:userId.value
    }
  }).then(res=>{
    store.UserName=res.data.userName
    store.UserSex=res.data.userSex
    store.UserPhone=res.data.userPhone
    store.UserSchool=res.data.userSchool
    store.UserImg=res.data.userImg
  })
})

</script>

<style scoped>

</style>