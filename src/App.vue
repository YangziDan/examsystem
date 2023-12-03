<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>
<template>
  <RouterView/>
</template>
<style>
/*以下是一些可以被引用的全局css*/

.h3Title{
  font-size: 4.2vw;
  font-weight: bold;
}
.comFont{
  font-size: 1.2vw;
}

.h4Title{
  font-size: 3.4vw;
  font-weight: bold;
}
.h2Title{
  font-size: 5vw;
  font-weight: bold;
}
.h2WhiteTitle{
  font-size: 5vw;
  font-weight: lighter;
  color: white;
}
.score{
  color: darkorange;
  font-weight: 800;
  font-size: 3.6vw;
}
.bannerText{
  font-size: 3.4vw;
  color: #666666;
}
.bannerText2{
  font-size: 3.4vw;
  color: #888888;
}
.linkText{
  font-size: 3vw;
  color: #c79868;
  font-weight: bold;
}
</style>
