<template>
<div class="baseTitleList">
    <!-- 党务 -->
    <div v-if="type==='党务'">
        <header class="baseTitleList-title">
            {{title}}
        </header>
        <main v-for="(c,index) in content1" :key="index" class="baseTitleList-main">
            <router-link :to="{path: '/home/baseContent', query: {c,type} }" class="baseTitleList-main-link">
                <div>
                    <span>[{{c.party_township_name}}]</span>
                    <span>{{c.party_name}}</span>
                </div>
            </router-link>
            <div>
                {{c.party_create_time}}
            </div>
        </main>
        <footer>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="this.content.length">
            </el-pagination>
        </footer>
    </div>
    <!-- 政务 -->
    <div v-if="type==='政务'">
        <header class="baseTitleList-title">
            {{title}}
        </header>
        <main v-for="(c,index) in content1" :key="index" class="baseTitleList-main">
            <router-link :to="{path: '/home/baseContent', query: {c,type} }" class="baseTitleList-main-link">
                <div>
                    <span>[{{c.government_township_name}}]</span>
                    <span>{{c.government_name}}</span>
                </div>
            </router-link>
            <div>
                {{c.government_create_time}}
            </div>
        </main>
        <footer>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 5, 10, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="this.content1.length">
            </el-pagination>
        </footer>
    </div>
    <!-- 村务 -->
    <div v-if="type==='村务'">
        <header class="baseTitleList-title">
            {{title}}
        </header>
        <div>这是内容</div>
        <main v-for="(c,index) in content1" :key="index" class="baseTitleList-main">
            <router-link :to="{path: '/home/baseContent', query: {c,type} }" class="baseTitleList-main-link">
                <div>
                    <span>[{{c.village_township_name}}]</span>
                    <span>{{c.village_name}}</span>
                </div>
            </router-link>
            <div>
                {{c.village_create_time}}
            </div>
        </main>
        <footer>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 5, 10, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="this.content1.length">
            </el-pagination>
        </footer>
    </div>

</div>
</template>

<script>
export default {
    data() {
        return {
            id: '',
            title: '',
            iid: '',
            currentPage: 1,
            pageSize: 10,
            content: [],
            content1: '',
            type: ''
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.content1 = this.content.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);

        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.content1 = this.content.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        },
        getContent(id) {
            // this.$api.getContent(id)
            //     .then((res) => {
            //         this.content = res.data.content;
            //     })
            //     .catch((err) => {
            //         window.console.log(err);
            //     })
            let newType = id.split("-")[0];
            console.log(newType);
            if (newType == 0 || newType == 2) {
                this.type = "党务";
                this.$api.base.getPartyByModel(id)
                    .then((res) => {
                        this.content = res.data
                        this.content1 = this.content.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
                        console.log(res.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            } else if (newType == 1 || newType == 3) {
                this.type = "政务";
                this.$api.base.getGovernmentByModel(id)
                    .then((res) => {
                        this.content = res.data
                        this.content1 = this.content.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
                        console.log(res.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            } else if (newType == 4) {
                this.type = "村务";
                this.$api.base.getVillageByModel(id)
                    .then((res) => {
                        this.content = res.data

                        this.content1 = this.content.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
                        console.log(res.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            }
        }
    },
    mounted() {
        this.id = this.$route.params.id;
        this.title = this.$route.query.title;
        this.getContent(this.id);
        // window.console.log(this.$route.params.id)

    },
    watch: {
        '$route'(to, from) {
            // 对路由变化作出响应...
            this.id = to.params.id;
            this.title = to.query.title;
            this.getContent(this.id);
            window.console.log(to);
        },
    },
    components: {

    },
}
</script>

<style scoped>
.baseTitleList-title {
    margin-bottom: 50px;
    font-size: 25px;
    color:darkgoldenrod
}

.baseTitleList-main {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-size: 18px;
}
.baseTitleList-main-link:link{
    color:brown
}
.baseTitleList-main-link:visited{
    color:brown
}
.baseTitleList-main-link:active{
    color:brown

}
</style>
