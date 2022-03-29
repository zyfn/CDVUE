<template>
<div class="threeManager">
    <el-tabs tab-position="right" >
        <el-tab-pane label="资金管理">
            <Funds-manager></Funds-manager>
        </el-tab-pane>
        <el-tab-pane label="资产管理">
            <Assets-manager></Assets-manager>
        </el-tab-pane>
        <el-tab-pane label="资源管理">
            <Resource-manager></Resource-manager>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import FundsManager from './FundsManager.vue'
import AssetsManager from './AssetsManager.vue'
import ResourceManager from './ResourceManager.vue'
export default {
    data() {
        return {
        }
    },
    methods: {

    },
    mounted() {

    },
    components: {
        FundsManager,
        AssetsManager,
        ResourceManager

    },
}
</script>

<style>
.threeManager {
    margin-top: 20px;
}
</style>
