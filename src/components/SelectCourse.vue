<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/allcourse' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>选择课程</el-breadcrumb-item>
      <el-breadcrumb-item>已选课程</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <div slot="header">
        <div style="margin: 20px 0">
          <el-button plain>全部</el-button>
          <el-button type="primary" plain>进行中</el-button>
          <el-button type="success" plain>已截止</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>




</style>
