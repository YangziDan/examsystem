<template>
    <header-view></header-view>
    <div id="myExam">
        <!--        <div class="title">我的试卷</div>-->
        <div class="wrapper">
            <ul class="top">
                <li class="order">试卷列表</li>
                <!--搜索试卷-->
                <li class="search-li">
                    <div class="icon">
                        <input
                            type="text"
                            placeholder="试卷名称"
                            class="search"
                            v-model="key"
                        />
                        <i class="el-icon-search"></i>
                    </div>
                </li>
                <li>
                    <el-button type="primary" @click="search()">搜索试卷</el-button>
                </li>
            </ul>

            <!-- 试卷列表-->
            <ul class="paper" v-loading="loading">
                <ul class="item" v-for="(item, index) in pagination.records" :key="index">
                    <h4 @click="toExamMsg(item.examCode)">{{ item.source }}</h4>
                    <p class="name">{{ item.source }}-{{ item.description }}</p>
                    <div class="info">
                        <i class="el-icon-loading"></i><span>{{ item.examDate.substr(0, 10) }}</span>
                        <i class="iconfont icon-icon-time"></i><span v-if="item.totalTime != null">限时{{
                            item.totalTime
                        }}分钟</span>
                        <i class="iconfont icon-fenshu"></i><span>满分{{ item.totalScore }}分</span>
                    </div>
                </ul>
            </ul>

            <!--分页-->
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagination.current"
                    :page-sizes="[6, 10, 20, 40]"
                    :page-size="pagination.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import HeaderView from "@/components/ljk/headerView.vue";
import axios from 'axios'
import router from "@/router";


const loading = ref(false);
const key = ref<string | null>(null);
const allExam = ref(null);

const pagination = ref({
    current: 1,
    total: null,
    size: 6,
});

onMounted(() => {
    getExamInfo();
    loading.value = true;
});

//获取当前所有考试信息
const getExamInfo = () => {
    // Replace this with your actual axios call
    axios(`http://localhost:8999/examManage/exams/${pagination.value.current}/${pagination.value.size}`)
        .then((res) => {
            pagination.value = res.data.data;
            loading.value = false;
            console.log(res.data.data)
        })
        .catch((error) => {
            console.log(error);
        });
};

//改变当前记录条数
const handleSizeChange = (val) => {
    pagination.value.size = val;
    getExamInfo();
};

//改变当前页码，重新发送请求
const handleCurrentChange = (val) => {
    pagination.value.current = val;
    getExamInfo();
};

//搜索试卷
const search = () => {
    axios('http://localhost:8999/examManage/exams').then((res) => {
        if (res.data.code == 200) {
            let allExam = res.data.data;
            let newPage = allExam.filter((item) => {
                return item.source.includes(key.value);
            });
            pagination.value.records = newPage;
        }
    });
};

//跳转到试卷详情页
const toExamMsg = (examCode) => {
    // console.log(examCode)
    router.push({path: '/examMsg', query: {examCode: examCode}});
};
</script>

<style scoped>
#myExam{
    background-color: #eee;
}
a {
    text-decoration: none;
}
* {
    margin: 0;
    padding: 0;
}
ul{
    list-style: none;
}
.pagination {
    padding: 20px 0px 30px 0px;
}

.pagination .el-pagination {
    display: flex;
    justify-content: center;
}

.paper h4 {
    cursor: pointer;
}

.paper .item a {
    color: #000;
}

.wrapper .top .order {
    cursor: pointer;
}

.wrapper .top .order:hover {
    color: #0195ff;
    border-bottom: 2px solid #0195ff;
}

.wrapper .top .order:visited {
    color: #0195ff;
    border-bottom: 2px solid #0195ff;
}

.item .info i {
    margin-right: 5px;
    color: #0195ff;
}

.item .info span {
    margin-right: 14px;
}

.paper .item {
    width: 380px;
    border-radius: 4px;
    padding: 20px 30px;
    border: 1px solid #eee;
    box-shadow: 0 0 4px 2px rgba(217, 222, 234, 0.3);
    transition: all 0.6s ease;
}

.paper .item:hover {
    box-shadow: 0 0 4px 2px rgba(140, 193, 248, 0.45);
    transform: scale(1.03);
}

.paper .item .info {
    font-size: 14px;
    color: #88949b;
}

.paper .item .name {
    font-size: 14px;
    color: #88949b;
}

.paper * {
    margin: 20px 0;
}

.wrapper .paper {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.top .el-icon-search {
    position: absolute;
    right: 10px;
    top: 10px;
}

.top .icon {
    position: relative;
}

.wrapper .top {
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
}

#myExam .search-li {
    margin-left: auto;
}

.top .search-li {
    margin-left: auto;
}

.top li {
    display: flex;
    align-items: center;
}

.top .search {
    margin-left: auto;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #eee;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}

.top .search:hover {
    color: #0195ff;
    border-color: #0195ff;
}

.wrapper .top {
    display: flex;
}

.wrapper .top li {
    margin: 20px;
}

#myExam {
    width: 980px;
    margin: 0 auto;
}

#myExam .title {
    margin: 20px;
}

#myExam .wrapper {
    background-color: #fff;
}
</style>
