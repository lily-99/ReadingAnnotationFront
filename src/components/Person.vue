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
                <img style="width: 100px; height: 100px; border-radius: 50%; " :src="imgurl" alt="" >
                <input @change="upload($event)" accept="image/*" type="file" id="avatar" style="width: 100px; height: 100px; opacity: 0; position: absolute;display:flex; top: 0; left: 0;">
            </div>
            <el-row style="padding: 10px 0">
                <el-col :span="12" style="text-align: right">学号：</el-col>
                <el-col :span="12">{{id}}</el-col>
            </el-row>
            <el-row style="padding: 10px 0">
                <el-col :span="12" style="text-align: right">姓名：</el-col>
                <el-col :span="12">{{username}}</el-col>
            </el-row>
            <el-row style="padding: 10px 0">
                <el-col :span="12" style="text-align: right">邮箱：</el-col>
                <el-col :span="12">{{email}}</el-col>
            </el-row>
            <el-row style="padding: 10px 0">
                <el-col :span="12" style="text-align: right">密码：</el-col>
                <el-col :span="12">{{password}}</el-col>
            </el-row>
        </el-card>
        <el-dialog title="个人信息" :visible.sync="dialogFormVisible" width="30%" close-on-click-modal close-on-press-escape show-close>
            <el-form>
                <el-form-item label="学号" label-width="100px">
                    <el-input v-model="id" autocomplete="off" style="width: 80%" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="姓名" label-width="100px">
                    <el-input v-model="username" autocomplete="off" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="100px">
                    <el-input v-model="email" autocomplete="off" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="100px">
                    <el-input v-model="password" autocomplete="off" style="width: 80%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import axios from "axios";
export default {
    data(){
        return{
            id:'123',
            username:'zhangsan',
            email:'111@163.com',
            password:'123',
            isCollapse: false,
            dialogFormVisible: false,
            imgurl:"../assets/logo.png"
        }       
    },
    mounted(){
        axios.get("http://192.168.43.40:8080/readingannotation/findUserById",{
                params:{
                    id:1,
                }
            })
            .then((Response)=>{
                console.log(Response.data);
                this.id=Response.data.data.stuId;
                this.username=Response.data.data.username;
                this.email=Response.data.data.email;
                this.password=Response.data.data.password;               
            })    
            //this.great();
    },
    methods:{
        edit() {
            this.username=this.username;
            this.email=this.email;
            this.password=this.password;
            this.dialogFormVisible = true;
        },
        save() {
            
            axios.post("http://192.168.43.40:8080/readingannotation/updateUser"
            ,{id:1,username:this.username,password:this.password, email:this.email})
            .then((Response)=>{
                //console.log(Response.data);
                if(Response.data.status==1)
                    {
                        this.$message.success("修改成功");
                        this.username=Response.data.data.username;
                        this.email=Response.data.data.email;
                        this.password=Response.data.data.password;    
                        this.dialogFormVisible = false;
                    }
            })    
        },
        upload(e) {
            //let Base64 = require('js-base64').Base64;
            var file = e.target.files[0];
            var formData = new FormData();
            formData.append("file", file);
            formData.append("id",1);   
            console.log(formData.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
            // let config = {
            //     headers:{
            //         'Content-Type':'multipart/form-data'
            //     } //这里是重点，需要和后台沟通好请求头，Content-Type不一定是这个值
            // };
        //    axios.post("http://192.168.43.40:8080/readingannotation/upload",formData,config)
        //     .then((Response)=>{
        //     //.then(function(Response){
        //         console.log(Response.data);
        //         if(Response.data.status==1)
        //         {
        //             console.log(Response.data);
        //             this.imgurl='data:image/png;base64,' + btoa(new Uint8Array(Response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        //             this.$message.success("上传成功");
        //         }
        //      })  
        
        axios({
            method:'post',
            url:'http://192.168.43.40:8080/readingannotation/upload',
            data:formData,
            headers:{
                'Content-Type':'multipart/form-data'
            },
            responseType:'arraybuffer'
        })
        .then(Response=>{
            this.imgurl='data:image/png;base64,' + btoa(new Uint8Array(Response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        })

        },
    }
}
</script>