<template>
    <div id="msg">
        <div class="title">
            <span>试卷列表</span>
            <span>/  {{ examData.source }}</span>
        </div>
        <!--考试信息-->
        <div class="wrapper">
            <!--试卷信息-->
            <ul class="top">
                <div class="example">{{ examData.source }}</div>
                <div><i class="iconfont icon-pen-"></i></div>
                <div><i class="iconfont icon-share"></i></div>
<!--                <div class="right">-->
<!--                    <div>-->
<!--                        <span class="count">总分</span>-->
<!--                        <span class="score">{{ score[0] + score[1] + score[2] }}</span>-->
<!--                    </div>-->
<!--                </div>-->
            </ul>
            <ul class="bottom">
                <div>更新于{{ examData.examDate }}</div>
                <div>来自 {{ examData.institute }}</div>
                <!-- <div class="btn">{{ examData.type }}</div>-->
                <div class="btn">xxx</div>
                <div class="right">
                    <el-button @click="toAnswer(examData.examCode)">开始答题</el-button>
                </div>
            </ul>

            <!--考生须知对话框-->
            <ul class="info">
                <div @click="dialogVisible = true">
                    <a href="javascript:">
                        <i class="iconfont icon-info"></i>考生须知
                    </a>
                </div>
            </ul>
            <el-dialog title="考生须知" v-model="dialogVisible" width="30%">
                <span>{{ examData.tips }}</span>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false"
                           style="margin-top: 2vh">知道了
                </el-button>
            </span>
            </el-dialog>
        </div>

        <!--试卷内容-->
        <div class="content">
            <el-collapse v-model="activeNames">
                <el-collapse-item class="header" name="0">
                    <template #title>
                        <div class="title">
                            <span>{{ examData.source }}</span><i class="header-icon el-icon-info"></i>
                            <span class="time">{{ examData.totalScore }}分 / {{ examData.totalTime }}分钟</span>
                            <el-button type="primary">查看试题详情</el-button>
                        </div>
                    </template>
                    <el-collapse class="inner">
                        <el-collapse-item name="1">
                            <template #title>
                                <div class="titlei">选择题 (共{{ topicCount[0] }}题 共计{{ score[0] }}分)</div>
                            </template>
                            <div class="contenti">
                                <ul class="question" v-for="(list, index) in topic[1]" :key="index">
                                    <div>{{ index + 1 }}. {{ list.question }} {{ list.score }}分</div>
                                </ul>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="2">
                            <template #title>
                                <div class="titlei">填空题 (共{{ topicCount[1] }}题 共计{{ score[1] }}分)</div>
                            </template>
                            <div class="contenti">
                                <ul class="question" v-for="(list, index) in topic[2]" :key="index">
                                    <div>{{ topicCount[0] + index + 1 }}.{{ list.question }} {{ list.score }}分</div>
                                </ul>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="3">
                            <template #title>
                                <div class="titlei">判断题 (共{{ topicCount[2] }}题 共计{{ score[2] }}分)</div>
                            </template>
                            <div class="contenti">
                                <ul class="question" v-for="(list, index) in topic[3]" :key="index">
                                    <div>{{ topicCount[0] + topicCount[1] + index + 1 }}. {{ list.question }}
                                        {{ list.score }}分
                                    </div>
                                </ul>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </el-collapse-item>
            </el-collapse>
        </div>

    </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import axios from 'axios'
import {useRoute} from "vue-router";
import router from "@/router";

const dialogVisible = ref(false);
const activeNames = ref([]);
const topicCount = ref<number[]>([]);
const score = ref<number[]>([]);
const examData = ref<any>({});
const topic = ref<any>({});
const route = useRoute()

onMounted(() => {
    init();
});

const init = () => {
    const examCode = route.query.examCode;
    // const examCode = 20190001;
    axios.get(`http://localhost:8999/examManage/exam/${examCode}`).then((res) => {
        // console.log("@")
        console.log({...res.data.data})
        res.data.data.examDate = res.data.data.examDate.substr(0, 10);
        examData.value = {...res.data.data};
        const paperId = examData.value.paperId;
        axios(`http://localhost:8999/paperManage/paper/${paperId}`).then((res) => {
            // console.log({...res.data})
            topic.value = {...res.data};
            const keys = Object.keys(topic.value);
            keys.forEach((e) => {
                const data = topic.value[e];
                topicCount.value.push(data.length);
                let currentScore = 0;
                for (let i = 0; i < data.length; i++) {
                    currentScore += data[i].score;
                }
                score.value.push(currentScore);
            });
        });
    });
};

const toAnswer = (id) => {
    console.log(id)
    router.push({path: '/answer', query: {examCode: id}});
};
</script>

<style scoped>

.bottom .el-button {
    color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
}

.right {
    margin-left: auto;
}

.inner .contenti .question {
    margin-left: 40px;
    color: #9a9a9a;
    font-size: 14px;
}

.content .inner .titlei {
    margin-left: 20px;
    font-size: 16px;
    color: #88949b;
    font-weight: bold;
}

.content .title .time {
    font-size: 16px;
    margin-left: 420px;
    color: #999;
}

.content .stitle {
    background-color: #0195ff;
}

.content .title span {
    margin-right: 10px;
}

#msg .content .title {
    font-size: 20px;
    margin: 0px;
    display: flex;
    align-items: center;
}

.content {
    margin-top: 20px;
    background-color: #fff;
}

.content .header {
    padding: 10px 30px;
}

.wrapper .info {
    margin: 20px 0px 0px 20px;
    border-top: 1px solid #eee;
    padding: 20px 0px 10px 0px;
}

.wrapper .info a {
    color: #88949b;
    font-size: 14px;
}

.wrapper .info a:hover {
    color: #0195ff;
}

.wrapper .bottom .btn {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid #88949b;
    border-radius: 4px;
}

.wrapper .bottom {
    display: flex;
    margin-left: 20px;
    color: #999;
    font-size: 14px;
    align-items: center;
}

.wrapper .bottom div {
    margin-right: 14px;
}

#msg {
    /*background-color: #eee;*/
    width: 980px;
    margin: 0 auto;
}

#msg .title {
    margin: 20px;
}

#msg .wrapper {
    /*background-color: #fff;*/
    padding: 10px;
}

.wrapper .top {
    display: flex;
    margin: 20px;
    align-items: center;
}

.wrapper .top .right {
    margin-left: auto;
}

.wrapper .top .example {
    color: #333;
    font-size: 22px;
    font-weight: 700;
}

.wrapper .top div i {
    margin-left: 20px;
    color: #88949b;
}

.wrapper .right .count {
    margin-right: 60px;
    color: #fff;
    padding: 4px 10px;
    background-color: #88949b;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border: 1px solid #88949b;
}

.wrapper .right .score {
    position: absolute;
    left: 53px;
    top: -5px;
    padding: 1px 12px;
    font-size: 20px;
    color: #88949b;
    border: 1px dashed #88949b;
    border-left: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    font-weight: bold;
}

.wrapper .right div {
    position: relative;
}
</style>
