<script setup>
import {ref} from "vue";
import axios from "axios";
import cookies from "vue-cookies"
import router from "@/router";
import {ElMessage} from "element-plus";
import {useUserinfoStore} from "@/stores/UserInfo";
let role = ref(2);
let labelPosition = ref('left');
const userStore = useUserinfoStore
let formLabelAlign = ref({
  username: '1',
  password: '123456'
})
function login() {
  console.log("登录操作执行-------");
  axios({
    url: `http://localhost:8999/login`,
    method: 'post',
    data: {
      username:formLabelAlign.value.username,
      password:formLabelAlign.value.password
    }
  }).then(res => {
    let resData = res.data.data
    if (resData != null) {
      switch (resData.role) {
        case "0":  //管理员
          cookies.set("cname", resData.adminName)
          cookies.set("cid", resData.adminId)
          cookies.set("type",'admin')
          cookies.set("role", 0)
          router.push({path: '/manage/paperManage'}) //跳转到首页
          break
        case "2": //用户
          cookies.set("cname", resData.studentName)
          cookies.set("cid", resData.studentId)
          cookies.set("type",'student')
          router.push({path: '/'})
          break
      }
      ElMessage('登录成功')

    }
    if (resData == null) { //错误提示
      console.log("resData is null")
      cookies.set("cname", '')
      cookies.set("cid", '')
      alert('登录失败!账户或密码错误')
      router.push({path: '/'})
    }
  })

}

function clickTag(key) {
  this.role = key
}
</script>

<template>
  <div id="login" style="height: 90vh;width: 100vw">
    <div class="bg"></div>
    <el-row class="main-container" >
      <el-col>
        <div class="top">
          <i class="iconfont icon-kaoshi"></i><span class="title">儿童癫痫诊疗知识在线考试系统</span>
        </div>
        <div class="bottom">
          <div class="container">
            <p class="title">账号登录</p>
            <el-form label-position="left" label-width="5vw"  :model="formLabelAlign" >
              <el-form-item label="用户名">
                <el-input v-model.number="formLabelAlign.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="formLabelAlign.password" placeholder="请输入密码" type='password'></el-input>
              </el-form-item>
              <div class="submit">
                <el-button type="primary" class="row-login" @click="login()">登录</el-button>
              </div>
              <div></div>
              <div class="options">
                <p class="find"><a  class="comFont">找回密码</a></p>
                <div class="register">
                  <span>没有账号?</span>
                  <span style="display: flex;justify-content: center;align-items: center"><a>去注册</a></span>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <section class="remind">
      <span>管理员账号：2023</span>
      <span>密码：123456</span>
    </section>
  </div>
</template>


<style scoped>
.remind {
  border-radius: 9px;
  padding: 1vw 2vw;
  display: flex;
  position: fixed;
  left: 3vw;
  bottom: 50%;
  flex-direction: column;
  color: #606266;
  background-color: #fff;
  border-left: 4px solid #409eff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
}

.container {
  margin: 1vw 0 1vw 0;
  width: 80%;
}
a:link {
  color: #ff962a;
  text-decoration: none;
}

#login {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1vw;
  color: #000;
  background-color: #fff;
  width: 100vw;
  height: 100vh;
}

#login .bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  overflow-y: auto;
  height: 100vh;
  background-color: #b6bccdd1 !important;
}

.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45vw;
  height: 100vh;
  margin: 0 0 0 0;
}

#login .main-container .top {
  margin-top: 1vw;
  font-size: 3vw;
  color: #ff962a;
  display: flex;
  justify-content: center;
  align-items: center;

}

#login .top .icon-kaoshi {
  font-size: 2vw;
}

#login .top .title {
  margin-top: 2vw;
  font-size: 2.3vw;
  display: flex;
  justify-content: center;
  align-items: center;

}

.bottom {
  display: flex;
  justify-content: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}

.bottom .title {
  text-align: center;
  font-size: 2vw;
}

.bottom .container .title {
  margin: 2vw 0;;
}

.bottom .submit .row-login {
  width: 100%;
  background-color: #04468b;
  border-color: #04468b;
  margin: 1vw 0 1vw 0;
  padding: 15px 20px;
}

.bottom .submit {
  display: flex;
  justify-content: center;
}

.bottom .options {
  margin-bottom: 40px;
  color: #ff962a;
  display: flex;
  justify-content: space-between;
}

.bottom .options > a {
  color: #ff962a;
}

.bottom .options .register span:nth-child(1) {
  color: #8C8C8C;
}
.register{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

</style>
