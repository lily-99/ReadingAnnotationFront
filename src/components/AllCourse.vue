<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/allcourse' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>选择课程</el-breadcrumb-item>
      <el-breadcrumb-item>全部课程</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table
        ref="multipleTable"
        :data="
          tables.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :row-key="rowKey"
      >
        <!-- <el-table-column type="selection" width="55" :reserve-selection="true">
        </el-table-column> -->
        <el-table-column prop="courseId" label="课程号" sortable width="120">
        </el-table-column>
        <el-table-column prop="courseName" label="课程名" sortable width="200">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          sortable
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
          sortable
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="请输入课程名" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >选择</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        small
        :page-size="pagesize"
        :page-sizes="[2, 5, 8, 10]"
        :pager-count="5"
        layout="prev, pager, next"
        :total="this.tableData.length"
        style="text-align: center; margin-top: 1%"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="currentPage"
      >
      </el-pagination>
      <!-- <div style="margin-top: 20px">
        <el-button type="primary" plain @click="submit()">全部提交</el-button>
        <el-button type="success" plain @click="toggleSelection()"
          >取消选择</el-button
        >
      </div> -->
    </el-card>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      search: "",
      currentPage: 1,
      pagesize: 5,
    };
  },

  mounted() {
    axios.get(axios.defaults.baseURL + "listAllCourse").then((response) => {
      //console.log(response.data);
      this.tableData = response.data.data;
    });
  },
  computed: {
    tables: {
      get() {
        const search = this.search;
        if (search) {
          return this.tableData.filter((data) => {
            return Object.keys(data).some((key) => {
              return String(data[key]).toLowerCase().indexOf(search) > -1;
            });
          });
        }
        return this.tableData;
      },
      set(newValue) {
        return newValue;
      },
    },
  },
  methods: {
    handleEdit(index, row) {
      var userId  = localStorage.getItem("userId");
      //console.log(row.courseId);
      axios
        .post(axios.defaults.baseURL + "selectCourse", {
            userId:userId,
            courseId:row.courseId
        })
        .then((response) => {
          if (response.data.status == 1) {
            this.$message.success("提交成功");
            this.$refs.multipleTable.clearSelection();
          } 
          else this.$message.error("请不要重复选择");
        });
    },
    rowKey(rows) {
      return rows.courseId;
    },
    getPageData() {
      let start = (this.currentPage - 1) * this.pagesize;
      let end = start + this.pagesize;
      this.tables = this.tableData.slice(start, end);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPageData();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getPageData();
    },
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach((row) => {
    //       this.$refs.multipleTable.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.multipleTable.clearSelection();
    //   }
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style lang="less" scoped>
</style>