<!--页脚部分-->
<template>
  <footer id="footer">
    <ul>
      <li><a href="javascript:;">关于我们</a></li>
      <li><a href="javascript:;">免责声明</a></li>
      <li><a href="javascript:;">使用协议</a></li>
      <li><a href="javascript:" target="_blank">软件项目管理</a></li>
      <li>@Copyright 2023-2026. ALL Rights Reserved</li>
    </ul>
  </footer>
</template>

<script setup>

</script>

<style scoped>
#footer a {
  color: #919698;
  font-size: 1vw;
}
#footer {
  background-color: #1D2C38;
  width: 100vw;
  position: fixed;
  bottom: 0;
}
#footer ul {
  margin-top: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6vw;
  line-height: 6vw;
}
#footer ul li {
  color: #919698;
  font-size: 1vw;
  margin-right: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
