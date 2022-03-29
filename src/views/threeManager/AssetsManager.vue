<template>
<div class="assetsManager">
    <!-- 资产搜索资产增加头部 -->
    <header class="assetsManager-header">
        <div>
            <el-input placeholder="输入资产名称" v-model="input3" style="width:60%" @keyup.enter.native="assetsSearchByName(input3)"></el-input>
            <el-button type="danger" plain icon="el-icon-search" @click="assetsSearchByName(input3)">搜索</el-button>
        </div>
        <el-button type="danger" icon="el-icon-circle-plus-outline" @click="dialogAddFormVisible = true">增加资产</el-button>
    </header>
    <!-- 资产信息表格 -->
    <el-table :data="assetsTable" style="width: 100%" v-loading="tableLoding">
        <el-table-column label="资产编号">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.assetsId }}</span>
            </template>
        </el-table-column>
        <el-table-column label="资产名称">
            <template slot-scope="scope">
                <span>{{ scope.row.assetsName }}</span>
            </template>
        </el-table-column>
        <el-table-column label="资产类型">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.assetsType }}</span>
            </template>
        </el-table-column>
        <el-table-column label="资产状态">
            <template slot-scope="scope">
                <i class="el-icon-status"></i>
                <span>
                    <el-tag type="success" v-if="scope.row.assetsStatus=='启用'">{{ scope.row.assetsStatus }}</el-tag>
                    <el-tag type="danger" v-else>{{ scope.row.assetsStatus }}</el-tag>
                </span>
            </template>
        </el-table-column>
        <el-table-column prop="assetsNature" label="性质">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.assetsId)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 资产增加 -->
    <el-dialog title="资产添加" :visible.sync="dialogAddFormVisible" :before-close="handleClose">
        <el-form :model="assetsAddForm">
            <el-form-item label="资产名称" :label-width="formLabelWidth">
                <el-input v-model="assetsAddForm.assetsName" autocomplete="off" style="width:80%"></el-input>
            </el-form-item>
            <el-form-item label="资产类型" :label-width="formLabelWidth">
                <el-select v-model="assetsAddForm.assetsType" placeholder="请选择资产类型" style="width:80%">
                    <el-option label="办公设备" value="办公设备"></el-option>
                    <el-option label="交通设备" value="交通设备"></el-option>
                    <el-option label="移动设备" value="移动设备"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资产状态" :label-width="formLabelWidth">
                <el-select v-model="assetsAddForm.assetsStatus" placeholder="请选择资产状态" style="width:80%">
                    <el-option label="启用" value="启用"></el-option>
                    <el-option label="停用" value="停用"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资产性质" :label-width="formLabelWidth">
                <el-input v-model="assetsAddForm.assetsNature" autocomplete="off" style="width:80%"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm()">取 消</el-button>
            <el-button type="danger" @click="assetsAdd()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 资产修改 -->
    <el-dialog title="资产修改" :visible.sync="dialogUpdateFormVisible">
        <el-form :model="assetsUpdateForm" ref="tt">
            <el-form-item label="资产名称" :label-width="formLabelWidth">
                <el-input v-model="assetsUpdateForm.assetsName" autocomplete="off" style="width:80%"></el-input>
            </el-form-item>
            <el-form-item label="资产类型" :label-width="formLabelWidth">
                <el-select v-model="assetsUpdateForm.assetsType" placeholder="请选择资产类型" style="width:80%">
                    <el-option label="办公设备" value="办公设备"></el-option>
                    <el-option label="交通设备" value="交通设备"></el-option>
                    <el-option label="移动设备" value="移动设备"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资产状态" :label-width="formLabelWidth">
                <el-select v-model="assetsUpdateForm.assetsStatus" placeholder="请选择资产状态" style="width:80%">
                    <el-option label="启用" value="启用"></el-option>
                    <el-option label="停用" value="停用"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资产性质" :label-width="formLabelWidth">
                <el-input v-model="assetsUpdateForm.assetsNature" autocomplete="off" style="width:80%"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogUpdateFormVisible = false">取 消</el-button>
            <el-button type="danger" @click="assetsUpdate()">修 改</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            input3: '',
            dialogAddFormVisible: false,
            dialogUpdateFormVisible: false,
            assetsAddForm: {},
            assetsUpdateForm: {
                assetsId: '',
                assetsName: '',
                assetsType: '',
                assetsStatus: '',
                assetsNature: '',
            },
            formLabelWidth: '100px',
            assetsTable: [],
            tableLoding: true
        }
    },
    methods: {
        handleEdit(row) {
            //  this.assetsUpdateForm=row
            //  console.log(this.assetsUpdateForm)
            this.dialogUpdateFormVisible = true;
            this.assetsUpdateForm.assetsId = row.assetsId;
            this.assetsUpdateForm.assetsName = row.assetsName;
            this.assetsUpdateForm.assetsType = row.assetsType;
            this.assetsUpdateForm.assetsStatus = row.assetsStatus;
            this.assetsUpdateForm.assetsNature = row.assetsNature
        },
        handleDelete(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.assetsRemove(id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        assetsSearchAll() {
            this.tableLoding = true;
            this.$api.assets.assetsSearchAll()
                .then((res) => {
                    setTimeout(() => {
                        this.tableLoding = false;
                    }, 1000)
                    this.assetsTable = res.data;
                    console.log(res)
                    console.log(this.assetsTable)
                })
                .catch((err) => {
                    console.log(err)
                });
        },
        assetsSearchByName(input3) {
            // 调用查询的api
            this.tableLoding = true;
            this.$api.assets.assetsSearchByName(input3)
                .then((res) => {
                    setTimeout(() => {
                        this.tableLoding = false;
                        this.$message({
                            message: '查询成功',
                            type: 'success'
                        });
                    }, 1000)
                    console.log(res)
                    this.assetsTable = res.data;
                    this.dialogUpdateFormVisible = false
                })
                .catch((err) => {
                    console.log(err)
                    this.dialogUpdateFormVisible = false
                });
        },
        assetsUpdate() {
            // 调用修改的api
            this.$api.assets.assetsUpdate(this.assetsUpdateForm)
                .then((res) => {
                    console.log(res)
                    this.assetsSearchAll();
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.dialogUpdateFormVisible = false
                })
                .catch((err) => {
                    console.log(err)
                    this.dialogUpdateFormVisible = false
                })

        },
        assetsAdd() {
            // 调用增加的api
            this.$api.assets.assetsAdd(this.assetsAddForm)
                .then((res) => {
                    this.assetsSearchAll();
                    console.log(res)
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.dialogAddFormVisible = false
                })
                .catch((err) => {
                    console.log(err)
                    this.dialogAddFormVisible = false
                });
        },
        assetsRemove(id) {
            this.$api.assets.assetsRemove(id)
                .then((res) => {
                    this.assetsSearchAll();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                });
        },
        resetForm() {
            this.dialogAddFormVisible = false;
            this.assetsAddForm = {};
        },
        handleClose(done) {
            this.assetsAddForm = {};
            done();
        }
    },
    mounted() {
        this.assetsSearchAll();
    },
    components: {

    },
}
</script>

<style>
.assetsManager-header {
    margin: 0px 0 50px 0;
    display: flex;
    justify-content: space-between
}
</style>
