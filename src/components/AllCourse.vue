<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/allcourse' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>选择课程</el-breadcrumb-item>
      <el-breadcrumb-item>全部课程</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-row >
      <el-col
        :span="2"
        v-for="(o, index) in 2"
        :key="o"
        :offset="index > 0 ? 2 : 0"
      >
        <el-card :body-style="{ padding: '0px' }" class="box-card">
          <img src="../assets/hamburger.png" class="image"/>
          <div style="padding: 14px">
            <div>陈老师</div>
            <div>课程编号</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date()
    };
  }
}
</script>

<style lang="less" scoped>
.image {
    width: 200px;
    display: block;
    cursor: pointer
}
.box-card{
    width: 200px;
}
</style>