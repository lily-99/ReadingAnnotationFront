<template>
  <div class="register_container">
    <div class="register_box">
      <el-form
        ref="registerForm"
        :model="register_form"
        :rules="register_rules"
        label-width="85px"
      >
        <h2 style="text-align: center">欢迎注册</h2>  
        <el-form-item label="学号" prop="id">                                
          <el-input v-model="register_form.id"></el-input>             
        </el-form-item>    
        <el-form-item label="姓名" prop="name">                                 
          <el-input v-model="register_form.name"></el-input>
        </el-form-item>           
        <el-form-item label="邮箱" prop="mail">                                 
          <el-input v-model="register_form.mail"></el-input>             
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="register_form.password"
            type="password"
            placeholder="含字母、数字"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
           <el-input
            v-model="register_form.repassword"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="radio">
          <el-radio-group v-model="register_form.radio">
            <el-radio :label="1">教师</el-radio>
            <el-radio :label="2">学生</el-radio>
            <el-radio :label="3">游客</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="验证码" prop="wcode">
          <el-input
            style="width: 125px"
            v-model="register_form.wcode"
          ></el-input>
          <div class="code" @click="refreshCode">
            <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
        </el-form-item>
        <el-form-item>
          <tr>
            已有账号？<a href="http://localhost:8080/login">去登录</a>
            <el-button type="primary" @click="login" style="margin-left: 70px">注册</el-button>
          </tr>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Identify from "./Identify.vue";
import SIdentify from "./Identify.vue";
import axios from "axios";
export default {
  components: { SIdentify, Identify },
  //name: "Register",
  data() {
    return {
      register_form: {
        id: "",
        name: "",
        mail: "",
        password: "",
        repassword: "",
        radio: 3,
        wcode: "",
      },
      register_rules: {
        id: [
          {
            required: true,
            message: "请输入学号",
            trigger: "blur",
          },
          {
            min: 10,
            max: 10,
            message: "长度为10个字符",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        mail: [
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
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        repassword: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        radio: [
          {
            required: true,
            message: "请选择身份",
            trigger: "change",
          },
        ],
        wcode: [
          {
            required: true,
            message:"请输入验证码",
            trigger: "blur",
          },
        ],
      },
      identifyCodes: "1234567890",
      identifyCode: "",
    };
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    // 判断验证码是否输入准确
    checkCode() {
      let wcode = this.register_form.wcode;
      wcode = wcode.toUpperCase();
      let ccode = this.identifyCode;
      ccode = ccode.toUpperCase();
      if (wcode !== ccode) {
        this.$message.error("请重新输入验证码");
        this.$set(this.register_form, "vcode", "");
        return 0;
      } else {
        return 1;
      }
    },
    login() {
      let codestatus = this.checkCode();
      if (codestatus) {
        //验证输入的验证码是否相同
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            //验证是否符合输入规则
            if (this.register_form.repassword.length >=this.register_form.password.length &&this.register_form.repassword !== this.register_form.password)
            {
              this.$message.error("两次密码不匹配");
            }
            else
            {
              this.axios
                .post(axios.defaults.baseURL + "register", {
                  stuId: this.register_form.id,
                  username: this.register_form.name,
                  password: this.register_form.password,
                  email: this.register_form.mail,
                  type: this.register_form.radio,
                })
                .then((res) => {
                  //console.log(res.data);
                  if (res.data != "") 
                  {
                    this.$message.success("注册成功,请登录");
                    this.$router.push("/login");
                  }
                  else
                    this.$message.error("注册失败请重新输入");
                });
            }
          } else {
            this.$message.error("注册失败，请重新输入");
            //return false;
          }
        });
      } else {
        this.$message.error("请输入正确的验证码");
        this.register_form.id=this.register_form.id;
        this.register_form.name=this.register_form.name;
        this.register_form.password=this.register_form.password;
        this.register_form.mail=this.register_form.mail;
        this.register_form.radio=this.register_form.radio;
        this.$set(this.register_form, "wcode", "");
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      //console.log(this.identifyCode);
    },
  },
};
</script>

<style lang="less" scoped>
.register_container {
  height: 100%;
  background-color: #333744;
}
.register_box {
  height: 585px;
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 5px;
}
.el-input {
  width: 250px;
}
.el-form-item {
  //text-align-last: justify;
  text-align: justify;
  margin-top: 22px;
  margin-left: 25px;
}
.code {
  width: 114px;
  height: 38px;
  position: absolute;
  margin-left: 140px;
}
/deep/ .el-form-item__content {
  display: flex;
  line-height: 40px;
  position: absolute;
  font-size: 14px;
}
/deep/ .el-radio-group {
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  font-size: 0;
  margin-top: 15px;
}
</style>