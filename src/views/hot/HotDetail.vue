<template>
<div class="wrapper">
    <h2>{{hot.title}}</h2>
    <div class="hot-operate">
        <span style="float:left">{{hot.date}}</span>
        <span style="float:right">
            〖字体：
            <a @click="handleSize(24)">大</a>&nbsp
            <a @click="handleSize(16)">中</a>&nbsp
            <a @click="handleSize(14)">小</a>
            〗
        </span>
    </div>
    <div class="hot-content">
        <p>{{hot.content}}</p>
    </div>

</div>
</template>

<script>
export default {
    data: function () {
        return {
            hot: {
                id: '',
                title: '',
                date: '',
                content: ''
            },
        }
    },
    methods: {
        handleSize(size) {
            const content = document.getElementsByClassName("hot-content")[0];
            content.style.fontSize = size + 'px';
            content.style.lineHeight = 2 * size + 'px';
        },

    },
    mounted() {
        const id = this.$route.query.id;
        console.log(id);
        this.$api.hot.getById(id).then(response => {
            this.hot = response.data
            console.log(response.data)
        }).catch(() => {

        })
        // this.$axios.get('/hot/getById', {
        //     params: {
        //         id: id
        //     }
        // }).then(response => {
        //     this.hot = response.data;
        // }).catch(error => {

        // })
    }
}
</script>

<style scoped>
.wrapper {
    width: 70%;
    margin: 50px auto;
    padding-top: 50px;
    border: 1px #d9d9d9 solid;
    min-height: 500px;
}

.hot-operate {
    overflow: hidden;
    border-bottom: 1px solid;
    padding: 40px 50px 12px 50px;
    margin-bottom: 20px;
}

.hot-content {
    line-height: 30px;
    text-align: left;
    text-indent: 2em;
    margin: 0 30px;
    font-size: 16px;
}

a:hover {
    cursor: pointer;
    text-decoration: underline;
}
</style>
