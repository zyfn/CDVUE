<template>
<div class="base">
    <el-row>
        <el-col :span="5">
            <div class="base-title"><i class="el-icon-folder"></i>栏目导航</div>
            <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" background-color="	#BDB76B" text-color="#fff" active-text-color="#ffd04b">
                <el-submenu v-for="(io,index) in info" :key="index" :index="index.toString()">
                    <template slot="title">
                        <i class="el-icon-location" style="backgrounder:red;color:red;"></i>
                        <span>{{io.title}}</span>
                    </template>
                    <el-menu-item style="min-width:100px" :index="`${index}-${index1}`" v-for="(name,index1) in io.name" :key="index1" @click="intoAnother(name.fatherTitle,`${index}-${index1}`)" v-if="!name.childTitle">{{name.fatherTitle}}</el-menu-item>
                    <el-submenu :index="`${index}-${index1}`" v-for="(name,index1) in io.name" :key="index1" v-if="name.childTitle">
                        <template slot="title">{{name.fatherTitle}}</template>
                        <el-menu-item style="min-width:100px" :index="`${index}-${index1}-${index2}`" v-for="(childTitle,index2) in name.childTitle" @click="intoAnother(childTitle.name,`${index}-${index1}-${index2}`)" :key="index2">{{childTitle.name}}</el-menu-item>
                    </el-submenu>
                </el-submenu>
            </el-menu>
        </el-col>
        <el-col :span="19">
            <router-view />
            <!-- <Base-content :fatherTitle="fatherTitle" :title="title" :childTitle="childTitle"></Base-content> -->
        </el-col>
    </el-row>
</div>
</template>

<script>
import BaseTitleList from './BaseTitleList.vue'
export default {
    data() {
        return {
            // fatherTitle:'乡镇党务公开',
            title: '党组织情况',
            // childTitle:'',
            index: '0-0',
            info: [{
                    title: '乡镇党务公开',
                    name: [{
                            fatherTitle: '党组织情况',
                        },
                        {
                            fatherTitle: '干部选拔',
                        },
                        {
                            fatherTitle: '党员发展',
                        },
                        {
                            fatherTitle: '作风建设',
                        },
                    ]
                },
                {
                    title: '乡镇政务公开',
                    name: [{
                            fatherTitle: '机构信息',
                            //   childTile:[{name:'child'},{name:'child'},{name:'child'}]
                        },
                        {
                            fatherTitle: '政府决策',
                            // childTitle: [
                            //     //     {
                            //     //     name: '发展规划'
                            //     // }, {
                            //     //     name: '重点工作'
                            //     // }, {
                            //     //     name: '重点项目'
                            //     // }
                            // ]
                        },
                        {
                            fatherTitle: '人事信息'
                        },
                        {
                            fatherTitle: '财政信息'
                        },
                    ]
                },
                {
                    title: '村党务公开',
                    name: [{
                            fatherTitle: '党组织决定'
                        },
                        {
                            fatherTitle: '干部选拔'
                        },
                        {
                            fatherTitle: '党员发展'
                        },
                        {
                            fatherTitle: '作风建设'
                        },
                    ]
                },
                {
                    title: '村政务公开',
                    name: [{
                            fatherTitle: '机构信息',
                        },
                        {
                            fatherTitle: '政府决策',
                        },
                        {
                            fatherTitle: '人事信息'
                        },
                        {
                            fatherTitle: '财政信息'
                        },
                    ]
                },
                {
                    title: '村村务公开',
                    name: [{
                            fatherTitle: '组务公开'
                        },
                        {
                            fatherTitle: '财政公开'
                        },
                    ]
                }
            ],
        }
    },
    methods: {
        intoAnother(title, index) {
            // window.console.log(title + 'zz' + index+'zz'+fatherTitle+'zz'+childTitle);
            // window.console.log(title);
            // this.title=title;
            // this.fatherTitle=fatherTitle;
            // this.childTitle=childTitle
            this.$router.push({
                path: '/home/base/baseTitleList/' + index,
                query: {
                    title: title
                }
            })
        }
    },
    mounted() {
        // this.$router.push({path:'/home/base/baseTitleList/' + this.index,query:{title:this.title}})
    },
    computed: {
        defaultActive() {
            return this.$route.path.split('/')[4];

        }
    },
    components: {
        BaseTitleList
    },
}
</script>

<style scoped>
.base {
    margin-top: 20px;
}

.base-title {
    min-width: 100px;
    height: 50px;
    line-height: 50px;
    border: 1px;
    background:	#F5DEB3;
}

.el-menu-vertical-demo {
    min-width: 100px;
}
</style>
