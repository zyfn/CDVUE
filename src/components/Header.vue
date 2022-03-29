<template>
<div class="header">
    <div>{{time}}</div>
    <div v-if="!isLogin">
        <el-button type="danger" class="header-button" @click="login()" >登录</el-button>
    </div>
    <div  v-else>
        <span class="header-user">当前用户：<a href="/">{{user.admName}}</a></span>
        <el-button type="danger" class="header-button" @click="logout()">注销</el-button>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            time: '',
            isLogin: false,
            user:{},
        }
    },
    methods: {
        login() {
            this.$router.push('/login')
        },
        logout() {
            this.$store.dispatch('Logout');
            this.$message({
                message: '注销成功',
                type: 'success'
            });
            this.$router.replace('/home')
        }
    },
    mounted() {
        this.time = new Date().toLocaleString();
        setInterval(() => {
            this.time = new Date().toLocaleString();
        }, 1000);
        this.isLogin=this.$store.getters.isLoggedIn;
        this.user=this.$store.state.user;
        // console.log(this.user)
        // console.log(this.user.admName)
    },
    computed: {
        listenLogin() {
            return this.$store.getters.isLoggedIn;
        }
    },
    watch: {
        listenLogin: function (old, newd) {
            this.$router.go(0)
            if(newd){
                this.isLogin=true;
            }
            else{
                this.isLogin=false;
            }
        }
    },
    components: {

    },
}
</script>

<style>
.header {
    height: 70px;
    width: 70%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
}
.header-user{
    font-size: 15px;
    margin-right: 15px;
    /* color:red */
}
</style>
