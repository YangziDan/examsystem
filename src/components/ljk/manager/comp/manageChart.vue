<script setup>
import * as echarts from "echarts";
import {onMounted, defineProps, ref,watch} from "vue";
const scoreList=defineProps(["score"])

const count90to100 = ref(0);
const count80to90 = ref(0);
const count70to80 = ref(0);
const count60to70 = ref(0);
const countBelow60 = ref(0);

//声明周期函数，自动执行初始化
onMounted(() => {


});

watch(() => scoreList.score, (newScoreList) => {
  console.log(newScoreList)
  count90to100.value = newScoreList.filter((score) => score.etScore >= 90 && score.etScore <= 100).length;
  count80to90.value = newScoreList.filter((score) => score.etScore >= 80 && score.etScore < 90).length;
  count70to80.value = newScoreList.filter((score) => score.etScore >= 70 && score.etScore < 80).length;
  count60to70.value = newScoreList.filter((score) => score.etScore >= 60 && score.etScore < 70).length;
  countBelow60.value = newScoreList.filter((score) => score.etScore < 60).length;
console.log(count70to80.value)
  init();
});

//初始化函数
function init() {
  // 基于准备好的dom，初始化echarts实例
  let Chart = echarts.init(document.getElementById("main"));
  // 绘制图表
  let options = {
    title: {
      text: "成绩分析",
    },
    series:[
      {
        type: "pie",
        data: [
          { value: count90to100.value, name: `优秀: ${count90to100.value}` },
          { value: count80to90.value, name: `良好: ${count80to90.value}` },
          { value: count70to80.value, name: `中等: ${count70to80.value}` },
          { value: count60to70.value, name: `及格: ${count60to70.value}` },
          { value: countBelow60.value, name: `不及格: ${countBelow60.value}` },
        ],
      },

    ]

  };

  // 渲染图表
  Chart.setOption(options);
}
</script>
<template>

  <div id="main"></div>
</template>

<style scoped>
/* 样式这里要设置长宽，不然显示不出来 */
#main {

  width: 70vw;
  height: 80vh;
}
</style>