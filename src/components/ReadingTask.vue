<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/allcourse' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>阅读任务</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <div slot="header">
        <div style="margin: 20px 0">
          <el-button plain>全部</el-button>
          <el-button type="primary" plain>未截止已完成</el-button>
          <el-button type="success" plain>未截止未完成</el-button>
          <el-button type="info" plain>已截止已完成</el-button>
          <el-button type="success" plain>已截止未完成</el-button>
        </div>
        <div>
          <button id="js-highlight" style="width: 80px;">高亮</button>
	      <button id="delete-tag" style="width: 80px;">删除</button>
          <p>this is test text</p>
          <p>this is another test text</p>
        </div>
      </div>
    </el-card>
  </div>  
</template>

<style type="text/css">
	#js-highlight
	{
		list-style: none;
		background: gainsboro;
		border: solid 1px darkgrey;
		margin: 0px;
		padding: 5px;
		position: absolute;
		/*left: 0px;*/
		top: 0px;
		display: none;
		border-bottom: solid 1px darkgrey;
	}
	#delete-tag
	{
		list-style: none;
		background: gainsboro;
		border: solid 1px darkgrey;
		margin: 0px;
		padding: 5px;
		position: absolute;
		/*left: 0px;*/
		top: 0px;
		display: none;
		border-bottom: solid 1px darkgrey;
	}
	
	</style>
	<script>
import '../highlighter'
export default {
	
}
</script>