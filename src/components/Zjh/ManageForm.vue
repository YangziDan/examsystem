<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {useUserinfoStore} from "@/stores/UserInfo";
import axios from "axios";
import cookies from "vue-cookies";


interface RuleForm {
  name: string
  sex: string
  phone:string
  school:string
  password:string
  email:string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  sex:'',
  phone:'',
  school:'',
  password:'',
  email:''

})

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 1, max: 10, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],



})

const store = useUserinfoStore()
const userId = ref( cookies.get('cid'))
const UserId= ref(1314)

function save(){

  store.$patch({
    ManageName:ruleForm.name,
    ManageSex: ruleForm.sex,
    ManagePhone: ruleForm.phone,
    ManagePwd: ruleForm.password,
    ManageEmail:ruleForm.email
  })
  console.log("保存个人信息")
  axios({
    url:'http://localhost:8999/saveManageInfo',
    method:'post',
    data:{
      adminId:userId.value,
      adminName:store.ManageName,
      sex:store.ManageSex,
      tel:store.ManagePhone,
      email:store.ManageEmail,
      pwd:store.ManagePwd
    }
  }).then(res=>{
    console.log(res.data)
    console.log( cookies.get('cid'))

  })


}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}




</script>
<template>
  <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
  >
    <el-form-item label="管理员用户名"  >
      <el-input v-model="ruleForm.name"  />
    </el-form-item>
    <el-form-item label="性别" >
      <el-select v-model="ruleForm.sex" >
        <el-option label="男" value="男" />
        <el-option label="女 " value="女" />
      </el-select>
    </el-form-item>
    <el-form-item label="电话" >
      <el-input v-model="ruleForm.phone"></el-input>
    </el-form-item>
    <el-form-item label="密码" >
      <el-input v-model="ruleForm.password" type="password"></el-input>
    </el-form-item>

    <el-form-item label="邮箱" >
      <el-input v-model="ruleForm.email" type="text" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save()">
        提交
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">清空</el-button>
    </el-form-item>
  </el-form>
</template>


