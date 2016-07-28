var UiSlideBar = function(elem, opt){
  this.version = '0.0.1';
  this.author = 'CodeDreamfy';
  // console.log('version:',this.version);
  // console.log('author:',this.author);

  this.$wrap = $(elem);
  this.defaults = {
    desc: ['1档','2档','3档','4档','5档','6档'],  // 档位描述  - ['夜间', '低档', '中档', '高档', '喷射', '自动']
    descShow: true, //显示档位中间描述
    spotShow: true, //是否显示小点
    btnColor: '#109fff', //滑动按钮颜色
    initialDuang: 0,  //初始档位
    progress: true, // defalut: true;进度条显示
    allowSlide: true, //是否允许滑动
    minNum: 0 //最小值 防止是负数 -2 - min = 0 依次累加,全部转换为正整数
  };
  this.options = $.extend({}, this.defaults, opt || {});
  this._init();
}

//定义原型方法
$.extend(UiSlideBar.prototype, {
    _init: function() {
      this.$uiBar = this.$wrap.find('.ui-slider-bar');
      this.$handle = this.$wrap.find('.ui-slider-handle');
      this.$range = this.$wrap.find('.ui-slider-range');
      this.$xlabel = this.$wrap.find('.ui-slider-xlabel');
      this.$spot = this.$uiBar.find('.ui-slider-spot');
      //reset style
      this.$wrap.find('.ui-slider-spot').children().remove();
      //set stepLength - 存储档位
      this.stepLength = this.options.desc.length;

      this.W = this.$uiBar.width();   //容器宽度
      this.divNum= this.W/(this.options.desc.length-1);  //单位档长度
      this.dpRem = parseInt($('html').css('fontSize')); //单位rem
      this.ml = $('.ui-slider-bar').offset().left;  //距离左边的距离
      this.moveStart = this.moveEnd = 0;

      //清除元素
      this.$xlabel.children().remove();
      this.$spot.children().remove();

      //重新计算传入初始化档数
      this.initialDuang = this.initDuang(this.options.initialDuang); //处理初始化参数为负数的情况
      this.deepStalls = this.initialDuang != 0 ? this.initialDuang - 1 : 0; //div个数

      //initial
      var initLen; // -1 代表div个数  -2 代表第几个元素
      // initLen = (this.initialDuang == 0 ? this.initialDuang : this.initialDuang-1); //初始化长度
      initLen = this.initialDuang -1;
      var leftLen = ((this.divNum* initLen)/this.dpRem) + 'rem';
      this.$handle.css({
        'transform': 'translate3d('+leftLen+',0,0)',
        'background': this.options.btnColor, 'color': this.options.btnColor}); //set 按钮
      this.$range.css({'width': leftLen, 'background': this.options.btnColor});
      //设置tips
      this.$handle.find('span').text(this.options.desc[initLen]);



      this._render();
      if(this.options.allowSlide){
        this._bindEvent();
      }
    },
    _render: function() {
      //设置档位刻度与是否可见
      for(var i=0; i<= this.stepLength-2; i++){
        var $item = $('<div class="stalls-item"></div>');
        if(i==0){
          $item.addClass('stalls-item-first pit').append('<b class="b1"></b>');
        }
        if(this.options.spotShow){
          $item.addClass('pit').append('<b></b>');
        }else {
          if(i == (this.stepLength-2)){
            $item.addClass('pit').append('<b></b>');
          }
        }
        this.$spot.append($item);
      }

      //是否显示档位名称
      if(this.options.descShow){
        for(var i=0; i<this.stepLength; i++){
          var $itemDesc = $('<div class="ui-slider-desc">'+this.options.desc[i]+'</div>')
          this.$xlabel.append($itemDesc);
        }
      }else {
        for(var i=0; i<=this.stepLength-1; i++){
          var $itemDesc;
          if(i==0 || i==this.stepLength-1 ){
            $itemDesc = $('<div class="ui-slider-desc">'+this.options.desc[i]+'</div>');
          }else {
            $itemDesc = $('<div class="ui-slider-desc"></div>');
          }
          this.$xlabel.append($itemDesc);
        }
      }

      //重置spot颜色
      this.clearSpotColor();

      //是否显示进度条
      if(this.options.progress){
        this.$range.show();
        this.setSpot();
      }else {
        this.$range.hide();
      }


    },
    _bindEvent: function(){
      var _this = this;
      this.$wrap.on('touchstart', '.ui-slider-bar', function(e){
        event.preventDefault();
        var g = e.originalEvent.touches[0];
        this.ml = $('.ui-slider-bar').offset().left;
        var distance = _this.range(g.pageX - _this.ml);
        distance = _this.correct(distance);
        // console.log(distance.left, _this.deepStalls)
        _this.$handle.animate({
          'translate3d': distance.left+',0,0'
        }, 300, function(){
          _this.$handle.find('span').text();
          _this.$handle.find('span').text(_this.options.desc[distance.site]);
        });
        // console.log(_this.correct(distance).left)
        _this.$range.animate({width: distance.left}, 300, function(){
          _this.setSpot();
        });

      }).on('touchstart', '.ui-slider-handle', function(e){
        event.preventDefault();
        var g = e.originalEvent.touches[0];
        this.ml = $('.ui-slider-bar').offset().left;
        _this.moveStart = g.pageX - _this.ml;

      }).on('touchmove', '.ui-slider-handle', function(e){
        event.preventDefault();
        var g = e.originalEvent.touches[0];
        _this.moveEnd = g.pageX - _this.ml;
        var distance = _this.range(_this.moveEnd);
        var self = $(this);
        self.animate({
          'translate3d': distance+'px,0,0'
        }, 300, function(){
          self.find('span').text()
          self.find('span').html(_this.options.desc[_this.correct(distance).site]);
        });
        _this.$range.animate({width: distance}, 300, function(){
          _this.setSpot('touchmove');
        });

      }).on('touchend', '.ui-slider-handle', function(e){
        var g = e.originalEvent.changedTouches[0];
        this.ml = $('.ui-slider-bar').offset().left;
        _this.moveEnd = g.pageX - _this.ml;
        var distance = _this.range(_this.moveEnd);
        distance = _this.correct(distance);
        var self = $(this);
        self.animate({
          'translate3d': distance.left+',0,0'
        }, 300, function(){
          self.find('span').text()
          self.find('span').html(_this.options.desc[distance.site]);
        });
        _this.$range.animate({width: distance.left}, 300, function(){
          _this.setSpot();
        });
        event.preventDefault();
        // console.log(_this.options.desc[_this.deepStalls])
      })
    },
    prevAll: function(arr){
      var _this = this;
      var g = arr.filter(function(i){
        if(i<_this.deepStalls){
          return true
        }
      })
      return g;
    },
    range: function(d){
      if(d <= 0){
        d = 0;
      }else if(d >= this.W){
        d = this.W;
      }
      return d;
    },
    correct: function(d){
      if(!d){
        d = 0;
      }
      var integer = (d/this.divNum).toFixed(2);
      var t = Math.round(integer);
      this.deepStalls = t;
      var o = {
        left: ((t*this.divNum)/this.dpRem).toFixed(6) +'rem',
        site: t
      }
      return o;
    },
    clearSpotColor: function(){  //重置刻度点颜色
      this.$spot.children().each(function(i, e){
        $(e).find('b').css('background', '#ebebeb');
      })
      return this
    },
    setSpot: function(){
      var args = arguments[0];
      if(this.options.progress){
        this.clearSpotColor();
        var c = this.prevAll(this.$spot.children());
        if(c.length == 0){
          this.$spot.children().eq(0).find('.b1').css({background: '#109fff'});
        }else {
          c.each(function(i,e){
            $(e).find('b').css({background: '#109fff', opacity: 1});
            if( args == 'touchmove' && i >0){
              if(i == c.length-1 ){
                $(e).find('b').css({background: '#109fff', opacity: 0.5});
              }
            }
          })
        }
      }
      return this;
    },
    initDuang: function(){
      var zhi = (this.options.initialDuang).toString();
      var len;
      if(this.options.desc.indexOf(zhi) != -1){
        this.options.desc.forEach(function(e,i){
          if(e == zhi){
             len = i +1;
          }
        })
      }else {
        len = 0;
      }
      return len;
    },
    computeInitialD: function(){ //处理初始化档位
      var cm = this.options.initialDuang;
      var min = this.options.minNum;
      if(cm<min){
        cm = 0; min = 0 //初始值小于最小值的情况下重置为默认参数，防止报错
      }
      if(min < 0 && min <= cm){
        var arr = [];
        for(var i=min; i<this.options.desc.length; i++){
          var c = i+(~min+1);
          arr.push(c)
        }
        cm = arr[cm-min];
      }
      if(cm < 0){
        cm = ~cm+1;
      }
      return cm
    }
  })

$.fn.Uislidebar = function(option){
  return new UiSlideBar(this, option);
};
