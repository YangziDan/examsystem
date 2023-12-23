import {defineStore} from "pinia";
import cookies from "vue-cookies"
import router from "@/router";
import {ElMessage, ElNotification} from "element-plus";
export const useUserinfoStore = defineStore('UserInfo', {
        state: () => {
            return {
                UserName: "",
                UserSex: "",
                UserPhone: "",
                UserGrade: "",
                UserSchool: "",
                UserBirth: "",
                UserImg:"",
                ManageName:"",
                ManagePhone:"",
                ManagePwd:"",
                ManageSex:"",
                ManageEmail:"",
                ManageCard:""
            }
        },
        persist: true
    }
)
export const useLoginStore = defineStore('login', () => {
        function checkLogin() {
            if (!isLogin()) {
                router.push({
                    path: '/login'
                })
            }
            else if(cookies.get('type')=='admin'){
                router.push({
                    path: '/manage/manageIndividual'
                })
            }

        }
        function isLogin(){
            if(cookies.get('cid') == null | cookies.get('cid') == '')
                return false
            else
                return true
        }
        function logOut(){
            cookies.set('cid','')
            cookies.set('cname','')
            cookies.set('type','')
            router.push({
                path: '/'
            })
            ElNotification({
                title: '已经退出登录！',
                type: 'success',
            })
        }
        return {checkLogin,logOut}
    }
)
