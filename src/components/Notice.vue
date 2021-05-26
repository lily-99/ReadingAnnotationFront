<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/allcourse' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>通知公告</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" style="width: 100%" :show-header="status">
      <el-table-column prop="content">
        <template #default="scope">
          <i class="el-icon-message-solid"></i>
          <span style="margin-left: 10px">{{ scope.row.content }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      status: false,
      tableData: [
        {
          content: "请同学们在上课前自学《将进酒》",
        },
        {
          content: "《将进酒》相关的知识点已发布，请注意查看学习！",
        },
        {
          content: "请同学们完成课后《静夜思》相关作业",
        },
        {
          content: "上课前记得带已制作好的诗词小卡片",
        },
      ],
    };
  },
};
</script>