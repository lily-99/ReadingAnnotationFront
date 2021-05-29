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
        <el-button type="text">全部</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text">未截止已完成</el-button>
        <el-button type="text">未截止未完成</el-button>
        <el-button type="text">已截止已完成</el-button>
        <el-button type="text">已截止未完成</el-button>
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
        <el-table-column prop="readingtaskId">
          </el-table-column>>
        <el-table-column width="600">
          <template slot-scope="scope">
            <span>{{ scope.row.content.title }}</span>
            <span>{{ scope.row.content.author }}</span>
            <el-button type="text" size="mini" @click="reading(scope.row.readingtaskId)">开始阅读</el-button>
          </template>
        </el-table-column>
        <el-table-column width="250">
          <template slot-scope="scope">
            <div>
              <i class="el-icon-check"></i>
              <span>至少5个批注</span>
            </div>
            <div>
              <i class="el-icon-close"></i>
              <span>阅读至少1小时</span>
            </div>
            <div>
              <i class="el-icon-close"></i>
              <span>至少参与3次讨论</span>
            </div>
            <el-progress
              :text-inside="true"
              :stroke-width="20"
              :percentage="70"
              :format="setItemText()"
            ></el-progress>
          </template>
        </el-table-column>
        <!-- <el-table-column width="100">
          <template slot-scope="scope">
            <el-button type="text" size="mini">开始阅读</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          readingtaskId:1,
          content: {
            title: "《将进酒》",
            author: "李白",
          },
          deadline: {},
        },
      ],
    };
  },
  mounted(){
    var value = sessionStorage.getItem("courseId"); 
    console.log(value);
    //请求后台课程号courseId的所有的阅读任务

  },
  methods: {
    setItemText(row) {
      return () => {
        //return "计划： " + row.planNum + "，完成： " + row.completeNum;
        return "任务截止还剩5天10小时";
      };
    },
    reading(id){
      sessionStorage.setItem("readingtaskId",id);
      this.$router.push("/readingtask");
    }
  },
};
</script>

