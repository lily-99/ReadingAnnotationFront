<template>
  <div>
    <!-- <p v-if="comment.length == 0">暂无评论，我来发表第一篇评论！</p> -->
    <!-- <div v-else> -->
    <div>
      <div
        class="comment_details"
        v-for="(item, index) in comment"
        v-bind:index="index"
      >
        <span class="comment_name">{{ item.username }}</span>
        <span>{{ item.time }}</span>
        <div class="comment_content">{{ item.content }}</div>
        <!-- <el-button size="mini" @click="replyBtn(item.userId, item.username)"
          >回复</el-button
        > -->
        <el-button size="mini" @click="replyBtn(item.id, item.username, item.userId)"
          >回复</el-button
        >

        <!-- <div v-if="item.reply.length > 0"> -->
        <div class="reply" v-for="reply in item.reply">
          <span class="comment_name">{{ reply.responder }} </span>回复<span
            class="comment_name"
            >{{ reply.reviewers }}</span
          >
          <span>{{ reply.time }}</span>
          <p>{{ reply.content }}</p>
          <el-button size="mini" @click="replyBtn(reply.id, reply.responder)"
            >回复</el-button
          >
        </div>
        <!-- </div> -->
      </div>
      <div
        class="comment_details"
        v-for="(reply, index) in replyment"
        v-bind:index="index"
      >
        <span class="comment_name">{{ reply.username }} </span>回复<span
          class="comment_name"
          >{{ reply.receiver }}</span
        >
        <span>{{ reply.time }}</span>
        <p>{{ reply.content }}</p>
        <el-button size="mini" @click="replyBtn(reply.id, reply.username)"
          >回复</el-button
        >
      </div>
    </div>
    <div class="commentBox">
      <h3 style="width: 100px">发表评论</h3>
      <b v-if="isReply">你回复&nbsp;{{ reName }}</b>
      <textarea
        name=""
        value="请填写评论内容"
        v-model="commentText"
        rows="4"
        cols="52"
        style="resize: none"
      ></textarea>
      <el-button class="btn" size="mini" @click="addComment">发表</el-button>
      <el-button class="btn" size="mini" @click="canelComment">取消</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CommemtContent",
  props: {
    comment: Array,
    replyment: Array,
    articleId: "",
    hlId: "",
  },
  data() {
    return {
      isReply: false,
      reName: "",
      reId: "",
      commentText: "",
      receiverId: "",
    };
  },
  methods: {
    replyBtn(reId, reName, userId) {
      //reId  所回复评论的id， reName 所回复评论的评论人
      this.isReply = true;
      this.reId = reId; //评论id
      this.reName = reName; //评论人
      this.receiverId = userId;
    },
    addComment() {
      //将评论插入后台
      var userId = localStorage.getItem("userId");
      //console.log(userId);
      var username = localStorage.getItem("username");
      //console.log(username);
      var value = sessionStorage.getItem("readingtaskId");
      //console.log(value);
      var highlightId = sessionStorage.getItem("highlightId");
      //console.log(highlightId);
      if (this.isReply) {
        axios
          .post(axios.defaults.baseURL + "addHuiFu", {
            //params: {
            userId: userId,
            username: username,
            content: this.commentText,
            pingLunId: this.reId, //评论完
            receiverId: this.receiverId,
            highLightId:highlightId,
            receiver: this.reName,
          })
          .then((Response) => {
            console.log(Response.data);
            //动态显示到页面上
            axios
              .post(axios.defaults.baseURL + "listAllHuifu", {
                //pingLunId: this.reId,
                highLightId:highlightId,
              })
              .then((Response) => {
                console.log(Response.data.data);
                //this.replyment=Response.data.data;
                this.$emit("childhuifu", Response.data.data);
              });
          });
      } else {
        axios
          .post(axios.defaults.baseURL + "addPingLun", {
            userId: userId,
            username: username,
            content: this.commentText,
            highLightId: highlightId,
            articleId: value,
          })
          .then((Response) => {
            console.log(Response.data);
            //动态显示到页面上
            axios
              .post(axios.defaults.baseURL + "listPingLunByHId", {
                highLightId: highlightId,
              })
              .then((response) => {
                console.log(response.data.data);
                //this.comment = response.data.data;
                this.$emit("child", response.data.data);
              });
          });
      }
      this.commentText = "";
      this.isReply = false;
    },
    canelComment() {
      this.commentText = "";
      this.isReply = false;
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