<template>
  <div class="wrapper">
    <Chart :score="scores"></Chart>
  </div>

</template>

<script setup>
import {useRoute} from "vue-router";
import axios from "axios";
import {computed, ref} from "vue";
import Chart from "@/components/ljk/manager/comp/manageChart.vue";
let scores=ref([])
axios.get('http://localhost:8999/score/getAllScore').then(res=>{
  scores.value=res.data
})
</script>

<style scoped>
.wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70vw;
  height: 60vh;
  margin-top: 5vw;
}
</style>
