$(function(){
    /**
     * 参数：
     * 1.最外层父元素  必填项
     * 2.图片地址数组  必填项
     * 3.配置信息      非必填
     * 4.轮播图创建完毕回调,回调中返回轮播对象数组,可用于后续逻辑处理  非必填
     */
    swiper.init($(".swiper-main"),
    [
        "./img/1.jpg",
        "./img/2.jpg",
        "./img/3.jpg",
        "./img/4.jpg"
    ],
    {
         // ismobile: false,//可选，不填则自动判断客户端，默认false - true / false(PC端/移动端)
         arrowtype: 'move',	//可选，默认一直显示 - 'move（移动端不支持）' / 'none'	(鼠标移上显示 / 不显示 )
         autoplay: true,	//可选，默认true - true / false (开启轮播/关闭轮播)
         cantouch: true,//可选，默认true - true / false (开启拖拽切换/关闭拖切换)
         time:3000	//可选，默认3000
    },function(list){
        console.log("create success",list);
    }
    )
})