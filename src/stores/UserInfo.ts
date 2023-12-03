import {defineStore} from "pinia";
export const useUserinfoStore= defineStore('UserInfo',{
    state:()=>{
        return{
            UserName:"",
            UserSex:"",
            UserPhone:"",
            UserGrade:'',
            UserSchool:"",
            UserBirth:""
        }
    },
    persist:true
}

)