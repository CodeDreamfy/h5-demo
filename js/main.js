$(function(){
  var $machineStatus = $('.machine-status');
  var $mStatusContent = $machineStatus.find('.machine-content');
  var $machineWorkMode = $('.machine-workmode');

  $machineStatus.on('click', '.arrow', function(){
    var _this = $(this);
    _this.find('i').toggleClass('deg');
    $mStatusContent.toggle();
  })

  var mySwiper = new Swiper('.swiper-container', {
    slidesPerView : 4,
  });


  +function(){
    var $uiSlideCont = $('.ui-slide-cont');
    var $uiBtn = $('.ui-slider-handle', $uiSlideCont);
    var w = $uiSlideCont.width();
    var o = {
      min: 0,
      max: 6,
      desc: ['夜间', '低档', '中档', '高档', '喷射', '自动']
    }

    // e.originalEvent.changedTouches[0];
    var Width = $uiSlideCont.width();
    var moveStart,move,moveEnd;
    var winFont = parseInt($('html').css('fontSize'));
    var ml = $('.ui-slider-bar').position().left;  //距离左边的距离


    $uiSlideCont.on('touchstart', '.ui-slider-spot', function(e){
      var g = e.originalEvent.touches[0];
      var s = range(g.pageX - ml);
      $uiBtn.stop(true, true).animate({left: s}, 300);
    }).on('touchstart', '.ui-slider-handle', function(e){
      var g = e.originalEvent.touches[0];
      console.log(g.pageX, 'handle');
      moveStart = g.pageX - ml;
    }).on('touchmove', '.ui-slider-handle', function(e){
      console.log(moveEnd-moveStart);
      var g = e.originalEvent.touches[0];
      moveEnd = g.pageX - ml;
      var distance = range(moveEnd);

      var _this = $(this);
      _this.stop(true,true).animate({left: distance}, 50)
      // event.preventDefault();
    }).on('touchend', '.ui-slider-handle', function(e){
      var g = e.originalEvent.changedTouches[0];
      moveEnd = g.pageX - ml;
      var distance = range(moveEnd);
      var _this = $(this);
      _this.stop(true,true).animate({left: distance}, 50)

    })

    var init = function(){
      $uiSlideCont.find('.ui-slider-handle').css('left',0);
      $uiSlideCont.find('.ui-slider-range').css('width',0);
      $uiSlideCont.find('.ui-slider-spot').empty();
      for(var i=0; i<o.max-1; i++){
        var $item = $('<div class="stalls-item"></div>');
        $uiSlideCont.find('.ui-slider-spot').append($item);
      };
      for(var i=0; i<o.desc.length; i++){
        var $itemDesc = $('<div class="ui-slider-desc">'+o.desc[i]+'</div>')
        $uiSlideCont.find('.ui-slider-xlabel').append($itemDesc);
      }
    }
    init();

    //判断是否出界
    function range(d){
      if(d <= 0){
        d = 0
      }else if(d >= Width){
        d = Width;
      }
      // console.log(d/winFont);
      return (d/winFont) +'rem';
    }
  }()

})
