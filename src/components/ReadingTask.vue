<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/allcourse' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>阅读任务</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="display: flex">
      <!-- 卡片视图区域 -->
      <el-card style="width: 1200px; margin-right: 20px">
        <div slot="header">
          <div style="margin: 20px 0">
            <el-button plain @click="public">公开</el-button>
            <el-button type="primary" plain @click="private"
              >仅自己可见</el-button
            >
            <el-button type="success" plain @click="groups"
              >仅小组可见</el-button
            >
          </div>
        </div>
        <div>
          <button id="js-highlight" style="width: 80px">高亮</button>
          <button id="delete-tag" style="width: 80px">删除</button>
          <div v-html="html"></div>
          <div id="headLine">
            会上，国家发展改革委汇报了西部开发进展等情况。西部各省区市政府负责同志发了言。
            <strong>我是 strong 标签</strong>
            <p>桃花源记</p>
            <p>陶渊明</p>
            <p>
              君不见黄河之水天上来，奔流到海不复回。<br />
              君不见高堂明镜悲白发，朝如青丝暮成雪。<br />
              人生得意须尽欢，莫使金樽空对月。<br />
              天生我材必有用，千金散尽还复来。<br />
              烹羊宰牛且为乐，会须一饮三百杯。<br />
              岑夫子，丹丘生，将进酒，杯莫停。<br />
              与君歌一曲，请君为我倾耳听。(倾耳听 一作：侧耳听)<br />
              钟鼓馔玉不足贵，但愿长醉不愿醒。(不足贵 一作：何足贵；不愿醒
              一作：不复醒)<br />
              古来圣贤皆寂寞，惟有饮者留其名。(古来 一作：自古；惟 通：唯)<br />
              陈王昔时宴平乐，斗酒十千恣欢谑。<br />
              主人何为言少钱，径须沽取对君酌。<br />
              五花马、千金裘，呼儿将出换美酒，与尔同销万古愁。<br />
            </p>
          </div>
        </div>
      </el-card>

      <el-card style="width: 600px">
        <div id="comment" class="col-md-9 rightBox">
          <commemt-content></commemt-content>
          <comment-textarea></comment-textarea>
        </div>
      </el-card>
    </div>
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
} from "../highlighter.js";
import axios from "axios";
import commentTextarea from "./commentTextarea";
import commemtContent from "./commemtContent";
import Vue from "vue";
const highlighter = new Highlighter({
  wrapTag: "i",
  exceptSelectors: [".my-remove-tip", "pre", "code"],
});
const store = new LocalStore();
const log = console.log.bind(console, "[highlighter]");
sessionStorage.setItem("authority", 0); //小组是2，个人是1，公共是0
sessionStorage.setItem("init", 0);

export default {
  //name="app",
  data() {
    return {
      html: "",
    };
  },
  mounted() {
    //显示富文本 修改一下API
    /*axios
      .get(axios.defaults.baseURL + "findEssayById", {
        params: {
          id: 9,
        },
      })
      .then((response) => {
        console.log(response.data.data.content);
        let textareaHtml = response.data.data.content;
        if (textareaHtml) {
          this.html = textareaHtml;
        }
      });*/

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
            getIntersection(left, getIds(highlighter, selected)),
          getIds(highlighter, selectedNodes[0])
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
        const position = getPosition(highlighter.getDoms(id));
        displayDelTag(id);
        log("click -", id);
      })
      .on(Highlighter.event.HOVER, ({ id }) => {
        log("hover -", id);
        highlighter.addClass("highlight-wrap-hover", id);
      })
      .on(Highlighter.event.HOVER_OUT, ({ id }) => {
        log("hover out -", id);
        setTimeout(function () {
          hideDelTag();
        }, 5000);
        highlighter.removeClass("highlight-wrap-hover", id);
      })
      .on(Highlighter.event.CREATE, ({ sources }) => {
        if (sessionStorage.getItem("init") != 1) {
          log("create -", sources);
          sources = sources.map((hs) => ({ hs }));
          store.save(sessionStorage.getItem("authority"), sources);
        }
      })
      .on(Highlighter.event.REMOVE, ({ ids }) => {
        if (sessionStorage.getItem("init") != 1) {
          log("remove -", ids);
          ids.forEach((id) => store.remove(id));
        }
      });

    document.addEventListener("click", (e) => {
      const $ele = e.target;

      // delete highlight
      if ($ele.id === "delete-tag") {
        const id = $ele.value; //value stored the id
        log("*click remove-tip*", id);
        //if (highlighter.remove(id))
        //{
        highlighter.removeClass("highlight-wrap-hover", id);
        highlighter.remove(id);
        hideDelTag();
        //} else {
        //alert("只能删除自己的批注！");
        //}
      }

      // highlight range manually
      else if ($ele.id === "js-highlight") {
        const selection = window.getSelection();
        if (selection.isCollapsed) {
          return;
        }
        highlighter.fromRange(selection.getRangeAt(0));
        window.getSelection().removeAllRanges();
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
      var rm = document.getElementById("js-highlight");
      e = e || window.event;

      var mx = e.clientX;
      var my = e.clientY;

      var rmWidth = parseInt(rm.style.width);
      var pageWidth = document.documentElement.clientWidth;
      if (mx + rmWidth < pageWidth) {
        rm.style.left = mx + "px";
        rm.style.top = my + "px";
      } else {
        rm.style.right = mx + "px";
        rm.style.top = my + "px";
      }

      rm.style.display = "block";

      return false; //阻止默认的右键菜单显示
    };

    //不需要积隐藏右键菜单
    document.documentElement.onclick = function (e) {
      var rm = document.getElementById("js-highlight");
      rm.style.display = "none";
    };
  },

  methods: {
    //查找具体文章所有公共高亮信息 currentAuthority=2 + articleId
    public() {
      axios
        .get(
          axios.defaults.baseURL + "articleTask/showPublicHighlightInfoList",
          {
            params: {
              articleId: 1,
            },
          }
        )
        .then(function (response) {
          sessionStorage.setItem("authority", 0);
          sessionStorage.setItem("init", 1);
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
    //查询当前阅读任务下的个人所有高亮数据 currentAuthority=0，1，2 + articleId + userId
    private() {
      axios
        .get(
          axios.defaults.baseURL + "articleTask/showHighlightInfoListByUser",
          {
            params: {
              articleId: 1,
              userId: 3,
            },
          }
        )
        .then(function (response) {
          sessionStorage.setItem("authority", 1);
          sessionStorage.setItem("init", 1);
          const storeInfos = response.data.data;
          //画出所有高亮内容
          highlighter.removeAll();
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
    //查询当前任务下小组成员所有的高亮 currentAuthority=1 + articleId + group
    groups() {
      axios
        .get(
          axios.defaults.baseURL + "articleTask/showGroupHighlightInfoList",
          {
            params: {
              articleId: 1,
              groupId: 2,
            },
          }
        )
        .then(function (response) {
          sessionStorage.setItem("authority", 2);
          sessionStorage.setItem("init", 1);
          const storeInfos = response.data.data;
          //画出所有高亮内容
          highlighter.removeAll();
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
  },

  beforeDestroy() {
    document.documentElement.onclick = function (e) {};
    document.documentElement.oncontextmenu = function (e) {};
    sessionStorage.removeItem("authority");
    sessionStorage.removeItem("init");
  },
  components: {
    commentTextarea,
    commemtContent,
  },
};
</script>

<style lang="less" scoped>
.rightBox {
  background: #fff;
  padding-bottom: 2em;
  padding-top: 5px;
}
</style>
