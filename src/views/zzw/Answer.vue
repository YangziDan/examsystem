<template>
    <div id="answer">
        <!--顶部信息栏-->
        <div class="top">
            <ul class="item">
                <li v-if="slider_flag">
                    <el-icon @click="slider_flag = !slider_flag">
                        <Fold/>
                    </el-icon>
                </li>
                <li v-if="!slider_flag">
                    <el-icon @click="slider_flag = !slider_flag">
                        <Expand/>
                    </el-icon>
                </li>
                <li>{{ examData.type }}-{{ examData.source }}</li>
                <li @click="flag = !flag">
                    <el-icon>
                        <UserFilled/>
                    </el-icon>
                    <div class="msg" v-if="flag" @click="flag = !flag">
                        <p>姓名：{{ userInfo.name }}</p>
                        <p>准考证号: {{ userInfo.id }}</p>
                    </div>
                </li>
                <li>
                    <el-icon>
                        <CaretBottom/>
                    </el-icon>
                </li>
            </ul>
        </div>
        <div class="flexarea">
            <!--左边题目编号区-->
            <transition name="slider-fade">
                <div class="left" v-if="slider_flag">
                    <ul class="l-top">
                        <li>
                            <a href="javascript:;"></a>
                            <span>当前</span>
                        </li>
                        <li>
                            <a href="javascript:;"></a>
                            <span>未答</span>
                        </li>
                        <li>
                            <a href="javascript:;"></a>
                            <span>已答</span>
                        </li>
                        <li>
                            <a href="javascript:;"></a>
                            <span>标记</span>
                        </li>
                    </ul>
                    <div class="l-bottom">
                        <div class="item">
                            <hr>
                            <p>选择题部分</p>
                            <hr>
                            <ul>
                                <li v-for="(list, index1) in topic[1]" :key="index1">
                                    <a href="javascript:;"
                                       @click="change(index1)"
                                       :class="{'border': index == index1 && currentType == 1,'bg': bg_flag && topic[1][index1].isClick == true}">
                                        <span :class="{'mark': topic[1][index1].isMark == true}"></span>
                                        {{ index1 + 1 }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="item">
                            <hr>
                            <p>填空题部分</p>
                            <hr>
                            <ul>
                                <li v-for="(list, index2) in topic[2]" :key="index2">
                                    <a href="javascript:;" @click="fill(index2)"
                                       :class="{'border': index == index2 && currentType == 2,'bg': fillAnswer[index2][3] == true}"><span
                                        :class="{'mark': topic[2][index2].isMark == true}"></span>{{
                                            topicCount[0] + index2 + 1
                                        }}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="item">
                            <hr>
                            <p>判断题部分</p>
                            <hr>
                            <ul>
                                <li v-for="(list, index3) in topic[3]" :key="index3">
                                    <a href="javascript:;" @click="judge(index3)"
                                       :class="{'border': index === index3 && currentType === 3,'bg': bg_flag && topic[3][index3].isClick === true}"><span
                                        :class="{'mark': topic[3][index3].isMark === true}"></span>{{
                                            topicCount[0] + topicCount[1] + index3 + 1
                                        }}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="final" @click="commit(examData.examCode)">结束考试</div>
                    </div>
                </div>
            </transition>
            <!--右边选择答题区-->
            <transition name="slider-fade">
                <div class="right">
                    <div class="title">
                        <p>{{ title }}</p>
                        <i class="iconfont icon-right auto-right"></i>
                        <span>
                            全卷共{{ topicCount[0] + topicCount[1] + topicCount[2] }}题
                            <i class="iconfont icon-time"></i>倒计时：<b>{{ time }}</b>分钟
                        </span>
                    </div>
                    <!--题目区域-->
                    <div class="content">
                        <p class="topic"><span class="number">{{ number }}</span>{{ showQuestion }}</p>
                        <div v-if="currentType == 1">
                            <el-radio-group v-model="radio[index]" @change="getChangeLabel">
                                <el-radio :label="1">{{ showAnswer.answerA }}</el-radio>
                                <el-radio :label="2">{{ showAnswer.answerB }}</el-radio>
                                <el-radio :label="3">{{ showAnswer.answerC }}</el-radio>
                                <el-radio :label="4">{{ showAnswer.answerD }}</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="fill" v-if="currentType == 2">
                            <div v-for="(item,currentIndex) in part" :key="currentIndex">
                                <el-input placeholder="请将答案填在此处"
                                          v-model="fillAnswer[index][currentIndex]"
                                          clearable
                                          @blur="fillBG"
                                          style="width: 500px"
                                >
                                </el-input>
                            </div>
                        </div>
                        <div class="judge" v-if="currentType == 3">
                            <el-radio-group v-model="judgeAnswer[index]" @change="getJudgeLabel"
                                            v-if="currentType == 3">
                                <el-radio :label="1">正确</el-radio>
                                <el-radio :label="2">错误</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="operation">
                        <ul class="end">
                            <li @click="previous()">
                                <el-icon>
                                    <ArrowLeft/>
                                </el-icon>
                                <span>上一题</span>
                            </li>
                            <li @click="mark()"><span>{{ markButtonText }}</span></li>
                            <li @click="next()"><span>下一题</span>
                                <el-icon>
                                    <ArrowRight/>
                                </el-icon>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import cookies from "vue-cookies"
import axios from "axios";
import {ArrowLeft, ArrowRight, CaretBottom, Expand, Fold, UserFilled} from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from "element-plus";


// Declare reactive variables
const startTime = ref(null); // 考试开始时间
const endTime = ref(null); // 考试结束时间
const time = ref(null); // 考试持续时间
const reduceAnswer = ref([]); // 3层以上数据嵌套的变量
const answerScore = ref(0); // 答题总分数
const bg_flag = ref(false); // 已答标识符，已答改变背景色
const isFillClick = ref(false); // 选择题是否点击标识符
const slider_flag = ref(true); // 左侧显示隐藏标识符
const flag = ref(false); // 个人信息显示隐藏标识符
const currentType = ref(1); // 当前题型类型 1--选择题 2--填空题 3--判断题
const radio = ref([]); // 保存考生所有选择题的选项
const title = ref("请选择正确的选项"); // 提示文本
const index = ref(0); // 全局index
const userInfo = ref({ // 用户信息
    name: null,
    id: null
});
const topicCount = ref([]); // 每种类型题目的总数
const score = ref([]); // 每种类型分数的总数
const examData = ref({ // 考试信息
    // source: null,
    // totalScore: null,
});
const topic = ref({}); // 试卷信息
const showQuestion = ref([]); // 当前显示题目信息
const showAnswer = ref({}); // 当前题目对应的答案选项
const number = ref(1); // 题号
const part = ref(null); // 填空题的空格数量
const fillAnswer = ref([[]]); // 二维数组保存所有填空题答案
const judgeAnswer = ref([]); // 保存所有判断题答案
const topic1Answer = ref([]); // 学生选择题作答编号
const rightAnswer = ref('');
const markButtonText = ref("标记"); //标记按钮文本

// Vue Router
const route = useRoute();
const router = useRouter();

// 获取日期格式化字符串
const getTime = (date) => {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1);
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    // 拼接
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
};

// 获取cookie
const getCookies = () => {
    userInfo.value.name = cookies.get("cname");
    userInfo.value.id = cookies.get("cid");
};

// 计算答题分数
const calcuScore = () => {
    // TODO: Your calculation logic here
};

// 获取当前试卷所有信息
const getExamData = async () => {
    const date = new Date();
    startTime.value = getTime(date);

    // 从路由中获取试卷编号 examCode
    const examCode = route.query.examCode as string | undefined;
    if (!examCode) return;

    try {
        const examResponse = await axios(`http://localhost:8999/examManage/exam/${examCode}`);
        // 使用对象展开运算符将请求结果中的 data 属性浅拷贝到 examData 中
        examData.value = {...examResponse.data.data};
        // 初始化题目索引为 0
        index.value = 0;
        // 将总分赋值给 time
        time.value = examData.value.totalScore;

        const paperId = examData.value.paperId;
        const paperResponse = await axios(`http://localhost:8999/paperManage/paper/${paperId}`);
        // 使用对象展开运算符将请求结果中的 data 属性浅拷贝到 topic 中
        topic.value = {...paperResponse.data};

        // console.log(topic.value)

        // 获取当前题目答案并赋值给 reduceAnswer
        const reduceAnswer = topic.value[1][index.value];
        reduceAnswer.value = reduceAnswer;

        // 获取 topic 对象的所有键，并遍历每个键
        const keys = Object.keys(topic.value);
        keys.forEach((e) => {
            // 获取当前键对应的值
            const data = topic.value[e];
            // 将当前键对应值的长度添加到 topicCount 数组中
            topicCount.value.push(data.length);
            let currentScore = 0;
            // 遍历当前键对应值的每个元素
            for (let i = 0; i < data.length; i++) {
                // 将每个元素的分数累加到 currentScore 中
                currentScore += data[i].score;
            }
            // 将计算得到的分数添加到 score 数组中
            score.value.push(currentScore);
        });

        // 获取第二个键对应值的长度
        const len = topicCount.value[1];
        // 初始化一个二维数组，用于存放填空题的答案
        const father: number[][] = [];

        // 根据填空题数量创建二维数组
        for (let i = 0; i < len; i++) {
            const children = [null, null, null, null];
            father.push(children);
        }

        // 将创建的二维数组赋值给 fillAnswer
        fillAnswer.value = father;
        // 获取第一个键对应值的数据
        const dataInit = topic.value[1];
        // 初始化题号为 1
        number.value = 1;
        // 将第一个题目的问题和答案赋值给 showQuestion 和 showAnswer
        showQuestion.value = dataInit[0].question;
        showAnswer.value = dataInit[0];
    } catch (error) {
        // 捕获并打印错误信息
        console.error('Error fetching exam data:', error);
    }
};


// 选择题
const change = (ind) => {

    index.value = ind;
    // 获取当前题目的答案
    reduceAnswer.value = topic.value[1][index.value];
    // 标记为选择题
    currentType.value = 1;

    // 设置是否点击了填空题选项为 true
    isFillClick.value = true;
    // 获取题目数组的长度
    const len = topic.value[1].length;
    // 针对索引进行范围判断
    if (index.value < len) {
        //判断标记状态
        isMark(index.value)
        // 防止索引小于 0
        if (index.value <= 0) {
            index.value = 0;
        }
        // 输出调试信息
        console.log(`总长度${len}`);
        console.log(`当前index:${ind}`);
        // 设置题目标题
        title.value = '请选择正确的选项';
        // 获取当前题目的数据
        const Data = topic.value[1];
        // 更新显示的题目和答案
        showQuestion.value = Data[index.value].question;
        showAnswer.value = Data[index.value];
        // 更新题目编号
        number.value = index.value + 1;
    } else if (index.value >= len) {
        // 索引超过题目数组长度时重置为 0
        index.value = 0;
        // 调用填空题处理函数
        fill(index.value);
    }
};
// 填空题已答题目，如果已答该题目，设置第四个元素为true为标识符
const fillBG = () => {
    if (fillAnswer.value[index.value][0] != null) {
        fillAnswer.value[index.value][3] = true
    }
};
// 填空题
const fill = (ind) => {
    const len = topic.value[2].length;
    currentType.value = 2;
    index.value = ind;

    if (index.value < len) {
        //判断标记状态
        isMark(index.value)
        if (index.value < 0) {
            index.value = topic.value[1].length - 1;
            change(index.value);
        } else {
            console.log(`总长度${len}`);
            console.log(`当前index:${ind}`);

            title.value = '请在文字填写框处填写答案';
            const Data = topic.value[2];

            console.log(Data);
            showQuestion.value = Data[index.value].question;

            const partCount = showQuestion.value.split('()').length - 1;
            part.value = partCount;

            number.value = topicCount.value[0] + index.value + 1;
        }
    } else if (index.value >= len) {
        index.value = 0;
        judge(index.value);
    }
};
// 判断题
const judge = (ind) => {

    const len = topic.value[3].length;
    currentType.value = 3;
    index.value = ind;

    if (index.value < len) {
        //判断标记状态
        isMark(index.value)

        if (index.value < 0) {
            index.value = topic.value[2].length - 1;
            fill(index.value);
        } else {
            console.log(`总长度${len}`);
            console.log(`当前index:${ind}`);

            title.value = '请作出正确判断';
            const Data = topic.value[3];

            console.log(Data);
            showQuestion.value = Data[index.value].question;

            number.value = topicCount.value[0] + topicCount.value[1] + index.value + 1;
        }
    } else if (index.value >= len) {
        index.value = 0;
        change(index.value);
    }
};

// 获取选择题作答选项
const getChangeLabel = (val) => {
    radio.value[index.value] = val //当前选择的序号
    if (val) {
        let data = topic.value[1]
        bg_flag.value = true
        data[index.value]["isClick"] = true
    }
    /* 保存学生答题选项 */
    topic1Answer.value[index.value] = val
};

// 获取判断题作答选项
const getJudgeLabel = (val) => {
    judgeAnswer.value[index.value] = val
    if (val) {
        let data = topic.value[3]
        bg_flag.value = true
        data[index.value]["isClick"] = true
    }
};

// 上一题
const previous = () => {
    index.value--
    switch (currentType.value) {
        case 1:
            change(index.value)
            break
        case 2:
            fill(index.value)
            break
        case 3:
            judge(index.value)
            break
    }
};

// 下一题
const next = () => {
    index.value++

    switch (currentType.value) {
        case 1:
            change(index.value)
            break
        case 2:
            fill(index.value)
            break
        case 3:
            judge(index.value)
            break
    }
};

// 标记功能
const mark = () => {
    const currentTopic = topic.value[currentType.value][index.value];
    // 切换标记状态
    currentTopic.isMark = !currentTopic.isMark;
    // 根据标记状态更新按钮文本
    if (currentTopic.isMark) {
        markButtonText.value = "取消标记";
    } else {
        markButtonText.value = "标记";
    }
};

//判断标记状态
const isMark = (ind) => {
    const currentTopic = topic.value[currentType.value][ind];
    // 根据标记状态更新按钮文本
    if (currentTopic.isMark) {
        markButtonText.value = "取消标记";
    } else {
        markButtonText.value = "标记";
    }
}

// 答案提交计算分数
const commit = (id) => {
    let topicAnswer = topic1Answer.value;
    let finalScore = 0;
    //选择
    topicAnswer.forEach((element, index) => {
        let right = null;

        if (element !== null) {
            switch (element) {
                case 1:
                    right = 'A';
                    break;
                case 2:
                    right = 'B';
                    break;
                case 3:
                    right = 'C';
                    break;
                case 4:
                    right = 'D';
            }

            if (right === topic.value[1][index].rightAnswer) {
                finalScore += topic.value[1][index].score;
            }
        }
    });

    //填空
    let topic2Answer = fillAnswer.value;
    topic2Answer.forEach((element, index) => {
        element.forEach((inner) => {
            if (topic.value[2][index].answer.includes(inner)) {
                finalScore += topic.value[2][index].score;
            }
        });
    });

    //判断
    let topic3Answer = judgeAnswer.value;
    topic3Answer.forEach((element, index) => {
        let right = null;
        switch (element) {
            case 1:
                right = 'T';
                break;
            case 2:
                right = 'F';
        }
        if (right === topic.value[3][index].answer) {
            finalScore += topic.value[3][index].score;
        }
    });


    console.log(`目前总分${finalScore}`);
    if (time.value !== 0) {
        ElMessageBox.confirm(
            '考试结束时间未到,是否提前交卷?',
            '友情提示',
            {
                confirmButtonText: '立即交卷',
                cancelButtonText: '再检查一下',
                type: 'warning',
            }
        )
            .then(() => {
                console.log('交卷');
                let date = new Date();
                endTime.value = getTime(date);
                let answerDate = endTime.value.substr(0, 10);

                //保存分数
                axios({
                    url: 'http://localhost:8999/score/score',
                    method: 'post',
                    data: {
                        examCode: examData.value.examCode,
                        studentId: userInfo.value.id,
                        subject: examData.value.source,
                        etScore: finalScore,
                        answerDate: answerDate,
                    },
                }).then((res) => {
                    if (res.data.code == 200) {
                        let answerToScore = {
                            examCode: id,
                            score: finalScore,
                            startTime: startTime.value,
                            endTime: endTime.value
                        }
                        sessionStorage.setItem("answerToScore", JSON.stringify(answerToScore))
                        //跳转得分界面
                        router.push({
                            path: '/studentScore',
                        });
                    }
                });
            })
            .catch(() => {
                console.log('继续答题');
            });
    }
};

// 倒计时
const showTime = () => {
    setInterval(() => {
        time.value -= 1
        if (time.value == 10) {
            message({
                showClose: true,
                type: 'error',
                message: '考生注意,考试时间还剩10分钟！！！'
            })
            if (time.value == 0) {
                console.log("考试时间已到,强制交卷。")
            }
        }
    }, 1000 * 60)
};

// 钩子函数，组件挂载时执行
onMounted(() => {
    getCookies();
    getExamData();
    showTime();
});
</script>


<style scoped>
#answer {
    background-color: #eee;
    //border: 1px red solid;
}

a {
    text-decoration: none;
}

* {
    margin: 0;
    padding: 0;
}

ul {
    list-style: none;
}

.iconfont.icon-time {
    color: #2776df;
    margin: 0px 6px 0px 20px;
}

.analysis {
    margin-top: 20px;

    .right {
        color: #2776df;
        font-size: 18px;
        border: 1px solid #2776df;
        padding: 0px 6px;
        border-radius: 4px;
        margin-left: 20px;
    }

    ul li:nth-child(2) {
        margin: 20px 0px;
    }

    ul li:nth-child(3) {
        padding: 10px;
        background-color: #d3c6c9;
        border-radius: 4px;
    }
}

.analysis span:nth-child(1) {
    font-size: 18px;
}

.mark {
    position: absolute;
    width: 4px;
    height: 4px;
    content: "";
    background-color: red;
    border-radius: 50%;
    top: 0px;
    left: 22px;
}

.border {
    position: relative;
    border: 1px solid #FF90AA !important;
}

.bg {
    background-color: #5188b8 !important;
}

.fill .el-input {
    display: inline-flex;
    width: 150px;
    margin-left: 20px;

    .el-input__inner {
        border: 1px solid transparent;
        border-bottom: 1px solid #eee;
        padding-left: 20px;
    }
}

/* slider过渡效果 */
.slider-fade-enter-active {
    transition: all .3s ease;
}

.slider-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slider-fade-enter, .slider-fade-leave-to {
    transform: translateX(-100px);
    opacity: 0;
}

.operation .end li:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(39, 118, 223);
    border-radius: 50%;
    width: 70px;
    height: 70px;
    color: #fff;
}

.operation .end li {
    cursor: pointer;
    margin: 0 100px;
}

.operation {
    background-color: #fff;
    border-radius: 4px;
    padding: 10px 0px;
    margin-right: 10px;
}

.operation .end {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(39, 118, 223);
}

.operation .end li {
    display: flex;
    justify-content: center;
    align-items: center;

    //border: 1px red solid;
}

.content .number {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    background-color: rgb(39, 118, 223);
    border-radius: 4px;
    margin-right: 4px;
}

.content {
    padding: 0px 20px;
}

.content .topic {
    padding: 20px 0px;
    padding-top: 30px;
}

.right .content {
    background-color: #fff;
    margin: 10px;
    margin-left: 0px;
    height: 470px;
}

.content .el-radio-group label {
    color: #000;
    margin: 5px 0px;
    align-items: center; /* 垂直居中对齐 */
    //border: 1px red solid;

    width: 1080px;
    height: 40px;
}

.content .el-radio-group {
    //display: flex;
    flex-direction: column;

    //border: 1px red solid;
}

.right .title p {
    margin-left: 20px;
}

.flexarea {
    display: flex;
}

.flexarea .right {
    flex: 1;
}

.auto-right {
    margin-left: auto;
    color: #2776df;
    margin-right: 10px;
}

.right .title {
    margin-right: 10px;
    padding-right: 30px;
    display: flex;
    margin-top: 10px;
    background-color: #fff;
    height: 50px;
    line-height: 50px;
}

.clearfix {
    clear: both;
}

.l-bottom .final {
    cursor: pointer;
    display: inline-block;
    text-align: center;
    background-color: rgb(39, 118, 223);
    width: 240px;
    margin: 20px 0px 20px 10px;
    border-radius: 4px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    margin-top: 22px;
}

#answer .left .item {
    padding: 0px;
    font-size: 16px;
}

.l-bottom {
    border-radius: 4px;
    background-color: #fff;
}

.l-bottom .item ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    list-style: none;
    padding: 0;
}

.l-bottom .item p {
    margin-bottom: 10px;
    margin-top: 10px;
    color: #000;
    margin-left: 10px;
    letter-spacing: 2px;

    //border: 1px red solid;
}

.l-bottom .item li {
    width: 15%;
    margin-left: 5px;
    margin-bottom: 10px;

    //border: 1px red solid;
}

.l-bottom .item {
    //display: flex;
    flex-direction: column;
}

.l-bottom .item ul li a {
    position: relative;
    justify-content: center;
    display: inline-flex;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid #eee;
    text-align: center;
    color: #000;
    font-size: 16px;
}

.left .l-top {
    display: flex;
    justify-content: space-around;
    padding: 16px 0px;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-bottom: 10px;
    background-color: #fff;
}

.left {
    width: 260px;
    height: 100%;
    margin: 10px 10px 0px 10px;

}

.left .l-top li:nth-child(2) a {
    border: 1px solid #eee;
}

.left .l-top li:nth-child(3) a {
    background-color: #5188b8;
    border: none;
}

.left .l-top li:nth-child(4) a {
    position: relative;
    border: 1px solid #eee;
}

.left .l-top li:nth-child(4) a::before {
    width: 4px;
    height: 4px;
    content: " ";
    position: absolute;
    background-color: red;
    border-radius: 50%;
    top: 0px;
    left: 16px;
}

.left .l-top li {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.left .l-top li a {
    display: inline-block;
    padding: 10px;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid #FF90AA;
}

#answer .top {
    background-color: rgb(39, 118, 223);
}

#answer .item {
    color: #fff;
    display: flex;
    padding: 20px;
    font-size: 20px;
}

#answer .top .item li:nth-child(1) {
    margin-right: 10px;
}

#answer .top .item li:nth-child(3) {
    position: relative;
    margin-left: auto;
}

#answer {
    padding-bottom: 30px;
}

.icon20 {
    font-size: 20px;
    font-weight: bold;
}

.item .msg {
    padding: 10px 15px;
    border-radius: 4px;
    top: 47px;
    right: -30px;
    color: #6c757d;
    position: absolute;
    border: 1px solid rgba(0, 0, 0, .15);
    background-color: #fff;
}

.item .msg p {
    font-size: 16px;
    width: 200px;
    text-align: left;
}
</style>
