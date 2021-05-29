<template>
  <div>
    <p v-if="comment.length == 0">暂无评论，我来发表第一篇评论！</p>
    <div v-else>
      <div
        class="comment_details"
        v-for="(item, index) in comment"
        v-bind:index="index"
      >
        <span class="comment_name">{{ item.name }}</span> <span>{{ item.time }}</span>
        <div class="comment_content">{{ item.content }}</div>
        <el-button size="mini" @click="replyBtn(item.id,item.name)">回复</el-button>
        <div v-if="item.reply.length > 0">
          <div class="reply" v-for="reply in item.reply">
            <span class="comment_name">{{ reply.responder }} </span>回复<span class="comment_name">{{reply.reviewers}}</span> <span>{{ reply.time }}</span>
            <p>{{ reply.content }}</p>
            <el-button size="mini" @click="replyBtn(reply.id,reply.responder)">回复</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="commentBox">
      <h3 style="width:100px">发表评论</h3>
      <b v-if="isReply">你回复&nbsp;{{ reName }}</b>
      <textarea name="" value="请填写评论内容" v-model="commentText" rows="4" cols="52" style="resize:none;"></textarea>
      <el-button class="btn" size="mini"  @click="addComment">发表</el-button>
      <el-button class="btn" size="mini"  @click="canelComment">取消</el-button>
    </div>
  </div>
  
</template>

<script>
export default {
  name: "CommemtContent",
  props: {
    comment:Array,
      // [
      //   {
      //     id: "111"
      //     name: "有毒的黄同学", //评论人名字
      //     time: "2016-08-17",
      //     content: "好,讲得非常好，good",
      //     reply: [
      //       //回复评论的信息，是一个数组，如果没内容就是一个空数组
      //       {
      //         id: "222"
      //         responder: "傲娇的", //评论者
      //         reviewers: "有毒的黄同学", //被评论者
      //         time: "2016-09-05",
      //         content: "你说得对",
      //       },
      //     ],
      //   },
      // ],
      articleId:'',
      hlId:''
  },
  data () {
    return {
      isReply: false,
      reName: '',
      reId: '',
      commentText: '',
    };
  },
  methods: {
    replyBtn(reId, reName){ //reId  所回复评论的id， reName 所回复评论的评论人
      this.isReply=true;
      this.reId=reId;
      this.reName=reName;
    },
    addComment () {  //将评论插入后台
      if(this.isReply){

      }
      else{

      }
      this.commentText = "";
      this.isReply=false;
    },
    canelComment() {
      
      this.commentText = "";
      this.isReply=false;
    },
  },
};
</script>
<style lang="less" scoped>
.commentBox {
  margin: 0px;
}
.comment {
  margin-bottom: 15px;
}
.reply {
  margin: 15px 0 15px 50px;
}
.comment_name {
  margin-left: 10px;
  color: #3d9eea;
  font-size: 15px;
  font-weight: bolder;
}
.comment_list {
  padding-top: 40px;
  width: 700px;
  margin: 0 auto;
}

.comment_details {
  float: left;
}

.comment_content {
  margin-top: 10px;
  font-size: 16px;
}

.comment_add_or_last {
  margin: 0 auto;
  clear: both;
  width: 600px;
  height: 40px;
  background: #f0f0f0;
  text-align: center;
  line-height: 40px; //行高（与div保持同高，垂直居中写法）
}

.imgdiv {
  float: left;
}

.imgcss {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.comment_name {
  margin-left: 10px;
  color: #3d9eea;
  font-size: 15px;
  font-weight: bolder;
}

.layui-icon {
  font-size: 10px;
  color: grey;
}

.del {
  margin-left: 55px;
}
</style>