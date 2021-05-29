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
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="课程号">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="课程名">
                <span>{{ props.row.name }}</span>
                <el-button type="text" @click="reading(props.row.id)">开始阅读</el-button>
              </el-form-item>
              <el-form-item label="作者">
                <span>{{ props.row.author }}</span>
              </el-form-item>
              <el-form-item label="描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="课程号" prop="id"> </el-table-column>
        <el-table-column label="课程名" prop="name"></el-table-column>
        <el-table-column label="作者" prop="author"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      tableData: [
        {
          id: "001",
          name: "《将进酒》",
          author: "李白",
          desc: "君不见黄河之水天上来，奔流到海不复回。",
        },
        {
          id: "003",
          name: "《残春曲》",
          author:"白居易",
          desc:"日西无事墙阴下，闲踏宫花独自行。"
        },
        {
          id: "004",
          name: "《陌上花·陌上花开蝴蝶飞》",
          author:"苏轼",
          desc:"陌上花开蝴蝶飞，江山犹是昔人非。"
        },
      ],
    };
  },
  mounted(){
    //显示已选课程 
  },
  methods: {
    //根据课程id删除课程
    deleteRow(index, rows) {
      rows.splice(index, 1);
      console.log(index+1);
    },
    reading(id){
      sessionStorage.setItem("courseId",id);
      this.$router.push("/allreadingtasks");
    }
  },
};
</script>

