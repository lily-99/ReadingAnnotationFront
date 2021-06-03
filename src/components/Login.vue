<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-0-29"
            placeholder="请输入账号"
          >
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-suo"
            placeholder="请输入密码"
            type="password"
          >
          </el-input>
        </el-form-item>
        <!-- 按钮区 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      //这是登录表单的数据绑定对象
      loginForm: {
        username: "",
        password: "",
      },
      //这是表单的验证规则对象
      loginFormRules: {
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
        //验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            //min: 6,
            //max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      array: [],
    };
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate((valid) => {
        //如果用户名和密码验证通过，则发起请求
        if (!valid) return this.$message.error("登录失败");
        else {
          axios
            .post(axios.defaults.baseURL+ "login", {
              username: this.loginForm.username,
              password: this.loginForm.password,
            })
            .then((res) => {
              console.log(res);
              if (res.data.status == 1) {
                this.$message.success("登录成功");
                //console.log(res.data.data);
                localStorage.setItem("userId", res.data.data.id);
                localStorage.setItem("username", res.data.data.username);
                //console.log(res.data.data.id)
                this.$router.push("/home");
              } else {
                this.$message.success(res.data.data.message);
              }
            });
          this.$http.post("login", this.loginForm);
        }
      });
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #333744;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.btns {
  display: flex;
  justify-content: flex-end; //尾部对齐
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>