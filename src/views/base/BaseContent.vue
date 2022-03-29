<template>
<div class="baseContent-border">
    <div class="baseContent">
        <div v-if="this.type==='党务'">
            <h2>{{content.party_name}}</h2>
            <div class="baseContent-time">
                <div> {{content.party_create_time}}</div>
                <div>
                    〖字体：
                    <a @click="handleSize(24)">大</a>&nbsp
                    <a @click="handleSize(16)">中</a>&nbsp
                    <a @click="handleSize(14)">小</a>
                    〗
                </div>
            </div>
            <div class="baseContent-divider">
                <el-divider></el-divider>
            </div>
            <div class="baseContent-info">
                {{content.party_info}}
            </div>
        </div>
        <div v-if="this.type==='政务'">
            <h2>{{content.government_name}}</h2>
            <div class="baseContent-time">
                <div> {{content.government_create_time}}</div>
                <div>
                    〖字体：
                    <a @click="handleSize(24)">大</a>&nbsp
                    <a @click="handleSize(16)">中</a>&nbsp
                    <a @click="handleSize(14)">小</a>
                    〗
                </div>
            </div>
            <div class="baseContent-divider">
                <el-divider></el-divider>
            </div>
            <div class="baseContent-info">
                {{content.government_info}}
            </div>
        </div>
        <div v-if="this.type==='村务'">
            <h2>{{content.village_name}}</h2>
            <div class="baseContent-time">
                <div>{{content.village_create_time}}</div>
                <div>
                    〖字体：
                    <a @click="handleSize(24)">大</a>&nbsp
                    <a @click="handleSize(16)">中</a>&nbsp
                    <a @click="handleSize(14)">小</a>
                    〗
                </div>
            </div>
            <div class="baseContent-divider">
                <el-divider></el-divider>
            </div>
            <div class="baseContent-info">
                {{content.village_info}}
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            type: '',
            content: {}
        }
    },
    methods: {
        handleSize(size) {
            let content = document.getElementsByClassName("baseContent-info")[0];
            content.style.fontSize = size + 'px';
            content.style.lineHeight = 2 * size + 'px';
        },

    },
    mounted() {
        // console.log(this.$route)
        this.type = this.$route.query.type;
        this.content = this.$route.query.c;
        // console.log(this.content);
    },
    components: {

    },
}
</script>

<style scoped>
.baseContent-border {
    margin-bottom: 100px;
}

.baseContent {
    padding: 0px 30px 30px;
    margin-top: 30px;
    border: 1px solid #d9d9d9;
    font-size: 20px;
}

.baseContent-time {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    color: #666;
}

.baseContent-info {
    text-align: left;
    text-indent: 2em;
    font-size: 16px;
    font-weight: 400;
}

.baseContent-divider {
    /* width: 90%; */
    margin: auto
}
a:hover {
    cursor: pointer;
    text-decoration: underline;
}
</style>
