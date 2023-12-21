<template>
    <header-view></header-view>
    <div class="table">
        <p class="title">我的分数</p>
        <section class="content-el">
            <el-table ref="filterTable" :data="score" v-loading="loading">
                <el-table-column
                    prop="answerDate"
                    label="考试日期"
                    sortable
                    width="300"
                    column-key="answerDate"
                    :filters="filter"
                    :filter-method="filterHandler"
                ></el-table-column>
                <el-table-column prop="subject" label="课程名称" width="300" filter-placement="bottom-end">
                    <template #default="{ row }">
                        <el-tag>{{ row.subject }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="etScore" label="考试分数" width="200"></el-table-column>
                <el-table-column label="是否及格" width="100">
                    <template #default="{ row }">
                        <el-tag :type="row.etScore >= 60 ? 'success' : 'danger'">
                            {{ row.etScore >= 60 ? '及格' : '不及格' }}
                        </el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <el-row type="flex" justify="center" align="middle" class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagination.current"
                    :page-sizes="[4, 6, 8, 10]"
                    :page-size="pagination.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total"
                ></el-pagination>
            </el-row>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from "axios";
import HeaderView from "@/components/ljk/headerView.vue";

const pagination = ref({
    current: 1,
    total: null,
    size: 10,
});

const loading = ref(false);
const score = ref([]);
const filter = ref(null);

const getScore = () => {
    // const studentId = import.meta.env.VITE_STUDENT_ID; // 从环境变量获取学生ID
    const studentId = $cookies.get('cid'); // 从环境变量获取学生ID
    console.log("@",studentId)
    loading.value = true;

    // 使用 API 请求数据
    // 假设 this.$axios 是已经在全局配置中注册的 Axios 实例
    axios(`http://localhost:8999/score/score/${pagination.value.current}/${pagination.value.size}/${studentId}`)
        .then((res) => {
            if (res.data.code === 200) {
                loading.value = false;
                score.value = res.data.data.records;
                pagination.value = { ...res.data.data };

                const mapVal = score.value.map((element) => ({
                    text: element.answerDate,
                    value: element.answerDate,
                }));

                const hash = {};
                const newArr = mapVal.filter((next) => {
                    const isDuplicate = hash[next.text];
                    hash[next.text] = true;
                    return !isDuplicate;
                });

                filter.value = newArr;
            }
        })
        .catch((error) => {
            console.error('Error fetching score:', error);
        });
};

const handleSizeChange = (val) => {
    pagination.value.size = val;
    getScore();
};

const handleCurrentChange = (val) => {
    pagination.value.current = val;
    getScore();
};

const formatter = (row, column) => row.address;

const filterTag = (value, row) => row.tag === value;

const filterHandler = (value, row, column) => row[column.property] === value;

onMounted(() => {
    getScore();
});
</script>

<style scoped>
.pagination {
  padding-top: 20px;
}
.table {
  width: 980px;
  margin: 0 auto;
  .title {
    margin: 20px;
  }
  .content-el {
    background-color: #fff;
    padding: 20px;
  }
}
</style>
