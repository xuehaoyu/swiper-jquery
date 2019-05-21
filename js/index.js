$(function(){
    /**
     * 参数：
     * 1.最外层父元素  必填项
     * 2.图片地址数组  必填项
     *   支持数组内为字符串，识别作为图片地址 
     *   [string,string,string]
     *   支持数组内为对象，对象的每个key会被作为属性添加到对应的banner标签中，用prop方法获取（其中图片地址字段必须为imgUrl）：
     *   [object,object,object] eq：[{imgUrl:'./img/1.jpg',count:'0','name':'第一个'}]
     * 3.配置信息      非必填
     * 4.当前元素点击回调，回调中返回点击元素jquery实例  非必填
     * 5.轮播图创建完毕回调,回调中返回轮播对象数组,可用于后续逻辑处理  非必填
     */
    swiper.init($(".swiper-main"),
    [
        "./img/1.jpg",
        "./img/2.jpg",
    ],
    {
         // ismobile: false,//可选，不填则自动判断客户端，默认false - true / false(PC端/移动端)
         arrowtype: 'move',	//可选，默认一直显示 - 'move（移动端不支持）' / 'none'	(鼠标移上显示 / 不显示 )
         autoplay: true,	//可选，默认true - true / false (开启轮播/关闭轮播)
         cantouch: true,//可选，默认true - true / false (开启拖拽切换/关闭拖切换)
         showpoint: true,//可选，默认true - true / false (显示轮播点/关闭轮播点)
         time:3000	//可选，默认3000
    },function(item){
        console.log("click success",item);
    },function(list){
        console.log("create success",list);
    }
    )
})