<script setup>
import {ref} from "vue";

const username = ref("")

</script>

<template>
  <div class="mainheader1">
    <p class="name">{{ username }}</p>
  </div>
  <div class="body">
    <ul>
      <li>
        <RouterLink to="/manage/manageIndividual" class="router-link-active">主页</RouterLink>
      </li>
      <li>
        <RouterLink to="/manage/manageEdit" class="router-link-active">编辑资料</RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.mainheader1 {
  height: 13rem;
  width: 60rem;
  background-image: url("manage-header.png");
  display: flex;
  flex-direction: row;
  margin-left: 7rem;
}


.name {
  padding-top: 9rem;
  margin-left: 1rem;
  color: white;
}

.body {
  margin-left: 7rem;
  width: 20rem;
}

ul {
  position: relative;
  display: flex;
  flex-direction: row;
  padding-left: 0rem;
  width: 20rem;
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
