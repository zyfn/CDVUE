<template>
    <div>
        <div class="search-level">
            <span>根据标题关键字搜索:</span>
            <el-input placeholder="请输入关键字" v-model="input" clearable class="input"></el-input>
            <el-button type="danger" @click="handleSearch()">查询</el-button>
        </div>
        <div class="data-level">
            <ul>
                <li v-for="(item,index) in hotList">
                    <span>{{item.date}}</span>
                    <a @click="handleToDetail(item.id)">{{item.title}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                input: '',
                hotList: [],
            }
        },
        methods: {
            handleToDetail(index) {
                this.$router.push({
                    path: '/hotDetail',
                    query: {
                        id: index,
                    }
                })
            },
            handleSearch() {
                const title = this.input;
                this.$api.hot.getByTitle(title)
                .then((res)=>{
                    this.hotList=res.data
                    console.log(res.data)
                })
                // console.log(title);

            }
        },
        mounted() {
            this.$api.hot.hotAll().then((response) => {
                this.hotList = response.data;
            }).catch((error) => {
                console.log(error);
            })
        }
    }
</script>

<style scoped>
    .search-level {
        text-align: left;
        padding: 10px 20px;
        background: #f1f1f1;
        border-bottom: 1px solid #d9d9d9;
    }

    .input {
        margin: 0 10px 0 20px;
        width: 15%;
    }

    .search-level span {
        color: #1e50a0;
        font-weight: bold;
        font-size: 16px !important;
    }

    .data-level ul {
        text-align: left;
        list-style: none;
        border-bottom: 1px #666666 dashed;
        margin-top: 10px;
        padding: 9px 25px;
        line-height: 30px;
    }

    a:visited {
        color: #000000;
    }

    a:hover {
        color: #d71419;
        /* text-decoration: underline; */
    }

    a {
        text-decoration: none;
    }

    .data-level ul li span {
        float: right;
        padding-right: 15px;
        color: #666666;
    }
</style>