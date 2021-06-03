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
        <input
          @change="updateFace"
          accept="image/*"
          type="file"
          id="avatar"
          style="
            width: 100px;
            height: 100px;
            opacity: 0;
            position: absolute;
            display: flex;
            top: 0;
            left: 0;
          "
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
      <el-row style="padding: 10px 0">
        <el-col :span="12" style="text-align: right">密码：</el-col>
        <el-col :span="12">{{ password }}</el-col>
      </el-row>
    </el-card>
    <el-dialog
      title="个人信息"
      :visible.sync="dialogFormVisible"
      width="30%"
      close-on-click-modal
      close-on-press-escape
      show-close
    >
      <el-form>
        <el-form-item label="学号" label-width="100px">
          <el-input
            v-model="id"
            autocomplete="off"
            style="width: 80%"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="100px">
          <el-input
            v-model="username"
            autocomplete="off"
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input
            v-model="email"
            autocomplete="off"
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input
            v-model="password"
            autocomplete="off"
            style="width: 80%"
          ></el-input>
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
  data() {
    return {
      id: "",
      username: "",
      email: "",
      password: "",
      isCollapse: false,
      dialogFormVisible: false,
      img: "../assets/logo.png",
    };
  },
  mounted() {
    var userId = localStorage.getItem("userId");
    axios
      .post(axios.defaults.baseURL + "findUserById", { id: userId })
      .then((Response) => {
        console.log(Response.data.data);
        this.id = Response.data.data.stuId;
        this.username = Response.data.data.username;
        this.email = Response.data.data.email;
        this.password = Response.data.data.password;
        //this.img=axios.defaults.baseURL+"opt/tomcat/tomcat8.5/webapps/images/"+Response.data.data.headerUrl;
      });
  },
  methods: {
    updateFace(e) {
      var userId = localStorage.getItem("userId");
      const file = e.target.files[0] || e.dataTransfer.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.img = reader.result;
        //console.log(reader.result, "地址");
      };

      var formData = new FormData();
      //这里是生成链接需传的参数
      formData.append("file", file);
      formData.append("id", userId);
      //formData.append("key", "Gn1xVdagWO");
      this.axios({
        method: "post",
        url: "upload",
        data: formData,
      }).then((res) => {
        //获取链接再赋值就行了
        //console.log(res.data);
        this.img =
          "data:image/jpeg;base64," +
          btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
        console.log("请求到的头像url" + this.img);
      });
    },
    edit() {
      this.username = this.username;
      this.email = this.email;
      this.password = this.password;
      this.dialogFormVisible = true;
    },
    save() {
      var userId = localStorage.getItem("userId");
      axios
        .post(axios.defaults.baseURL + "updateUser", {
          id: userId,
          username: this.username,
          password: this.password,
          email: this.email,
        })
        .then((Response) => {
          //console.log(Response.data);
          if (Response.data.status == 1) {
            this.$message.success("修改成功");
            this.username = Response.data.data.username;
            this.email = Response.data.data.email;
            this.password = Response.data.data.password;
            this.dialogFormVisible = false;
          }
        });
    },
  },
};
</script>