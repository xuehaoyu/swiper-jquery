const swiper = {
    _parent:null,
    _imgArr:null,
    _callBack:null,
    _config:null,
    _swiperContent:null,
    _swiperPoint:null,
    _arrowLeft:null,
    _arrowRight:null,
    _timerFn:null,
    _itemArr:[],
    _pointArr:[],
    _currentPage:0,
    _num:null,
    _time:3000,
    init:function(parent,imgArr,config,callBack){
        this._parent = parent;
        this._imgArr = imgArr;
        this._config = config;
        this._callBack = callBack;
        this._currentPage = 0;
        this._time = 3000;
        this._itemArr = [];
        this._pointArr = [];
        this._num = imgArr.length;
        this.addEle();
    },
    /**填充元素 */
    addEle:function(){
        this._swiperContent = this._parent.children(".swiper-content");
        this._swiperPoint = this._parent.children(".swiper-point");
        this._imgArr.map((item,index)=>{
            let swiperItem = $(`<div class="swiper-item"><img src="${item}" alt=""></div>`);
            swiperItem.appendTo(this._swiperContent);
            this._itemArr.push(swiperItem);
            let pointItem = $(`<div class="swiper-circle"></div>`);
            pointItem.appendTo(this._swiperPoint);
            this._pointArr.push(pointItem);
            if(index == 0){
                swiperItem.css('left', '0');
                pointItem.addClass("current-point");
            }else{
                swiperItem.css('left', '100%');
                pointItem.removeClass("current-point");
            }
        })
        this.arrow();
        this.autoPlay();
        if(this._callBack) this._callBack();
    },
    /**判断是否显示左右按钮 */
    arrow:function(){
        let that = this;
        if(this._config.arrowtype == 'move'){
            this._parent.children('.arrow-left').fadeOut();
            this._parent.children('.arrow-right').fadeOut();
            this._parent.on('mouseenter', function(){
                that._parent.children('.arrow-left').fadeIn();
            });
            this._parent.on('mouseleave', function(){
                that._parent.children('.arrow-left').fadeOut();
            });
            this._parent.on('mouseenter', function(){
                that._parent.children('.arrow-right').fadeIn();
            });
            this._parent.on('mouseleave', function(){
                that._parent.children('.arrow-right').fadeOut();
            });
        }else if(this._config.arrowtype == 'none'){
            this._parent.children('.arrow-left').hide();
            this._parent.children('.arrow-right').hide();
        }
        this.addArrowListener();
    },
    addArrowListener:function(){
        let that = this;
        this._arrowRight = this._parent.children(".arrow-right");
        this._arrowRight.click(function(){
            that.next();
        })
        this._arrowLeft = this._parent.children(".arrow-left");
        this._arrowLeft.click(function(){
            that.prev();
        }); 
    },
    /**判断是否自动轮播*/
    autoPlay:function(){
        let autoplay = (typeof this._config.autoplay === 'boolean') ? this._config.autoplay : true;
        if(autoplay){
            let that = this;
            this._time =  this._config.time || 3000;
            this.createTimer();
            this._parent.on('mouseover', function(){
				clearInterval(that._timerFn);
			});
            this._parent.on('mouseout', function(){
                that.createTimer();
			});
        }
     },
     createTimer:function(){
        let that = this;
        this._timerFn = setInterval(function(){
            that.next();
        }, this._time);
     },
     /**转到下一个 */
     next:function(){
        this._itemArr[this._currentPage].animate({'left': "-100%"},300);
        this._pointArr[this._currentPage].removeClass("current-point");
        if(this._currentPage == this._num - 1){
            this._itemArr[0].css('left', '100%').show().animate({'left':0},300);
            this._pointArr[0].addClass("current-point");
        }
        this._currentPage ++;
        if(this._currentPage > this._num - 1) this._currentPage = 0;
        this._itemArr[this._currentPage].css('left', '100%').show().animate({'left':0},300);
        this._pointArr[this._currentPage].addClass("current-point");
     },
     /**转到上一个*/
     prev:function(){
        this._itemArr[this._currentPage].animate({'left': "100%"},300);
        this._pointArr[this._currentPage].removeClass("current-point");
        if(this._currentPage == 0){
            this._itemArr[this._num -1].css('left', '-100%').show().animate({'left':0},300);
            this._pointArr[this._num -1].addClass("current-point");
        }
        this._currentPage --;
        if(this._currentPage < 0) this._currentPage = this._num -1;
        this._itemArr[this._currentPage].css('left', '-100%').show().animate({'left':0},300);
        this._pointArr[this._currentPage].addClass("current-point");
     }
}