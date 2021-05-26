<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/allcourse' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>小组成员</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <div class="box">
      <template v-for="(item,index) in array">
         <!-- <div class="box_bar" :key="index"> -->
          <div class="box_bar">
          <!-- {{item}} -->
          <div class="box_img">
            <!-- <img  class="box_img" :src="item.pic"></img> -->
            <img  class="box_img" src="../assets/pic/denglun.jpg"></img>
            <div class="box_name">{{item.name}}</div>
          </div>
          <div class="box_pro">
              <el-progress :text-inside="true" :stroke-width="22" :percentage="item.pro1"></el-progress>
              <el-progress :text-inside="true" :stroke-width="22" :percentage="item.pro2" status="success" style="margin-top:10px"></el-progress>
              <el-progress :text-inside="true" :stroke-width="22" :percentage="item.pro3" status="warning" style="margin-top:10px"></el-progress>
          </div> 
          </div>
      </template>
    </div>
    <div class="anno">
      <span>阅读时长</span>
      <div class="blue"></div>
    </div>
    <div class="anno">
      <span>批注数量</span>
      <div class="green"></div>
    </div>
    <div class="anno">
      <span>评论数量</span>
      <div class="orange"></div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import mock from "mockjs";
export default {
  data() {
    return {
      array: [],
    };
  },
  mounted() {
    //listAllMember {groupId:3}
    this.axios.post("http://localhost:8080/groups").then((res) => {
      console.log(res.data);
      this.array = res.data.data;
    });
  },
};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
}
.box_bar {
  width: 33%;
  height: 200px;
  background: #e9eef3;
  display: flex;
}
.box_img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #eeeeee;
}
.box_pro {
  background: #e9eef3;
  height: 87px;
  width: 200px;
  margin-top: 10px;
  margin-left: 30px;
}
.anno {
  display: flex;
}
.box_name {
  text-align: center;
  color: #333;
}
.blue {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #409eff;
  display: flex;
}
.green {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #67c23a;
  display: flex;
}
.orange {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #e6a23c;
  display: flex;
}
</style>