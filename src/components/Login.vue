<template>
<div class="Login">
    <div class="Login-bg"></div>
    <div class="Login-index">

        <div class="GoRegin" v-bind:class="{ComeLogin:isComeLogin,ComeRegin:isComeRegin}" v-if="!haveCount">
            <h1 style="padding-bottom:20%;color:#66CDAA">Regin</h1>
            <el-form :model="userRegin" status-icon label-width="50px" ref="ruleForm2" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="userRegin.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="userRegin.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model.number="userRegin.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('userRegin')">注册</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="GoLogin" v-bind:class="{ComeLogin:isComeLogin,ComeRegin:isComeRegin}" v-else>
            <h1 style="padding-bottom:20%;color:#66CDAA">Login</h1>
            <el-form :model="userLogin" status-icon :rules="rules2" label-width="50px" ref="ruleForm2" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="userLogin.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="userLogin.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login()">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="moveBg" v-bind:class="{moveBgRight:CountNotExist,moveBgLeft:isCountExist}"></div>
        <div class="count-noexist" v-bind:class="{countNoExist:CountNotExist,countNoExistMove:isCountExist}">
            <h1>没有账号?</h1>
            <el-button @click="ComeRegin()">点此注册</el-button>
        </div>
        <div class="count-exist" v-bind:class="{countExist:isCountExist,countNotExist:CountNotExist}">
            <h1>已有账号?</h1>
            <el-button @click="ComeLogin()">点此登录</el-button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            userRegin: {
                username: '',
                password: '',
                name: '',
            },
            userLogin: {},
            userInfo: {
                admId:'',
                admName:'',
                admPassword:'',
                admUsername:''
            },
            isComeLogin: false,
            isCountExist: false,
            haveCount: false,
            CountNotExist: false,
            isComeRegin: false,
        }
    },
    methods: {
        ComeLogin() {
            this.isComeLogin = true;
            this.isCountExist = true;
            this.CountNotExist = false;
            this.isComeRegin = false;
            this.haveCount = true;
        },
        ComeRegin() {
            this.CountNotExist = true;
            this.isComeRegin = true;
            this.isComeLogin = false;
            this.isCountExist = false;
            this.haveCount = false;
        },
        login() {
            this.$api.login(this.userLogin.username, this.userLogin.password)
                .then((res) => {
                    console.log(res.data)
                    let mes = res.data.message
                    let userInfo =res.data.adm
                    console.log(userInfo)
                    if (mes === "登录成功") {
                        this.$store.dispatch('Login',userInfo);
                        // localStorage.setItem("user", res.data.adm);
                        this.$message({
                            message: mes,
                            type: 'success'
                        });
                        // window.sessionStorage.setItem('user',res.data.adm)
                        this.$router.replace('/home')
                    } else if (mes === "账号或密码错误") {
                        // this.$router.push({path:'/login',query:mes})
                        this.$message.error(mes);
                    }
                })
        }
    },
    mounted() {
        console.log(this.$route.query)
    }
}
</script>

<style>
.Login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    /* height: 100vh; */
}

.Login-bg {
    width: 100%;
    height: 100%;
    background: url('../static/login.jpg');
    background-size: 100% 100%;
    /* filter: blur(1px); */
    position: absolute;
    z-index: -1;
}

.Login-index {
    width: 60%;
    height: 500px;
    z-index: 0;
    /* background-color:white; */
    /* filter:opacity(0.9); */

    margin-top: 10%;
    /* border-radius: 3%; */
    position: relative;

}

.GoRegin {
    border: 1px solid gray;
    box-sizing: border-box;
    padding: 3% 10% 8% 8%;
    background-color: rgba(255, 255, 255, 0.6);
    width: 50%;
    position: absolute;
    height: 500px;
    box-shadow: 3px 3px 6px #888888;

}

.GoLogin {
    border: 1px solid gray;
    box-sizing: border-box;
    padding: 5% 10% 13% 8%;
    background-color: rgba(255, 255, 255, 0.6);
    width: 52%;
    position: absolute;
    height: 500px;
    box-shadow: 3px 3px 6px #888888;
}

.ComeLogin {
    animation: login 1s linear forwards;
}

.ComeRegin {
    animation: regin 1s linear forwards;
}

.countExist {
    animation: countExist 0.5s forwards;
}

.countNotExist {
    animation: countNotExist 1s linear forwards;
}

.countNoExist {
    animation: countNoExist 0.5s forwards;
}

.countNoExistMove {
    animation: countNoExistMove 1s linear forwards;
}

.count-noexist {
    color: white;
    margin-top: 20%;
    margin-left: 15%;
    float: left;
    visibility: hidden;
}

.count-exist {
    color: white;
    margin-left: 50%;
    margin-top: 20%;

}

.moveBg {
    height: 500px;
    width: 50%;
    background: url('../static/3.jpg');
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    z-index: -1;
    /* opacity: 0.6; */
}

.moveBgLeft {
    animation: moveBgLeft 1s linear forwards;
}

.moveBgRight {
    animation: moveBgRight 1s linear forwards;
}

@keyframes login {
    0% {
        left: 0%
    }

    25% {
        left: 25%
    }

    50% {
        left: 40%
    }

    75% {
        left: 53%
    }

    to {
        left: 50%;
    }

}

@keyframes regin {
    from {
        left: 50%;
    }

    25% {
        left: 30%;
    }

    50% {
        left: 15%
    }

    75% {
        left: -3%
    }

    to {
        left: 0%;
    }

}

@keyframes countExist {
    from {
        /* opacity: 1; */
        visibility: hidden;
    }

    to {
        /* opacity: 0; */
        /* z-index:-100 */
        visibility: hidden;
    }
}

@keyframes countNotExist {
    from {
        visibility: hidden;
    }

    70% {
        margin-left: 65%;
    }

    90% {
        visibility: hidden;
    }

    to {
        visibility: visible;
        margin-left: 55%;
    }
}

@keyframes countNoExist {
    from {
        /* display: block; */
        /* opacity: 1; */
        visibility: hidden;
    }

    to {
        /* display: none; */
        /* opacity: 0; */
        visibility: hidden;
    }
}

@keyframes countNoExistMove {
    from {
        visibility: hidden;
    }

    40% {
        margin-left: 3%;
    }

    90% {
        visibility: hidden;
    }

    to {
        margin-left: 15%;
        visibility: visible;

    }
}

@keyframes moveBgLeft {
    from {
        left: 50%;
        z-index: 2;
    }

    50% {
        left: 15%
    }

    75% {
        left: -3%
    }

    to {
        left: 0%;
        /* border-radius: 3%; */
        z-index: -1;
    }
}

@keyframes moveBgRight {
    from {
        left: 0%;
        z-index: 2;
    }

    50% {
        left: 35%
    }

    75% {
        left: 53%
    }

    to {
        left: 50%;
        /* border-radius: 3%; */
        z-index: -1
    }
}
</style>
