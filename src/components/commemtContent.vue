<template>
  <div class="commentBox">
    <h3>高亮部分</h3>
    <div></div>
    <!-- <p v-if="comment.length == 0">暂无评论，我来发表第一篇评论！</p>
    <div v-else>
      <div
        class="comment"
        v-for="(item, index) in comment"
        v-bind:index="index"
      >
        <b
          >{{ item.name }}<span>{{ item.time }}</span></b
        >
        <p @click="changeCommenter(item.name, index)">{{ item.content }}</p>
        <div v-if="item.reply.length > 0">
          <div class="reply" v-for="reply in item.reply">
            <b
              >{{ reply.responder }}&nbsp;&nbsp;回复&nbsp;&nbsp;{{
                reply.reviewers
              }}<span>{{ reply.time }}</span></b
            >
            <p @click="changeCommenter(reply.responder, index)">
              {{ reply.content }}
            </p>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Highlighter from "web-highlighter";
import LocalStore from "../local.store.js";
import {
  getPosition,
  displayDelTag,
  hideDelTag,
  getIds,
  getIntersection,
  displayHLText
} from "../highlighter.js";
export default {
  name: "commemtContent",
  data: function () {
    return {
      /*comment: [
        {
          name: "有毒的黄同学", //评论人名字
          time: "2016-08-17",
          content: "好,讲得非常好，good",
          reply: [
            //回复评论的信息，是一个数组，如果没内容就是一个空数组
            {
              responder: "傲娇的", //评论者
              reviewers: "有毒的黄同学", //被评论者
              time: "2016-09-05",
              content: "你说得对",
            },
          ],
        },
      ],*/
    };
  },
  methods: {
    /*changeCommenter: function (name, index) {
      this.$emit("change", name, index);
    },*/
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
</style>