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
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          <span style="margin-left: 10px">{{ scope.row.content }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      status: false,
      tableData: [],
    };
  },
  mounted(){
    axios.get(axios.defaults.baseURL+"listAllNotice",{
      params:{
        courseId:2
      }
    }).then(Response=>{
      //console.log(Response.data.data);
      this.tableData=Response.data.data;
    })
  }
};
</script>