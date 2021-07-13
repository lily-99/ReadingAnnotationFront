<template>
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/pic/logoHome.png" alt="" />
        <span>协作批注系统</span>
      </div>
      <div class="icon_button">
        欢迎你,{{ name }}
        <el-button
          type="primary"
          icon="el-icon-user"
          circle
          @click="person"
        ></el-button>
        <el-button
          type="info"
          icon="el-icon-refresh-left"
          circle
          @click="back"
        ></el-button>
      </div>
    </el-header>
    <!-- 页面主题区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- <div class="toggle-button" @click="toggleCollapse">|||</div> -->
        <!-- <div class="toggle-button">|||</div> -->
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          overflow-y:
          scroll
          :default-active="$route.path"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-zoom-in"></i>
              <span>选择课程</span>
            </template>
            <el-menu-item index="/allcourse">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>全部课程</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/selectcourse">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>已选课程</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/allreadingtasks">
            <i class="el-icon-tickets"></i>
            <span slot="title">所有任务</span>
          </el-menu-item>
          <el-menu-item index="/readingtask">
            <i class="el-icon-tickets"></i>
            <span slot="title">阅读任务</span>
          </el-menu-item>
          <el-menu-item index="/studydata">
            <i class="el-icon-document"></i>
            <span slot="title">学习数据</span>
          </el-menu-item>
          <el-menu-item index="/groups">
            <i class="el-icon-location"></i>
            <span slot="title">小组成员</span>
          </el-menu-item>
          <el-menu-item index="/notice">
            <i class="el-icon-bell"></i>
            <span slot="title">通知公告</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      isCollapse: false,
    };
  },
  mounted() {
    var username = localStorage.getItem("username");
    this.name = username;
  },
  //点击按钮，左侧菜单整合
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    back() {
      this.$router.push("/login");
      sessionStorage.clear();
      localStorage.clear();
    },
    person() {
      this.$router.push("/person");
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #333744;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  color: #333;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #e9eef3;
  color: #333;
}
.home_container {
  height: 100%;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.icon_button {
  display: right;
}
</style>