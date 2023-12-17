<script setup >

import HeaderView from "@/components/ljk/headerView.vue";
import Chart from "@/components/hjd/Chart.vue";
import {onMounted, ref} from "vue";
import cookies from "vue-cookies";
import axios from "axios";
const scoreList=ref([]);
onMounted(()=>{
  getScore();
})

const getScore = async () => {
  const studentId = cookies.get("cid")

  await axios.get("http://localhost:8999/score/getScore", {params: {studentId}}).then(res => {
    console.log(res)
    scoreList.value = res.data;


  }).catch(err => {
    console.log(err);

  })
}
</script>

<template>
  <header-view></header-view>
  <div class="chart">
    <Chart :score="scoreList"/>

  </div>

</template>

<style scoped>
.chart{
  display: flex;
  justify-content: center;
}
</style>