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
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="课程号" sortable width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="课程名" sortable width="200">
        </el-table-column>
        <el-table-column
          prop="address"
          label="作者"
          sortable
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        small
        :page-size="5"
        :pager-count="5"
        :current-page="1"
        layout="prev, pager, next"
        :total="tableData.length"
        style="text-align: center; margin-top: 1%"
      >
      </el-pagination>
      <div style="margin-top: 20px">
        <el-button type="primary" plain @click="submit()">全部提交</el-button>
        <el-button type="success" plain @click="toggleSelection()"
          >取消选择</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
export default {
  data() {
    return {
      tableData: [
        {
          date: "001",
          name: "将进酒",
          address: "李白",
        },
        {
          date: "002",
          name: "春夜喜雨",
          address: "杜甫",
        },
        {
          date: "003",
          name: "《残春曲》",
          address: "白居易",
        },
        {
          date: "004",
          name: "《陌上花·陌上花开蝴蝶飞》",
          address: "苏轼",
        },
        {
          date: "005",
          name: "《好事近·夜起倚危楼》",
          address: "王国维",
        },
        {
          date: "006",
          name: "《南楼令·塞外重九》",
          address: "纳兰性德",
        },
        {
          date: "007",
          name: "《春日郊外》",
          address: "唐庚",
        },
        {
          date: "008",
          name: "《菩萨蛮·红楼遥隔廉纤雨》",
          address: "王国维",
        },
      ],
      multipleSelection: [],
      search: "",
    };
  },

  mounted() {
    axios.get("").then((response) => {
      this.tableData = response;
    });
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    submit() {
      var temp = JSON.stringify(this.multipleSelection);
      axios
        .post("", {
          params: {
            data: temp,
          },
        })
        .then((response) => {
          console.log(response);
          //this.$message.success("提交成功");
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>