<script setup>
import {ref} from "vue";
import Avatar from "@/components/Individual/Avatar.vue";

const username = ref("")

</script>

<template>
  <div class="mainheader">
    <Avatar class="avatar"></Avatar>
    <p class="name">{{ username }}</p>
  </div>
  <div class="body">
    <ul>
      <li>
        <RouterLink to="/individual" class="router-link-active">主页</RouterLink>
      </li>
      <li>
        <RouterLink to="/edit" class="router-link-active">编辑资料</RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.mainheader {
  height: 13rem;
  width: 80vw;
  background-image: url("src/assets/img/individual-header.png");
  display: flex;
  flex-direction: row;
  margin-left: 7rem;
}

.avatar {
  padding-top: 9rem;
  padding-left: 2rem;
}

.name {
  padding-top: 9rem;
  margin-left: 1rem;
  color: white;
}

.body {
  margin-left: 7rem;
  width: 80vw;
}

ul {
  position: relative;
  display: flex;
  flex-direction: row;
  padding-left: 0rem;

}

li {
  list-style: none;
  margin-left: 4rem;

}

.router-link-active {
  text-decoration: none;
  color: black;
}
</style>