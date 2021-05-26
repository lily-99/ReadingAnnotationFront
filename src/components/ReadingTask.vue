<template>
  <div>
    <!-- 高亮按钮 -->
    <el-button id="js-highlight" style="width: 80px" @click="highlightText">高亮</el-button>

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
            <!--小组是2，个人是1，公共是0 -->
            <el-button plain @click="showArticleHL(0)">公开</el-button>
            <el-button type="primary" plain @click="showArticleHL(1)">仅自己可见</el-button>
            <el-button type="success" plain @click="showArticleHL(2)">仅小组可见</el-button>
          </div>
        </div>
        <div>
          <div id="articleDiv" v-html="articleHtml"></div>
        </div>
      </el-card>

      <el-card style="width: 600px">
        <div id="comment" class="col-md-9 rightBox">
           <div style="margin: 20px 0"> <h3>高亮的文字</h3> <el-button id="delHLbtn" type="warning" @click="delHL" :disabled="delHLbtnDis">删除高亮</el-button></div>
           <p>{{ currentHLText}}</p>
           <!-- 获取文章id、批注id -->
          <CommentContent v-bind:comment="hlComments"></CommentContent>
          
        </div>
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
      articleHtml:
            '<p>《将进酒》</p>\
            <p>唐 李白</p>\
            <p>\
              君不见黄河之水天上来，奔流到海不复回。<br />\
              君不见高堂明镜悲白发，朝如青丝暮成雪。<br />\
              人生得意须尽欢，莫使金樽空对月。<br />\
              天生我材必有用，千金散尽还复来。<br />\
              烹羊宰牛且为乐，会须一饮三百杯。<br />\
              岑夫子，丹丘生，将进酒，杯莫停。<br />\
              与君歌一曲，请君为我倾耳听。(倾耳听 一作：侧耳听)<br />\
              钟鼓馔玉不足贵，但愿长醉不愿醒。(不足贵 一作：何足贵；不愿醒\
              一作：不复醒)<br />\
              古来圣贤皆寂寞，惟有饮者留其名。(古来 一作：自古；惟 通：唯)<br />\
              陈王昔时宴平乐，斗酒十千恣欢谑。<br />\
              主人何为言少钱，径须沽取对君酌。<br />\
              五花马、千金裘，呼儿将出换美酒，与尔同销万古愁。<br />\
            </p>',  //所需要高亮评论的文本
      currentHLText: '',
      currentHLId: '',
      authority: 0, //小组是2，个人是1，公共是0
      delHLbtnDis: true,
      hlComments:[],  //所选择高亮的所有评论
    };
  },
  mounted() {
    //显示富文本 修改一下API
    axios
      .get(axios.defaults.baseURL + "findEssayById", {
        params: {
          id: 9,
        },
      })
      .then((response) => {
        console.log(response.data.data.content);
        let textareaHtml = response.data.data.content;
        if (textareaHtml) {
          this.articleHtml = textareaHtml;
        }
      });

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
        var hlDoms=highlighter.getDoms(id);
        const position = this.getPosition(hlDoms);
        this.delHLbtnDis=false;
        this.currentHLId=id;
        this.currentHLText='';
        //设置高亮文字
        for (var i in hlDoms){
          this.currentHLText += hlDoms[i].innerText;
        }
        //设置高亮相应的评论
        //to-do
        this.hlComments=this.getCommentsByHLid(id);
        log("click -", id);
      })
      .on(Highlighter.event.CREATE, ({ sources }) => {
        if (sessionStorage.getItem("init") != 1) {
          log("create -", this.authority+sources);
          sources = sources.map((hs) => ({ hs }));
          store.save(this.authority, sources);
        }
      })
      .on(Highlighter.event.REMOVE, ({ ids }) => {
        if (sessionStorage.getItem("init") != 1) {
          log("remove -", ids);
          ids.forEach((id) => store.remove(id));
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
      var articleDiv=document.getElementById("articleDiv");
      if (mx > articleDiv.offsetLeft && mx < articleDiv.offsetLeft+articleDiv.offsetWidth && my > articleDiv.offsetTop && my < articleDiv.offsetTop+articleDiv.offsetHeight){
        var rm = document.getElementById("js-highlight");
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
      }
      else
        document.getElementById("js-highlight").style.display = "none";
      
    };

    //不需要积隐藏右键菜单
    document.documentElement.onclick = function (e) {
      document.getElementById("js-highlight").style.display = "none";
    };
  },

  methods: {
    //显示当前文章的高亮信息
    showArticleHL(authority){
      this.authority=authority;
      var requestURL='';
      var requestParams={};
      switch (authority){
        case 0:  //公共
          requestURL=axios.defaults.baseURL + "articleTask/showPublicHighlightInfoList";
          requestParams= { articleId: 1 };
          break;
        case 1:  //个人
          requestURL=axios.defaults.baseURL + "articleTask/showHighlightInfoListByUser";
          requestParams= {articleId: 1, userId: 3 };
          break;
        case 2: //小组
          requestURL=axios.defaults.baseURL + "articleTask/showGroupHighlightInfoList";
          requestParams= { articleId: 1, groupId: 2 };
      }
      axios
        .get(
          requestURL,
          {
            params: requestParams,
          }
        )
        .then((response) => {
          sessionStorage.setItem("init", 1);
          log (this.init1);
          const storeInfos = response.data.data;
          highlighter.removeAll();
          //画出所有高亮内容
          storeInfos.forEach(({ hs }) =>
            highlighter.fromStore(hs.startMeta,hs.endMeta,hs.text,hs.id,hs.extra)
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
        left: 0
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
        highlighter.getExtraIdByDom(selected.$node.parentNode)
      ].filter(i => i)
    },

    getIntersection(arrA, arrB) {
      const record = {};
      const intersection = [];
      arrA.forEach(i => record[i] = true);
      arrB.forEach(i => record[i] && intersection.push(i) && (record[i] = false));
      return intersection;
    },

    highlightText(){
      const selection = window.getSelection();
      if (selection.isCollapsed) {
        return;
      }
      highlighter.fromRange(selection.getRangeAt(0));
      window.getSelection().removeAllRanges();
    },

    delHL(){
      const id = this.currentHLId;// stored highlight id
      log("*click remove-tip*", id);
      //if (highlighter.remove(id)) 
      //{
        highlighter.removeClass("highlight-wrap-hover", id);
        highlighter.remove(id);
        this.delHLbtnDis=true;
        this.currentHLId='';
        this.currentHLText='';
      //} else {
        //alert("只能删除自己的批注！");
      //}
    },

    //通过高亮ID从数据库获取所有的评论
    getCommentsByHLid(hlId){

      return [
        {
          id: "111",
          name: "有毒的黄同学", //评论人名字
          time: "2016-08-17",
          content: "好,讲得非常好，good",
          reply: [
            //回复评论的信息，是一个数组，如果没内容就是一个空数组
            {
              id: "222",
              responder: "傲娇的", //评论者
              reviewers: "有毒的黄同学", //被评论者
              time: "2016-09-05",
              content: "你说得对",
            },
          ],
        },
        
      ];
    }
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
.rightBox {
  background: #fff;
  padding-bottom: 2em;
  padding-top: 5px;
}
</style>
