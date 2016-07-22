+function(){
  var uiSlideBar = function(elem){
    this.$element = $(elem);
    this.defaults = {
      minNum: 0,
      maxNum: 6,
      desc: ['夜间', '低档', '中档', '高档', '喷射', '自动'],  //
      btn: {
        color: '#109fff'
      },
      ininialDuang: 0,  //初始档位
      nowTip: true, //btn-tips show

    };
    this.options = $.extend({}, default, opt)
  }

  //定义原型方法
  uiSlideBar.prototype = {

  }


  $.fn.uiSlideBar = function(elem, opts){
     //init

    //Event

    //Render
  }
}()
