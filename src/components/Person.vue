<template>
    <div>
        <!-- 基本信息区域 -->
        <el-card>
            <div slot="header" class="clearfix" style="display: flex">
                <div style="font-size: 24px; flex: 1">个人信息</div>
                <div style="flex: 1; text-align: right">
                    <el-button size="small" type="primary" @click="edit">编辑</el-button>
                </div>
            </div>
            <div style="width: 100px; margin: 0 auto; position: relative; padding-bottom: 20px">
                <img style="width: 100px; height: 100px; border-radius: 50%; " src="../assets/pic/denglun.jpg" >
                <input @change="upload" type="file" id="avatar" style="width: 100px; height: 100px; opacity: 0; position: absolute; top: 0; left: 0">
            </div>
            <el-row style="padding: 10px 0">
                <el-col :span="12" style="text-align: right">姓名：</el-col>
                <el-col :span="12">张三</el-col>
            </el-row>
            <el-row style="padding: 10px 0">
                <el-col :span="12" style="text-align: right">邮箱：</el-col>
                <el-col :span="12">李四</el-col>
            </el-row>
            <el-row style="padding: 10px 0">
                <el-col :span="12" style="text-align: right">电话：</el-col>
                <el-col :span="12">王五</el-col>
            </el-row>
        </el-card>
        <!-- <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%" close-on-click-modal="false" close-on-press-escape="false" show-close="false">
            <el-form :model="user">
                <el-form-item label="用户名" label-width="100px">
                    <el-input v-model="user.username" autocomplete="off" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="100px">
                    <el-input v-model="user.email" autocomplete="off" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="电话" label-width="100px">
                    <el-input v-model="user.phone" autocomplete="off" style="width: 80%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>

<style>

</style>>




<script src="../js/jquery.min.js"></script>
<script src="../js/vue.min.js"></script>
<script src="../js/element.js"></script>
<script src="../js/base.js"></script>
<script>
import "../css/base.css";
export default {
    data(){
        return{
            user: {},
            isCollapse: false,
            entity: {},
            dialogFormVisible: false
        }       
    },
    methods:{
        edit() {
            //this.dialogFormVisible = true;
        },
        
    }
}
</script>>