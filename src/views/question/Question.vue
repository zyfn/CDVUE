<template>
<div class="sta">
    <div>创建满意度评价题目</div>
    <el-form ref="questionForm">
        <span style="width:80px">标题:</span>
        <el-input placeholder="请输入标题" v-model="sumTitle.theme_title" clearable class="sta-title"></el-input></br>

        <div class="sta-question">
            <span style="width:180px"></span>
            <el-button type="danger" @click="addQuestion()">增加题目</el-button>
            <el-button type="danger" @click="removeQuestion()">删除题目</el-button>
        </div>
        <div v-for="(inp,index) in input" :key="index">
            <span style="width:80px;">题目{{++index}}:</span>
            <el-input placeholder="请输入题目" v-model="inp.question_des" clearable class="sta-input">
            </el-input>
        </div>
        <el-button type="danger" @click="submitTitle()">提交</el-button>
    </el-form>
</div>
</template>

<script>
export default {
    data() {
        return {
            input: [{
                question_des: ''
            }, {
                question_des: ''
            }],
            sumTitle: {
                theme_title: '',
                theme_create_time: '',
            },
            id: '',
            questionPto: {
                questions: ''
            },
        }
    },
    methods: {
        addQuestion() {
            this.input.push({});
            console.log(this.input.length)
        },
        removeQuestion() {
            this.input.splice(this.input.length - 1, 1)
        },
        submitTitle1() {

        },
        submitTitle() {
            this.sumTitle.theme_create_time = new Date();
            this.$api.question.addTitle(this.sumTitle)
                .then((res) => {
                    this.id = res.data;
                    this.questionPto.questions = this.input;
                    this.questionPto.theme_id = this.id;
                    this.$api.question.addQuestion(this.questionPto)
                        .then((res) => {
                            this.resetFiled();
                            this.$message({
                                message: '创建问卷成功',
                                type: 'success'
                            });
                            console.log(res)
                        })
                    console.log(this.id)
                })
        },
        resetFiled() {
            this.sumTitle = {},
                this.input = [{
                    question_des: ''
                }, {
                    question_des: ''
                }]
        }
    },
    mounted() {

    },
    components: {

    },
}
</script>

<style>
.sta {
    margin: 20px;
}

.sta-title {
    width: 70%;
    margin: 20px;
    /* margin-left: 80px; */
}

.sta-input {
    margin: 10px;
    width: 70%;
    /* margin: auto */
}

.sta-question {
    display: flex;
    justify-content:left;
    /* margin-left:180px */
}
</style>
