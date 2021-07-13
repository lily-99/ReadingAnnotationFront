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
                <span>{{ props.row.courseId }}</span>
              </el-form-item>
              <el-form-item label="课程名">
                <span>{{ props.row.courseName }}</span>
              </el-form-item>
              <el-form-item label="开始时间">
                <span>{{ props.row.startTime }}</span>
              </el-form-item>
              <el-form-item label="结束时间">
                <span>{{ props.row.endTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="课程号" prop="courseId"> </el-table-column>
        <el-table-column label="课程名" prop="courseName"></el-table-column>
        <el-table-column label="开始时间" prop="startTime"> </el-table-column>
        <el-table-column label="结束时间" prop="endTime"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="reading(scope.row.courseId)"
            >
              阅读
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >
              删除
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
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      delid: "",
    };
  },
  mounted() {
    var userId = localStorage.getItem("userId");
    //显示已选课程
    axios
      .post(axios.defaults.baseURL + "listAllCourseByUId", {
        userId: userId,
      })
      .then((Response) => {
        //console.log(Response.data);
        this.tableData = Response.data.data;
      });
  },
  methods: {
    //根据课程id删除课程
    deleteRow(index, rows) {
      //console.log(rows[index].id);
      axios
        .post(axios.defaults.baseURL + "moveCourse", {
          id: rows[index].id,
        })
        .then((Response) => {
          if (Response.data.status == 1) {
            this.$message.success("删除成功");
            rows.splice(index, 1);
            this.tableData = rows;
          }
        });
    },
    reading(id) {
      sessionStorage.setItem("courseId", id);
      this.$router.push("/allreadingtasks");
    },
  },
};
</script>

