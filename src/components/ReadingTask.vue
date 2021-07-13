<template>
  <div>
    <!-- 高亮按钮 -->
    <el-button id="js-highlight" class="btnHighlight" @click="highlightText"
      >高亮</el-button
    >
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/allcourse' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>阅读任务</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="display: flex">
      <!-- 阅读区域 -->
      <el-card style="width: 1200px; margin-right: 20px">
        <div slot="header">
          <div style="margin: 20px 0">
            <!--小组是1，个人是0，公共是2 -->
            <el-button
              v-for="(list, index) in leftPart"
              @click="
                showArticleHL(index);
                leftChange(index);
              "
              :class="{ liBackground: changeLeftBackground == index }"
            >
              {{ list.name }}
            </el-button>
          </div>
        </div>

        <el-scrollbar
          id="scro"
          style="height: 425px; width: 800px; position: absolute"
        >
          <div id="articleDiv" v-html="articleHtml"></div>
        </el-scrollbar>
      </el-card>

      <!-- 评论区域 -->
      <el-card style="width: 600px; height: 590px">
        <el-scrollbar style="height: 590px">
          <div id="comment" class="col-md-9 rightBox">
            <div style="margin: 20px 0">
              <h3>高亮文字</h3>
              <p style="font-style: italic; color: #ff915b">
                {{ currentHLText }}
              </p>
              <el-button
                id="delHLbtn"
                type="primary"
                @click="delHL"
                :disabled="delHLbtnDis"
                icon="el-icon-delete"
                size="mini"
                >删除</el-button
              >
            </div>

            <CommentContent
              v-bind:articleId="this.articleId"
              v-bind:hlId="this.currentHLId"
              v-bind:comment="this.hlComments"
              v-bind:commentText="this.currentHLText"
              v-bind:replyment="this.replyment"
              @child="father"
              @childhuifu="fatherhuifu"
            ></CommentContent></div
        ></el-scrollbar>
      </el-card>
    </div>
  </div>
</template>

<script>
import Highlighter from "web-highlighter";
import LocalStore from "../local.store.js";
import axios from "axios";
import CommentContent from "./CommentContent";
const highlighter = new Highlighter({
  wrapTag: "i",
  exceptSelectors: [".my-remove-tip", "pre", "code"],
});
const store = new LocalStore();
const log = console.log.bind(console, "[highlighter]");
sessionStorage.setItem("init", 0);

export default {
  data() {
    return {
      leftPart: [
        { name: "仅自己可见" },
        { name: "仅小组可见" },
        { name: "公开可见" },
      ],
      changeLeftBackground: 0,
      articleId: "",
      articleHtml: "", //所需要高亮评论的文本
      currentHLText: "",
      currentHLId: "",
      authority: 0, //小组是2，个人是1，公共是0
      delHLbtnDis: true,
      hlComments: [], //所选择高亮的所有评论
      replyment: [], //评论的回复
    };
  },
  mounted() {
    //根据阅读课程ID和阅读任务ID，显示响应的富文本
    var value = sessionStorage.getItem("readingtaskId");
    this.articleId = value;
    if (this.articleId == 0) {
      this.$message.warning("请先选择一项阅读任务");
    } else {
      axios
        .post(axios.defaults.baseURL + "selectContent", {
          id: value,
          //courseId:courseId //课程ID
        })
        .then((response) => {
          //console.log(response.data.data.content);
          let textareaHtml = response.data.data.content;
          if (textareaHtml) {
            this.articleHtml = textareaHtml;
          }
        });
    }

    //高亮部分
    highlighter.hooks.Render.SelectedNodes.tap((id, selectedNodes) => {
      selectedNodes = selectedNodes.filter((n) => n.$node.textContent);
      if (selectedNodes.length === 0) {
        return [];
      }

      const candidates = selectedNodes
        .slice(1)
        .reduce(
          (left, selected) =>
            this.getIntersection(left, this.getIds(highlighter, selected)),
          this.getIds(highlighter, selectedNodes[0])
        );
      for (let i = 0; i < candidates.length; i++) {
        if (
          highlighter.getDoms(candidates[i]).length === selectedNodes.length
        ) {
          return [];
        }
      }
      return selectedNodes;
    });

    highlighter.hooks.Serialize.Restore.tap((source) =>
      log("Serialize.Restore hook -", source)
    );

    highlighter.hooks.Serialize.RecordInfo.tap(() => {
      const extraInfo = Math.random().toFixed(4);
      log("Serialize.RecordInfo hook -", extraInfo);
      return extraInfo;
    });

    /**
     * highlighter event listener
     */
    highlighter
      .on(Highlighter.event.CLICK, ({ id }) => {
        var hlDoms = highlighter.getDoms(id);
        const position = this.getPosition(hlDoms);
        this.delHLbtnDis = false;
        this.currentHLId = id;
        sessionStorage.setItem("highlightId", this.currentHLId);
        this.currentHLText = "";
        //设置高亮文字
        for (var i in hlDoms) {
          this.currentHLText += hlDoms[i].innerText;
        }
        //设置高亮相应的评论
        //to-do
        this.hlComments = this.getCommentsByHLid(id);
        log("click -", id);
      })
      .on(Highlighter.event.CREATE, ({ sources }) => {
        if (sessionStorage.getItem("init") != 1) {
          log("create -", this.authority + sources);
          sources = sources.map((hs) => ({ hs }));
          store.save(this.authority, sources);
        }
      })
      .on(Highlighter.event.REMOVE, ({ ids }) => {
        if (sessionStorage.getItem("init") != 1) {
          log("remove -", ids);
        }
      });

    let hoveredTipId;
    document.addEventListener("mouseover", (e) => {
      const $ele = e.target;
      // toggle highlight hover state
      if (
        $ele.classList.contains("my-remove-tip") &&
        hoveredTipId !== $ele.dataset.id
      ) {
        hoveredTipId = $ele.dataset.id;
        highlighter.removeClass("highlight-wrap-hover");
        highlighter.addClass("highlight-wrap-hover", hoveredTipId);
      } else if (
        !$ele.classList.contains("my-remove-tip") &&
        !$ele.classList.contains("highlight-mengshou-wrap")
      ) {
        highlighter.removeClass("highlight-wrap-hover", hoveredTipId);
        hoveredTipId = null;
      }
    });

    //自定义一个浏览器右键菜单，单击右键是显示它
    //oncontextmenu上下文菜单事件，右键菜单
    document.documentElement.oncontextmenu = function (e) {
      e = e || window.event;
      var mx = e.clientX;
      var my = e.clientY;
      var articleDiv = document.getElementById("articleDiv");
      var scro = document.getElementById("scro");
      //var articleDiv = document.getElementById("btnHL");
      //console.log(scro.offsetWidth,scro.offsetHeight);
      //console.log(articleDiv.offsetWidth,articleDiv.offsetLeft);
      if (
        mx > scro.offsetLeft &&
        mx < scro.offsetLeft + scro.offsetWidth &&
        my > scro.offsetTop &&
        my < scro.offsetTop + scro.offsetHeight
      ) {
        var rm = document.getElementById("js-highlight");
        var rmWidth = parseInt(rm.style.width);
        var pageWidth = document.documentElement.clientWidth;
        if (mx + rmWidth < pageWidth) {
          rm.style.left = e.pageX + "px";
          rm.style.top = e.pageY + "px";
          rm.style.position = "absolute";
        } else {
          rm.style.left = e.pageX + "px";
          rm.style.top = e.pageY + "px";
        }
        rm.style.display = "block";

        return false; //阻止默认的右键菜单显示
      } else document.getElementById("js-highlight").style.display = "none";
    };

    //不需要积隐藏右键菜单
    document.documentElement.onclick = function (e) {
      document.getElementById("js-highlight").style.display = "none";
    };
  },

  methods: {
    leftChange(index) {
      this.changeLeftBackground = index;
    },
    //子组件向父组件传数据
    father(data) {
      //console.log(data);
      this.hlComments = data;
    },
    fatherhuifu(data) {
      //console.log(data);
      this.replyment = data;
    },
    //显示当前文章的高亮信息
    showArticleHL(authority) {
      this.hlComments = null;
      this.replyment = null;
      this.currentHLText = null;
      this.authority = authority;
      var requestURL = "";
      var requestParams = {};
      var articleId = sessionStorage.getItem("readingtaskId");
      var groupId = localStorage.getItem("groupId");
      var userId = localStorage.getItem("userId");
      sessionStorage.setItem("authority", authority);
      switch (authority) {
        case 0: //个人
          requestURL =
            axios.defaults.baseURL + "articleTask/showHighlightInfoListByUser";
          requestParams = { articleId: articleId, userId: userId };
          break;
        case 1: //小组
          requestURL =
            axios.defaults.baseURL + "articleTask/showGroupHighlightInfoList";
          requestParams = { articleId: articleId, groupId: groupId };
          break;
        case 2: //公共
          requestURL =
            axios.defaults.baseURL + "articleTask/showPublicHighlightInfoList";
          requestParams = { articleId: articleId };
      }
      axios
        .get(requestURL, {
          params: requestParams,
        })
        .then((response) => {
          sessionStorage.setItem("init", 1);
          log(this.init);
          const storeInfos = response.data.data;
          highlighter.removeAll();
          //画出所有高亮内容
          storeInfos.forEach(({ hs }) =>
            highlighter.fromStore(
              hs.startMeta,
              hs.endMeta,
              hs.text,
              hs.id,
              hs.extra
            )
          );
          sessionStorage.setItem("init", 0);
        })
        .catch(function (error) {
          alert(error);
          return [];
        });
    },

    getPosition($node) {
      let offset = {
        top: 0,
        left: 0,
      };
      while ($node) {
        offset.top += $node.offsetTop;
        offset.left += $node.offsetLeft;
        $node = $node.offsetParent;
      }
      return offset;
    },

    /**
     * avoid re-highlighting the existing selection
     */
    getIds(highlighter, selected) {
      if (!selected || !selected.$node || !selected.$node.parentNode) {
        return [];
      }
      return [
        highlighter.getIdByDom(selected.$node.parentNode),
        highlighter.getExtraIdByDom(selected.$node.parentNode),
      ].filter((i) => i);
    },

    getIntersection(arrA, arrB) {
      const record = {};
      const intersection = [];
      arrA.forEach((i) => (record[i] = true));
      arrB.forEach(
        (i) => record[i] && intersection.push(i) && (record[i] = false)
      );
      return intersection;
    },

    highlightText() {
      const selection = window.getSelection();
      if (selection.isCollapsed) {
        return;
      }
      highlighter.fromRange(selection.getRangeAt(0));
      window.getSelection().removeAllRanges();
    },

    delHL() {
      const id = this.currentHLId; // stored highlight id
      //console.log(id);
      log("*click remove-tip*", id);
      var userId = localStorage.getItem("userId");
      axios
        .get(axios.defaults.baseURL + "articleTask/deleteHighlight", {
          params: {
            userId: userId,
            highlightId: id,
          },
        })
        .then((ret) => {
          let code = ret.data.status;
          if (code == 1) {
            this.$message.success("删除成功");
            highlighter.remove(id);
            //highlighter.removeClass("highlight-wrap-hover", id);
            this.delHLbtnDis = true;
            this.currentHLId = "";
            this.currentHLText = "";
            this.hlComments = [];
            this.replyment = [];
          } else {
            this.$message.error("删除失败");
          }
        });
    },

    //通过高亮ID从数据库获取所有的评论
    getCommentsByHLid(hlId) {
      hlId = this.currentHLId;
      var userId = localStorage.getItem("userId");
      var authority = sessionStorage.getItem("authority");
      var groupId = localStorage.getItem("groupId");
      axios
        .post(axios.defaults.baseURL + "listPingLunByHId", {
          highLightId: hlId,
          authority: authority,
          userId: userId,
          groupId: groupId,
        })
        .then((response) => {
          //console.log(response.data.data);
          this.hlComments = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      return [];
    },
  },

  beforeDestroy() {
    document.documentElement.onclick = function (e) {};
    document.documentElement.oncontextmenu = function (e) {};
    sessionStorage.removeItem("init");
  },
  components: {
    CommentContent,
  },
};
</script>

<style lang="less" scoped>
.el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}

.liBackground {
  //background: -webkit-gradient(linear, 0 0, 0 100%, from(#4070d4), to(#409eff));
  background: #409eff;
  color: #fff;
}
.rightBox {
  background: #fff;
  padding-bottom: 2em;
  padding-top: 5px;
}
.btnHighlight {
  width: 80px;
  z-index: 1000;
  // position: absolute;
}
</style>
