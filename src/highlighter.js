//高亮部分
// import Vue from 'vue'
// import App from './App.vue'
//
// import 'element-ui/lib/theme-chalk/index.css'
import LocalStore from './local.store.js'

/**
 * create a delete tip
 */
export const displayDelTag = (highlightID) => {
	var e = window.event;
	var rm = document.getElementById("delete-tag");
	var mx = e.clientX;
	var my = e.clientY;
	//菜单宽度
	var rmWidth = parseInt(rm.style.width);
	//网页的宽度(高度用同样的方法解决)
	var pageWidth = document.documentElement.clientWidth;
	console.log(pageWidth);
	if ((mx + rmWidth) < pageWidth) {
		rm.style.left = mx + "px";
		rm.style.top = my + "px";
	}
	else {
		rm.style.right = mx + "px";
		rm.style.top = my + "px";
	}
	rm.value = highlightID;  //button's value stores highlight ID
	rm.style.display = "block";
};
export const hideDelTag = () => {
	var rm = document.getElementById("delete-tag");
	rm.style.display = "none";
};

export function getPosition($node) {
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
 * avoid re-highlighting the existing selection
 */
export function getIds(highlighter, selected) {
	if (!selected || !selected.$node || !selected.$node.parentNode) {
		return [];
	}
	return [
		highlighter.getIdByDom(selected.$node.parentNode),
		highlighter.getExtraIdByDom(selected.$node.parentNode)
	].filter(i => i)
}
export function getIntersection(arrA, arrB) {
	const record = {};
	const intersection = [];
	arrA.forEach(i => record[i] = true);
	arrB.forEach(i => record[i] && intersection.push(i) && (record[i] = false));
	return intersection;
}

export function displayHLText(highlightID) {
	//通过highlight id 显示高亮的文字内容
	console.log(highlightID);
	return highlightID;
}
