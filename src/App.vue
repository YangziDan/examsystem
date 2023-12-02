<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import MyComponents from "@/components/MyComponents.vue";
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <RouterView/>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 95vw;
}

.leftPart {
  width: 40vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.title {
  color: green;
  width: 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  width: 35vw;
}

.middlePart {
  width: 8vw;
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 3vw 0 1vw;
}

.rightPart {
  width: 40vw;
}
</style>
