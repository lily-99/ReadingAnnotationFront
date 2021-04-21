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
          <div>$message</div>
          <p>this is test text</p>
          <p>this is another test text</p>
        </div>
      </div>
    </el-card>
  </div>
</template>


<script>
import Highlighter from 'web-highlighter'
import LocalStore from '../local.store.js'
import {getPosition, displayDelTag, hideDelTag, getIds, getIntersection} from '../highlighter.js'

export default {
  mounted() {
    const highlighter = new Highlighter({
        wrapTag: 'i',
        exceptSelectors: ['.my-remove-tip', 'pre', 'code']
    });
    const store = new LocalStore();
    const log = console.log.bind(console, '[highlighter]');

    highlighter.hooks.Render.SelectedNodes.tap((id, selectedNodes) => {
        selectedNodes = selectedNodes.filter(n => n.$node.textContent);
        if (selectedNodes.length === 0) {
            return [];
        }

        const candidates = selectedNodes.slice(1).reduce(
            (left, selected) => getIntersection(left, getIds(highlighter,selected)),
            // function(left, selected){
            //   console.log(left, selected);
            //   return getIntersection(left, getIds(selected));
            // },
            getIds(highlighter,selectedNodes[0])
        );
        for (let i = 0; i < candidates.length; i++) {
            if (highlighter.getDoms(candidates[i]).length === selectedNodes.length) {
                return [];
            }
        }

        return selectedNodes;
    });

    highlighter.hooks.Serialize.Restore.tap(
        source =>  log('Serialize.Restore hook -', source)
    );

    highlighter.hooks.Serialize.RecordInfo.tap(() => {
        const extraInfo = Math.random().toFixed(4);
        log('Serialize.RecordInfo hook -', extraInfo)
        return extraInfo;
    });

    /**
     * retrieve from local store
     */
    const storeInfos =  store.getAll();
    storeInfos.forEach(
        ({hs}) => highlighter.fromStore(hs.startMeta, hs.endMeta, hs.text, hs.id, hs.extra)
    );


/**
 * highlighter event listener
 */
    highlighter
    .on(Highlighter.event.CLICK, ({id}) => {
        const position = getPosition(highlighter.getDoms(id));
        displayDelTag(id);
		log('click -', id);
    })
    .on(Highlighter.event.HOVER, ({id}) => {
        log('hover -', id);
        highlighter.addClass('highlight-wrap-hover', id);
    })
    .on(Highlighter.event.HOVER_OUT, ({id}) => {
        log('hover out -', id);
		setTimeout(function() { hideDelTag(); }, 5000);
        highlighter.removeClass('highlight-wrap-hover', id);
    })
    .on(Highlighter.event.CREATE, ({sources}) => {
        log('create -', sources);
        sources = sources.map(hs => ({hs}));
        store.save(sources);
    })
    .on(Highlighter.event.REMOVE, ({ids}) => {
        log('remove -', ids);
        ids.forEach(id => store.remove(id));
    });

    document.addEventListener('click', e => {
        const $ele = e.target;

        // delete highlight
        if ($ele.id === 'delete-tag') {
            const id = $ele.value;  //value stored the id
            log('*click remove-tip*', id);
            highlighter.removeClass('highlight-wrap-hover', id);
            highlighter.remove(id);
    		hideDelTag();
        }

        // highlight range manually
        else if ($ele.id === 'js-highlight') {
            const selection = window.getSelection();
            if (selection.isCollapsed) {
                return;
            }
            highlighter.fromRange(selection.getRangeAt(0));
            window.getSelection().removeAllRanges();
        }
    });

    let hoveredTipId;
    document.addEventListener('mouseover', e => {
        const $ele = e.target;
        // toggle highlight hover state
        if ($ele.classList.contains('my-remove-tip') && hoveredTipId !== $ele.dataset.id) {
            hoveredTipId = $ele.dataset.id;
            highlighter.removeClass('highlight-wrap-hover');
            highlighter.addClass('highlight-wrap-hover', hoveredTipId);
        }
        else if (!$ele.classList.contains('my-remove-tip') && !$ele.classList.contains('highlight-mengshou-wrap')) {
            highlighter.removeClass('highlight-wrap-hover', hoveredTipId);
            hoveredTipId = null;
        }
    });

    //自定义一个浏览器右键菜单，单击右键是显示它
    //oncontextmenu上下文菜单事件，右键菜单
    document.documentElement.oncontextmenu=function (e) {
    	var rm=document.getElementById("js-highlight");
      e=e || window.event;

    	var mx=e.clientX;
    	var my=e.clientY;

    	var rmWidth=parseInt(rm.style.width);
    	var pageWidth=document.documentElement.clientWidth;
    	if((mx+rmWidth)<pageWidth)
    	{
    		rm.style.left=mx+"px";
    		rm.style.top=my+"px";
    	}
    	else
    	{
    		rm.style.right=mx+"px";
    		rm.style.top=my+"px";
    	}

    	rm.style.display="block";

    	return false; //阻止默认的右键菜单显示
    };

    //不需要积隐藏右键菜单
    document.documentElement.onclick=function (e) {
      var rm=document.getElementById("js-highlight");
    	rm.style.display="none";
    }
  },

  beforeDestroy() {
    document.documentElement.onclick=function (e) {};
    document.documentElement.oncontextmenu=function (e) {}
  }
}
</script>
