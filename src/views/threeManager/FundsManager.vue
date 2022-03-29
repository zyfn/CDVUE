<template>
<div class="fundsManager">
    <!-- 资金搜索资金增加头部 -->
    <header class="fundsManager-header">
        <div>
            <el-input placeholder="请输入资金类型" v-model="input3" style="width:60%" @keyup.enter.native="fundsSearchByType(input3)"></el-input>
            <el-button type="danger" plain icon="el-icon-search" @click="fundsSearchByType(input3)">搜索</el-button>
        </div>
        <el-button type="danger" icon="el-icon-circle-plus-outline" @click="dialogAddFormVisible = true">批准资金</el-button>
    </header>
    <!-- 资金信息表格 -->
    <el-table :data="fundsTable" style="width: 100%" v-loading="tableLoding">
        <el-table-column label="资金编号">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.fundsId }}</span>
            </template>
        </el-table-column>
        <el-table-column label="资金类型">
            <template slot-scope="scope">
                <span>{{ scope.row.fundsType }}</span>
            </template>
        </el-table-column>
        <el-table-column label="资金状态">
            <template slot-scope="scope">
                <i class="el-icon-status"></i>
                <span style="margin-left: 10px">
                    <el-tag type="success" v-if="scope.row.fundsStatus=='启用'">{{ scope.row.fundsStatus }}</el-tag>
                    <el-tag type="danger" v-else>{{ scope.row.fundsStatus }}</el-tag>
                </span>
            </template>
        </el-table-column>
        <el-table-column prop="fundsBalance" label="资金余额">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.fundsId)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 资金批准 -->
    <el-dialog title="资金添加" :visible.sync="dialogAddFormVisible" :before-close="handleClose">
        <el-form :model="fundsAddForm">
            <el-form-item label="资金类型" :label-width="formLabelWidth">
                <el-select v-model="fundsAddForm.fundsType" placeholder="请选择资金类型" style="width:80%">
                    <el-option label="县资" value="县资"></el-option>
                    <el-option label="村资" value="村资"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资金状态" :label-width="formLabelWidth">
                <el-select v-model="fundsAddForm.fundsStatus" placeholder="请选择资金状态" style="width:80%">
                    <el-option label="启用" value="启用"></el-option>
                    <el-option label="停用" value="停用"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资金余额" :label-width="formLabelWidth">
                <el-input v-model="fundsAddForm.fundsBalance" autocomplete="off" style="width:80%"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm()">取 消</el-button>
            <el-button type="danger" @click="fundsAdd()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 资金修改 -->
    <el-dialog title="资金修改" :visible.sync="dialogUpdateFormVisible">
        <el-form :model="fundsUpdateForm">
            <el-form-item label="资金类型" :label-width="formLabelWidth">
                <el-select v-model="fundsUpdateForm.fundsType" placeholder="请选择资金类型" style="width:80%">
                    <el-option label="县资" value="选项一"></el-option>
                    <el-option label="村资" value="选项二"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资金状态" :label-width="formLabelWidth">
                <el-select v-model="fundsUpdateForm.fundsStatus" placeholder="请选择资金状态" style="width:80%">
                    <el-option label="启用" value="启用"></el-option>
                    <el-option label="停用" value="停用"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资金余额" :label-width="formLabelWidth">
                <el-input v-model="fundsUpdateForm.fundsBalance" autocomplete="off" style="width:80%"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogUpdateFormVisible = false">取 消</el-button>
            <el-button type="danger" @click="fundsUpdate()">修 改</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {
    setTimeout
} from 'timers';
export default {
    data() {
        return {
            input3: '',
            dialogAddFormVisible: false,
            dialogUpdateFormVisible: false,
            fundsAddForm: {},
            fundsUpdateForm: {
                fundsId: '',
                fundsType: '',
                fundsStatus: '',
                fundsBalance: ''
            },
            formLabelWidth: '100px',
            fundsTable: [],
            tableLoding: true
        }
    },
    methods: {
        handleEdit(row) {
            // this.fundsUpdateForm = row;
            this.dialogUpdateFormVisible = true;
            this.fundsUpdateForm.fundsId = row.fundsId;
            this.fundsUpdateForm.fundsType = row.fundsType;
            this.fundsUpdateForm.fundsStatus = row.fundsStatus;
            this.fundsUpdateForm.fundsBalance = row.fundsBalance
        },
        handleDelete(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.fundsRemove(id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        fundsSearchAll() {
            this.tableLoding = true;
            this.$api.funds.fundsSearchAll()
                .then((res) => {
                    setTimeout(() => {
                        this.tableLoding = false;
                    }, 1000)
                    this.fundsTable = res.data;
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                });
        },
        fundsSearchByType(input3) {
            // 调用查询的api
            this.tableLoding = true;
            this.$api.funds.fundsSearchByType(input3)
                .then((res) => {
                    setTimeout(() => {
                        this.tableLoding = false;
                        this.$message({
                            message: '查询成功',
                            type: 'success'
                        });
                    }, 1000)
                    this.fundsTable = res.data;
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                });
        },
        fundsUpdate() {
            // 调用修改的api
            this.$api.funds.fundsUpdate(this.fundsUpdateForm)
                .then((res) => {
                    this.fundsSearchAll();
                    this.dialogUpdateFormVisible = false;
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    console.log(res)
                })
                .catch((err) => {
                    this.dialogUpdateFormVisible = false;
                    console.log(err)
                });
        },
        fundsAdd() {
            // 调用增加的api
            this.$api.funds.fundsAdd(this.fundsAddForm)
                .then((res) => {
                    this.fundsSearchAll();
                    this.dialogAddFormVisible = false;
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    console.log(res)
                })
                .catch((err) => {
                    this.dialogAddFormVisible = false;
                    console.log(err)
                });
        },
        fundsRemove(id) {
            this.$api.funds.fundsRemove(id)
                .then((res) => {
                    this.fundsSearchAll();
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
            this.fundsAddForm = {};
        },
        handleClose(done) {
            this.fundsAddForm = {};
            done();
        }
    },
    mounted() {
        this.fundsSearchAll();
    },
    components: {

    },
}
</script>

<style>
.fundsManager-header {
    margin: 0px 0 50px 0;
    display: flex;
    justify-content: space-between
}
</style>
