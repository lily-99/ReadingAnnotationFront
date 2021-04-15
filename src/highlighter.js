//高亮部分
// import Vue from 'vue'
// import App from './App.vue'
// 
import 'element-ui/lib/theme-chalk/index.css'
import Highlighter from 'web-highlighter'
import LocalStore from './local.store.js'
const highlighter = new Highlighter({
    wrapTag: 'i',
    exceptSelectors: ['.my-remove-tip', 'pre', 'code']
});
const store = new LocalStore();
const log = console.log.bind(console, '[highlighter]');

/**
 * create a delete tip
 */
const displayDelTag = (highlightID) => {
	var e=window.event;
	var rm=document.getElementById("delete-tag");
	var mx=e.clientX;
	var my=e.clientY;
	//菜单宽度
	var rmWidth=parseInt(rm.style.width);
	//网页的宽度(高度用同样的方法解决)
	var pageWidth=document.documentElement.clientWidth;
	//console.log(pageWidth);
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
	rm.value = highlightID;  //button's value stores highlight ID
	rm.style.display="block";
};
const hideDelTag = () => {
	var rm=document.getElementById("delete-tag");
	rm.style.display="none";
};

function getPosition($node) {
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
}

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

/**
 * avoid re-highlighting the existing selection
 */
function getIds(selected) {
    if (!selected || !selected.$node || !selected.$node.parentNode) {
        return [];
    }
    return [
        highlighter.getIdByDom(selected.$node.parentNode),
        ...highlighter.getExtraIdByDom(selected.$node.parentNode)
    ].filter(i => i)
}
function getIntersection(arrA, arrB) {
    const record = {};
    const intersection = [];
    arrA.forEach(i => record[i] = true);
    arrB.forEach(i => record[i] && intersection.push(i) && (record[i] = false));
    return intersection;
}
highlighter.hooks.Render.SelectedNodes.tap((id, selectedNodes) => {
    selectedNodes = selectedNodes.filter(n => n.$node.textContent);
    if (selectedNodes.length === 0) {
        return [];
    }

    const candidates = selectedNodes.slice(1).reduce(
        (left, selected) => getIntersection(left, getIds(selected)),
        getIds(selectedNodes[0])
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

var rm=document.getElementById("js-highlight");

			
//自定义一个浏览器右键菜单，单击右键是显示它
//oncontextmenu上下文菜单事件，右键菜单
document.documentElement.oncontextmenu=function (e) {
    // var rm=document.getElementById("js-highlight");
    // if(!rm){
    //     var rm=document.getElementById("js-highlight");
    // }
    // console.log(rm,"11111")
	//显示我们自己定义的右键菜单
	//1.找到菜单
	//提取到函数外面作为全局变量
	
	//兼容Event对象
	e=e || window.event;
	
	//2.设置菜单的位置等于鼠标的坐标
	//判断：如果鼠标的位置+菜单的宽度>网页的宽度，那么就改为右边定位
	//鼠标坐标
	var mx=e.clientX;
	var my=e.clientY;
	//菜单宽度
	var rmWidth=parseInt(rm.style.width);
	//网页的宽度(高度用同样的方法解决)
	var pageWidth=document.documentElement.clientWidth;
	//console.log(pageWidth);
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
	
	//3.显示右键菜单
	rm.style.display="block";
	
	//阻止默认的右键菜单显示
	return false;
};

//不需要积隐藏右键菜单
document.documentElement.onclick=function (e) {
    // console.log(e)
    // if(!rm){
    //     var rm=document.getElementById("js-highlight");
    // }
	rm.style.display="none";
}


