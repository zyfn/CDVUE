<template>
<div class="resourceManager">
    <!-- 资源搜索资源增加头部 -->
    <header class="resourceManager-header">
        <div>
            <el-input placeholder="请输入资源名称" v-model="input3" style="width:60%" @keyup.enter.native="resourceSearchByName(input3)"></el-input>
            <el-button type="danger" plain icon="el-icon-search" @click="resourceSearchByName(input3)">搜索</el-button>
        </div>
        <el-button type="danger" icon="el-icon-circle-plus-outline" @click="dialogAddFormVisible = true">增加资源</el-button>
    </header>
    <!-- 资源信息表格 -->
    <el-table :data="resourceTable" style="width: 100%" v-loading="tableLoding">
        <el-table-column label="资源编号">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.resourceId }}</span>
            </template>
        </el-table-column>
        <el-table-column label="资源名称">
            <template slot-scope="scope">
                <span>{{ scope.row.resourceName }}</span>
            </template>
        </el-table-column>
        <el-table-column label="资源类型">
            <template slot-scope="scope">
                <el-tag size="medium"> {{ scope.row.resourceType }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="资源位置">
            <template slot-scope="scope">
                <i class="el-icon-location"></i>
                <span style="margin-left: 10px">{{ scope.row.resourceLocation }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="resourceArea" label="面积">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.resourceId)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 资源增加 -->
    <el-dialog title="资源添加" :visible.sync="dialogAddFormVisible" :before-close="handleClose">
        <el-form :model="resourceAddForm">
            <el-form-item label="资源名称" :label-width="formLabelWidth">
                <el-input v-model="resourceAddForm.resourceName" autocomplete="off" style="width:80%"></el-input>
            </el-form-item>
            <el-form-item label="资源类型" :label-width="formLabelWidth">
                <el-select v-model="resourceAddForm.resourceType" placeholder="请选择资源类型" style="width:80%">
                    <el-option label="土地" value="土地"></el-option>
                    <el-option label="林地" value="林地"></el-option>
                    <el-option label="道路" value="道路"></el-option>
                    <el-option label="建设用地" value="建设用地"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资源位置" :label-width="formLabelWidth">
                <el-input v-model="resourceAddForm.resourceLocation" autocomplete="off" style="width:80%"></el-input>
            </el-form-item>
            <el-form-item label="资源面积" :label-width="formLabelWidth">
                <el-input v-model="resourceAddForm.resourceArea" autocomplete="off" style="width:80%"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm()">取 消</el-button>
            <el-button type="danger" @click="resourceAdd()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 资源修改 -->
    <el-dialog title="资源修改" :visible.sync="dialogUpdateFormVisible">
        <el-form :model="resourceUpdateForm">
            <el-form-item label="资源名称" :label-width="formLabelWidth">
                <el-input v-model="resourceUpdateForm.resourceName" style="width:80%"></el-input>
            </el-form-item>
            <el-form-item label="资源类型" :label-width="formLabelWidth">
                <el-select v-model="resourceUpdateForm.resourceType" placeholder="请选择资源类型" style="width:80%">
                    <el-option label="土地" value="土地"></el-option>
                    <el-option label="林地" value="林地"></el-option>
                    <el-option label="道路" value="道路"></el-option>
                    <el-option label="建设用地" value="建设用地"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资源位置" :label-width="formLabelWidth">
                <el-input v-model="resourceUpdateForm.resourceLocation" autocomplete="off" style="width:80%"></el-input>
            </el-form-item>
            <el-form-item label="资源面积" :label-width="formLabelWidth">
                <el-input v-model="resourceUpdateForm.resourceArea" autocomplete="off" style="width:80%"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogUpdateFormVisible = false">取 消</el-button>
            <el-button type="danger" @click="resourceUpdate()">修 改</el-button>
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
            resourceAddForm: {},
            resourceUpdateForm: {
                resourceId: '',
                resourceName: '',
                resourceType: '',
                resourceLocation: '',
                resourceArea: ''
            },
            formLabelWidth: '100px',
            resourceTable: [],
            tableLoding: true
        }
    },
    methods: {
        handleEdit(row) {
            this.dialogUpdateFormVisible = true;
            this.resourceUpdateForm.resourceId = row.resourceId;
            this.resourceUpdateForm.resourceName = row.resourceName;
            this.resourceUpdateForm.resourceType = row.resourceType;
            this.resourceUpdateForm.resourceLocation = row.resourceLocation;
            this.resourceUpdateForm.resourceArea = row.resourceArea
            // this.resourceUpdateForm = row
        },
        handleDelete(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.resourceRemove(id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        resourceSearchAll() {
            this.tableLoding = true;
            this.$api.resource.resourceSearchAll()
                .then((res) => {
                    setTimeout(() => {
                        this.tableLoding = false;
                    }, 1000)
                    this.resourceTable = res.data;
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                });
        },
        resourceSearchByName(input3) {
            // 调用查询的api
            this.tableLoding = true;
            this.$api.resource.resourceSearchByName(input3)
                .then((res) => {
                    setTimeout(() => {
                        this.tableLoding = false;
                        this.$message({
                            message: '查询成功',
                            type: 'success'
                        });
                    }, 1000)
                    this.resourceTable = res.data;
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                });
        },
        resourceUpdate() {
            // 调用修改的api
            this.$api.resource.resourceUpdate(this.resourceUpdateForm)
                .then((res) => {
                    this.resourceSearchAll();
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
        resourceAdd() {
            // 调用增加的api
            this.$api.resource.resourceAdd(this.resourceAddForm)
                .then((res) => {
                    this.resourceSearchAll();
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
        resourceRemove(id) {
            this.$api.resource.resourceRemove(id)
                .then((res) => {
                    this.resourceSearchAll();
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
            this.resourceAddForm = {};
        },
        handleClose(done) {
            this.resourceAddForm = {};
            done();
        }
    },
    mounted() {
        this.resourceSearchAll()
    },
    components: {

    },
}
</script>

<style>
.resourceManager-header {
    margin: 0px 0 50px 0;
    display: flex;
    justify-content: space-between
}
</style>
