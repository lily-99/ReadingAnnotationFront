<template>
  <div>
    <!-- 基本信息区域 -->
    <el-card>
      <div slot="header" class="clearfix" style="display: flex">
        <div style="font-size: 24px; flex: 1">个人信息</div>
        <div style="flex: 1; text-align: right">
          <el-button size="small" type="primary" @click="editPassword"
            >修改密码</el-button
          >
          <el-button size="small" type="primary" @click="edit">编辑</el-button>
        </div>
      </div>
      <div
        style="
          width: 100px;
          margin: 0 auto;
          position: relative;
          padding-bottom: 20px;
        "
      >
        <img
          style="width: 100px; height: 100px; border-radius: 50%"
          :src="img"
          alt=""
        />
      </div>
      <el-row style="padding: 10px 0">
        <el-col :span="12" style="text-align: right">学号：</el-col>
        <el-col :span="12">{{ id }}</el-col>
      </el-row>
      <el-row style="padding: 10px 0">
        <el-col :span="12" style="text-align: right">姓名：</el-col>
        <el-col :span="12">{{ username }}</el-col>
      </el-row>
      <el-row style="padding: 10px 0">
        <el-col :span="12" style="text-align: right">邮箱：</el-col>
        <el-col :span="12">{{ email }}</el-col>
      </el-row>
      <!-- <el-row style="padding: 10px 0">
        <el-col :span="12" style="text-align: right">头像：</el-col>
        <el-col :span="12">{{ img }}</el-col>
      </el-row> -->
    </el-card>
    <el-dialog
      title="个人信息"
      :visible.sync="dialogFormVisible1"
      width="30%"
      close-on-click-modal
      close-on-press-escape
      show-close
    >
      <el-form :model="Form1" :rules="loginFormRules1" ref="FormRef1">
        <el-form-item label="学号" label-width="100px">
          <el-input
            v-model="Form1.id"
            autocomplete="off"
            style="width: 80%"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="100px">
          <el-input
            v-model="Form1.username"
            autocomplete="off"
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input
            v-model="Form1.email"
            autocomplete="off"
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item label="头像" label-width="100px">
          <el-input
            v-model="Form1.img"
            autocomplete="off"
            style="width: 80%"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="save1">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible2"
      width="30%"
      close-on-click-modal
      close-on-press-escape
      show-close
    >
      <el-form :model="Form2" :rules="loginFormRules2" ref="FormRef2">
        <el-form-item label="学号" label-width="100px" prop="id">
          <el-input
            v-model="Form2.id"
            autocomplete="off"
            style="width: 80%"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="原密码" label-width="100px" prop="password">
          <el-input
            v-model="Form2.password"
            autocomplete="off"
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="100px" prop="newpassword">
          <el-input
            v-model="Form2.newpassword"
            autocomplete="off"
            style="width: 80%"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="save2">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      id: "",
      username: "",
      email: "",
      password: "",
      newpassword: "",
      isCollapse: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      img: "../assets/pic/denglun.jpg",

      Form1: {
        id: "",
        username: "",
        email: "",
        img: "",
      },
      Form2: {
        id: "",
        password: "",
        newpassword: "",
      },

      loginFormRules1: {
        //验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur,change",
          },
        ],
        img: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
        ],
      },

      loginFormRules2: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        newpassword: [{ required: true, message: "请输入新密码", trigger: "blur" }],
      },
    };
  },
  mounted() {
    var userId = localStorage.getItem("userId");
    axios
      .get(axios.defaults.baseURL + "findUserById", {
        params: {
          id: userId,
        },
      })
      .then((Response) => {
        //console.log(Response.data.data);
        this.id = Response.data.data.stuId;
        this.username = Response.data.data.username;
        this.email = Response.data.data.email;
        //this.password = Response.data.data.password;
        this.img = Response.data.data.headerUrl;
      });
  },
  methods: {
    editPassword() {
      this.dialogFormVisible2 = true;
      this.Form2.id = this.id;
      this.Form2.password = this.password;
      this.Form2.newpassword = this.newpassword;
    },
    edit() {
      this.Form1.id = this.id;
      this.Form1.username = this.username;
      this.Form1.email = this.email;
      this.Form1.img = this.img;
      this.dialogFormVisible1 = true;
    },
    save1() {
      var userId = localStorage.getItem("userId");
      this.$refs.FormRef1.validate((valid) => {
        if (!valid) return this.$message.error("请重新输入信息");
        else {
          axios
            .post(axios.defaults.baseURL + "updateUser", {
              id: userId,
              username: this.Form1.username,
              //password: this.password,
              email: this.Form1.email,
              headerUrl: this.Form1.img,
            })
            .then((Response) => {
              //console.log(Response.data);
              if (Response.data.status == 1) {
                this.$message.success("修改成功");
                this.username = Response.data.data.username;
                this.email = Response.data.data.email;
                this.img = Response.data.data.headerUrl;
                this.dialogFormVisible1 = false;
              }
            });
        }
      });
    },
    save2() {
      var userId = localStorage.getItem("userId");
      this.$refs.FormRef2.validate((valid) => {
        if (!valid) return this.$message.error("请重新输入信息");
        else {
          axios
            .post(axios.defaults.baseURL + "updatePassWord", {
              id: userId,
              oldPassword: this.Form2.password,
              newPassword: this.Form2.newpassword,
            })
            .then((Response) => {
              if (Response.data.status == 1) {
                this.$message.success("修改成功");
                this.Form2.password = "";
                this.Form2.newpassword = "";
                this.dialogFormVisible2 = false;
              } else {
                this.$message.error("修改失败");
              }
            });
        }
      });
    },
  },
};
</script>