<template>
  <div>
    <!-- 评论 -->
    <div
      class="comment_details"
      v-for="(item, index) in comment"
      v-bind:index="index"
    >
      <div class="comment_name">{{ item.username }}</div>
      <div class="comment_content">{{ item.content }}</div>
      <el-button
        class="comment_reply"
        type="text"
        @click="listReplyBtn(item.id)"
        >共{{ item.total }}条回复></el-button
      >
      <div class="comment_time">{{ item.time }}</div>
      <el-button
        size="mini"
        type="text"
        @click="replyBtn(item.id, item.username, item.userId)"
        >回复</el-button
      >
      <el-button size="mini" type="text" @click="deleteCommentBtn(item.id)"
        >删除</el-button
      >
      <el-button size="mini" type="text" @click="callBack(item.id)"
        >收起</el-button
      >
      <div
        class="reply_details"
        v-for="(reply, index) in replyment"
        v-bind:index="index"
        v-if="item.id == reply.pingLunId"
      >
        <span class="comment_name">{{ reply.username }} </span>
        <span style="font-size: 13px">回复</span>
        <span class="comment_name">{{ reply.receiver }} </span>
        <div class="comment_content">{{ reply.content }}</div>
        <div class="reply_time">{{ reply.time }}</div>
        <el-button size="mini" type="text" @click="deleteReplyBtn(reply.id)"
          >删除</el-button
        >
      </div>
    </div>
    <!-- 发表评论部分 -->
    <div class="commentBox">
      <h3 style="width: 100px">发表评论</h3>
      <b v-if="isReply">你回复&nbsp;{{ reName }}</b>
      <textarea
        name=""
        value="请填写评论内容"
        v-model="commentText"
        rows="4"
        cols="48"
        style="resize: none"
      ></textarea>
      <el-button class="btn" size="mini" @click="addComment" 
        >发表</el-button
      >
      <el-button
        class="btn"
        size="mini"
        @click="canelComment"
        >取消</el-button
      >
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
    deleteReplyBtn(id) {
      var userId = localStorage.getItem("userId");
      var highlightId = sessionStorage.getItem("highlightId");
      var authority = sessionStorage.getItem("authority");
      var groupId = localStorage.getItem("groupId");
      axios
        .post(axios.defaults.baseURL + "deleteHuiFuById", {
          userId: userId,
          id: id,
        })
        .then((ret) => {
          let code = ret.data.status;
          //console.log(ret.data.status);
          if (code == 1) {
            this.$message.success("删除成功");
            axios
              .post(axios.defaults.baseURL + "listAllHuifuByPId", {
                pingLunId: id,
              })
              .then((response) => {
                this.$emit("childhuifu", response.data.data);
                //this.$emit("replyTotal",response.data.data.length);
              })
              .catch((err) => {
                console.log(err);
              });
            axios
              .post(axios.defaults.baseURL + "listPingLunByHId", {
                highLightId: highlightId,
                authority: authority,
                userId: userId,
                groupId: groupId,
              })
              .then((response) => {
                //console.log(response.data.data);
                this.$emit("child", response.data.data);
              });
          } else if (code == 0) {
            this.$message.error("删除失败");
          }
        });
    },
    callBack(reId) {
      axios
        .post(axios.defaults.baseURL + "listAllHuifuByPId", {
          pingLunId: reId,
        })
        .then((response) => {
          this.$emit("childhuifu", null);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteCommentBtn(id) {
      var userId = localStorage.getItem("userId");
      var highlightId = sessionStorage.getItem("highlightId");
      var authority = sessionStorage.getItem("authority");
      var groupId = localStorage.getItem("groupId");
      axios
        .post(axios.defaults.baseURL + "deletePingLunById", {
          userId: userId,
          id: id,
        })
        .then((ret) => {
          let code = ret.data.status;
          //console.log(ret.data.status);
          if (code == 1) {
            this.$message.success("删除成功");
            axios
              .post(axios.defaults.baseURL + "listPingLunByHId", {
                highLightId: highlightId,
                authority: authority,
                userId: userId,
                groupId: groupId,
              })
              .then((response) => {
                //console.log(response.data.data);
                this.$emit("child", response.data.data);
              });
          } else if (code == 0) {
            this.$message.error("删除失败");
          }
        });
    },
    replyBtn(reId, reName, userId) {
      //reId  所回复评论的id， reName 所回复评论的评论人
      this.isReply = true;
      this.reId = reId; //评论id
      this.reName = reName; //评论人
      this.receiverId = userId;
    },
    listReplyBtn(reId) {
      //console.log(reId);
      axios
        .post(axios.defaults.baseURL + "listAllHuifuByPId", {
          pingLunId: reId,
        })
        .then((response) => {
          this.$emit("childhuifu", response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addComment() {
      if (this.commentText == "") {
        this.$message.warning("请先选则要批注的部分");
      } else {
        //将评论插入后台
        var userId = localStorage.getItem("userId");
        //console.log(userId);
        var username = localStorage.getItem("username");
        //console.log(username);
        var value = sessionStorage.getItem("readingtaskId");
        //console.log(value);
        var highlightId = sessionStorage.getItem("highlightId");
        //console.log(highlightId);
        var authority = sessionStorage.getItem("authority");
        //console.log(authority);
        var groupId = localStorage.getItem("groupId");
        //console.log(groupId);
        if (this.isReply) {
          axios
            .post(axios.defaults.baseURL + "addHuiFu", {
              userId: userId,
              username: username,
              content: this.commentText,
              pingLunId: this.reId, //评论完
              receiverId: this.receiverId,
              highLightId: highlightId,
              receiver: this.reName,
            })
            .then((Response) => {
              axios
                .post(axios.defaults.baseURL + "listPingLunByHId", {
                  highLightId: highlightId,
                  authority: authority,
                  userId: userId,
                  groupId: groupId,
                })
                .then((response) => {
                  //console.log(response.data.data);
                  this.$emit("child", response.data.data);
                });
              axios
                .post(axios.defaults.baseURL + "listAllHuifuByPId", {
                  pingLunId: this.reId,
                })
                .then((response) => {
                  this.$emit("childhuifu", response.data.data);
                })
                .catch((err) => {
                  console.log(err);
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
              authority: authority,
              groupId: groupId,
            })
            .then((Response) => {
              //console.log(Response.data);
              //动态显示到页面上
              axios
                .post(axios.defaults.baseURL + "listPingLunByHId", {
                  highLightId: highlightId,
                  authority: authority,
                  userId: userId,
                  groupId: groupId,
                })
                .then((response) => {
                  //console.log(response.data.data);
                  this.$emit("child", response.data.data);
                });
            });
        }
        this.commentText = "";
        this.isReply = false;
      }
    },
    canelComment() {
      this.commentText = "";
      this.isReply = false;
    },
  },
};
</script>

<style lang="less" scoped>
.comment_details {
  float: left;
  width: 360px;
  margin: 15px 0 10px 0px;
}
//名字
.comment_name {
  color: gray;
  font-size: 13px;
  font-weight: border;
}
//内容
.comment_content {
  color: black;
  margin-top: 5px;
  font-size: 13px;
}
//共有几条回复
.comment_reply {
  margin-top: 0px;
  font-size: 8px;
}
//时间
.comment_time {
  margin-top: 0px;
  font-size: 6px;
}
//回复时间
.reply_time {
  color: dimgrey;
  margin-top: 5px;
  font-size: 6px;
}
//评论框
.commentBox {
  margin: 0px;
}

.comment {
  margin-bottom: 15px;
}
.reply_details {
  margin: 15px 0 15px 50px;
}
</style>