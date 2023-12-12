import {defineStore} from "pinia";
import cookies from "vue-cookies"
import router from "@/router";
export const useUserinfoStore = defineStore('UserInfo', {
        state: () => {
            return {
                UserName: "",
                UserSex: "",
                UserPhone: "",
                UserGrade: "",
                UserSchool: "",
                UserBirth: "",
                UserImg:""
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
            router.push({
                path: '/'
            })
        }
        return {checkLogin,logOut}
    }
)