<template>
<div class="nav">
    <el-menu :default-active="defaultActive" router class="el-menu-demo" mode="horizontal" background-color="#dc3a3a" text-color="white"  active-text-color="#ffc34d">
        <el-menu-item index="/home/hot">热点信息</el-menu-item>
        <el-menu-item index="/home/base">基层公开</el-menu-item>
        <el-menu-item index="/home/threeManager">三资管理</el-menu-item>
        <el-menu-item index="/home/question">满意度表</el-menu-item>
    </el-menu>
    <router-view/>
</div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: '/home/hot',
        }
    },
    methods: {

    },
    mounted() {

    },
    computed: {
        defaultActive() {
            // window.console.log('/' + this.$route.path.split('/')[1]+this.$route.path.split('/')[2])
            // return '/' + this.$route.path.split('/').reverse()[0];
            return '/' + this.$route.path.split('/')[1]+'/'+this.$route.path.split('/')[2];
            
        }
    },
    components: {

    },
}
</script>

<style>
.nav {
    width: 70%;
    margin: auto;
    font-size: 20px;
    font-weight: bold;
    
}

.el-menu-demo {
    display: flex;
    justify-content: space-between;
}
</style>
