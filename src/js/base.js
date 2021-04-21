$(function (){
    let mainHeight = $(window).height();
    mainHeight = Math.max(mainHeight, parseInt($('.el-main').css('height').replace("px", "")));
    $('.el-aside').height(mainHeight);
})