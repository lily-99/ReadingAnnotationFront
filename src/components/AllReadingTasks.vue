<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/allcourse' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>所有任务</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <div slot="header">
        <el-button type="text" @click="showreadingtask(0)">全部</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" @click="showreadingtask(1)"
          >未截止已完成</el-button
        >
        <el-button type="text" @click="showreadingtask(2)"
          >未截止未完成</el-button
        >
        <el-button type="text" @click="showreadingtask(3)"
          >已截止已完成</el-button
        >
        <el-button type="text" @click="showreadingtask(4)"
          >已截止未完成</el-button
        >
      </div>
      <el-table :data="tableData" style="width: 100%" :show-header="false">
        <el-table-column width="80">
          <el-progress
            type="circle"
            :percentage="25"
            :width="50"
            :height="50"
          ></el-progress>
        </el-table-column>
        <el-table-column width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="explain"> </el-table-column>
        <!-- <el-table-column prop="process"> </el-table-column> -->
        <el-table-column prop="endTime"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-progress
              :text-inside="true"
              :stroke-width="20"
              :percentage="70"
              :format="setItemText()"
            ></el-progress>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >开始阅读</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      authority: 0, //全部：0  未截止已完成：1   未截止未完成：2   已截止已完成：3    已截止未完成：4
      array: [],
    };
  },
  mounted() {
    //请求后台课程号courseId的所有的阅读任务
    var courseId = sessionStorage.getItem("courseId");
    if (courseId == 0) {
      this.$message.warning("请先选择一门课程");
    } else {
      axios
        .post(axios.defaults.baseURL + "taskList", {
          courseId: courseId,
        })
        .then((Response) => {
          this.tableData = Response.data.data;
        });
    }
  },
  methods: {
    showreadingtask(authority) {
      //this.authority=authority;
      switch (authority) {
        case 0: //全部 0
        case 1: //未截止已完成：1
        case 2: //未截止未完成：2
        case 3: //已截止已完成：3
        case 4: //已截止未完成：4
      }
    },
    setItemText(row) {
      return () => {
        //return "计划： " + row.planNum + "，完成： " + row.completeNum;
        return "任务截止还剩5天10小时";
      };
    },
    handleEdit(index, row) {
      //console.log(row.id);
      sessionStorage.setItem("readingtaskId", row.id);
      this.$router.push("/readingtask");
    },
  },
};
</script>

