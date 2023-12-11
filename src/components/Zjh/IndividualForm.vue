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
  grade: string[]
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  sex:'',
  phone:'',
  school:'',
  grade: []

})

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 1, max: 10, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],

  grade: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],

})

const store = useUserinfoStore()
const userId = ref( cookies.get('cid'))
function submit() {
  store.$patch({
    UserName:ruleForm.name,
    UserSex: ruleForm.sex,
    UserPhone: ruleForm.phone,
    UserSchool: ruleForm.school,
    UserGrade:ruleForm.grade[0]
  })
}
const UserId= ref(1314)

function save(){

  store.$patch({
    UserName:ruleForm.name,
    UserSex: ruleForm.sex,
    UserPhone: ruleForm.phone,
    UserSchool: ruleForm.school,
    UserGrade:ruleForm.grade[0]
  })
  console.log("保存个人信息")
  axios({
    url:'http://localhost:8999/save',
    method:'post',
    data:{
      userId:userId.value,
      userName:store.UserName,
      userSex:store.UserSex,
      userPhone:store.UserPhone,
      userSchool:store.UserSchool
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
    <el-form-item label="用户名"  >
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

    <el-form-item  label="年级" >
      <el-checkbox-group max="1"  v-model="ruleForm.grade[0]">
        <el-checkbox label="大一" name="type" />
        <el-checkbox label="大二" name="type" />
        <el-checkbox label="大三" name="type" />
        <el-checkbox label="大四" name="type" />
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="学校" >
      <el-input v-model="ruleForm.school" type="text" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save()">
        提交
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">清空</el-button>
    </el-form-item>
  </el-form>
</template>


