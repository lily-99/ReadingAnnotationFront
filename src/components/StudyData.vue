<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/allcourse' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学习数据</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card
      >
      <!-- 2. 为ECharts准备一个具备大小(宽高)的Dom -->
      <div id="main" style="width: 700px; height: 500px"></div>
    </el-card>
  </div>
</template>

<script>
// 1. 导入echarts
import * as echarts from "echarts";

export default {
  data() {
    return {};
  },
  created() {},
  // 此时页面上的元素已经被渲染完毕
  mounted() {
    // 3. 基于准备好的dom, 初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));

    // 4. 准备数据和配置项
    var option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    };

    // 5. 展示数据
    myChart.setOption(option);
  },
  methods: {},
};
</script>

<style lang="less" scoped>

</style>
