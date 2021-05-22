<template>
  <div class="commentBox">
    <h3>发表评论</h3>
    <b v-if="type">你回复&nbsp;{{ name }}</b>
    <textarea name="" value="请填写评论内容" v-model="commentText"></textarea>
    <button class="btn" @click="addComment">发表</button>
    <button class="btn" @click="canelComment">取消</button>
  </div>
</template>

<script>
export default {
  name: "commentTextarea",
  props: ["type", "name"],
  data: function () {
    return { commentText: "" };
  },
  methods: {
    addComment: function () {
      this.$emit("submit", this.commentText);
      this.commentText = "";
    },
    canelComment: function () {
      this.$emit("canel");
      this.commentText = "";
    },
  },
};
</script>

<style lang="less" scoped>
.articleText p {
  text-indent: 2em;
}
</style>