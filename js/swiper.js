const swiper = {
    _parent:null,
    _parentW:null,
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
    _canMove:false,
    _startX:null,
    _endX:null,
    _prevLeft:null,
    _nextLeft:null,
    _touchItem:null,
    init:function(parent,imgArr,config,callBack){
        this._parent = parent;
        this._parentW = parent.width();
        this._imgArr = imgArr;
        this._config = config;
        this._callBack = callBack;
        this._currentPage = 0;
        this._time = 3000;
        this._itemArr = [];
        this._pointArr = [];
        this._num = imgArr.length;
        this._canMove = false;
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
        this.addTouch();
        if(this._callBack) this._callBack(this._itemArr);
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
        this._currentPage ++;
        if(this._currentPage > this._num - 1) this._currentPage = 0;
        this._itemArr[this._currentPage].css('left', '100%').show().animate({'left':0},300);
        this._pointArr[this._currentPage].addClass("current-point");
        this.addTouch();
     },
     /**转到上一个*/
     prev:function(){
        this._itemArr[this._currentPage].animate({'left': "100%"},300);
        this._pointArr[this._currentPage].removeClass("current-point");
        this._currentPage --;
        if(this._currentPage < 0) this._currentPage = this._num -1;
        this._itemArr[this._currentPage].css('left', '-100%').show().animate({'left':0},300);
        this._pointArr[this._currentPage].addClass("current-point");
        this.addTouch();
     },
     downFn:function(e){
        e.preventDefault();
        this._canMove = true;
        this._startX = e.pageX;
        this._itemArr[this._currentPage].css('left',"0");
        if(this._currentPage == 0){
            this._itemArr[this._num - 1].css('left',"-100%");
            this._itemArr[this._currentPage +1].css('left',"100%");
            this._prevLeft = this._itemArr[this._num - 1].position().left;
            this._nextLeft =  this._itemArr[this._currentPage +1].position().left;
        }else if(this._currentPage == this._num - 1){
            this._itemArr[this._currentPage - 1].css('left',"-100%");
            this._itemArr[0].css('left',"100%");
            this._prevLeft = this._itemArr[this._currentPage - 1].position().left;
            this._nextLeft =  this._itemArr[0].position().left;
        }else{
            this._itemArr[this._currentPage - 1].css('left',"-100%");
            this._itemArr[this._currentPage +1].css('left',"100%");
            this._prevLeft = this._itemArr[this._currentPage - 1].position().left;
            this._nextLeft =  this._itemArr[this._currentPage +1].position().left;
        }
     },
     moveFn:function(e){
        if(this._canMove){
            this._endX = e.pageX;
            this._movePos = this._endX - this._startX;
            this._itemArr[this._currentPage].animate({'left':this._movePos},0);
            if(this._currentPage == 0){
                this._itemArr[this._num - 1].animate({'left':this._prevLeft + this._movePos},0);
                this._itemArr[this._currentPage +1].animate({'left':this._nextLeft + this._movePos},0);
            }else if(this._currentPage == this._num - 1){
                this._itemArr[this._currentPage - 1].animate({'left':this._prevLeft + this._movePos},0);
                this._itemArr[0].animate({'left':this._nextLeft + this._movePos},0);
            }else{
                this._itemArr[this._currentPage - 1].animate({'left':this._prevLeft + this._movePos},0);
                this._itemArr[this._currentPage +1].animate({'left':this._nextLeft + this._movePos},0);
            }
        }
     },
     upFn(e){
        if(!this._canMove) return;
        this._touchItem.off('mousedown');
        this._touchItem.off('mousemove');
        $(document).off('mouseup');
        if(this._canMove) this._canMove = false;
        if(Math.abs(this._movePos) > this._parentW / 3){
            if(this._movePos > 0){
                this._itemArr[this._currentPage].animate({'left':'100%'},300);
                if(this._currentPage == 0){
                    this._itemArr[this._num - 1].animate({'left':0},300);
                    this._itemArr[this._currentPage +1].css('left','100%');
                }else if(this._currentPage == this._num - 1){
                    this._itemArr[this._currentPage - 1].animate({'left':0},300);
                    this._itemArr[0].css('left','100%');
                }else{
                    this._itemArr[this._currentPage - 1].animate({'left':0},300);
                    this._itemArr[this._currentPage +1].css('left','100%');
                }
                this._pointArr[this._currentPage].removeClass("current-point");
                this._currentPage --;
                if(this._currentPage < 0) this._currentPage = this._num -1;
                this._pointArr[this._currentPage].addClass("current-point");
            }else{
                this._itemArr[this._currentPage].animate({'left':'-100%'},300);
                if(this._currentPage == 0){
                    this._itemArr[this._num - 1].css('left','-100%');
                    this._itemArr[this._currentPage +1].animate({'left':0},300);
                }else if(this._currentPage == this._num - 1){
                    this._itemArr[this._currentPage - 1].css('left','-100%');
                    this._itemArr[0].animate({'left':0},300);
                }else{
                    this._itemArr[this._currentPage - 1].css('left','-100%');
                    this._itemArr[this._currentPage + 1].animate({'left':0},300);
                }
                this._pointArr[this._currentPage].removeClass("current-point");
                this._currentPage ++;
                if(this._currentPage > this._num - 1) this._currentPage = 0;
                this._pointArr[this._currentPage].addClass("current-point");
            }
        }else{
            this._itemArr[this._currentPage].animate({'left':0},300);
            if(this._currentPage == 0){
                this._itemArr[this._num - 1].animate({'left':'-100%'},300);
                this._itemArr[this._currentPage +1].animate({'left':'100%'},300);
            }else if(this._currentPage == this._num - 1){
                this._itemArr[this._currentPage - 1].animate({'left':'-100%'},300);
                this._itemArr[0].animate({'left':'100%'},300);
            }else{
                this._itemArr[this._currentPage - 1].animate({'left':'-100%'},300);
                this._itemArr[this._currentPage + 1].animate({'left':'100%'},300);
            }
        }
        this.addTouch();
     },
     /** 添加触摸事件*/
     addTouch:function(){
        let cantouch = (typeof this._config.cantouch === 'boolean') ? this._config.cantouch : true;
        if(cantouch){
            this._touchItem = this._itemArr[this._currentPage];
            this._touchItem.on('mousedown',this.downFn.bind(this));
            this._touchItem.on('mousemove',this.moveFn.bind(this));
            $(document).on('mouseup',this.upFn.bind(this));
        }
     }
}